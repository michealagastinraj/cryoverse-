/**
 * CRYOVERSE APPLICATION CONTROLLER (COMPREHENSIVELY EXPANDED)
 * Complete management of Student, Teacher, Scientist, and Public portals,
 * Interactive Polar Quizzes, Chart.js visualizer, Flashcards, Glossary, and Modals.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.cryoMap) {
    window.cryoMap.init();
  }
  renderStationCards();
  renderClimateDatasetsExplorer();
  renderResearchGrid();
  setupSmoothScrolling();
});

// ================= MOBILE NAVIGATION =================
function toggleMenu() {
  const nav = document.querySelector(".navbar nav");
  if (nav) {
    nav.classList.toggle("open");
  }
}

document.querySelectorAll(".navbar nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector(".navbar nav");
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
  });
});

// ================= REGION EXPLORATION MODAL =================
const regionDetailsData = {
  Arctic: {
    title: "The Arctic Ocean & Polar Tundra",
    emoji: "❄️",
    badge: "Northern Cryosphere",
    banner: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    description: "The Arctic is a semi-enclosed ocean capped by sea ice and surrounded by permafrost tundra. It is warming four times faster than the rest of the planet due to Arctic Amplification.",
    stats: [
      { label: "Summer Ice Extent", value: "~4.1 Million km²" },
      { label: "Key Wildlife", value: "Polar Bears, Belugas, Walruses" },
      { label: "Indian Bases", value: "Himadri Station & IndARC Mooring" }
    ],
    features: [
      "Permafrost thaw releasing ancient carbon pools and microbes.",
      "Greenland ice loss contributing directly to global sea level rise.",
      "Teleconnections: Barents-Kara sea ice melt modulates Indian Summer Monsoon rains."
    ]
  },
  Antarctica: {
    title: "The Antarctic Continental Ice Sheet",
    emoji: "🧊",
    badge: "Southern Polar Continent",
    banner: "https://images.unsplash.com/photo-1548678967-f1fc58f6ecf6?auto=format&fit=crop&w=1200&q=80",
    description: "Antarctica is the coldest, windiest, and driest continent on Earth. It holds 70% of the world's freshwater and 90% of all ice, protected under the international Antarctic Treaty.",
    stats: [
      { label: "Ice Sheet Volume", value: "27 Million km³" },
      { label: "Average Ice Depth", value: "2,160 meters" },
      { label: "Indian Stations", value: "Maitri, Bharati & Dakshin Gangotri" }
    ],
    features: [
      "East Antarctic Ice Sheet: Elevated bedrock, stable continental ice reservoir.",
      "West Antarctic Ice Sheet: Marine-based ice vulnerable to warm deep ocean water.",
      "Subglacial Lake Vostok: Sealed hydrology isolated for millions of years."
    ]
  },
  "Southern Ocean": {
    title: "The Southern (Antarctic) Ocean",
    emoji: "🌊",
    badge: "Global Climate Engine",
    banner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "Encircling Antarctica, the Southern Ocean drives the Antarctic Circumpolar Current. It absorbs 40% of all oceanic anthropogenic carbon and generates cold bottom water.",
    stats: [
      { label: "Circumpolar Current", value: "150 Million m³/sec" },
      { label: "Keystone Species", value: "Antarctic Krill (Euphausia superba)" },
      { label: "Expeditions", value: "Annual Indian Southern Ocean Exp." }
    ],
    features: [
      "Antarctic Bottom Water (AABW) formation oxygenating the global abyss.",
      "Dense krill swarms supporting baleen whales, seals, and penguins.",
      "Acidification threat to calcifying pteropods and marine diatoms."
    ]
  },
  Himalaya: {
    title: "The Himalayas: Earth's Third Pole",
    emoji: "🏔️",
    badge: "Asian Water Tower",
    banner: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    description: "The Hindu Kush-Himalayan cryosphere holds the greatest concentration of ice outside the polar caps, sustaining 1.9 billion people across ten major Asian river basins.",
    stats: [
      { label: "Glaciers Count", value: "Over 54,000 glaciers" },
      { label: "Benchmark Station", value: "Himansh (13,500 ft, Spiti)" },
      { label: "River Basins", value: "Indus, Ganga, Brahmaputra" }
    ],
    features: [
      "Vulnerability to anthropogenic black carbon reducing snow albedo.",
      "Glacial Lake Outburst Floods (GLOFs) creating hazards for mountain communities.",
      "Long-term monitoring of benchmark glaciers (Bara Shigri, Samudra Tapu)."
    ]
  }
};

function showRegion(regionName) {
  const reg = regionDetailsData[regionName] || regionDetailsData["Arctic"];
  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal region-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="modal-banner" style="background-image: linear-gradient(to bottom, rgba(6, 13, 23, 0.4), #0b1728), url('${reg.banner}')">
          <span class="modal-badge">${reg.emoji} ${reg.badge}</span>
          <h2>${reg.title}</h2>
        </div>
        <div class="modal-content">
          <p class="lead-text">${reg.description}</p>
          <div class="modal-stats-row">
            ${reg.stats.map(s => `<div><strong>${s.value}</strong><p>${s.label}</p></div>`).join("")}
          </div>
          <h3>Scientific Significance</h3>
          <ul class="modal-bullets">
            ${reg.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
          <div class="modal-cta-row">
            <button class="primary-btn" onclick="closeModal(); cryoMap.focusRegion('${regionName}')">Zoom on Map 📍</button>
            <button class="secondary-btn" onclick="closeModal(); filterResearchByRegion('${regionName}')">View Research Papers 📄</button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

// ================= STATION DOSSIER MODAL =================
function stationInfo(stationName) {
  const stations = (window.CryoverseData && window.CryoverseData.stations) ? window.CryoverseData.stations : [];
  const st = stations.find(s => s.name.toLowerCase() === stationName.toLowerCase() || s.id.toLowerCase() === stationName.toLowerCase()) || stations[0];

  const flag = st.flag || (st.country === "India" ? "🇮🇳" : (st.country === "United States" ? "🇺🇸" : (st.country === "Russia" ? "🇷🇺" : "🌐")));
  const popS = st.population ? st.population.summer : "--";
  const popW = st.population ? st.population.winter : "--";
  const avgTemp = (st.temperatures && st.temperatures.annualAverage) ? st.temperatures.annualAverage : (st.weather ? st.weather.temp : "--");
  const recCold = (st.temperatures && st.temperatures.recordLow) ? st.temperatures.recordLow : "N/A";
  const elev = st.elevation || st.altitude || "Sea level";

  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal station-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="modal-banner" style="background-image: linear-gradient(to bottom, rgba(6, 13, 23, 0.4), #0b1728), url('${st.image}')">
          <span class="modal-badge">${flag} ${st.country} • ${st.region} • Est. ${st.established}</span>
          <h2>${st.name}</h2>
          <p class="modal-subtitle">📍 ${st.location}</p>
        </div>
        <div class="modal-content">
          <div class="live-weather-card">
            <div class="live-weather-title">
              <span>📡 STATION DOSSIER & POLAR METRICS</span>
              <span class="badge-status">● ${st.status ? st.status.split(" ")[0] : "Active"}</span>
            </div>
            <div class="live-weather-grid">
              <div><span>Avg Annual Temp</span><strong>${avgTemp.split("(")[0]}</strong></div>
              <div><span>Record Low</span><strong style="color: #67e8f9;">${recCold.split("(")[0]}</strong></div>
              <div><span>Summer Population</span><strong>${popS} personnel</strong></div>
              <div><span>Winter Population</span><strong>${popW} personnel</strong></div>
              <div><span>Elevation</span><strong>${elev}</strong></div>
              <div><span>Ice / Bedrock</span><strong>${st.iceThickness || "Polar bedrock"}</strong></div>
            </div>
          </div>

          <div class="station-section-block">
            <h3>Managing Agency & Mission Overview</h3>
            <p>${st.description}</p>
            <p><small><strong>Primary Research Discipline:</strong> <em>${st.primaryResearch || "Polar Science"}</em></small></p>
            <p><small><strong>Operator:</strong> ${st.managedBy} | <strong>Coordinates:</strong> ${st.coordinates.lat}° N, ${st.coordinates.lng}° E</small></p>
          </div>

          ${st.keyDiscoveries && st.keyDiscoveries.length > 0 ? `
            <div class="station-section-block">
              <h3>Notable Scientific Breakthroughs & Discoveries</h3>
              <ul class="modal-bullets">
                ${st.keyDiscoveries.map(d => `<li>🏆 ${d}</li>`).join("")}
              </ul>
            </div>
          ` : ''}

          <div class="station-section-block">
            <h3>Key Research Programs</h3>
            <ul class="modal-bullets">
              ${(st.keyResearch || []).map(r => `<li>🔬 ${r}</li>`).join("")}
            </ul>
          </div>

          <div class="station-section-block">
            <h3>Facilities & Instrumentation</h3>
            <ul class="modal-bullets">
              ${(st.facilities || []).map(f => `<li>🛠️ ${f}</li>`).join("")}
            </ul>
          </div>

          <div class="modal-cta-row">
            <button class="primary-btn" onclick="closeModal(); cryoMap.flyToStation('${st.name}')">Fly to on Map 📍</button>
            <button class="secondary-btn" onclick="closeModal(); window.cryoAI.openPanelWithQuery('Tell me more about ${st.name} station and its discoveries')">Ask Cryo AI ❄️</button>
            <button class="secondary-btn" onclick="closeModal(); startStationQuiz()">Play Station Quiz 🎯</button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

// ================= DYNAMIC STATION GRID RENDERER =================
function renderStationCards(filterDomain = "all", searchQuery = "") {
  const grid = document.getElementById("stationGrid");
  if (!grid) return;

  const stations = (window.CryoverseData && window.CryoverseData.stations) ? window.CryoverseData.stations : [];
  const q = searchQuery.toLowerCase().trim();
  const domain = filterDomain.toLowerCase().trim();

  const filtered = stations.filter(st => {
    const matchesDomain = domain === "all" || 
      (st.researchCategory && st.researchCategory.toLowerCase().includes(domain)) ||
      (st.primaryResearch && st.primaryResearch.toLowerCase().includes(domain));
    
    if (!matchesDomain) return false;
    if (!q) return true;

    return (
      st.name.toLowerCase().includes(q) ||
      st.region.toLowerCase().includes(q) ||
      st.country.toLowerCase().includes(q) ||
      (st.primaryResearch && st.primaryResearch.toLowerCase().includes(q))
    );
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
        <p>❄️ No polar stations match "${searchQuery}".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(st => {
    const flag = st.flag || (st.country === "India" ? "🇮🇳" : (st.country === "United States" ? "🇺🇸" : (st.country === "Russia" ? "🇷🇺" : "🌐")));
    const popS = st.population ? st.population.summer : "--";
    const popW = st.population ? st.population.winter : "--";
    const avgTemp = (st.temperatures && st.temperatures.annualAverage) ? st.temperatures.annualAverage.split("(")[0] : (st.weather ? st.weather.temp : "--");
    const recCold = (st.temperatures && st.temperatures.recordLow) ? st.temperatures.recordLow.split("(")[0] : "--";

    return `
      <div class="station-card" onclick="cryoMap.flyToStation('${st.name}'); stationInfo('${st.name}')">
        <div class="station-card-thumb-wrap">
          <img src="${st.image}" alt="${st.name}" class="station-card-thumb" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80'">
          <span class="st-thumb-badge">${flag} ${st.region}</span>
        </div>
        <div class="station-card-info">
          <h3>${st.name}</h3>
          <p class="st-country-label"><strong>${st.country}</strong> (${st.managedBy ? st.managedBy.split(",")[0] : ""})</p>
          <p class="st-research-field">🔬 ${st.primaryResearch ? st.primaryResearch.split(",")[0] : "Polar Research"}</p>
          <div class="st-stats-mini-row">
            <span>🌡️ Avg: <strong>${avgTemp}</strong></span>
            <span>❄️ Low: <strong style="color: #67e8f9;">${recCold}</strong></span>
            <span>👥 Pop: <strong>${popS}S / ${popW}W</strong></span>
          </div>
          <div class="st-card-actions">
            <button class="st-action-btn primary" onclick="event.stopPropagation(); cryoMap.flyToStation('${st.name}')">📍 Fly on Map</button>
            <button class="st-action-btn secondary" onclick="event.stopPropagation(); stationInfo('${st.name}')">Dossier</button>
            <button class="st-action-btn secondary" onclick="event.stopPropagation(); window.cryoAI.openPanelWithQuery('Tell me about ${st.name} research station')">🤖 Ask AI</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ================= POLAR CLIMATE DATASETS EXPLORER =================
let activeClimateTab = "co2";
function switchClimateDatasetTab(tabKey) {
  activeClimateTab = tabKey;
  renderClimateDatasetsExplorer();
}

function renderClimateDatasetsExplorer() {
  const container = document.getElementById("climateDatasetsContainer");
  if (!container) return;

  const climate = (window.CryoverseData && window.CryoverseData.climateDatasets) ? window.CryoverseData.climateDatasets : null;
  if (!climate) return;

  let contentHtml = "";

  if (activeClimateTab === "co2") {
    const ds = climate.iceCoreCO2;
    contentHtml = `
      <div class="climate-explorer-panel">
        <div class="climate-panel-header">
          <div>
            <h3>${ds.title}</h3>
            <p>${ds.description}</p>
            <small>Source: ${ds.source} | Unit: ${ds.unit}</small>
          </div>
          <button class="primary-btn small" onclick="window.cryoAI.openPanelWithQuery('How do ice cores store ancient atmospheric data and how high is modern CO2 compared to the 800,000-year record?')">🤖 Ask AI About Ice Cores</button>
        </div>

        <div class="co2-timeline-grid">
          ${ds.timeline.map(item => {
            const isModern = item.co2 > 350;
            const barWidth = Math.round((item.co2 / 450) * 100);
            return `
              <div class="co2-timeline-card ${isModern ? 'modern-spike' : ''}">
                <div class="co2-card-head">
                  <span class="co2-period">${item.period}</span>
                  <span class="co2-val">${item.co2} ppm</span>
                </div>
                <div class="co2-bar-track">
                  <div class="co2-bar-fill" style="width: ${barWidth}%;"></div>
                </div>
                <strong class="co2-era">${item.era}</strong>
                <p class="co2-notes">${item.notes}</p>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  } else if (activeClimateTab === "seaice") {
    const ds = climate.seaIceExtent;
    contentHtml = `
      <div class="climate-explorer-panel">
        <div class="climate-panel-header">
          <div>
            <h3>${ds.title}</h3>
            <p>${ds.description}</p>
            <small>Source: ${ds.source} | Unit: ${ds.unit}</small>
          </div>
          <button class="primary-btn small" onclick="window.cryoAI.openPanelWithQuery('Explain the 1979-2024 polar sea-ice extent trends and why the Arctic is melting faster')">🤖 Ask AI About Sea Ice</button>
        </div>

        <div class="sea-ice-table-wrapper">
          <table class="polar-data-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Arctic Min (Sept)</th>
                <th>Antarctic Max (Sept/Oct)</th>
                <th>Satellite Observations & Decadal Anomaly</th>
              </tr>
            </thead>
            <tbody>
              ${ds.records.map(r => `
                <tr class="${r.year === 2012 || r.year === 2023 ? 'highlight-row' : ''}">
                  <td><strong>${r.year}</strong></td>
                  <td><span class="badge-num arctic">${r.arcticMin} M km²</span></td>
                  <td><span class="badge-num antarctic">${r.antarcticMax} M km²</span></td>
                  <td>${r.notes}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (activeClimateTab === "glaciers") {
    const ds = climate.glacierMeltSpeeds;
    contentHtml = `
      <div class="climate-explorer-panel">
        <div class="climate-panel-header">
          <div>
            <h3>${ds.title}</h3>
            <p>${ds.description}</p>
          </div>
          <button class="primary-btn small" onclick="window.cryoAI.openPanelWithQuery('Tell me about Thwaites Doomsday Glacier and Jakobshavn Isbrae melt speeds')">🤖 Ask AI About Glacier Speeds</button>
        </div>

        <div class="glaciers-grid">
          ${ds.glaciers.map(g => `
            <div class="glacier-card">
              <div class="glacier-card-header">
                <span class="glacier-region-tag">${g.region}</span>
                <h4>${g.name}</h4>
              </div>
              <div class="glacier-metric-box">
                <div class="metric-item">
                  <span>Velocity / Speed</span>
                  <strong>${g.velocity}</strong>
                </div>
                <div class="metric-item">
                  <span>Grounding Line Retreat</span>
                  <strong style="color: #f87171;">${g.retreatRate}</strong>
                </div>
              </div>
              <p class="glacier-status"><strong>Vulnerability:</strong> ${g.status}</p>
              <p class="glacier-mechanism"><small><strong>Melt Mechanism:</strong> ${g.mechanism}</small></p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  } else if (activeClimateTab === "aurora") {
    const ds = climate.auroraDynamics;
    contentHtml = `
      <div class="climate-explorer-panel">
        <div class="climate-panel-header">
          <div>
            <h3>${ds.title}</h3>
            <p>${ds.description}</p>
          </div>
          <button class="primary-btn small" onclick="window.cryoAI.openPanelWithQuery('What causes auroras and why are they green and red?')">🤖 Ask AI About Auroras</button>
        </div>

        <div class="aurora-metrics-grid">
          <div class="aurora-stat-card">
            <span>⚡ Solar Wind Velocity</span>
            <strong>${ds.parameters.solarWindSpeed}</strong>
            <p>Interplanetary CME shockwaves impacting polar magnetosphere</p>
          </div>
          <div class="aurora-stat-card">
            <span>🧲 IMF Coupling</span>
            <strong>${ds.parameters.interplanetaryMagneticField}</strong>
            <p>Reconnection injects high-energy solar particles into polar cusps</p>
          </div>
          <div class="aurora-stat-card">
            <span>📊 Planetary Kp Index Scale</span>
            <strong>${ds.parameters.kpIndexScale}</strong>
            <p>Kp >= 5 signals strong visible geomagnetic storm curtains</p>
          </div>
          <div class="aurora-stat-card">
            <span>🌈 Altitude & Emission Colors</span>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">${ds.parameters.excitationAltitude}</p>
          </div>
        </div>

        <div class="observatories-list-box">
          <h4>Key Ground Space Physics Observatories:</h4>
          <ul>
            ${ds.observatories.map(obs => `<li>📡 ${obs}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="climate-tabs-nav">
      <button class="climate-tab-btn ${activeClimateTab === 'co2' ? 'active' : ''}" onclick="switchClimateDatasetTab('co2')">
        🧊 Ice-Core CO2 (800kyr)
      </button>
      <button class="climate-tab-btn ${activeClimateTab === 'seaice' ? 'active' : ''}" onclick="switchClimateDatasetTab('seaice')">
        📉 Sea-Ice Trends (1979-2024)
      </button>
      <button class="climate-tab-btn ${activeClimateTab === 'glaciers' ? 'active' : ''}" onclick="switchClimateDatasetTab('glaciers')">
        🏔️ Glacier Melt Speeds
      </button>
      <button class="climate-tab-btn ${activeClimateTab === 'aurora' ? 'active' : ''}" onclick="switchClimateDatasetTab('aurora')">
        🌌 Aurora Dynamics
      </button>
    </div>
    ${contentHtml}
  `;
}


// ================= RESEARCH REPOSITORY =================
function renderResearchGrid(region = "All", query = "") {
  const grid = document.getElementById("researchGrid");
  if (!grid) return;

  const research = (window.CryoverseData && window.CryoverseData.research) ? window.CryoverseData.research : [];
  const q = query.toLowerCase().trim();

  const papers = research.filter(p => {
    const matchesRegion = region === "All" || (p.region && p.region.toLowerCase() === region.toLowerCase());
    if (!matchesRegion) return false;
    if (!q) return true;
    return (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.abstract && p.abstract.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      (p.authors && p.authors.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  if (papers.length === 0) {
    grid.innerHTML = `
      <div class="no-results-box">
        <p>❄️ No research papers found matching "${query}" in ${region}.</p>
        <button class="secondary-btn" onclick="resetResearchFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = papers.map(p => `
    <div class="research-card" data-region="${p.region}" onclick="viewPaperDetails('${p.id}')">
      <div class="research-card-top">
        <span class="research-category-tag">${p.category.toUpperCase()}</span>
        <span class="research-year-tag">${p.year}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="research-card-author">By ${p.authors.split(",")[0]} et al.</p>
      <p class="research-card-loc">🌍 ${p.region} • ${p.readTime || "12 min read"}</p>
      <div class="research-tags-row">
        ${p.tags ? p.tags.slice(0, 3).map(t => `<span class="rtag">#${t}</span>`).join(" ") : ""}
      </div>
      <button class="view-research-btn" onclick="event.stopPropagation(); viewPaperDetails('${p.id}')">
        View Research →
      </button>
    </div>
  `).join("");
}

function searchResearch() {
  const input = document.getElementById("searchInput");
  const filter = document.getElementById("regionFilter");
  const q = input ? input.value : "";
  const reg = filter ? filter.value : "All";
  renderResearchGrid(reg, q);
}

function filterResearchByRegion(regionName) {
  const filter = document.getElementById("regionFilter");
  if (filter) filter.value = regionName;
  const researchSec = document.getElementById("research");
  if (researchSec) researchSec.scrollIntoView({ behavior: "smooth" });
  renderResearchGrid(regionName, "");
}

function resetResearchFilters() {
  const input = document.getElementById("searchInput");
  const filter = document.getElementById("regionFilter");
  if (input) input.value = "";
  if (filter) filter.value = "All";
  renderResearchGrid("All", "");
}

function researchMessage() {
  viewPaperDetails("res-001");
}

function viewPaperDetails(paperId) {
  const research = (window.CryoverseData && window.CryoverseData.research) ? window.CryoverseData.research : [];
  const paper = research.find(p => p.id === paperId) || research[0];
  if (!paper) return;

  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal paper-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="paper-modal-header">
          <div class="modal-badge">${paper.region} • ${paper.category}</div>
          <h2>${paper.title}</h2>
          <p class="paper-authors"><strong>Authors:</strong> ${paper.authors}</p>
          <p class="paper-meta"><strong>Published:</strong> ${paper.journal} (${paper.year}) | <strong>DOI:</strong> <code>${paper.doi}</code></p>
        </div>
        <div class="modal-content">
          <h3>Abstract</h3>
          <p class="paper-abstract">${paper.abstract}</p>

          <h3>Key Scientific Findings</h3>
          <ul class="modal-bullets">
            ${paper.keyFindings ? paper.keyFindings.map(f => `<li>${f}</li>`).join("") : "<li>Comprehensive in-situ observations documented.</li>"}
          </ul>

          <div class="citation-box">
            <span>📋 CITATION</span>
            <code>${paper.authors} (${paper.year}). ${paper.title}. ${paper.journal}. doi:${paper.doi}</code>
          </div>

          <div class="modal-cta-row">
            <button class="primary-btn" onclick="copyCitation('${paper.doi}')">Copy Citation</button>
            <button class="secondary-btn" onclick="closeModal(); askAiAbout('${paper.title}')">Ask AI About Paper 🤖</button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

function copyCitation(doi) {
  navigator.clipboard.writeText(`DOI: ${doi}`);
  alert("Citation & DOI copied to clipboard!");
}

// ================= USER PORTALS (STUDENT, TEACHER, SCIENTIST, PUBLIC) =================
function openPortal(portalType) {
  let modalContent = "";

  if (portalType === "Student") {
    modalContent = `
      <div class="portal-modal-inner student-view">
        <div class="portal-header">
          <span class="portal-kicker">🎓 STUDENT EXPLORER PORTAL</span>
          <h2>Polar Learning & Discovery Hub</h2>
          <p>Explore hands-on tools, test your knowledge on interactive maps, run climate simulations, flip flashcards, and explore polar careers.</p>
        </div>
        <div class="portal-body">
          <div class="portal-cards-grid">
            <div class="pcard" onclick="closeModal(); startStationQuiz()">
              <span class="pcard-icon">🎯</span>
              <h4>Station Map Quiz (8 Rounds)</h4>
              <p>Locate Himadri, Maitri, Bharati, Himansh, IndARC and Dakshin Gangotri on the map!</p>
              <button class="pcard-btn">Play Map Quiz →</button>
            </div>
            <div class="pcard" onclick="closeModal(); startQuiz()">
              <span class="pcard-icon">🧠</span>
              <h4>General Polar Quiz (12 Questions)</h4>
              <p>Test your knowledge on cryosphere, albedo effect, and polar wildlife with certificate.</p>
              <button class="pcard-btn">Take Quiz →</button>
            </div>
            <div class="pcard" onclick="openFlashcardsModal()">
              <span class="pcard-icon">🃏</span>
              <h4>Polar Study Flashcards</h4>
              <p>Master 16 key polar concepts (Albedo, GLOF, Firn, Katabatic Winds) with interactive flip cards.</p>
              <button class="pcard-btn">Open Flashcards →</button>
            </div>
            <div class="pcard" onclick="closeModal(); showIceAlbedoDemo()">
              <span class="pcard-icon">☀️</span>
              <h4>Ice-Albedo Lab Simulator</h4>
              <p>Experiment with polar ice melt and see how planetary reflectivity changes heat absorption.</p>
              <button class="pcard-btn">Run Experiment →</button>
            </div>
            <div class="pcard" onclick="closeModal(); showCareerModal()">
              <span class="pcard-icon">🚀</span>
              <h4>Polar Career Guide (8 Pathways)</h4>
              <p>Discover how to become a Glaciologist, Polar Marine Biologist, or Logistics Engineer.</p>
              <button class="pcard-btn">Explore Careers →</button>
            </div>
            <div class="pcard" onclick="downloadStudyGuide()">
              <span class="pcard-icon">📚</span>
              <h4>Save Polar Study Notes</h4>
              <p>One-click download of the complete Earth's Cryosphere study guide with stations and formulas.</p>
              <button class="pcard-btn">Save Study Notes (.TXT) →</button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (portalType === "Teacher") {
    const lessons = (window.CryoverseData && window.CryoverseData.lessons) ? window.CryoverseData.lessons : [];
    modalContent = `
      <div class="portal-modal-inner teacher-view">
        <div class="portal-header">
          <span class="portal-kicker">👨‍🏫 TEACHER CLASSROOM PORTAL</span>
          <h2>Polar Science Curricula & Classroom Tools</h2>
          <p>6 standards-aligned lesson plans, step-by-step hands-on experiments, printable worksheets, and evaluation rubrics.</p>
        </div>
        <div class="portal-body">
          <div class="lessons-list">
            ${lessons.map(l => `
              <div class="lesson-item-card">
                <div class="lesson-meta">
                  <span class="lesson-grade">${l.grade}</span>
                  <span class="lesson-time">⏱️ ${l.duration}</span>
                  <span class="lesson-subject">🔬 ${l.subject}</span>
                </div>
                <h4>${l.title}</h4>
                <p>${l.overview}</p>
                <div class="lesson-objectives">
                  <strong>Learning Objectives:</strong>
                  <ul>
                    ${l.objectives.map(o => `<li>${o}</li>`).join("")}
                  </ul>
                </div>
                ${l.labExperiment ? `
                  <div class="lesson-lab-box">
                    <strong>🧪 Hands-On Classroom Lab Protocol:</strong>
                    <p>${l.labExperiment}</p>
                  </div>
                ` : ""}
                <div class="lesson-actions">
                  <button class="primary-btn small" onclick="downloadLessonPack('${l.title}')">📥 Download Complete Lesson Pack (.TXT)</button>
                  <button class="secondary-btn small" onclick="closeModal(); startStationQuiz()">🎯 Launch Class Map Quiz</button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  } else if (portalType === "Scientist") {
    const datasets = (window.CryoverseData && window.CryoverseData.datasets) ? window.CryoverseData.datasets : [];
    modalContent = `
      <div class="portal-modal-inner scientist-view">
        <div class="portal-header">
          <span class="portal-kicker">🔬 SCIENTIST & RESEARCH HUB</span>
          <h2>Polar Time-Series Datasets, Telemetry & Submissions</h2>
          <p>Analyze decadal climate indicators, view station records, export CSV data, and register scientific findings.</p>
        </div>
        <div class="portal-body">
          <div class="dataset-viewer-box">
            <div class="dataset-viewer-controls">
              <label>Select Scientific Time Series:</label>
              <select id="datasetSelector" onchange="renderScientistChart(this.value)">
                ${datasets.map(d => `<option value="${d.id}">${d.title} (${d.region})</option>`).join("")}
              </select>
              <button class="secondary-btn small" onclick="exportDatasetCSV()">📥 Export Raw CSV</button>
            </div>
            <div class="chart-container-box">
              <canvas id="polarDataChart" width="700" height="300"></canvas>
            </div>
            <div id="datasetDescriptionBox" class="dataset-desc-box">
              <p>${datasets[0].description}</p>
              <small>Source: ${datasets[0].source} | Metric: ${datasets[0].parameters}</small>
            </div>
          </div>

          <div class="scientist-submission-box">
            <h3>📤 Submit Research Paper or Dataset to Cryoverse Repository</h3>
            <div class="submission-form-grid">
              <input type="text" id="subTitle" placeholder="Paper / Dataset Title" />
              <select id="subRegion">
                <option value="Arctic">Arctic</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Southern Ocean">Southern Ocean</option>
                <option value="Himalaya">Himalaya</option>
              </select>
              <input type="text" id="subAuthors" placeholder="Authors (e.g. Dr. A. Sharma, NCPOR)" />
              <input type="text" id="subDoi" placeholder="DOI / Citation Reference" />
              <textarea id="subAbstract" placeholder="Abstract / Research Findings summary..." rows="3"></textarea>
              <button class="primary-btn" onclick="submitUserResearch()">Register in Database</button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Public Explorer
    const facts = (window.CryoverseData && window.CryoverseData.facts) ? window.CryoverseData.facts : [];
    const randomFact = facts[Math.floor(Math.random() * facts.length)] || "Antarctica holds 90% of all Earth's terrestrial ice.";
    modalContent = `
      <div class="portal-modal-inner public-view">
        <div class="portal-header">
          <span class="portal-kicker">🌍 PUBLIC POLAR EXPLORER</span>
          <h2>The Frozen World for Everyone</h2>
          <p>Uncover the mysteries of Earth's extremes through 25+ facts, immersive documentary reels, and interactive stories.</p>
        </div>
        <div class="portal-body">
          <div class="fact-generator-card">
            <div class="fact-icon">💡</div>
            <div class="fact-text" id="factDisplay">${randomFact}</div>
            <button class="secondary-btn" onclick="generateNewFact()">Discover Another Polar Fact ❄️ (25 Facts)</button>
          </div>

          <div class="video-section-preview">
            <h3>🎥 Featured Polar Documentary & Expedition Reel</h3>
            <div class="video-embed-wrapper">
              <iframe 
                src="https://www.youtube-nocookie.com/embed/fD3Pq2B45f4?rel=0" 
                title="Indian Antarctic Mission & Polar Science" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            <p><small>Follow the scientific contingents at Maitri and Bharati bases as they endure Antarctic winters to conduct earth observation science.</small></p>
          </div>
        </div>
      </div>
    `;
  }

  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal portal-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="modal-content no-padding">
          ${modalContent}
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);

  if (portalType === "Scientist") {
    setTimeout(() => {
      renderScientistChart("ds-01");
    }, 150);
  }
}

// ================= CHART.JS SCIENTIST VISUALIZER =================
let currentChartInstance = null;
function renderScientistChart(datasetId) {
  const canvas = document.getElementById("polarDataChart");
  if (!canvas) return;

  const datasets = (window.CryoverseData && window.CryoverseData.datasets) ? window.CryoverseData.datasets : [];
  const dataset = datasets.find(d => d.id === datasetId) || datasets[0];
  if (!dataset) return;

  if (typeof Chart !== "undefined") {
    if (currentChartInstance) {
      currentChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, "rgba(0, 240, 255, 0.45)");
    gradient.addColorStop(1, "rgba(0, 240, 255, 0.0)");

    currentChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: dataset.labels,
        datasets: [
          {
            label: `${dataset.title} (${dataset.unit})`,
            data: dataset.data,
            borderColor: "#00f0ff",
            backgroundColor: gradient,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#00f0ff",
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#e2e8f0" } }
        },
        scales: {
          x: { grid: { color: "rgba(255, 255, 255, 0.08)" }, ticks: { color: "#94a3b8" } },
          y: { grid: { color: "rgba(255, 255, 255, 0.08)" }, ticks: { color: "#94a3b8" } }
        }
      }
    });
  } else {
    renderCanvasChartFallback(canvas, dataset);
  }

  const descBox = document.getElementById("datasetDescriptionBox");
  if (descBox) {
    descBox.innerHTML = `
      <p>${dataset.description}</p>
      <small>Source: ${dataset.source} | Metric: ${dataset.parameters} | Updated: ${dataset.updated}</small>
    `;
  }
}

function renderCanvasChartFallback(canvas, dataset) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = "#00f0ff";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px sans-serif";

  const min = Math.min(...dataset.data);
  const max = Math.max(...dataset.data);
  const range = max - min || 1;

  ctx.beginPath();
  dataset.data.forEach((val, i) => {
    const x = 50 + (i / (dataset.data.length - 1)) * (w - 100);
    const y = h - 50 - ((val - min) / range) * (h - 100);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    ctx.fillText(dataset.labels[i], x - 15, h - 20);
  });
  ctx.stroke();
}

function exportDatasetCSV() {
  const sel = document.getElementById("datasetSelector");
  const id = sel ? sel.value : "ds-01";
  const datasets = (window.CryoverseData && window.CryoverseData.datasets) ? window.CryoverseData.datasets : [];
  const ds = datasets.find(d => d.id === id) || datasets[0];

  let csv = "Year / Label,Value (" + ds.unit + ")\n";
  ds.labels.forEach((lbl, i) => {
    csv += `"${lbl}","${ds.data[i]}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${ds.id}_data.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ================= STUDY NOTES & LESSON PACK DOWNLOADS =================
function downloadLessonPack(title) {
  const content = `CRYOVERSE TEACHER LESSON PACK: ${title}
==================================================
Target Audience: K-12 and Undergraduate Earth Science
Subject: Cryosphere & Polar Geophysics
Operator Reference: NCPOR (Ministry of Earth Sciences)

1. Objectives:
- Investigate polar climate feedbacks and ocean interactions.
- Plot and interpret in-situ mass balance and sea ice decline curves.
- Contrast Arctic sea ice melt vs continental ice sheet loss.

2. Hands-on Experiment:
- Fill glass with water and ice cubes (sea ice model). Note water level.
- Place ice cube on a tilted plastic ramp above the glass (land ice model).
- Observe that land ice melting directly increases water level, while sea ice melting does not change water level (Archimedes Principle).

3. Online Portal Resources:
- Interactive Station Map: Himadri, Maitri, Bharati, Himansh
- Polar AI Knowledge Assistant
`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${title.replace(/\s+/g, "_")}_Lesson_Plan.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadStudyGuide() {
  const content = `CRYOVERSE POLAR SCIENCE COMPREHENSIVE STUDY GUIDE
==================================================
1. Research Stations:
• Himadri: Ny-Ålesund, Svalbard, Arctic (78°55'N, 11°56'E).
• Maitri: Schirmacher Oasis, Antarctica (70°45'S, 11°44'E).
• Bharati: Larsemann Hills, Antarctica (69°24'S, 76°11'E).
• Himansh: Chandra Basin, Spiti Valley, Himalaya (32°24'N, 77°36'E, 13,500 ft).
• IndARC: Kongsfjorden underwater mooring (192m depth).
• Dakshin Gangotri: Historic first Antarctic base (1983-84).

2. Core Concepts:
• Albedo: Fresh snow reflects up to 90% of sunlight. Open ocean absorbs 94%.
• Third Pole: The Himalayas hold the largest snow/ice volume outside the poles.
• GLOF: Glacial Lake Outburst Flood triggered by moraine failure.
• Katabatic Winds: Cold gravity-driven drainage winds exceeding 300 km/h.
• Teleconnections: Arctic Barents-Kara sea ice melt influences the Indian Summer Monsoon.
`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "Cryoverse_Comprehensive_Polar_Study_Guide.txt");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function submitUserResearch() {
  const title = document.getElementById("subTitle")?.value.trim();
  const region = document.getElementById("subRegion")?.value;
  const authors = document.getElementById("subAuthors")?.value.trim();
  const doi = document.getElementById("subDoi")?.value.trim();
  const abstract = document.getElementById("subAbstract")?.value.trim();

  if (!title || !authors || !abstract) {
    alert("Please fill in Title, Authors, and Abstract fields.");
    return;
  }

  const newPaper = {
    id: "user-res-" + Date.now(),
    title,
    region,
    category: "Science Submission",
    authors,
    year: new Date().getFullYear(),
    journal: "Cryoverse Community Repository",
    doi: doi || "doi.org/10.cryoverse.user." + Date.now(),
    abstract,
    keyFindings: ["Submitted via Cryoverse Scientist Portal."],
    tags: [region, "Community", "Research"]
  };

  window.cryoDB.add("research", newPaper);
  alert("🎉 Research paper successfully registered in Cryoverse Database!");
  renderResearchGrid();
  closeModal();
}

function generateNewFact() {
  const facts = (window.CryoverseData && window.CryoverseData.facts) ? window.CryoverseData.facts : [];
  const disp = document.getElementById("factDisplay");
  if (disp && facts.length > 0) {
    const cur = disp.innerText;
    let nextFact = facts[Math.floor(Math.random() * facts.length)];
    while (nextFact === cur && facts.length > 1) {
      nextFact = facts[Math.floor(Math.random() * facts.length)];
    }
    disp.innerText = nextFact;
  }
}

// ================= FLASHCARDS MODAL =================
let flashcardIndex = 0;
function openFlashcardsModal() {
  const glossary = (window.CryoverseData && window.CryoverseData.glossary) ? window.CryoverseData.glossary : [];
  flashcardIndex = 0;

  renderFlashcardStep();
}

function renderFlashcardStep() {
  const glossary = (window.CryoverseData && window.CryoverseData.glossary) ? window.CryoverseData.glossary : [];
  const item = glossary[flashcardIndex] || glossary[0];

  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal flashcard-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="modal-header">
          <span class="modal-badge">🃏 POLAR FLASHCARDS (${flashcardIndex + 1} / ${glossary.length})</span>
          <h2>Polar Science Concept Cards</h2>
          <p>Click the card below to flip between the Term and its Scientific Definition!</p>
        </div>
        <div class="modal-content text-center">
          <div class="flashcard-box" id="flashcardBox" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-front">
              <span class="fc-category">${item.category}</span>
              <h3 class="fc-term">${item.term}</h3>
              <p class="fc-prompt">👆 Click or tap to reveal scientific definition</p>
            </div>
            <div class="flashcard-back">
              <span class="fc-category">${item.category}</span>
              <p class="fc-definition">${item.definition}</p>
              <small class="fc-prompt">👆 Click to flip back</small>
            </div>
          </div>
          <div class="flashcard-nav">
            <button class="secondary-btn small" onclick="prevFlashcard()">← Previous Card</button>
            <button class="primary-btn small" onclick="nextFlashcard()">Next Card →</button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

function nextFlashcard() {
  const glossary = (window.CryoverseData && window.CryoverseData.glossary) ? window.CryoverseData.glossary : [];
  flashcardIndex = (flashcardIndex + 1) % glossary.length;
  renderFlashcardStep();
}

function prevFlashcard() {
  const glossary = (window.CryoverseData && window.CryoverseData.glossary) ? window.CryoverseData.glossary : [];
  flashcardIndex = (flashcardIndex - 1 + glossary.length) % glossary.length;
  renderFlashcardStep();
}

// ================= GLOSSARY MODAL =================
function openGlossaryModal() {
  const glossary = (window.CryoverseData && window.CryoverseData.glossary) ? window.CryoverseData.glossary : [];
  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal glossary-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="modal-header">
          <span class="modal-badge">📚 KNOWLEDGE COMPENDIUM</span>
          <h2>A-Z Polar Science Glossary</h2>
          <p>Authoritative definitions of cryospheric, glaciological, and oceanographic terminology.</p>
        </div>
        <div class="modal-content">
          <input type="text" id="glossarySearch" class="glossary-search-input" placeholder="🔎 Filter glossary terms..." onkeyup="filterGlossaryList(this.value)">
          <div class="glossary-grid" id="glossaryGrid">
            ${glossary.map(g => `
              <div class="glossary-card">
                <span class="glossary-cat">${g.category}</span>
                <h4>${g.term}</h4>
                <p>${g.definition}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

function filterGlossaryList(q) {
  const grid = document.getElementById("glossaryGrid");
  const glossary = (window.CryoverseData && window.CryoverseData.glossary) ? window.CryoverseData.glossary : [];
  if (!grid) return;

  const query = q.toLowerCase().trim();
  const filtered = glossary.filter(g => g.term.toLowerCase().includes(query) || g.definition.toLowerCase().includes(query));

  grid.innerHTML = filtered.map(g => `
    <div class="glossary-card">
      <span class="glossary-cat">${g.category}</span>
      <h4>${g.term}</h4>
      <p>${g.definition}</p>
    </div>
  `).join("");
}

// ================= CAREER GUIDE MODAL =================
function showCareerModal() {
  const careers = (window.CryoverseData && window.CryoverseData.careers) ? window.CryoverseData.careers : [];
  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal careers-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="modal-header">
          <span class="modal-badge">🚀 CAREER PATHWAYS (8 FIELDS)</span>
          <h2>Polar Science & Engineering Careers</h2>
          <p>Discover how physics, biology, geology, or robotics can lead to research in Earth's polar extremes.</p>
        </div>
        <div class="modal-content">
          <div class="careers-list">
            ${careers.map(c => `
              <div class="career-card">
                <h4>${c.title}</h4>
                <span class="career-field">${c.field}</span>
                <p>${c.description}</p>
                <div class="career-details">
                  <p><strong>🎓 Education:</strong> ${c.degrees}</p>
                  <p><strong>🏛️ Top Institutes:</strong> ${c.institutes.join(", ")}</p>
                  <p><strong>🥾 Day in the Life:</strong> ${c.dayInLife}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

// ================= ICE-ALBEDO DEMO =================
function showIceAlbedoDemo() {
  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal albedo-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="modal-header">
          <span class="modal-badge">☀️ SIMULATION LAB</span>
          <h2>Ice-Albedo Positive Feedback Simulator</h2>
          <p>Adjust polar ice coverage to observe how surface reflectivity alters planetary heat absorption.</p>
        </div>
        <div class="modal-content">
          <div class="albedo-sim-container">
            <div class="albedo-surface" id="albedoSurface">
              <div class="ice-patch" id="icePatch" style="width: 70%;">
                <span>❄️ Bright Sea Ice (Albedo: 0.85)</span>
              </div>
              <div class="ocean-patch">
                <span>🌊 Dark Ocean Water (Albedo: 0.06)</span>
              </div>
            </div>
            <div class="slider-control">
              <label>Polar Ice Sheet Coverage: <strong id="icePctVal">70%</strong></label>
              <input type="range" id="iceSlider" min="0" max="100" value="70" oninput="updateAlbedoSim(this.value)">
            </div>
            <div class="albedo-metrics-grid">
              <div><span>Global Albedo:</span> <strong id="simAlbedo">0.61</strong></div>
              <div><span>Reflected Solar Energy:</span> <strong id="simReflected">61%</strong></div>
              <div><span>Absorbed Heat Energy:</span> <strong id="simAbsorbed" style="color: #f87171;">39%</strong></div>
            </div>
            <p class="albedo-explanation">
              <strong>The Feedback Mechanism:</strong> When polar ice melts, darker ocean water is exposed, which absorbs significantly more heat instead of reflecting it. This additional warmth accelerates further melting, creating a self-reinforcing climate cycle!
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

function updateAlbedoSim(val) {
  const icePatch = document.getElementById("icePatch");
  const pctVal = document.getElementById("icePctVal");
  const simAlbedo = document.getElementById("simAlbedo");
  const simReflected = document.getElementById("simReflected");
  const simAbsorbed = document.getElementById("simAbsorbed");

  if (!icePatch) return;

  icePatch.style.width = `${val}%`;
  pctVal.innerText = `${val}%`;

  const iceFrac = val / 100;
  const oceanFrac = 1 - iceFrac;
  const totalAlbedo = (iceFrac * 0.85 + oceanFrac * 0.06).toFixed(2);
  const reflectedPct = Math.round(totalAlbedo * 100);
  const absorbedPct = 100 - reflectedPct;

  simAlbedo.innerText = totalAlbedo;
  simReflected.innerText = `${reflectedPct}%`;
  simAbsorbed.innerText = `${absorbedPct}%`;
}

// ================= GENERAL POLAR QUIZ ENGINE (12 QUESTIONS) =================
let quizState = {
  currentIdx: 0,
  score: 0,
  questions: []
};

function startQuiz() {
  const quizzes = (window.CryoverseData && window.CryoverseData.quizzes) ? window.CryoverseData.quizzes : [];
  quizState.questions = quizzes;
  quizState.currentIdx = 0;
  quizState.score = 0;

  renderQuizStep();
}

function renderQuizStep() {
  const { currentIdx, questions, score } = quizState;

  if (currentIdx >= questions.length) {
    renderQuizResults();
    return;
  }

  const q = questions[currentIdx];
  const progressPct = Math.round(((currentIdx + 1) / questions.length) * 100);

  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal quiz-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="quiz-header">
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progressPct}%;"></div>
          </div>
          <div class="quiz-step-meta">
            <span>QUESTION ${currentIdx + 1} OF ${questions.length}</span>
            <span>SCORE: ${score}</span>
          </div>
          <h3>${q.question}</h3>
        </div>
        <div class="modal-content">
          <div class="quiz-options-list" id="quizOptionsList">
            ${q.options.map((opt, idx) => `
              <button class="quiz-option-btn" onclick="submitAnswer(${idx})">
                <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join("")}
          </div>
          <div id="quizFeedbackBox" class="quiz-feedback-box" style="display: none;"></div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

function submitAnswer(chosenIdx) {
  const { currentIdx, questions } = quizState;
  const q = questions[currentIdx];
  const feedbackBox = document.getElementById("quizFeedbackBox");
  const optionsButtons = document.querySelectorAll(".quiz-option-btn");

  optionsButtons.forEach((btn) => (btn.disabled = true));

  const isCorrect = chosenIdx === q.answer;
  if (isCorrect) {
    quizState.score++;
    optionsButtons[chosenIdx].classList.add("correct");
  } else {
    optionsButtons[chosenIdx].classList.add("wrong");
    optionsButtons[q.answer].classList.add("correct");
  }

  if (feedbackBox) {
    feedbackBox.style.display = "block";
    feedbackBox.className = `quiz-feedback-box ${isCorrect ? "feedback-correct" : "feedback-wrong"}`;
    feedbackBox.innerHTML = `
      <p><strong>${isCorrect ? "🎉 Correct!" : "❌ Incorrect."}</strong> ${q.explanation}</p>
      <button class="primary-btn small" onclick="nextQuizQuestion()">Next Question →</button>
    `;
  }
}

function nextQuizQuestion() {
  quizState.currentIdx++;
  renderQuizStep();
}

function renderQuizResults() {
  const { score, questions } = quizState;
  const pct = Math.round((score / questions.length) * 100);

  let badge = "Polar Explorer ❄️";
  if (pct >= 85) badge = "Senior Polar Glaciologist 🏆";
  else if (pct >= 60) badge = "Arctic Field Scientist 🧭";

  const modalHtml = `
    <div class="cryo-modal-overlay" onclick="closeModal(event)">
      <div class="cryo-modal quiz-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div class="quiz-header result-header">
          <span class="badge-tag">QUIZ COMPLETED</span>
          <h2>Your Cryoverse Score</h2>
          <div class="score-circle">
            <span class="score-big">${score}/${questions.length}</span>
            <span class="score-pct">${pct}%</span>
          </div>
          <p class="award-rank">Rank Awarded: <strong>${badge}</strong></p>
        </div>
        <div class="modal-content text-center">
          <p>Great job! Keep exploring the Cryoverse research repository to deepen your expertise.</p>
          <div class="modal-cta-row centered">
            <button class="primary-btn" onclick="startQuiz()">Retake Quiz 🔄</button>
            <button class="secondary-btn" onclick="closeModal(); startStationQuiz()">🎯 Try Station Map Quiz</button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderModal(modalHtml);
}

// ================= FLOATING AI DRAWER =================
function setupFloatingAiDrawer() {
  if (window.cryoAI && typeof window.cryoAI.togglePanel === "function") {
    window.cryoAI.togglePanel();
  }
}

// ================= MODAL INFRASTRUCTURE =================
function renderModal(html) {
  closeModal();
  const container = document.createElement("div");
  container.id = "cryoModalContainer";
  container.innerHTML = html;
  document.body.appendChild(container);
  document.body.style.overflow = "hidden";
}

function closeModal(event) {
  if (event && event.target && !event.target.classList.contains("cryo-modal-overlay") && !event.target.classList.contains("modal-close-btn")) {
    return;
  }
  const container = document.getElementById("cryoModalContainer");
  if (container) {
    container.remove();
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ================= SMOOTH SCROLLING =================
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
