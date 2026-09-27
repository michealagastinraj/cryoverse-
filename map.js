/**
 * CRYOVERSE POLAR MAP & DUAL-POLE CARTOGRAPHY ENGINE
 * Interactive dual-pole (Arctic & Antarctic) map interface with Leaflet.js,
 * dark polar theme (#0a1128), ice-contour coordinate grid overlays,
 * research station pins across major global polar scientific stations,
 * and the Interactive Polar Station Challenge!
 */

class CryoverseMap {
  constructor(containerId = "mapContainer") {
    this.containerId = containerId;
    this.map = null;
    this.markers = {};
    this.currentTileLayer = null;
    this.tileLayers = {};
    this.stations = [];
    this.polarGridLayer = null;
    this.showPolarGrid = true;
    this.activeDomainFilter = "all";
    
    // Station Map Quiz State
    this.quizActive = false;
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizQuestions = this.getMapQuizData();
  }

  getMapQuizData() {
    return [
      {
        targetStation: "vostok",
        title: "Challenge 1: The Coldest Record on Earth",
        prompt: "Find the remote inland station where the world-record coldest surface air temperature (-89.2°C / -128.6°F) was recorded:",
        hint: "Located high on the East Antarctic Ice Sheet over subglacial Lake Vostok (78°28'S, 106°48'E).",
        options: [
          { name: "Vostok Station", stationId: "vostok", correct: true, label: "East Antarctic Ice Sheet (Russia)" },
          { name: "Amundsen-Scott", stationId: "amundsen-scott", correct: false, label: "South Pole (USA)" },
          { name: "Concordia", stationId: "concordia", correct: false, label: "Dome C (France/Italy)" }
        ],
        explanation: "Vostok Station recorded -89.2°C on July 21, 1983. It sits at 3,488m elevation directly over subglacial Lake Vostok, sealed beneath 3.7 km of ice."
      },
      {
        targetStation: "amundsen-scott",
        title: "Challenge 2: The South Pole Sentinel",
        prompt: "Locate the research station positioned precisely at Earth's Geographic South Pole (90°00'S) hosting the IceCube Neutrino Observatory:",
        hint: "Perched atop 2,850 meters of moving continental ice at the very bottom of the world.",
        options: [
          { name: "Amundsen-Scott", stationId: "amundsen-scott", correct: true, label: "Geographic South Pole (USA)" },
          { name: "McMurdo", stationId: "mcmurdo", correct: false, label: "Ross Island (USA)" },
          { name: "Halley VI", stationId: "halley-vi", correct: false, label: "Brunt Ice Shelf (UK)" }
        ],
        explanation: "Amundsen-Scott South Pole Station operates the IceCube Neutrino Observatory, utilizing a cubic kilometer of clear polar ice to detect cosmic neutrinos."
      },
      {
        targetStation: "mcmurdo",
        title: "Challenge 3: Polar Megacity",
        prompt: "Which station is Antarctica's largest scientific community, accommodating over 1,000 summer residents on Ross Island?",
        hint: "Located on volcanic rock at Hut Point Peninsula beside the Ross Ice Shelf (77°50'S).",
        options: [
          { name: "McMurdo Station", stationId: "mcmurdo", correct: true, label: "Ross Island (USA - USAP)" },
          { name: "Rothera", stationId: "rothera", correct: false, label: "Antarctic Peninsula (UK)" },
          { name: "Bharati", stationId: "bharati", correct: false, label: "Larsemann Hills (India)" }
        ],
        explanation: "McMurdo Station is the central logistics hub of the US Antarctic Program, featuring deep-water ice piers, airfields, and the Crary Science Lab."
      },
      {
        targetStation: "concordia",
        title: "Challenge 4: Mars on Earth & EPICA Core",
        prompt: "Find Concordia Station atop Dome C, celebrated for drilling the 800,000-year EPICA ice core and testing crew isolation for ESA Mars missions:",
        hint: "Inland East Antarctic Plateau at 3,233m elevation (75°06'S, 123°20'E).",
        options: [
          { name: "Concordia Station", stationId: "concordia", correct: true, label: "Dome C (France / Italy / ESA)" },
          { name: "Vostok Station", stationId: "vostok", correct: false, label: "East Antarctic Ice Sheet" },
          { name: "Maitri", stationId: "maitri", correct: false, label: "Schirmacher Oasis" }
        ],
        explanation: "Concordia's extreme isolation, thin atmosphere, and 4-month polar night make it the European Space Agency's top analogue habitat for Moon/Mars missions."
      },
      {
        targetStation: "svalbard-nyalesund",
        title: "Challenge 5: Northernmost Arctic Science Village",
        prompt: "Where is Ny-Ålesund in Svalbard located, the northernmost permanent civilian settlement hosting international polar labs?",
        hint: "High Arctic archipelago in Spitsbergen (78°55'N) protected by a 20 km radio-silent zone.",
        options: [
          { name: "Ny-Ålesund / Svalbard", stationId: "svalbard-nyalesund", correct: true, label: "Spitsbergen, Svalbard (78°55'N)" },
          { name: "Summit Station", stationId: "summit-station", correct: false, label: "Greenland Ice Sheet" },
          { name: "Himansh", stationId: "himansh", correct: false, label: "Himalayas" }
        ],
        explanation: "Ny-Ålesund in Svalbard hosts researchers from Norway, India (Himadri), Germany, France, Japan, and the UK studying Arctic Amplification."
      },
      {
        targetStation: "halley-vi",
        title: "Challenge 6: The Relocatable Ski Station",
        prompt: "Which British station was engineered on giant hydraulic skis and famously discovered the Antarctic Ozone Hole in 1985?",
        hint: "Positioned on the floating Brunt Ice Shelf in the Weddell Sea (75°35'S).",
        options: [
          { name: "Halley VI", stationId: "halley-vi", correct: true, label: "Brunt Ice Shelf (UK - BAS)" },
          { name: "Rothera", stationId: "rothera", correct: false, label: "Adelaide Island (UK)" },
          { name: "Princess Elisabeth", stationId: "princess-elisabeth", correct: false, label: "Queen Maud Land (Belgium)" }
        ],
        explanation: "Halley VI is mounted on hydraulic ski legs so it can be towed inland by bulldozers when widening ice rifts threaten the floating Brunt Ice Shelf."
      },
      {
        targetStation: "himadri",
        title: "Challenge 7: India's Arctic Flagship",
        prompt: "Where is India's premier Arctic station 'HIMADRI' located, studying Arctic-Indian monsoon teleconnections?",
        hint: "Located in the international research settlement of Ny-Ålesund, Svalbard (78°55'N).",
        options: [
          { name: "Himadri", stationId: "himadri", correct: true, label: "Ny-Ålesund, Svalbard (Arctic)" },
          { name: "Maitri", stationId: "maitri", correct: false, label: "Schirmacher Oasis (Antarctica)" },
          { name: "Bharati", stationId: "bharati", correct: false, label: "Larsemann Hills (Antarctica)" }
        ],
        explanation: "Himadri was inaugurated in July 2008 by NCPOR to study atmospheric aerosols, Kongsfjorden glaciology, and Arctic teleconnections to Indian monsoons."
      },
      {
        targetStation: "bharati",
        title: "Challenge 8: Container Architecture on Stilts",
        prompt: "Find 'BHARATI' station in East Antarctica, constructed from 134 modular shipping containers on stilts with an ISRO satellite terminal:",
        hint: "Situated in the rocky Larsemann Hills (69°24'S, 76°11'E).",
        options: [
          { name: "Bharati", stationId: "bharati", correct: true, label: "Larsemann Hills, East Antarctica" },
          { name: "McMurdo", stationId: "mcmurdo", correct: false, label: "Ross Island" },
          { name: "Vostok", stationId: "vostok", correct: false, label: "Princess Elizabeth Land" }
        ],
        explanation: "Bharati was commissioned in 2012. Its aerodynamic stilted architecture withstands 300 km/h blizzards and downloads real-time ISRO satellite telemetry."
      }
    ];
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    if (typeof L === "undefined") {
      setTimeout(() => this.init(), 300);
      return;
    }

    this.stations = (window.CryoverseData && window.CryoverseData.stations) ? window.CryoverseData.stations : [];

    try {
      this.map = L.map(this.containerId, {
        center: [15, 20],
        zoom: 2,
        minZoom: 1.5,
        maxZoom: 16,
        zoomControl: false,
        worldCopyJump: true
      });

      L.control.zoom({ position: "bottomright" }).addTo(this.map);

      this.setupTileLayers();
      this.setupPolarGridOverlays();
      this.plotStationMarkers();
      this.setupCoordinateTracker();

      setTimeout(() => {
        if (this.map) this.map.invalidateSize();
      }, 250);
    } catch (e) {
      console.warn("Map setup note:", e);
    }
  }

