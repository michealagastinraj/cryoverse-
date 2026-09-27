/**
 * CRYO AI • ADVANCED POLAR SCIENCE & CRYOSPHERE INTELLIGENCE ENGINE
 * Comprehensive, production-grade AI assistant featuring:
 * 1. Deep Integration with Cryoverse Knowledge Base (Doc 1: 50 General AI Q&As + Indian Polar Manual; Doc 2: 300 Polar Science Q&As)
 * 2. Instant Zero-Latency Keyword & Exact-Phrase Inverted Index Search
 * 3. Browser Data Harvester (Stations, Research, Climate Datasets, Quizzes, Glossary)
 * 4. Google Gemini 2.0 Flash Cloud API & OpenAI API integration
 * 5. Intelligent Gemini-style Local Polar Scientific Synthesis
 */

class CryoAI {
  constructor() {
    this.name = "Cryo AI";
    this.isSpeaking = false;
    this.synth = window.speechSynthesis || null;
    this.isOpen = false;
    this.isLoading = false;
    this.greetingCount = 0;

    // API Configuration
    this.provider = localStorage.getItem("cryo_ai_provider") || "gemini"; // "gemini" | "openai" | "local"
    this.openaiKey = localStorage.getItem("cryo_openai_key") || "";
    this.openaiModel = localStorage.getItem("cryo_openai_model") || "gpt-4o-mini";
    
    // User Gemini API Key & Standard High-Compatibility Gemini Model
    const storedGemKey = localStorage.getItem("cryo_gemini_key");
    this.geminiKey = (storedGemKey && storedGemKey.trim()) ? storedGemKey : "AQ.Ab8RN6KAwnYMx1FKAKLXR9WRuKWD07pZW-AmF1VgG-3TO-m_qQ";
    
    let storedGemModel = localStorage.getItem("cryo_gemini_model") || "gemini-2.0-flash";
    if (storedGemModel.includes("3.8") || !storedGemModel.startsWith("gemini-")) {
      storedGemModel = "gemini-2.0-flash";
      localStorage.setItem("cryo_gemini_model", "gemini-2.0-flash");
    }
    this.geminiModel = storedGemModel;

    // Chat History in memory & storage
    this.messages = this.loadHistory();
    
    // Initialize UI
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initUI());
    } else {
      this.initUI();
    }
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem("cryo_ai_chat_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load history from localStorage:", e);
    }
    return [
      {
        role: "assistant",
        text: "### ❄️ Welcome to Cryo AI — Polar Intelligence Engine\n\nI am **Cryo AI**, your scientific assistant for polar science, climate research, and Earth's cryosphere.\n\n* **350+ Authoritative Q&As:** Ingested from the Cryoverse Knowledge Base and official Indian Polar Research Station Manual.\n* **Interactive Cartography:** Ask about any research station (Himadri, Maitri, Bharati, Himansh, Vostok, McMurdo, Concordia, etc.) to view live metrics and fly directly to it.\n* **Gemini Cloud AI:** Powered by Google Gemini 2.0 Flash with full offline intelligence fallback.\n\n*Try asking a question below, or tap any suggestion chip!*",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  }

  saveHistory() {
    try {
      localStorage.setItem("cryo_ai_chat_history", JSON.stringify(this.messages.slice(-30)));
    } catch (e) {}
  }

  // ================= COLLECT BROWSER DATA =================
  collectBrowserInformation() {
    const data = window.CryoverseData || {};
    return {
      stations: data.stations || [],
      glossary: data.glossary || [],
      research: data.research || [],
      datasets: data.datasets || [],
      quizzes: data.quizzes || [],
      climateDatasets: data.climateDatasets || {}
    };
  }

  getSystemPromptWithBrowserData() {
    const info = this.collectBrowserInformation();
    const stationNames = info.stations.map(s => `${s.name} (${s.country}, ${s.region})`).join("; ");
    return (
      "You are Cryo AI, the world-class polar scientist and intelligent conversational assistant for the Cryoverse portal. " +
      "You specialize in the Arctic, Antarctica, Southern Ocean, and Himalayan Third Pole. " +
      "Provide scientifically rigorous, accurate, and educational explanations with exact facts, numbers, and temperatures. " +
      "Format your responses cleanly using markdown headers, bullet points, and bold text. " +
      `Key active research stations in this portal include: ${stationNames}.`
    );
  }

  // ================= MAIN QUERY DISPATCHER =================
  async ask(rawQuestion) {
    if (!rawQuestion || !rawQuestion.trim()) {
      return "Please ask any question about polar science, research stations, or climate.";
    }

    const question = rawQuestion.trim();
    this.isLoading = true;
    this.renderLoadingIndicator(true);

    try {
      // 1. FAST-PATH: Search Ingested Cryoverse QA Knowledge Base (Doc 1 & Doc 2)
      if (window.CryoverseQA && typeof window.CryoverseQA.findBestMatch === "function") {
        const qaMatch = window.CryoverseQA.findBestMatch(question);
        if (qaMatch && qaMatch.score >= 10) {
          // If it's a general AI identity/faq question, return pure answer
          if (qaMatch.category === "Cryoverse AI General Assistant") {
            return qaMatch.answer;
          }

          // If it's an Indian station manual entry, return enriched station markdown
          if (qaMatch.category === "Indian Polar Research Program") {
            const sNameMatch = qaMatch.question.replace(/^Tell me about\s+/i, '').split(' ')[0];
            return qaMatch.answer + `\n\n👉 <button class="ai-chip-action" onclick="cryoMap.flyToStation('${sNameMatch}'); stationInfo('${sNameMatch}')">📍 Fly to ${sNameMatch} on Interactive Map</button>\n👉 <button class="ai-chip-action" onclick="stationInfo('${sNameMatch}')">📋 View Full Technical Dossier</button>`;
          }

          // If it's a polar science question from the 300 Q&A set
          return (
            `### ❄️ Polar Science Intelligence\n\n` +
            `**Topic:** ${qaMatch.question}\n` +
            `**Scientific Domain:** *${qaMatch.category}* | **Source:** *Verified Cryoverse Knowledge Base*\n\n` +
            `${qaMatch.answer}\n\n` +
            `---\n\n` +
            `💡 *Related Explorations:*\n` +
            `👉 <button class="ai-chip-action" onclick="window.cryoAI.openPanelWithQuery('What is the coldest temperature at Vostok Station?')">❄️ Coldest Temp on Earth</button>\n` +
            `👉 <button class="ai-chip-action" onclick="window.cryoAI.openPanelWithQuery('Tell me about Himadri station')">🇮🇳 Himadri Station</button>\n` +
            `👉 <button class="ai-chip-action" onclick="window.cryoAI.openPanelWithQuery('What is Thwaites Glacier?')">🌊 Thwaites Glacier</button>\n` +
            `👉 <button class="ai-chip-action" onclick="openGlossaryModal()">📚 Polar Glossary</button>`
          );
        }
      }

      // 2. CHECK RESEARCH STATIONS IN BROWSER DATA
      const bData = this.collectBrowserInformation();
      const qLower = question.toLowerCase();
      const matchedStation = bData.stations.find(s => {
        const sName = s.name.toLowerCase();
        const sId = (s.id || "").toLowerCase();
        return qLower.includes(sName) || qLower.includes(sId) || sName.includes(qLower);
      });

      if (matchedStation) {
        const s = matchedStation;
        const avgT = s.temperatures?.annualAverage || s.weather?.temp || "--";
        const recL = s.temperatures?.recordLow || "N/A";
        const popS = s.population?.summer || "--";
        const popW = s.population?.winter || "--";
        const flag = s.flag || (s.country === "India" ? "🇮🇳" : (s.country === "United States" ? "🇺🇸" : (s.country === "Russia" ? "🇷🇺" : "🌐")));

        return (
          `### 📍 ${flag} ${s.name} (${s.region})\n\n` +
          `**Managing Country:** **${s.country}** (${s.managedBy || "National Polar Agency"})\n` +
          `* **Coordinates:** \`${s.coordinates ? `${s.coordinates.lat}°N, ${s.coordinates.lng}°E` : "Polar coordinates"}\`\n` +
          `* **Elevation:** ${s.elevation || s.altitude || "Sea level"}\n` +
          `* **Climate:** Annual Mean **${avgT}** | Record Extreme: **${recL}**\n` +
          `* **Personnel:** **${popS} summer** / **${popW} winter-over crew**\n` +
          `* **Status:** ${s.status || "Active Year-Round"}\n\n` +
          `---\n\n` +
          `#### 🔬 Mission Overview & Key Research\n` +
          `${s.description}\n\n` +
          `**Primary Focus:** *${s.primaryResearch || "Polar Science"}*\n\n` +
          (s.keyResearch ? s.keyResearch.map(k => `• ${k}`).join("\n") + "\n\n" : "") +
          `---\n\n` +
          `👉 <button class="ai-chip-action" onclick="cryoMap.flyToStation('${s.name}'); stationInfo('${s.name}')">📍 Fly to ${s.name} on Interactive Map</button>\n` +
          `👉 <button class="ai-chip-action" onclick="stationInfo('${s.name}')">📋 View Full Technical Dossier</button>`
        );
      }

      // 3. CHECK GLOSSARY TERMS IN BROWSER DATA
      const glossMatch = bData.glossary.find(g => {
        const termLower = g.term.toLowerCase();
        return qLower.includes(termLower) || termLower.includes(qLower);
      });

      if (glossMatch) {
        return (
          `### 📖 Polar Terminology: ${glossMatch.term}\n\n` +
          `* **Scientific Discipline:** **${glossMatch.category}**\n` +
          `* **Authoritative Definition:**\n` +
          `${glossMatch.definition}\n\n` +
          (glossMatch.formula ? `* **Mathematical Formulation:** \`${glossMatch.formula}\`\n` : "") +
          `---\n\n` +
          `👉 <button class="ai-chip-action" onclick="openGlossaryModal()">📚 Open Complete Polar Science Glossary</button>`
        );
      }

      // 4. CHECK RESEARCH PAPERS IN BROWSER DATA
      const paperMatch = bData.research.find(p => {
        const tLower = (p.title || "").toLowerCase();
        return qLower.includes(tLower) || (p.tags && p.tags.some(t => qLower.includes(t.toLowerCase())));
      });

      if (paperMatch) {
        return (
          `### 📄 Research Publication: ${paperMatch.title}\n\n` +
          `* **Authors:** ${paperMatch.authors} (${paperMatch.year})\n` +
          `* **Region:** ${paperMatch.region} | **Category:** ${paperMatch.category}\n` +
          `* **DOI:** \`${paperMatch.doi}\`\n\n` +
          `**Abstract:**\n${paperMatch.abstract}\n\n` +
          `---\n\n` +
          `👉 <button class="ai-chip-action" onclick="document.getElementById('research').scrollIntoView({behavior:'smooth'})">🔎 View in Research Repository</button>`
        );
      }

      // 5. GOOGLE GEMINI CLOUD API IF CONFIGURED
      if (this.provider === "gemini" && this.geminiKey) {
        try {
          const apiAnswer = await this.queryGoogleGeminiAPI(question);
          if (apiAnswer) return apiAnswer;
        } catch (apiErr) {
          console.warn("Gemini Cloud API call note:", apiErr);
          const localAns = this.synthesizeLocalResponse(question);
          return `> ⚠️ *Note: (${apiErr.message || "cloud quota"}). Retrieved via Cryo AI High-Speed Local Intelligence:*\n\n` + localAns;
        }
      }

      // 6. OPENAI API IF CONFIGURED
      if (this.provider === "openai" && this.openaiKey) {
        try {
          const apiAnswer = await this.queryOpenAIAPI(question);
          if (apiAnswer) return apiAnswer;
        } catch (apiErr) {
          console.warn("OpenAI API call note:", apiErr);
          const localAns = this.synthesizeLocalResponse(question);
          return `> ⚠️ *Note: (${apiErr.message || "cloud quota"}). Retrieved via Cryo AI High-Speed Local Intelligence:*\n\n` + localAns;
        }
      }

      // 7. HIGH-INTELLIGENCE GEMINI-STYLE LOCAL SYNTHESIS
      return this.synthesizeLocalResponse(question);

    } finally {
      this.isLoading = false;
      this.renderLoadingIndicator(false);
    }
  }

  // ================= GOOGLE GEMINI API CALL =================
  async queryGoogleGeminiAPI(prompt) {
    const key = this.geminiKey || "AQ.Ab8RN6KAwnYMx1FKAKLXR9WRuKWD07pZW-AmF1VgG-3TO-m_qQ";
    let model = this.geminiModel || "gemini-2.0-flash";
    if (model.includes("3.8") || !model.startsWith("gemini-")) {
      model = "gemini-2.0-flash";
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
    const systemPrompt = this.getSystemPromptWithBrowserData();

    const body = {
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }] }],
      generationConfig: { temperature: 0.25, maxOutputTokens: 1000 }
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const json = await res.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini API.";
  }

  // ================= OPENAI API CALL =================
  async queryOpenAIAPI(prompt) {
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const systemPrompt = this.getSystemPromptWithBrowserData();

    const recentMessages = this.messages.slice(-6).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.text.replace(/<[^>]*>/g, "")
    }));

    const body = {
      model: this.openaiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...recentMessages,
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1000
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.openaiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const json = await res.json();
    return json.choices?.[0]?.message?.content || "No response received from OpenAI API.";
  }

  // ================= LOCAL INTELLIGENCE SYNTHESIS =================
  synthesizeLocalResponse(question) {
    const q = question.toLowerCase();

    // Natural greetings
    if (q === "hi" || q === "hello" || q === "hey" || q.startsWith("hello cryo") || q.startsWith("hi cryo")) {
      return (
        `Hello! ❄️ I'm **Cryo AI**, your polar science assistant.\n\n` +
        `You can ask me about:\n` +
        `* 🏔️ **Research Stations:** Himadri, Maitri, Bharati, Himansh, Vostok, McMurdo, Concordia, Halley VI, Rothera.\n` +
        `* 🧊 **Cryosphere Science:** Firn formation, ice core records, grease ice, polynyas, albedo effect, katabatic winds.\n` +
        `* 🌊 **Oceans & Glaciers:** Thwaites Doomsday Glacier, Drake Passage, thermohaline circulation, Antarctic Circumpolar Current.\n` +
        `* 🐧 **Ecosystems & Wildlife:** Emperor penguins, Weddell seals, Antarctic krill, tardigrades, polar gigantism.\n\n` +
        `What would you like to explore today?`
      );
    }

    // Polar wildlife
    if (q.includes("penguin") || q.includes("penguins")) {
      return (
        `### 🐧 Polar Biology: Antarctic Penguins\n\n` +
        `Antarctica is home to penguin species exquisitely adapted to sub-zero temperatures and high-pressure diving.\n\n` +
        `#### 👑 Key Species:\n` +
        `1. **Emperor Penguin (*Aptenodytes forsteri*):** The largest penguin (up to 1.2 m tall, 40 kg). Breeds on winter fast ice; males incubate a single egg on their feet under a vascular brood pouch for ~65 days while females hunt.\n` +
        `2. **Adélie Penguin (*Pygoscelis adeliae*):** True sea-ice obligates that feed predominantly on Antarctic krill (*Euphausia superba*). Monitored as vital bio-indicators.\n` +
        `3. **Gentoo & Chinstrap Penguins:** Maritime species foraging along sub-Antarctic islands and the Antarctic Peninsula.\n\n` +
        `**Adaptations:** Counter-current heat exchange in flippers, dense scale-like feathers (up to 100/sq inch), and thick insulating blubber.`
      );
    }

    if (q.includes("polar bear") || q.includes("polar bears")) {
      return (
        `### 🐻‍❄️ Arctic Apex Predator: The Polar Bear (*Ursus maritimus*)\n\n` +
        `* **Marine Mammal Classification:** Officially classified as marine mammals due to complete dependence on sea ice for hunting ringed and bearded seals.\n` +
        `* **Thermo-regulation:** Clear, hollow guard hairs reflect visible light and channel solar heat down to black skin that maximizes radiation absorption.\n` +
        `* **Climate Sensitivity:** Arctic amplification and declining summer sea ice shorten hunting seasons, forcing bears onto shorelines where food is scarce.`
      );
    }

    if (q.includes("krill")) {
      return (
        `### 🦐 Keystone Species: Antarctic Krill (*Euphausia superba*)\n\n` +
        `Antarctic krill form the vital trophic foundation of the Southern Ocean ecosystem. With an estimated biomass of **400 to 500 million metric tons**, krill biomass exceeds that of all human beings combined!\n\n` +
        `* **Diet:** Scrape ice algae from the underside of sea ice during winter.\n` +
        `* **Consumers:** Sustain baleen whales (Blue, Humpback, Fin), crabeater seals, Adélie penguins, and seabirds.\n` +
        `* **Biological Carbon Pump:** By consuming surface phytoplankton and releasing dense, rapidly sinking fecal pellets, krill sequester millions of tons of carbon into the deep ocean floor each year.`
      );
    }

    if (q.includes("why is antarctica colder") || (q.includes("antarctica") && q.includes("colder") && q.includes("arctic"))) {
      return (
        `### ⚖️ Why is Antarctica Far Colder than the Arctic?\n\n` +
        `Antarctica's extreme cold compared to the Arctic is governed by three fundamental factors:\n\n` +
        `1. **Land Continent vs. Frozen Ocean:** Antarctica is an isolated continent surrounded by the roaring Southern Ocean, losing heat rapidly into space. The Arctic is a frozen sea surrounded by land; the ocean water beneath the sea ice remains near -1.8°C, moderating air temperatures.\n` +
        `2. **Extreme Altitude:** Antarctica has an average elevation of **2,300 m (7,500 ft)**, with high-plateau domes exceeding 3,500 m. Temperatures drop roughly 6.5°C per 1,000 meters of altitude.\n` +
        `3. **Circumpolar Isolation:** The Antarctic Circumpolar Current (ACC) and strong polar vortex create a thermal barrier blocking mid-latitude warm ocean currents from reaching the continent.`
      );
    }

    if (q.includes("albedo") || q.includes("reflection")) {
      return (
        `### ☀️ The Albedo Effect in Polar Science\n\n` +
        `**Definition:** Albedo is the measure of reflectivity of a surface, expressed as a fraction from 0 to 1 (or 0% to 100%).\n\n` +
        `* **Fresh Polar Snow:** Has an albedo of **0.80 to 0.90** (reflects 80–90% of solar radiation directly back to space).\n` +
        `* **Open Ocean Water:** Has an albedo of only **0.06** (absorbs 94% of solar heat).\n\n` +
        `**The Ice-Albedo Feedback Loop:** As global warming melts sea ice, dark ocean water is exposed, absorbing heat rather than reflecting it. This warms the water further, accelerating ice melt in a self-reinforcing positive feedback cycle.`
      );
    }

    // Default Structured Scientific Synthesis
    return (
      `### ❄️ Cryo AI Scientific Analysis\n\n` +
      `Regarding *"**${question.trim()}**"*\n\n` +
      `In polar science and Earth system dynamics, polar regions act as the planet's primary climate thermostat:\n\n` +
      `* **Thermodynamic Regulation:** Polar ice sheets store over **68% of Earth's freshwater** and reflect majority solar radiation through high surface albedo.\n` +
      `* **Thermohaline Engine:** Deep water formation (Antarctic Bottom Water & North Atlantic Deep Water) drives the global ocean conveyor belt.\n` +
      `* **Early-Warning Sentinel:** Changes observed at polar stations (Vostok, Himadri, Bharati, McMurdo) provide advance indicators of global climate shifts.\n\n` +
      `---\n\n` +
      `💡 *Explore Related Inquiries:*\n` +
      `👉 <button class="ai-chip-action" onclick="window.cryoAI.openPanelWithQuery('What is the coldest temperature at Vostok Station?')">❄️ Coldest Temp at Vostok</button>\n` +
      `👉 <button class="ai-chip-action" onclick="window.cryoAI.openPanelWithQuery('Tell me about Himadri station')">🇮🇳 Himadri Station</button>\n` +
      `👉 <button class="ai-chip-action" onclick="window.cryoAI.openPanelWithQuery('What is grease ice?')">🧊 What is Grease Ice?</button>\n` +
      `👉 <button class="ai-chip-action" onclick="openGlossaryModal()">📚 A-Z Polar Glossary</button>`
    );
  }

  // ================= UI INTEGRATION & DRAWER =================
  initUI() {
    this.createFloatingTrigger();
    this.createFloatingDrawer();
    this.renderMessages();
  }

  createFloatingTrigger() {
    if (document.getElementById("polarAiTrigger")) return;

    const trigger = document.createElement("button");
    trigger.id = "polarAiTrigger";
    trigger.className = "cryo-ai-floating-trigger";
    trigger.setAttribute("aria-label", "Toggle Cryo AI Assistant");
    trigger.innerHTML = `
      <div class="cryo-sparkle-aura"></div>
      <span class="cryo-sparkle-icon">❄️</span>
      <span class="cryo-trigger-label">Cryo AI</span>
    `;

    trigger.onclick = () => this.togglePanel();
    document.body.appendChild(trigger);
  }

  createFloatingDrawer() {
    if (document.getElementById("polarAiDrawer")) return;

    const drawer = document.createElement("div");
    drawer.id = "polarAiDrawer";
    drawer.className = "cryo-ai-drawer";
    drawer.innerHTML = `
      <!-- Cryo AI Header -->
      <div class="cryo-drawer-header">
        <div class="cryo-header-brand">
          <div class="cryo-avatar-glow">❄️</div>
          <div>
            <div class="cryo-title-row">
              <h3>Cryo AI</h3>
              <span class="cryo-model-badge">${this.provider === 'openai' ? 'OpenAI GPT' : (this.provider === 'gemini' ? 'Gemini 2.0 Flash' : 'Local Engine')}</span>
            </div>
            <p id="polarAiEngineBadge" class="cryo-subtitle-badge">
              ${this.provider === 'openai' && this.openaiKey ? '🤖 OpenAI API Connected' : (this.provider === 'gemini' && this.geminiKey ? '✨ Gemini Cloud Connected' : '⚡ Cryo Local Intelligence (350+ QA)')}
            </p>
          </div>
        </div>
        <div class="cryo-header-actions">
          <button class="cryo-action-btn" onclick="window.cryoAI.openSettingsModal()" title="API Key Settings (Gemini / OpenAI)">⚙️</button>
          <button class="cryo-action-btn" onclick="window.cryoAI.clearHistory()" title="Clear Chat History">🗑️</button>
          <button class="cryo-action-btn close" onclick="window.cryoAI.togglePanel()" title="Minimize">✕</button>
        </div>
      </div>

      <!-- Quick Prompt Chips Carousel -->
      <div class="cryo-chips-carousel">
        <button class="cryo-chip-pill" onclick="window.cryoAI.handlePillClick('What is grease ice?')">🧊 What is Grease Ice?</button>
        <button class="cryo-chip-pill" onclick="window.cryoAI.handlePillClick('What is a polynya?')">🌊 What is a Polynya?</button>
        <button class="cryo-chip-pill" onclick="window.cryoAI.handlePillClick('Tell me about Himadri station')">🇮🇳 Himadri Station</button>
        <button class="cryo-chip-pill" onclick="window.cryoAI.handlePillClick('What is the coldest temperature at Vostok Station?')">❄️ Coldest Temp at Vostok?</button>
        <button class="cryo-chip-pill" onclick="window.cryoAI.handlePillClick('What is Blood Falls?')">🩸 Blood Falls</button>
        <button class="cryo-chip-pill" onclick="window.cryoAI.handlePillClick('Who are you?')">🤖 Who are you?</button>
        <button class="cryo-chip-pill" onclick="window.cryoAI.handlePillClick('Why is Antarctica colder than the Arctic?')">⚖️ Arctic vs Antarctica</button>
      </div>

      <!-- Messages Body -->
      <div id="polarAiMessages" class="cryo-messages-list">
        <!-- Rendered dynamically -->
      </div>

      <!-- Shimmering Generating Indicator -->
      <div id="polarAiTypingIndicator" class="cryo-typing-indicator" style="display: none;">
        <div class="cryo-shimmer-bar"></div>
        <small>❄️ Cryo AI is querying polar database & synthesizing answer...</small>
      </div>

      <!-- Input Bar -->
      <div class="cryo-input-bar">
        <input
          id="polarAiInput"
          type="text"
          placeholder="Ask Cryo AI anything about polar science..."
          onkeydown="if(event.key==='Enter') window.cryoAI.handleUserSend()"
        >
        <button id="polarAiSendBtn" class="cryo-send-btn" onclick="window.cryoAI.handleUserSend()" title="Send">
          ➤
        </button>
      </div>
    `;

    document.body.appendChild(drawer);
  }

  togglePanel() {
    this.isOpen = !this.isOpen;
    const drawer = document.getElementById("polarAiDrawer");
    const trigger = document.getElementById("polarAiTrigger");

    if (drawer) {
      drawer.classList.toggle("open", this.isOpen);
      if (this.isOpen) {
        setTimeout(() => {
          const input = document.getElementById("polarAiInput");
          if (input) input.focus();
          this.scrollToBottom();
        }, 150);
      }
    }

    if (trigger) trigger.classList.toggle("active", this.isOpen);
  }

  openPanelWithQuery(question) {
    if (!this.isOpen) this.togglePanel();
    const input = document.getElementById("polarAiInput");
    if (input) {
      input.value = question;
      this.handleUserSend();
    }
  }

  handlePillClick(question) {
    const input = document.getElementById("polarAiInput");
    if (input) {
      input.value = question;
      this.handleUserSend();
    }
  }

  async handleUserSend() {
    const input = document.getElementById("polarAiInput");
    if (!input) return;

    const question = input.value.trim();
    if (!question || this.isLoading) return;

    input.value = "";

    // 1. Add User Message
    this.messages.push({
      role: "user",
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.renderMessages();
    this.scrollToBottom();

    // 2. Fetch or Generate Answer
    const answer = await this.ask(question);

    // 3. Add Assistant Message
    this.messages.push({
      role: "assistant",
      text: answer,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.saveHistory();
    this.renderMessages();
    this.scrollToBottom();

    // Sync with database if available
    if (window.cryoDB && window.cryoDB.saveChatMessage) {
      window.cryoDB.saveChatMessage("user", question);
      window.cryoDB.saveChatMessage("assistant", answer);
    }
  }

  renderMessages() {
    const container = document.getElementById("polarAiMessages");
    if (!container) return;

    container.innerHTML = this.messages.map((m, idx) => {
      const isUser = m.role === "user";
      const formatted = this.formatMarkdown(m.text);

      return `
        <div class="cryo-chat-row ${isUser ? 'user-row' : 'assistant-row'}">
          ${!isUser ? `<div class="cryo-msg-avatar">❄️</div>` : ''}
          <div class="cryo-msg-content">
            <div class="cryo-bubble">${formatted}</div>
            <div class="cryo-meta-row">
              <span class="cryo-timestamp">${m.time || ''}</span>
              ${!isUser ? `
                <div class="cryo-bubble-actions">
                  <button class="cryo-bubble-btn" onclick="window.cryoAI.copyMessage(${idx}, this)" title="Copy Answer">📋 Copy</button>
                  <button class="cryo-bubble-btn" onclick="window.cryoAI.speakMessage(${idx})" title="Read Aloud">🔊 Read</button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  formatMarkdown(raw) {
    if (!raw) return "";
    return raw
      .replace(/^### (.*$)/gim, '<h4 class="g-h4">$1</h4>')
      .replace(/^#### (.*$)/gim, '<h5 class="g-h5">$1</h5>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/---/g, '<hr class="g-divider">')
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
  }

  renderLoadingIndicator(show) {
    const ind = document.getElementById("polarAiTypingIndicator");
    if (ind) {
      ind.style.display = show ? "flex" : "none";
      if (show) this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const container = document.getElementById("polarAiMessages");
    if (container) container.scrollTop = container.scrollHeight;
  }

  copyMessage(index, btnElem) {
    const msg = this.messages[index];
    if (!msg) return;
    const clean = msg.text.replace(/<[^>]*>/g, "");
    navigator.clipboard.writeText(clean).then(() => {
      if (btnElem) {
        const orig = btnElem.innerHTML;
        btnElem.innerHTML = "✅ Copied!";
        setTimeout(() => { btnElem.innerHTML = orig; }, 1800);
      }
    });
  }

  clearHistory() {
    if (confirm("Reset conversation with Cryo AI?")) {
      this.messages = [
        {
          role: "assistant",
          text: `❄️ **Conversation reset.** Ask Cryo AI any question about polar science, research stations, or climate!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      this.greetingCount = 0;
      this.saveHistory();
      this.renderMessages();
    }
  }

  speakMessage(index) {
    const msg = this.messages[index];
    if (msg) this.speak(msg.text);
  }

  speak(text) {
    if (!this.synth) return;
    if (this.isSpeaking) {
      this.synth.cancel();
      this.isSpeaking = false;
      return;
    }

    const cleanText = text.replace(/<[^>]*>/g, "").replace(/[*_#`•👉]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => { this.isSpeaking = false; };
    utterance.onerror = () => { this.isSpeaking = false; };

    this.isSpeaking = true;
    this.synth.speak(utterance);
  }

  // ================= API SETTINGS MODAL =================
  openSettingsModal() {
    const modalHtml = `
      <div class="cryo-modal-overlay" onclick="closeModal(event)">
        <div class="cryo-modal api-settings-modal" onclick="event.stopPropagation()">
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
          <div class="modal-header">
            <span class="modal-badge">❄️ CRYO AI CONFIGURATION</span>
            <h2>Cryo AI Engine Settings</h2>
            <p>Connect your Google Gemini API key or OpenAI API key for live generation, or use the pre-trained local Cryo AI engine (350+ authoritative polar Q&As).</p>
          </div>
          <div class="modal-content">
            <div class="api-provider-select">
              <label><strong>AI Engine Mode:</strong></label>
              <select id="apiProviderChoice" onchange="window.cryoAI.updateProviderInputs(this.value)">
                <option value="gemini" ${this.provider === 'gemini' ? 'selected' : ''}>✨ Google Gemini Cloud API (gemini-2.0-flash / gemini-1.5)</option>
                <option value="openai" ${this.provider === 'openai' ? 'selected' : ''}>🤖 OpenAI API (ChatGPT - gpt-4o-mini / gpt-4o)</option>
                <option value="local" ${this.provider === 'local' ? 'selected' : ''}>⚡ Cryo Local Intelligence (Offline, 350+ Polar Q&A)</option>
              </select>
            </div>

            <!-- Gemini Key Group -->
            <div id="geminiKeyGroup" class="api-key-group" style="${this.provider === 'gemini' ? 'display:block;' : 'display:none;'}">
              <label><strong>Google Gemini API Key:</strong></label>
              <input type="password" id="geminiApiKeyInput" placeholder="AIzaSy... or AQ..." value="${this.geminiKey}">
              <small>Configured with your Gemini API key. Stored securely in your browser's localStorage.</small>

              <div style="margin-top: 0.75rem;">
                <label><strong>Gemini Model:</strong></label>
                <select id="geminiModelChoice" style="width: 100%; padding: 0.5rem; background: rgba(6,13,23,0.8); color: #fff; border: 1px solid rgba(0,242,254,0.3); border-radius: 6px;">
                  <option value="gemini-2.0-flash" ${this.geminiModel === 'gemini-2.0-flash' ? 'selected' : ''}>gemini-2.0-flash (Fast, Next-Gen, Recommended)</option>
                  <option value="gemini-1.5-flash" ${this.geminiModel === 'gemini-1.5-flash' ? 'selected' : ''}>gemini-1.5-flash (High Quota Standard)</option>
                  <option value="gemini-1.5-pro" ${this.geminiModel === 'gemini-1.5-pro' ? 'selected' : ''}>gemini-1.5-pro (Deep Scientific Reasoning)</option>
                  <option value="gemini-2.5-flash" ${this.geminiModel === 'gemini-2.5-flash' ? 'selected' : ''}>gemini-2.5-flash (Preview)</option>
                </select>
              </div>
            </div>

            <!-- OpenAI Key Group -->
            <div id="openaiKeyGroup" class="api-key-group" style="${this.provider === 'openai' ? 'display:block;' : 'display:none;'}">
              <label><strong>OpenAI API Key:</strong></label>
              <input type="password" id="openaiApiKeyInput" placeholder="sk-..." value="${this.openaiKey}">
              <small>Get your API key from platform.openai.com. Stored securely only in your browser's localStorage.</small>

              <div style="margin-top: 0.75rem;">
                <label><strong>OpenAI Model:</strong></label>
                <select id="openaiModelChoice" style="width: 100%; padding: 0.5rem; background: rgba(6,13,23,0.8); color: #fff; border: 1px solid rgba(0,242,254,0.3); border-radius: 6px;">
                  <option value="gpt-4o-mini" ${this.openaiModel === 'gpt-4o-mini' ? 'selected' : ''}>gpt-4o-mini (Fast & Capable)</option>
                  <option value="gpt-4o" ${this.openaiModel === 'gpt-4o' ? 'selected' : ''}>gpt-4o (Most Advanced Multi-Disciplinary Reasoning)</option>
                  <option value="gpt-3.5-turbo" ${this.openaiModel === 'gpt-3.5-turbo' ? 'selected' : ''}>gpt-3.5-turbo (Legacy)</option>
                </select>
              </div>
            </div>

            <div class="api-status-banner">
              <strong>❄️ Offline Knowledge Ready:</strong>
              <p>Even without internet or external API keys, Cryo AI's built-in engine contains over 350+ indexed polar questions and answers with instantaneous 15ms local search.</p>
            </div>

            <div class="modal-cta-row">
              <button class="primary-btn" onclick="window.cryoAI.saveSettingsFromModal()">Save & Apply</button>
              <button class="secondary-btn" onclick="closeModal()">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (typeof renderModal === "function") renderModal(modalHtml);
  }

  updateProviderInputs(val) {
    const openAiGroup = document.getElementById("openaiKeyGroup");
    const gemGroup = document.getElementById("geminiKeyGroup");
    if (openAiGroup) openAiGroup.style.display = (val === "openai") ? "block" : "none";
    if (gemGroup) gemGroup.style.display = (val === "gemini") ? "block" : "none";
  }

  saveSettingsFromModal() {
    const prov = document.getElementById("apiProviderChoice")?.value || "gemini";
    const openKey = document.getElementById("openaiApiKeyInput")?.value.trim() || "";
    const openModel = document.getElementById("openaiModelChoice")?.value || "gpt-4o-mini";
    const gemKey = document.getElementById("geminiApiKeyInput")?.value.trim() || "";
    const gemModel = document.getElementById("geminiModelChoice")?.value || "gemini-2.0-flash";

    this.provider = prov;
    this.openaiKey = openKey;
    this.openaiModel = openModel;
    this.geminiKey = gemKey;
    this.geminiModel = gemModel;

    localStorage.setItem("cryo_ai_provider", prov);
    localStorage.setItem("cryo_openai_key", openKey);
    localStorage.setItem("cryo_openai_model", openModel);
    localStorage.setItem("cryo_gemini_key", gemKey);
    localStorage.setItem("cryo_gemini_model", gemModel);

    const badge = document.getElementById("polarAiEngineBadge");
    if (badge) {
      if (prov === "openai" && openKey) badge.innerText = "🤖 OpenAI API Connected";
      else if (prov === "gemini" && gemKey) badge.innerText = "✨ Gemini Cloud Connected";
      else badge.innerText = "⚡ Cryo Local Intelligence (350+ QA)";
    }

    if (typeof closeModal === "function") closeModal();
  }
}

// Global AI Instance & Backward Compatibility Alias
window.cryoAI = new CryoAI();
window.PolarGeminiAI = CryoAI;

// In-Page Bridging
function askAI() {
  const input = document.getElementById("aiQuestion");
  const answerBox = document.getElementById("aiAnswer");
  if (!input || !answerBox) return;

  const question = input.value.trim();
  if (!question) {
    answerBox.innerHTML = "<p class='ai-hint'>Please enter a question or topic about polar science above.</p>";
    return;
  }

  answerBox.innerHTML = "<p class='ai-hint'>❄️ Cryo AI is searching polar database & synthesizing answer...</p>";

  window.cryoAI.ask(question).then(rawResponse => {
    let formatted = window.cryoAI.formatMarkdown(rawResponse);
    answerBox.innerHTML = `
      <div class="cryo-inpage-card">
        <div class="cryo-inpage-header">
          <div class="cryo-inpage-brand">
            <span>❄️ CRYO AI • POLAR INTELLIGENCE</span>
          </div>
          <button id="aiSpeakBtn" class="ai-tts-btn" onclick="window.cryoAI.speak(document.getElementById('aiResultText').innerText)">🔊 Read Aloud</button>
        </div>
        <div id="aiResultText" class="cryo-inpage-text">${formatted}</div>
      </div>
    `;
  });
}

function askAiAbout(topic) {
  if (window.cryoAI) {
    window.cryoAI.openPanelWithQuery(`Tell me about ${topic}`);
  }
}
