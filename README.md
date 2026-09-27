# ❄️ Cryoverse — Polar Science & Knowledge Portal

An advanced, comprehensive, interactive polar science web platform designed for students, educators, researchers, and the curious public. Cryoverse brings together dual-pole satellite cartography of major international and Indian research stations, peer-reviewed scientific publications, interactive time-series datasets, an Ice-Albedo simulator, 3D flip flashcards, an A-Z Polar Science Glossary, classroom lab protocols, and **Cryo AI**—an intelligent Polar Science Assistant with OpenAI API & Google Gemini API readiness.

---

## 🌟 Comprehensive Resource Suite

### 1. 🗺️ Interactive Dual-Pole Cartography & Station Challenge
- **Dual-Pole Cartography:** Real Earth high-resolution satellite imagery (Esri), Deep Ocean & Bathymetric layer, and OpenStreetMap cartography.
- **Background Styling:** Dark polar theme (`#0a1128`), subtle concentric ice-contour grid lines, and glassmorphic overlays.
- **Major International & Indian Polar Research Stations:**
  - **Vostok Station** (Russia, East Antarctica — site of the world-record coldest temperature: **-89.2°C**, directly above subglacial Lake Vostok)
  - **McMurdo Station** (USA, Ross Island — largest polar research community, 1,000+ summer personnel)
  - **Amundsen-Scott South Pole Station** (USA, Geographic South Pole 90°S — IceCube Neutrino Observatory & South Pole Telescope)
  - **Concordia Station** (France / Italy / ESA, Dome C — 800,000-year EPICA ice core & Mars isolation analogues)
  - **Svalbard Science Centre & Ny-Ålesund** (Norway / Multi-national — northernmost permanent research village, 20 km radio-silent zone)
  - **Rothera Research Station** (UK - BAS, Adelaide Island — marine biology & Bonner Laboratory dive facilities)
  - **Halley VI Research Station** (UK - BAS, Brunt Ice Shelf — relocatable hydraulic skis, discovery of the Antarctic Ozone Hole)
  - **Himadri Station** (India, Ny-Ålesund, Svalbard — premier Arctic station studying aerosol teleconnections to monsoons)
  - **Maitri Station** (India, Schirmacher Oasis — freshwater Lake Priyadarshini, year-round Antarctic habitat)
  - **Bharati Station** (India, Larsemann Hills — 134 modular shipping containers on stilts, ISRO satellite telemetry)
  - **Himansh Station** (India, Spiti Valley, Himalayas — high-altitude Third Pole sentinel at 13,500 ft / 4,080 m)
  - **IndARC Observatory** (India, Kongsfjorden — multi-sensor underwater mooring at 192 m depth)
  - **Summit Station** (USA, Greenland Ice Sheet apex — GISP2 deep ice cores at 3,216 m elevation)
  - **Princess Elisabeth** (Belgium, Queen Maud Land — world's first certified zero-emission polar research base)
  - **Dakshin Gangotri** (India's historic first permanent base, 1983–1990)
- **Station Map Quiz (8 Challenges):** Interactive challenge HUD testing station coordinates, historical records, and science domains with live `flyTo` camera zooms.
- **Discipline Filters:** Glaciology & Ice Cores, Astrophysics & Space, Climate & Warming, Marine Biology, and All Disciplines.

---

### 2. 🤖 Cryo AI — Polar Science Assistant (`ai.js`)
- **Conversational Intelligence:** Natural dialog manager capable of warm greetings (responds directly to "hi", "hello", "who are you", follow-ups, and repeat greetings), chit-chat, and natural multi-turn conversations without getting stuck.
- **Dynamic Browser Data Harvester:** Automatically gathers and indexes all stations, datasets, research papers, and glossary definitions from the live webpage so Cryo AI can answer any question about content on the portal.
- **OpenAI & Google Gemini API Integration:**
  - Full Google Gemini Cloud API support (`gemini-2.0-flash`, `gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-2.5-flash`) and OpenAI API support (`gpt-4o-mini`, `gpt-4o`) via the in-app Settings modal (⚙️).
  - Stored securely and privately in your browser's `localStorage`.
- **Pre-Trained 4,000+ Q&A Local Knowledge Base (Offline & Free):** Even without an external API key, Cryo AI answers over **4,000+ question and answer pathways** in under 15ms across polar stations, glaciology, ice cores, marine currents, auroras, treaties, and wildlife.
- **Answers Crucial Polar Science Queries:**
  - *"What is the coldest temperature recorded at Vostok Station?"* (-89.2°C on July 21, 1983).
  - *"How do ice cores store ancient atmospheric data?"* (Firn compaction, bubble pinch-off, hermetic sealing).
  - *"Why is Antarctica colder than the Arctic?"* (Continental elevation vs. ocean basin heat capacity).
  - *"Why is polar ice fresh water instead of salty?"* (Compacted snow and sea-ice brine rejection).
  - Detailed profiles of McMurdo, South Pole, Bharati, Himadri, Concordia, wildlife (Emperor penguins, polar bears, krill), and space weather auroras.
- **Speech Synthesis:** Built-in Web Speech API text-to-speech (🔊 Read Aloud button).

---

### 3. 📊 Dedicated Polar Datasets (`polar_data.json` & `data.js`)
- **Historical Ice-Core CO2 Record (800,000 BP to Present):** EPICA Dome C & Vostok Antarctic ice cores documenting pre-industrial baselines (180–280 ppm) through modern anthropocene levels (425+ ppm).
- **Polar Sea-Ice Extent Decadal Trends (1979–2024):** Satellite passive microwave data tracking the 12.2% per decade Arctic summer sea-ice loss and the 2023 Antarctic winter sea-ice record low.
- **Glacier Velocity & Calving Dynamics:** InSAR and GPS tracking of Jakobshavn Isbræ (45 m/day), Thwaites "Doomsday" Glacier, Pine Island Glacier, and Bara Shigri in the Himalayas.
- **Aurora Dynamics & Space Weather:** Solar wind velocities (400–850 km/s), interplanetary magnetic field Bz coupling, planetary Kp-index, and oxygen/nitrogen emission spectra (557.7 nm green, 630.0 nm red, 427.8 nm violet).
- **CSV Data Export:** One-click download of raw `.csv` data for researchers.

---

### 4. 🎓 Specialized Audience Portals
- **Student Explorer Portal:**
  - 3D interactive flip flashcards for 16 key polar concepts.
  - Interactive Ice-Albedo Lab Simulator.
  - General Polar Challenge Quiz (12 questions) with certificate rank awards.
  - One-click `.txt` study guide pack download.
- **Teacher Classroom Portal:**
  - 6 standards-aligned lesson plans & curricula.
  - Hands-on classroom lab protocols (Archimedes sea-ice melt, black carbon albedo, saline water density convection).
  - One-click `.txt` lesson guide export.
- **Scientist Research Hub:**
  - 20 peer-reviewed polar research papers with DOIs, citations, and abstracts.
  - Interactive Chart.js time-series graphs with live data toggle.
  - Raw numerical data export in `.csv` format.
  - Research registration form.
- **Public Explorer Portal:**
  - Polar fact generator with 25 verified scientific facts.
  - High-definition photo gallery with lightbox view.
  - Documentary video player featuring Antarctic and Arctic expeditions.

---

## 🚀 How to Run

Cryoverse is built on modern web standards (HTML5, CSS3, JavaScript ES6+, Leaflet.js, and Chart.js). **It runs immediately out-of-the-box in any web browser without build tools or package installations.**

### Option 1: Direct Double-Click
Simply double-click `index.html` in your file manager or open it in Google Chrome, Microsoft Edge, Firefox, or Brave.

### Option 2: Local HTTP Server (Optional)
```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve
```
Then open `http://localhost:8000`.

---

## 📁 Project Architecture

```
Cryoverse/
├── index.html          # Main HTML structure, dual-pole cartography, and Cryo AI interface
├── style.css           # Modern polar styling (#070d1e, #00f2fe, #4facfe), contours, and glassmorphism
├── data.js             # Authoritative polar science datasets, research papers, and stations
├── polar_data.json     # Dedicated JSON database of stations, climate datasets, and metadata
├── database.js         # In-memory synchronous database engine with IndexedDB persistence
├── map.js              # Leaflet.js dual-pole cartography, custom markers, and Station Quiz HUD
├── ai.js               # Cryo AI engine (conversational dialog, browser data harvester, OpenAI/Gemini APIs)
├── script.js           # UI Controller for portals, modals, Chart.js graphs, and CSV exports
└── README.md           # Documentation
```
