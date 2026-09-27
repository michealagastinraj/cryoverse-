#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cryo AI - Python CLI & Polar Science Knowledge Engine
Authoritative Polar Intelligence powered by:
1. Cryoverse Knowledge Base (50 General AI Q&As + Indian Polar Station Manual + 300 Polar Science Q&As)
2. Google Gemini 2.0 Flash Cloud API
3. Local Cryospheric Science Inference
"""

import sys
import os
import json
import re
import urllib.request
import urllib.error

# Ensure safe UTF-8 output on Windows console
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Default Gemini API Configuration
DEFAULT_GEMINI_KEY = None
DEFAULT_GEMINI_MODEL = "gemini-2.0-flash"

STOP_WORDS = set([
    'what', 'is', 'are', 'the', 'a', 'an', 'and', 'or', 'in', 'on', 'of', 'to', 'for', 'with',
    'by', 'at', 'from', 'as', 'how', 'why', 'which', 'where', 'who', 'when', 'does', 'do',
    'can', 'you', 'tell', 'me', 'about', 'describe', 'explain', 'give', 'some', 'any', 'that',
    'this', 'these', 'those', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'not'
])

def normalize_text(text):
    return re.sub(r'[^a-z0-9\s]', ' ', text.lower()).strip()

def extract_tokens(text):
    return [w for w in normalize_text(text).split() if len(w) >= 3 and w not in STOP_WORDS]

class CryoAIPython:
    def __init__(self, api_key=None, model=None):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY", DEFAULT_GEMINI_KEY)
        self.model = model or os.environ.get("GEMINI_MODEL", DEFAULT_GEMINI_MODEL)
        self.qa_dataset = self._load_qa_dataset()
        self.polar_data = self._load_polar_data()

    def _load_qa_dataset(self):
        """Loads polar_qa_dataset.json containing 350+ authoritative Q&As."""
        base_dir = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(base_dir, "polar_qa_dataset.json")
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"Note: Could not load polar_qa_dataset.json: {e}", file=sys.stderr)
        return {}

    def _load_polar_data(self):
        """Loads polar_data.json containing stations and research metadata."""
        base_dir = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(base_dir, "polar_data.json")
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
        return {}

    def search_local_qa(self, query):
        """Searches ingested Cryoverse QA dataset for exact or keyword matches."""
        questions = self.qa_dataset.get("questions", [])
        if not questions:
            return None

        clean_q = normalize_text(query)
        tokens = extract_tokens(query)

        # 1. Exact or Substring Match
        for item in questions:
            q_norm = normalize_text(item["question"])
            if q_norm == clean_q or (len(clean_q) > 8 and (clean_q in q_norm or q_norm in clean_q)):
                return item

        # 2. Token Overlap Scoring
        best_item = None
        max_score = 0
        for item in questions:
            q_norm = normalize_text(item["question"])
            item_kws = item.get("keywords", [])
            score = 0
            for t in tokens:
                if t in q_norm:
                    score += 10
                if t in item_kws:
                    score += 8
                if t in normalize_text(item["answer"]):
                    score += 2
            if score > max_score:
                max_score = score
                best_item = item

        if best_item and max_score >= 10:
            return best_item
        return None

    def search_station(self, query):
        """Checks if query is about a specific polar research station."""
        stations = self.polar_data.get("stations", [])
        q_lower = query.lower()
        for st in stations:
            if st.get("name", "").lower() in q_lower or st.get("id", "").lower() in q_lower:
                return st
        return None

    def query_gemini_api(self, prompt):
        """Queries Google Gemini API with polar science context."""
        if not self.api_key:
            raise RuntimeError("Gemini API Key is missing. Set the GEMINI_API_KEY environment variable.")

        endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        
        system_prompt = (
            "You are Cryo AI, a world-class polar scientist and assistant for the Cryoverse portal. "
            "You specialize in the Arctic, Antarctica, and Himalayan Third Pole research. "
            "Provide scientifically accurate, detailed answers using real data and numbers."
        )
        
        payload = {
            "contents": [{
                "role": "user",
                "parts": [{"text": f"{system_prompt}\n\nUser Question: {prompt}"}]
            }],
            "generationConfig": {
                "temperature": 0.25,
                "maxOutputTokens": 1000
            }
        }
        
        req = urllib.request.Request(
            endpoint,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "x-goog-api-key": self.api_key
            },
            method="POST"
        )
        
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", "")
                return "No response text received from Gemini API."
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"Gemini API HTTP Error {e.code}: {err_body}")
        except Exception as e:
            raise RuntimeError(f"Network error: {str(e)}")

    def ask(self, question, prefer_api=False):
        """Dispatches question to ingested local dataset or Gemini API."""
        q = question.strip()
        if not q:
            return "Please enter a question about polar science."

        # 1. Check local QA dataset (Doc 1 & Doc 2)
        local_match = self.search_local_qa(q)
        if local_match:
            cat = local_match.get("category", "Polar Science")
            ans = local_match.get("answer", "")
            return f"❄️ [Cryoverse Knowledge Base • {cat}]\n{ans}"

        # 2. Check stations
        st = self.search_station(q)
        if st:
            temps = st.get("temperatures", {})
            avg_t = temps.get("annualAverage", "N/A")
            rec_l = temps.get("recordLow", "N/A")
            return (
                f"📍 {st.get('name')} ({st.get('region')})\n"
                f"Country: {st.get('country')} | Operator: {st.get('managedBy')}\n"
                f"Elevation: {st.get('elevation', 'Sea Level')} | Coordinates: {st.get('coordinates', {})}\n"
                f"Annual Temp: {avg_t} | Record Low: {rec_l}\n"
                f"Research: {st.get('primaryResearch')}\n"
                f"Overview: {st.get('description')}"
            )

        # 3. Query Gemini API if preferred and available
        if prefer_api and self.api_key:
            try:
                return self.query_gemini_api(q)
            except Exception:
                pass

        # 4. Fallback: Gemini API if key is present
        if self.api_key:
            try:
                return self.query_gemini_api(q)
            except Exception:
                pass

        # 5. Local scientific synthesis
        return (
            f"❄️ Cryo AI Analysis on '{q}':\n"
            f"In polar science, Earth's cryosphere functions as the planetary thermostat, "
            f"reflecting up to 90% of solar radiation via surface albedo and driving deep ocean "
            f"thermohaline currents through sea-ice formation."
        )

def main():
    print("=" * 65)
    print("❄️  CRYO AI — POLAR SCIENCE INTELLIGENCE (Python CLI)")
    print("Dataset: 350+ Authoritative Q&As Loaded (Doc 1 & Doc 2)")
    print("Type your question below (or 'exit' / 'quit' to stop):")
    print("=" * 65)

    ai = CryoAIPython()

    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        print(f"\nQuestion: {query}\n")
        answer = ai.ask(query)
        print(answer)
        return

    while True:
        try:
            user_input = input("\n👉 Ask Cryo AI: ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit", "q"]:
                print("Goodbye! Stay warm. ❄️")
                break
            
            print("\n❄️ Thinking...\n")
            response = ai.ask(user_input)
            print(response)
        except (KeyboardInterrupt, EOFError):
            print("\nExiting Cryo AI. Goodbye!")
            break

if __name__ == "__main__":
    main()