  setupTileLayers() {
    // 1. Authentic High-Resolution Real Earth Satellite Imagery (No API key required)
    this.tileLayers.satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Earthstar Geographics | Cryoverse Polar Network',
      maxZoom: 18
    });

    // 2. Real Earth Ocean & Bathymetric Base (No API key required)
    this.tileLayers.ocean = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", {
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, GEBCO, NOAA, National Geographic',
      maxZoom: 16
    });

    // 3. OpenStreetMap Physical / Cartographic Standard (No API key required)
    this.tileLayers.streets = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abc",
      maxZoom: 19
    });

    // Default to true Real Earth Satellite imagery as requested
    this.currentTileLayer = this.tileLayers.satellite;
    this.currentTileLayer.addTo(this.map);
  }

  switchTileLayer(layerKey) {
    if (!this.tileLayers[layerKey] || this.currentTileLayer === this.tileLayers[layerKey]) return;
    this.map.removeLayer(this.currentTileLayer);
    this.currentTileLayer = this.tileLayers[layerKey];
    this.currentTileLayer.addTo(this.map);

    document.querySelectorAll(".map-tile-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.layer === layerKey);
    });
  }

  setupPolarGridOverlays() {
    this.polarGridLayer = L.layerGroup();

    // 1. Arctic Circle (66.56° N)
    const arcticCoords = [];
    for (let lng = -180; lng <= 180; lng += 4) {
      arcticCoords.push([66.5636, lng]);
    }
    const arcticCircle = L.polyline(arcticCoords, {
      color: "#00f0ff",
      weight: 1.5,
      dashArray: "6, 6",
      opacity: 0.75
    }).bindTooltip("❄️ Arctic Circle (66°33'49\" N)", { permanent: false, className: "polar-grid-tooltip" });
    this.polarGridLayer.addLayer(arcticCircle);

    // 2. High Arctic 80° N Contour
    const arctic80Coords = [];
    for (let lng = -180; lng <= 180; lng += 5) {
      arctic80Coords.push([80.0, lng]);
    }
    const arctic80 = L.polyline(arctic80Coords, {
      color: "rgba(0, 240, 255, 0.4)",
      weight: 1,
      dashArray: "3, 8",
      opacity: 0.5
    });
    this.polarGridLayer.addLayer(arctic80);

    // 3. Antarctic Circle (66.56° S)
    const antarcticCoords = [];
    for (let lng = -180; lng <= 180; lng += 4) {
      antarcticCoords.push([-66.5636, lng]);
    }
    const antarcticCircle = L.polyline(antarcticCoords, {
      color: "#38bdf8",
      weight: 1.5,
      dashArray: "6, 6",
      opacity: 0.75
    }).bindTooltip("🧊 Antarctic Circle (66°33'49\" S)", { permanent: false, className: "polar-grid-tooltip" });
    this.polarGridLayer.addLayer(antarcticCircle);

    // 4. Antarctic High Plateau 75° S Contour
    const antarctic75Coords = [];
    for (let lng = -180; lng <= 180; lng += 5) {
      antarctic75Coords.push([-75.0, lng]);
    }
    const antarctic75 = L.polyline(antarctic75Coords, {
      color: "rgba(56, 189, 248, 0.4)",
      weight: 1,
      dashArray: "3, 8",
      opacity: 0.5
    });
    this.polarGridLayer.addLayer(antarctic75);

    // 5. Geographic South Pole Marker
    const southPoleIcon = L.divIcon({
      className: "south-pole-marker",
      html: `<div class="pole-crosshair"><span>⌖</span><small>South Pole 90°S</small></div>`,
      iconSize: [60, 24],
      iconAnchor: [30, 12]
    });
    const spMarker = L.marker([-90, 0], { icon: southPoleIcon }).bindPopup("<strong>Geographic South Pole (90°00'S)</strong><br>Elevation: 2,835 m atop 2,850 m of moving ice. Site of Amundsen-Scott Station.");
    this.polarGridLayer.addLayer(spMarker);

    // 6. Geographic North Pole Marker
    const northPoleIcon = L.divIcon({
      className: "north-pole-marker",
      html: `<div class="pole-crosshair north"><span>⌖</span><small>North Pole 90°N</small></div>`,
      iconSize: [60, 24],
      iconAnchor: [30, 12]
    });
    const npMarker = L.marker([90, 0], { icon: northPoleIcon }).bindPopup("<strong>Geographic North Pole (90°00'N)</strong><br>Perpetual moving Arctic sea ice over a 4,261 m deep ocean basin.");
    this.polarGridLayer.addLayer(npMarker);

    this.polarGridLayer.addTo(this.map);
  }

  togglePolarGrid() {
    if (!this.map || !this.polarGridLayer) return;
    this.showPolarGrid = !this.showPolarGrid;
    if (this.showPolarGrid) {
      this.polarGridLayer.addTo(this.map);
    } else {
      this.map.removeLayer(this.polarGridLayer);
    }
    const btn = document.getElementById("toggleGridBtn");
    if (btn) btn.classList.toggle("active", this.showPolarGrid);
  }

  plotStationMarkers() {
    this.stations = (window.CryoverseData && window.CryoverseData.stations) ? window.CryoverseData.stations : [];
    
    // Clear existing markers if any
    Object.values(this.markers).forEach(m => {
      if (this.map.hasLayer(m)) this.map.removeLayer(m);
    });
    this.markers = {};

    this.stations.forEach((st) => {
      const isAntarctic = st.region.toLowerCase().includes("antarctica");
      const isArctic = st.region.toLowerCase().includes("arctic");
      const isHimalaya = st.region.toLowerCase().includes("himalaya");

      let badgeClass = "badge-arctic";
      let iconEmoji = "❄️";
      let pulseColor = "#00f0ff";

      if (isAntarctic) {
        badgeClass = "badge-antarctic";
        iconEmoji = "🧊";
        pulseColor = "#60a5fa";
      } else if (isHimalaya) {
        badgeClass = "badge-himalaya";
        iconEmoji = "🏔️";
        pulseColor = "#a78bfa";
      }

      // Domain-specific icon tweak
      const cat = (st.researchCategory || "").toLowerCase();
      if (cat.includes("astrophysics")) iconEmoji = "🔭";
      else if (cat.includes("marine biology")) iconEmoji = "🦭";
      else if (cat.includes("glaciology")) iconEmoji = "🧊";
      else if (cat.includes("climate")) iconEmoji = "🌡️";

      const flag = st.flag || (st.country === "India" ? "🇮🇳" : (st.country === "United States" ? "🇺🇸" : (st.country === "Russia" ? "🇷🇺" : (st.country === "United Kingdom" ? "🇬🇧" : "🌐"))));

      const customIcon = L.divIcon({
        className: "custom-polar-marker",
        html: `
          <div class="marker-pulse-wrapper" style="--pulse-color: ${pulseColor};">
            <div class="marker-pulse-ring"></div>
            <div class="marker-pin">
              <span class="marker-emoji">${iconEmoji}</span>
            </div>
            <div class="marker-name-tag">${flag} ${st.name}</div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([st.coordinates.lat, st.coordinates.lng], { icon: customIcon }).addTo(this.map);
      marker.stationData = st;

      marker.on("click", () => {
        if (this.quizActive) {
          this.handleMapQuizSelection(st.id);
          return;
        }
      });

      const popSummer = st.population ? st.population.summer : "--";
      const popWinter = st.population ? st.population.winter : "--";
      const avgTemp = (st.temperatures && st.temperatures.annualAverage) ? st.temperatures.annualAverage.split("(")[0] : (st.weather ? st.weather.temp : "--");
      const recordLow = (st.temperatures && st.temperatures.recordLow) ? st.temperatures.recordLow.split("(")[0] : "--";

      const popupHtml = `
        <div class="cryo-map-popup">
          <div class="popup-header">
            <span class="popup-badge ${badgeClass}">${flag} ${st.region}</span>
            <span class="popup-status">● ${st.status ? st.status.split(" ")[0] : "Active"}</span>
          </div>
          <div class="popup-body">
            <img src="${st.image}" alt="${st.name} Station" class="popup-img" onerror="this.src='https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80'">
            <h4>${st.name}</h4>
            <p class="popup-loc">📍 ${st.location}</p>
            <div class="popup-meta-pill">
              <span>Managed by: <strong>${st.country}</strong> (${st.managedBy ? st.managedBy.split(",")[0] : ""})</span>
            </div>
            <div class="popup-telemetry">
              <div><span>Avg Temp</span> <strong>${avgTemp}</strong></div>
              <div><span>Record Low</span> <strong style="color: #67e8f9;">${recordLow}</strong></div>
              <div><span>Population</span> <strong>${popSummer}S / ${popWinter}W</strong></div>
            </div>
            <div class="popup-research-tag">
              🔬 <em>${st.primaryResearch || "Polar Science"}</em>
            </div>
          </div>
          <div class="popup-actions">
            <button class="popup-btn primary" onclick="stationInfo('${st.name}')">Dossier & Telemetry →</button>
            <button class="popup-btn secondary" onclick="askAiAbout('${st.name}')">🤖 Ask AI</button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: "custom-leaflet-popup",
        maxWidth: 330,
        minWidth: 270
      });

      this.markers[st.name.toLowerCase()] = marker;
      if (st.id) this.markers[st.id.toLowerCase()] = marker;
    });
  }

  filterByDomain(domain) {
    this.activeDomainFilter = domain.toLowerCase();
    
    // Update toolbar active buttons
    document.querySelectorAll(".domain-filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.domain === this.activeDomainFilter);
    });

    Object.values(this.markers).forEach(marker => {
      const st = marker.stationData;
      if (!st) return;
      const cat = (st.researchCategory || "").toLowerCase();
      const primary = (st.primaryResearch || "").toLowerCase();

      const matches = this.activeDomainFilter === "all" || cat.includes(this.activeDomainFilter) || primary.includes(this.activeDomainFilter);
      if (matches) {
        if (!this.map.hasLayer(marker)) this.map.addLayer(marker);
      } else {
        if (this.map.hasLayer(marker)) this.map.removeLayer(marker);
      }
    });
  }

  setupCoordinateTracker() {
    const coordsDisplay = document.getElementById("mapCoordsIndicator");
    if (!coordsDisplay || !this.map) return;

    this.map.on("mousemove", (e) => {
      const lat = e.latlng.lat.toFixed(4);
      const lng = e.latlng.lng.toFixed(4);
      const latDir = lat >= 0 ? "°N" : "°S";
      const lngDir = lng >= 0 ? "°E" : "°W";
      coordsDisplay.innerHTML = `<strong>LAT:</strong> ${Math.abs(lat)}${latDir} | <strong>LNG:</strong> ${Math.abs(lng)}${lngDir}`;
    });
  }

  flyToStation(stationName) {
    if (!this.map) return;
    const key = stationName.toLowerCase().trim();
    const marker = this.markers[key];
    const station = this.stations.find((s) => s.name.toLowerCase() === key || s.id.toLowerCase() === key);

    if (station) {
      this.map.flyTo([station.coordinates.lat, station.coordinates.lng], 6, {
        duration: 1.5
      });

      setTimeout(() => {
        if (marker) marker.openPopup();
      }, 1600);
    }
  }

  focusRegion(regionName) {
    if (!this.map) return;
    const reg = regionName.toLowerCase();

    // Update active toolbar button
    document.querySelectorAll(".map-view-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.region === reg);
    });

    if (reg.includes("arctic")) {
      // Focus Arctic Pole
      this.map.flyTo([79.0, 15.0], 3.8, { duration: 1.5 });
      const marker = this.markers["svalbard-nyalesund"] || this.markers["himadri"];
      if (marker) setTimeout(() => marker.openPopup(), 1600);
    } else if (reg.includes("antarctica") || reg.includes("antarctic")) {
      // Focus Antarctic Pole
      this.map.flyTo([-74.0, 40.0], 3.2, { duration: 1.5 });
      const marker = this.markers["amundsen-scott"] || this.markers["vostok"] || this.markers["mcmurdo"];
      if (marker) setTimeout(() => marker.openPopup(), 1600);
    } else if (reg.includes("himalaya")) {
      this.map.flyTo([32.4087, 77.6111], 6, { duration: 1.5 });
      const marker = this.markers["himansh"];
      if (marker) setTimeout(() => marker.openPopup(), 1600);
    } else if (reg.includes("southern ocean")) {
      this.map.flyTo([-58.0, 40.0], 3, { duration: 1.5 });
    } else {
      // Global View
      this.map.flyTo([15, 20], 2, { duration: 1.5 });
    }
  }

  // ================= STATION MAP QUIZ ENGINE =================
  startMapQuiz() {
    this.quizActive = true;
    this.quizIndex = 0;
    this.quizScore = 0;

    const mapSec = document.getElementById("stations");
    if (mapSec) mapSec.scrollIntoView({ behavior: "smooth" });

    this.renderMapQuizHUD();
  }

  renderMapQuizHUD() {
    let hud = document.getElementById("mapQuizHUD");
    if (!hud) {
      hud = document.createElement("div");
      hud.id = "mapQuizHUD";
      hud.className = "map-quiz-hud";
      const wrapper = document.querySelector(".polar-map-wrapper");
      if (wrapper) wrapper.prepend(hud);
    }

    if (this.quizIndex >= this.quizQuestions.length) {
      const pct = Math.round((this.quizScore / (this.quizQuestions.length * 100)) * 100);
      hud.innerHTML = `
        <div class="map-quiz-header finished">
          <div>
            <span class="quiz-badge">🏆 POLAR CARTOGRAPHY CHALLENGE COMPLETE!</span>
            <h3>Final Score: ${this.quizScore} / ${this.quizQuestions.length * 100} (${pct}%)</h3>
            <p>Rank: <strong>${pct >= 85 ? "Master Polar Cartographer 🌟" : (pct >= 60 ? "Polar Navigator 🧭" : "Polar Explorer ❄️")}</strong></p>
          </div>
          <div class="map-quiz-actions">
            <button class="primary-btn small" onclick="cryoMap.startMapQuiz()">Play Again 🔄</button>
            <button class="secondary-btn small" onclick="cryoMap.exitMapQuiz()">Exit Quiz ✕</button>
          </div>
        </div>
      `;
      return;
    }

    const q = this.quizQuestions[this.quizIndex];
    hud.innerHTML = `
      <div class="map-quiz-header">
        <div class="map-quiz-left">
          <span class="quiz-badge">🎯 STATION MAP CHALLENGE • ${q.title}</span>
          <p class="map-quiz-prompt">${q.prompt}</p>
          <small class="map-quiz-hint">💡 Hint: ${q.hint} (Click an option below or directly click the station pin!)</small>
        </div>
        <div class="map-quiz-right">
          <span class="map-quiz-score">Score: <strong>${this.quizScore}</strong></span>
          <button class="map-quiz-exit-btn" onclick="cryoMap.exitMapQuiz()" title="Exit Quiz">✕</button>
        </div>
      </div>
      <div class="map-quiz-options" id="mapQuizOptions">
        ${q.options.map(opt => `
          <button class="map-quiz-opt-btn" onclick="cryoMap.handleMapQuizSelection('${opt.stationId}')">
            📍 ${opt.name} — <small>${opt.label}</small>
          </button>
        `).join("")}
      </div>
      <div id="mapQuizFeedback" class="map-quiz-feedback" style="display:none;"></div>
    `;
  }

  handleMapQuizSelection(selectedStationId) {
    if (!this.quizActive || this.quizIndex >= this.quizQuestions.length) return;
    const q = this.quizQuestions[this.quizIndex];
    const feedbackBox = document.getElementById("mapQuizFeedback");
    const optionsBox = document.getElementById("mapQuizOptions");

    const isCorrect = selectedStationId.toLowerCase() === q.targetStation.toLowerCase();

    this.flyToStation(q.targetStation);

    if (optionsBox) {
      optionsBox.querySelectorAll(".map-quiz-opt-btn").forEach(btn => btn.disabled = true);
    }

    if (feedbackBox) {
      feedbackBox.style.display = "block";
      if (isCorrect) {
        this.quizScore += 100;
        feedbackBox.className = "map-quiz-feedback success";
        feedbackBox.innerHTML = `
          <strong>🎉 Correct! (+100 pts)</strong>
          <p>${q.explanation}</p>
          <button class="primary-btn small" onclick="cryoMap.nextMapQuizQuestion()">Next Location →</button>
        `;
      } else {
        feedbackBox.className = "map-quiz-feedback wrong";
        feedbackBox.innerHTML = `
          <strong>❌ Not quite. The target station was ${q.options.find(o=>o.correct).name}!</strong>
          <p>${q.explanation}</p>
          <button class="primary-btn small" onclick="cryoMap.nextMapQuizQuestion()">Continue →</button>
        `;
      }
    }
  }

  nextMapQuizQuestion() {
    this.quizIndex++;
    this.renderMapQuizHUD();
  }

  exitMapQuiz() {
    this.quizActive = false;
    const hud = document.getElementById("mapQuizHUD");
    if (hud) hud.remove();
  }
}

// Global Map Instance
window.cryoMap = new CryoverseMap("mapContainer");

function startStationQuiz() {
  window.cryoMap.startMapQuiz();
}
