/**
 * CRYOVERSE AUTHORITATIVE POLAR SCIENCE KNOWLEDGE BASE & DATABASE SEED (MASSIVELY EXPANDED)
 * Comprehensive datasets covering Indian & International Polar Missions:
 * Arctic, Antarctica, Southern Ocean, and Himalayan Third Pole.
 */

const CryoverseData = {
  // ================= 1. RESEARCH STATIONS & OBSERVATORIES =================
  stations: [
    {
      id: "himadri",
      name: "Himadri",
      region: "Arctic",
      country: "India",
      flag: "🇮🇳",
      location: "Ny-Ålesund, Spitsbergen, Svalbard, Norway",
      coordinates: { lat: 78.9244, lng: 11.9286 },
      established: 2008,
      altitude: "10 m above sea level",
      elevation: "10 m (33 ft)",
      temperatureRange: "-30°C to +8°C",
      temperatures: {
        annualAverage: "-6.0°C (21.2°F)",
        summerAverage: "+5.0°C (41.0°F)",
        winterAverage: "-15.0°C (5.0°F)",
        recordLow: "-36.5°C (-33.7°F)"
      },
      population: { summer: 12, winter: 4 },
      primaryResearch: "Aerosols & Black Carbon, Fjord Glaciology, Arctic-Indian Monsoon Teleconnections, Cryophilic Genomics",
      researchCategory: "climate change",
      managedBy: "National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences",
      status: "Active (Year-Round / Summer & Extended Winter Campaigns)",
      description: "Himadri is India's first permanent Arctic research station, situated in Ny-Ålesund, the northernmost civilian settlement in the world. It serves as a flagship hub for aerosol monitoring, glaciology, microbial diversity, and Arctic-Indian monsoon teleconnections.",
      keyResearch: [
        "Atmospheric aerosol characterization and long-range pollutant transport",
        "Glacial melt dynamics in Kongsfjorden fjord system",
        "Microbial genomics in cryophilic polar permafrost and snow",
        "Arctic climate oscillations and impact on the Indian Summer Monsoon"
      ],
      facilities: [
        "Atmospheric science laboratory with optical particle counters",
        "Microbiology sample collection & refrigeration chamber (-80°C)",
        "Satellite communication terminal",
        "Access to marine research vessel (RV Teisten) and fjord moorings"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ny-Alesund_%28js%29_2.jpg",
      weather: {
        temp: "-8.4°C",
        feelsLike: "-14.2°C",
        wind: "28 km/h NNW",
        humidity: "82%",
        condition: "Polar Twilight / Light Snow Flurries",
        daylight: "24h Polar Night (Winter) / Midnight Sun (Summer)"
      }
    },
    {
      id: "vostok",
      name: "Vostok Station",
      region: "Antarctica",
      country: "Russia",
      flag: "🇷🇺",
      location: "Princess Elizabeth Land, Inland East Antarctic Ice Sheet",
      coordinates: { lat: -78.4644, lng: 106.8372 },
      elevation: "3,488 m (11,444 ft)",
      altitude: "3,488 m above sea level",
      established: 1957,
      managedBy: "Arctic and Antarctic Research Institute (AARI)",
      primaryResearch: "Glaciology & Deep Ice Coring, Paleoclimatology, Magnetometry, Subglacial Lake Vostok Studies",
      researchCategory: "glaciology",
      population: { summer: 30, winter: 15 },
      temperatures: {
        annualAverage: "-55.2°C (-67.4°F)",
        summerAverage: "-32.0°C (-25.6°F)",
        winterAverage: "-68.0°C (-90.4°F)",
        recordLow: "-89.2°C (-128.6°F, July 21, 1983 - Official World Record)"
      },
      status: "Active (Year-Round High-Plateau Station)",
      description: "Vostok Station is a legendary inland research station in East Antarctica, established in 1957. Situated over the pole of inaccessibility at 3,488 meters elevation, it holds the official record for the coldest recorded surface air temperature on Earth: -89.2°C (-128.6°F) on July 21, 1983. It is renowned for recovering ice cores dating back 420,000 years and exploring subglacial Lake Vostok.",
      keyResearch: [
        "420,000-year continuous ice-core paleoclimate records",
        "Subglacial Lake Vostok exploration (sealed beneath 3.7 km ice)",
        "Earth magnetic field variations and ionospheric cosmic noise",
        "Human physiology under chronic hypoxia and extreme polar isolation"
      ],
      facilities: [
        "Deep ice core drilling complex reaching over 3,769 meters",
        "Geophysical and magnetometric observatory",
        "Under-snow habitat tunnels maintaining living quarters",
        "Independent diesel-electric generator station with heat recuperation"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Vostok_Station_2024.png/1280px-Vostok_Station_2024.png",
      weather: {
        temp: "-64.8°C",
        feelsLike: "-78.2°C",
        wind: "18 km/h SW",
        humidity: "45%",
        condition: "Diamond Dust / Deep Polar Freeze",
        daylight: "Polar Twilight"
      }
    },
    {
      id: "mcmurdo",
      name: "McMurdo Station",
      region: "Antarctica",
      country: "United States",
      flag: "🇺🇸",
      location: "Hut Point Peninsula, Ross Island, Antarctica",
      coordinates: { lat: -77.8419, lng: 166.6863 },
      elevation: "24 m (79 ft)",
      altitude: "24 m above sea level",
      established: 1955,
      managedBy: "National Science Foundation (United States Antarctic Program - USAP)",
      primaryResearch: "Marine Biology, Climate Change, Earth Sciences, Volcanology (Mt. Erebus), Polar Logistics Hub",
      researchCategory: "marine biology",
      population: { summer: 1050, winter: 250 },
      temperatures: {
        annualAverage: "-18.0°C (-0.4°F)",
        summerAverage: "-3.0°C (26.6°F)",
        winterAverage: "-28.0°C (-18.4°F)",
        recordLow: "-50.6°C (-59.1°F)"
      },
      status: "Active (Largest Antarctic Community & Year-Round Hub)",
      description: "McMurdo Station is Antarctica's largest scientific community and logistical gateway, situated on the bare volcanic rock of Hut Point Peninsula on Ross Island. It can house over 1,000 researchers and technicians in the summer, functioning as a full scientific town with laboratories, helipads, sea piers, and skiway airfields.",
      keyResearch: [
        "Antarctic fish antifreeze glycoproteins preventing cell freezing in -1.9°C seawater",
        "Mount Erebus volcanology and persistent active lava lake dynamics",
        "Ross Ice Shelf calving and ocean-ice interaction modeling",
        "Long-duration atmospheric stratospheric balloon flights"
      ],
      facilities: [
        "Albert P. Crary Science and Engineering Center (50,000 sq ft laboratory)",
        "Williams Field and Phoenix Airfield skiway landing strips",
        "Ice-pier docking facility for supply vessels and icebreakers",
        "Satellite communications earth station"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/McMurdo_Station_From_The_Top_Of_Observation_Hill.jpg/1280px-McMurdo_Station_From_The_Top_Of_Observation_Hill.jpg",
      weather: {
        temp: "-16.2°C",
        feelsLike: "-26.4°C",
        wind: "32 km/h S",
        humidity: "62%",
        condition: "Brisk Sea Ice Wind",
        daylight: "24h Daylight (Summer) / Polar Night (Winter)"
      }
    },
    {
      id: "amundsen-scott",
      name: "Amundsen-Scott South Pole Station",
      region: "Antarctica",
      country: "United States",
      flag: "🇺🇸",
      location: "Geographic South Pole (90°00'S), Antarctic High Plateau",
      coordinates: { lat: -90.0000, lng: 0.0000 },
      elevation: "2,835 m (9,301 ft)",
      altitude: "2,835 m on 2,850 m of moving ice",
      established: 1956,
      managedBy: "National Science Foundation (USAP)",
      primaryResearch: "Astrophysics, Cosmology, Cosmic Microwave Background, Neutrino Astronomy (IceCube), Atmospheric Chemistry",
      researchCategory: "astrophysics",
      population: { summer: 150, winter: 50 },
      temperatures: {
        annualAverage: "-49.5°C (-57.1°F)",
        summerAverage: "-28.0°C (-18.4°F)",
        winterAverage: "-60.0°C (-76.0°F)",
        recordLow: "-82.8°C (-117.0°F, June 23, 1982)"
      },
      status: "Active (Year-Round Elevated Station at South Pole)",
      description: "Located at Earth's Geographic South Pole at 90°00'S, Amundsen-Scott sits atop a 2,850-meter-thick slab of moving continental ice. The atmosphere here is exceptionally cold, ultra-dry, and thin, making it the premier terrestrial location for astrophysical telescopes observing the Cosmic Microwave Background and high-energy neutrinos.",
      keyResearch: [
        "IceCube Neutrino Observatory tracking cosmic neutrinos using 5,160 optical sensors in 1 cubic km of deep ice",
        "South Pole Telescope (SPT) and BICEP array observing Cosmic Microwave Background polarization",
        "Global baseline measurements of atmospheric CO2, methane, and halocarbons",
        "Geomagnetic pulsations and auroral oval dynamics during the 6-month polar night"
      ],
      facilities: [
        "Elevated station structure built on stilts to prevent snow burial",
        "IceCube Neutrino Laboratory (ICL) and counting house",
        "Dark Sector Observatory complex for millimeter/submillimeter astronomy",
        "Ski-equipped LC-130 Hercules aircraft groomed snow runway"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Amundsen-Scott_marsstation_ray_h_edit.jpg",
      weather: {
        temp: "-52.1°C",
        feelsLike: "-65.3°C",
        wind: "22 km/h Grid North",
        humidity: "38%",
        condition: "Ultra-Dry Polar Sky / Sub-Zero Radiance",
        daylight: "6-Month Sun / 6-Month Night"
      }
    },
    {
      id: "concordia",
      name: "Concordia Research Station",
      region: "Antarctica",
      country: "France / Italy",
      flag: "🇫🇷 🇮🇹",
      location: "Dome C, East Antarctic Plateau",
      coordinates: { lat: -75.1000, lng: 123.3333 },
      elevation: "3,233 m (10,607 ft)",
      altitude: "3,233 m above sea level",
      established: 2005,
      managedBy: "Institut Polaire Français Paul-Émile Victor (IPEV) & PNRA with ESA",
      primaryResearch: "Paleoclimatology (EPICA Ice Core), Human Spaceflight Simulation (ESA), Astronomy, Glaciology",
      researchCategory: "glaciology",
      population: { summer: 70, winter: 16 },
      temperatures: {
        annualAverage: "-54.5°C (-66.1°F)",
        summerAverage: "-30.0°C (-22.0°F)",
        winterAverage: "-65.0°C (-85.0°F)",
        recordLow: "-84.6°C (-120.3°F)"
      },
      status: "Active (Year-Round High-Altitude Inland Base)",
      description: "Concordia Station is a joint French-Italian inland station erected atop Dome C on the high Antarctic Plateau. Known for drilling the EPICA ice core which revealed 800,000 years of climate history, its complete isolation, hypoxia (equivalent to 3,800m), and 4 months of total polar night make it the European Space Agency's prime analog for long-duration human space missions to the Moon and Mars.",
      keyResearch: [
        "EPICA Dome C 800,000-year continuous ice-core climate record",
        "ESA biomedical and psychological studies on crew isolation for Mars mission preparation",
        "Ultra-high-resolution astronomical seeing due to ultra-thin atmospheric boundary layers",
        "Seismological monitoring of the East Antarctic craton"
      ],
      facilities: [
        "Twin polygonal tower buildings connected by an enclosed elevated bridge",
        "Sub-surface cryogenic ice core storage vaults (-50°C)",
        "Automated astronomical observatory telescope platforms",
        "Closed-loop greywater recycling system identical to spacecraft life-support"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/ConcordiaFromTower.jpg",
      weather: {
        temp: "-61.4°C",
        feelsLike: "-73.0°C",
        wind: "15 km/h E",
        humidity: "40%",
        condition: "Pristine Ice Plateau / Crystal Calm",
        daylight: "Continuous Polar Sun / Twilight"
      }
    },
    {
      id: "svalbard-nyalesund",
      name: "Svalbard Science Centre & Ny-Ålesund",
      region: "Arctic",
      country: "Norway / International",
      flag: "🇳🇴 🌐",
      location: "Spitsbergen, Svalbard Archipelago (78°55'N)",
      coordinates: { lat: 78.9244, lng: 11.9286 },
      elevation: "10 m (33 ft)",
      altitude: "10 m above sea level",
      established: 1968,
      managedBy: "Kings Bay AS & UNIS (Hosts international bases including Himadri, AWIPEV)",
      primaryResearch: "Climate Change, Arctic Amplification, Atmospheric Aerosols, Marine Fjord Ecology, Svalbard Global Seed Vault",
      researchCategory: "climate change",
      population: { summer: 180, winter: 35 },
      temperatures: {
        annualAverage: "-5.5°C (22.1°F)",
        summerAverage: "+5.2°C (41.4°F)",
        winterAverage: "-14.0°C (6.8°F)",
        recordLow: "-42.2°C (-44.0°F)"
      },
      status: "Active (Premier International Arctic Science Hub)",
      description: "Ny-Ålesund in Svalbard is the world's northernmost permanent civilian settlement and a world-renowned polar research village. Hosting laboratories from over 11 nations (including Norway, India's Himadri, Germany/France AWIPEV, Japan, and the UK), it enforces a strict 20 km radio-quiet zone to enable sensitive space physics, greenhouse gas measurements, and fjord ecology.",
      keyResearch: [
        "Arctic Amplification warming rates up to four times greater than the global average",
        "Svalbard Global Seed Vault safeguarding >1.2 million global seed accessions in permafrost",
        "Kongsfjorden marine ecology and Atlantic water inflow dynamics",
        "Rocket sounding launches into the polar cusp aurora"
      ],
      facilities: [
        "Atmospheric monitoring Zeppelin Observatory at 474m altitude",
        "Marine Laboratory with pumped seawater experimental tanks",
        "Kings Bay harbor, pier, and Ny-Ålesund Hamnerabben airstrip",
        "International Arctic multi-nation research station cluster"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ny-Alesund_%28js%29_2.jpg",
      weather: {
        temp: "-7.5°C",
        feelsLike: "-13.8°C",
        wind: "24 km/h NNW",
        humidity: "79%",
        condition: "Fjord Frost / Polar Dusk",
        daylight: "Polar Twilight"
      }
    },
    {
      id: "rothera",
      name: "Rothera Research Station",
      region: "Antarctica",
      country: "United Kingdom",
      flag: "🇬🇧",
      location: "Rothera Point, Adelaide Island, Antarctic Peninsula",
      coordinates: { lat: -67.5700, lng: -68.1250 },
      elevation: "16 m (52 ft)",
      altitude: "16 m above sea level",
      established: 1975,
      managedBy: "British Antarctic Survey (BAS)",
      primaryResearch: "Marine Biology, Climate Change, Glaciology, Aviation & Logistic Gateway, Bonner Marine Lab",
      researchCategory: "marine biology",
      population: { summer: 130, winter: 22 },
      temperatures: {
        annualAverage: "-5.3°C (22.5°F)",
        summerAverage: "+1.5°C (34.7°F)",
        winterAverage: "-11.0°C (12.2°F)",
        recordLow: "-39.3°C (-38.7°F)"
      },
      status: "Active (Year-Round British Antarctic Flagship)",
      description: "Rothera is the UK's largest Antarctic facility and the primary logistical gateway for British polar science. Located on Adelaide Island off the Antarctic Peninsula, it features a 900-meter gravel runway for Twin Otter ski aircraft and the advanced Bonner Marine Laboratory, studying one of the planet's fastest-warming maritime polar regions.",
      keyResearch: [
        "Antarctic Peninsula rapid maritime warming and benthic biodiversity shifts",
        "Ice shelf calving and grounding line retreat on Larsen and George VI shelves",
        "Long-term marine biological monitoring in Ryder Bay",
        "Meteorological telemetry supporting BAS aircraft and field parties"
      ],
      facilities: [
        "Bonner Marine Laboratory with scuba diving dive-shack and flow-through aquaria",
        "Modern multi-story Discovery Building",
        "Biscoe Wharf accommodating polar research ship RRS Sir David Attenborough",
        "900m runway, aircraft hangars, and aviation fuel depot"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/0/01/BAS_Rothera.jpg",
      weather: {
        temp: "-3.8°C",
        feelsLike: "-9.2°C",
        wind: "25 km/h NW",
        humidity: "85%",
        condition: "Maritime Coastal Overcast",
        daylight: "Midsummer Extended Daylight"
      }
    },
    {
      id: "halley-vi",
      name: "Halley VI Research Station",
      region: "Antarctica",
      country: "United Kingdom",
      flag: "🇬🇧",
      location: "Brunt Ice Shelf, Weddell Sea, Antarctica",
      coordinates: { lat: -75.5800, lng: -25.5000 },
      elevation: "35 m on floating ice shelf",
      altitude: "35 m above sea level",
      established: 2012,
      managedBy: "British Antarctic Survey (BAS)",
      primaryResearch: "Atmospheric Chemistry, Ozone Hole Monitoring, Space Weather, Geomagnetism",
      researchCategory: "astrophysics",
      population: { summer: 70, winter: 0 },
      temperatures: {
        annualAverage: "-18.9°C (-2.0°F)",
        summerAverage: "-4.5°C (23.9°F)",
        winterAverage: "-32.0°C (-25.6°F)",
        recordLow: "-55.3°C (-67.5°F)"
      },
      status: "Active (Summer Operational / Autonomous Winter Mode)",
      description: "Halley VI is the world's first fully relocatable polar research station, famous for being where BAS scientists discovered the Antarctic Ozone Hole in 1985. The entire station is composed of eight modular pods mounted on hydraulic legs fitted with giant snow skis, enabling it to be towed inland when cracks in the floating Brunt Ice Shelf threaten its location.",
      keyResearch: [
        "Discovery and continuous long-term monitoring of the Antarctic Ozone Hole (Dobson spectrophotometer)",
        "Space weather observation of solar flares and ionospheric storms affecting GPS/satellites",
        "Geomagnetic conjugate observations paired with Northern Hemisphere Arctic receivers",
        "Tropospheric chemistry and greenhouse gas sampling"
      ],
      facilities: [
        "Eight interconnecting ski-mounted pods with hydraulic height adjustment",
        "Central double-height red pod housing dining and recreation space",
        "Autonomous automated winter micro-turbine power generation system",
        "VLF radio receiver antennae array"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Halley_VI_Antarctic_Research_Station_-_Science_modules.jpg",
      weather: {
        temp: "-21.5°C",
        feelsLike: "-32.0°C",
        wind: "35 km/h E",
        humidity: "72%",
        condition: "Drifting Ice Crystals / Shelf Winds",
        daylight: "24h Polar Sunlight"
      }
    },
    {
      id: "summit-station",
      name: "Summit Station",
      region: "Arctic",
      country: "United States",
      flag: "🇺🇸",
      location: "Apex of the Greenland Ice Sheet",
      coordinates: { lat: 72.5800, lng: -38.4500 },
      elevation: "3,216 m (10,551 ft)",
      altitude: "3,216 m on 3,053 m of ice",
      established: 1989,
      managedBy: "National Science Foundation (NSF)",
      primaryResearch: "Deep Ice Cores (GISP2), Atmospheric Chemistry, Boundary Layer Meteorology, Greenland Mass Loss",
      researchCategory: "glaciology",
      population: { summer: 45, winter: 5 },
      temperatures: {
        annualAverage: "-31.5°C (-24.7°F)",
        summerAverage: "-11.0°C (12.2°F)",
        winterAverage: "-45.0°C (-49.0°F)",
        recordLow: "-63.3°C (-81.9°F)"
      },
      status: "Active (Year-Round High-Altitude Arctic Ice Sheet Base)",
      description: "Summit Station sits at the very apex of the Greenland Ice Sheet at 3,216 meters elevation. Operating year-round, it provides invaluable baseline measurements of Arctic atmospheric composition, air-snow chemical interactions, and was the site of the famed Greenland Ice Sheet Project 2 (GISP2) 3,053-meter ice core.",
      keyResearch: [
        "GISP2 110,000-year ice core detailing abrupt Dansgaard-Oeschger climate events",
        "Tracking unprecedented summer Greenland ice sheet surface melt episodes",
        "Northern Hemisphere baseline monitoring of greenhouse gases, black carbon, and aerosols",
        "High-altitude cosmic ray and solar radiation measurements"
      ],
      facilities: [
        "Elevated 'Big House' command structure jacked above accumulating snow",
        "Atmospheric Watch Observatory (AWO) with clean-air sector",
        "Groomed skiway runway for ski-equipped LC-130 aircraft",
        "Temporary berthing tents and heated science modular pods"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Summit_Camp_Big_House.JPG",
      weather: {
        temp: "-34.2°C",
        feelsLike: "-46.0°C",
        wind: "20 km/h W",
        humidity: "50%",
        condition: "High-Altitude Snow Plateau",
        daylight: "Sun Above Horizon"
      }
    },
    {
      id: "princess-elisabeth",
      name: "Princess Elisabeth Antarctica",
      region: "Antarctica",
      country: "Belgium",
      flag: "🇧🇪",
      location: "Utsteinen Nunatak, Queen Maud Land",
      coordinates: { lat: -71.9499, lng: 23.3475 },
      elevation: "1,397 m (4,583 ft)",
      altitude: "1,397 m above sea level",
      established: 2009,
      managedBy: "International Polar Foundation (IPF)",
      primaryResearch: "Zero-Emission Polar Architecture, Glaciology, Meteorites, Aerobiology, Solar/Wind Hybrid Microgrids",
      researchCategory: "climate change",
      population: { summer: 40, winter: 0 },
      temperatures: {
        annualAverage: "-24.0°C (-11.2°F)",
        summerAverage: "-8.0°C (17.6°F)",
        winterAverage: "-38.0°C (-36.4°F)",
        recordLow: "-50.0°C (-58.0°F)"
      },
      status: "Active (World's First Zero-Emission Polar Station)",
      description: "Princess Elisabeth Antarctica is the world's first certified zero-emission polar research station. Located on a granite ridge in Queen Maud Land, it operates completely without fossil fuels for electricity, utilizing wind turbines, photovoltaic solar panels, solar thermal collectors, and a smart energy management microgrid.",
      keyResearch: [
        "100% renewable energy integration in sub-zero polar environments",
        "Glaciological radar surveys of the Sor Rondane Mountains and coastal ice shelves",
        "Systematic search and recovery of pristine Antarctic blue-ice meteorites",
        "Aerobiology tracking airborne microorganisms and pollen across continental ice"
      ],
      facilities: [
        "Aerodynamic layered wooden shell with ultra-thick polystyrene insulation",
        "Nine high-yield polar wind turbines and extensive solar arrays",
        "Closed-circuit water treatment and bioreactor recycling system",
        "Smart energy distribution computer allocating power automatically"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/1062_Princess-Elizabethbasis_Antarctica.jpg",
      weather: {
        temp: "-14.5°C",
        feelsLike: "-23.0°C",
        wind: "30 km/h ESE",
        humidity: "55%",
        condition: "Wind Powered Clean Sky",
        daylight: "24h Solar Exposure"
      }
    },
    {
      id: "maitri",
      name: "Maitri",
      region: "Antarctica",
      country: "India",
      location: "Schirmacher Oasis, Queen Maud Land, East Antarctica",
      coordinates: { lat: -70.7658, lng: 11.7348 },
      established: 1989,
      altitude: "130 m above sea level",
      temperatureRange: "-40°C to +3°C",
      managedBy: "National Centre for Polar and Ocean Research (NCPOR)",
      status: "Active (Year-Round Operation)",
      description: "Maitri is India's second research base in Antarctica and has been continuously operational since 1989. Located in the rocky, ice-free Schirmacher Oasis, it sits beside the pristine freshwater Lake Priyadarshini and supports year-round scientific contingents of up to 25 winter-over personnel.",
      keyResearch: [
        "Geological mapping and paleoclimate reconstruction from ice cores",
        "Geomagnetism, ionospheric observations, and auroral physics",
        "Meteorology, greenhouse gas monitoring, and UV radiation tracking",
        "Human physiology, extreme cold adaptation, and polar medicine"
      ],
      facilities: [
        "Main living habitat with winter survival shelter for 25 scientists",
        "Lake Priyadarshini water purification & closed-cycle treatment plant",
        "Geomagnetic observatory & high-frequency radio lab",
        "Seismological station linked to global seismic network"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/An_aerial_view_of_the_Indian_Station_Maitri%2C_Antarctica_on_February_2%2C_2005.jpg",
      weather: {
        temp: "-18.6°C",
        feelsLike: "-27.1°C",
        wind: "42 km/h SE",
        humidity: "64%",
        condition: "Brisk Blizzard / Clear Ice Horizon",
        daylight: "Continuous Daylight / Midnight Sun"
      }
    },
    {
      id: "bharati",
      name: "Bharati",
      region: "Antarctica",
      country: "India",
      location: "Larsemann Hills, East Antarctica",
      coordinates: { lat: -69.4072, lng: 76.1908 },
      established: 2012,
      altitude: "35 m above sea level",
      temperatureRange: "-38°C to +5°C",
      managedBy: "National Centre for Polar and Ocean Research (NCPOR)",
      status: "Active (Year-Round State-of-the-Art Station)",
      description: "Bharati is India's third Antarctic base and one of the most technologically advanced and architecturally sustainable polar stations in the world. Built on stilts from 134 modular shipping containers, it minimizes environmental footprint while serving as an oceanographic hub and ISRO deep-space / remote-sensing telemetry ground station.",
      keyResearch: [
        "Oceanographic circulation in Prydz Bay and Southern Ocean heat fluxes",
        "Breakup history of the ancient Gondwana supercontinent (India-Antarctica link)",
        "Atmospheric boundary layer dynamics & aerosol chemical profiling",
        "Real-time earth observation satellite data reception for ISRO"
      ],
      facilities: [
        "Three-story stilt structure engineered to withstand 300 km/h katabatic winds",
        "ISRO high-speed satellite telemetry downlink antenna dome",
        "Seawater reverse-osmosis desalination plant & combined heat/power unit",
        "Modern analytical chemistry, microbiology & physical oceanography laboratories"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg",
      weather: {
        temp: "-12.1°C",
        feelsLike: "-21.5°C",
        wind: "36 km/h ENE",
        humidity: "71%",
        condition: "Pristine Ice Glare / Katabatic Gusts",
        daylight: "24h Polar Day"
      }
    },
    {
      id: "himansh",
      name: "Himansh",
      region: "Himalaya",
      country: "India",
      location: "Chandra Basin, Spiti Valley, Himachal Pradesh, India",
      coordinates: { lat: 32.4087, lng: 77.6111 },
      established: 2016,
      altitude: "4,080 m (13,500 ft) above sea level",
      temperatureRange: "-32°C to +15°C",
      managedBy: "National Centre for Polar and Ocean Research (NCPOR)",
      status: "Active High-Altitude Field Station",
      description: "Himansh ('a slice of ice') is India's premier high-altitude research station in the Western Himalayas, situated at over 13,500 ft in the rugged Chandra basin. It acts as the anchor for Himalayan cryosphere observation, studying glaciers that feed major South Asian river systems.",
      keyResearch: [
        "Mass balance & retreat rates of benchmark glaciers (Bara Shigri, Samudra Tapu)",
        "Ground Penetrating Radar (GPR) ice thickness profiling",
        "Black carbon and atmospheric dust deposition on snow albedo",
        "Glacial lake outburst flood (GLOF) early warning and hydrological modeling"
      ],
      facilities: [
        "Unmanned Automated Weather Stations (AWS) network across glacier elevations",
        "Deep ice-core drill setup and cryogenic sample transport systems",
        "High-altitude acclimation living pod with solar heating array",
        "Differential GPS (DGPS) monitoring network for glacier flow dynamics"
      ],
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      weather: {
        temp: "-6.2°C",
        feelsLike: "-11.8°C",
        wind: "22 km/h WNW",
        humidity: "48%",
        condition: "High-Altitude Crisp Sky / Snowpack",
        daylight: "Clear Alpine Daylight"
      }
    },
    {
      id: "dakshin-gangotri",
      name: "Dakshin Gangotri",
      region: "Antarctica",
      country: "India",
      location: "Princess Astrid Coast, Queen Maud Land, Antarctica",
      coordinates: { lat: -70.0883, lng: 12.0083 },
      established: 1983,
      altitude: "Ice Shelf Surface",
      temperatureRange: "-50°C to 0°C",
      managedBy: "Indian Antarctic Programme",
      status: "Historic Heritage Site (Submerged under ice shelf / preserved)",
      description: "Dakshin Gangotri was India's historic first permanent research station in Antarctica, erected in 1983-84 during the 3rd Indian Antarctic Expedition. After 7 years of heroic service, it was slowly buried by heavy polar snow drifts and decommissioned in 1990, replaced by Maitri. Today it is preserved as an Antarctic Treaty Historic Site.",
      keyResearch: [
        "Pioneering Antarctic meteorology and biology",
        "Ice shelf flow and accumulation measurements",
        "Foundational human endurance studies in polar isolation"
      ],
      facilities: [
        "Original wooden double-walled hut (historic memorial)",
        "Historical fuel and equipment depot"
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%E0%A4%A6%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%BF%E0%A4%A3_%E0%A4%97%E0%A4%82%E0%A4%97%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80%2C_%E0%A4%85%E0%A4%82%E0%A4%9F%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%95%E0%A4%9F%E0%A4%BF%E0%A4%95%E0%A4%BE.jpg/1280px-%E0%A4%A6%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%BF%E0%A4%A3_%E0%A4%97%E0%A4%82%E0%A4%97%E0%A5%8B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80%2C_%E0%A4%85%E0%A4%82%E0%A4%9F%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%95%E0%A4%9F%E0%A4%BF%E0%A4%95%E0%A4%BE.jpg",
      weather: {
        temp: "-22.0°C",
        feelsLike: "-33.0°C",
        wind: "45 km/h E",
        humidity: "75%",
        condition: "Historic Ice Shelf / Drifting Snow",
        daylight: "Polar Sun"
      }
    },
    {
      id: "indarc",
      name: "IndARC Observatory",
      region: "Arctic",
      country: "India",
      location: "Kongsfjorden Fjord, Svalbard (Marine Mooring)",
      coordinates: { lat: 78.9950, lng: 12.0800 },
      established: 2014,
      altitude: "192 m underwater (Sub-surface mooring)",
      temperatureRange: "-1.8°C to +4°C (Marine)",
      managedBy: "NCPOR & National Institute of Ocean Technology (NIOT)",
      status: "Active Multi-Sensor Underwater Mooring",
      description: "IndARC is India's first multi-sensor underwater moored ocean observatory in the Arctic, deployed in the middle of Kongsfjorden at a depth of 192 meters. It collects continuous oceanographic time-series data throughout the grueling Arctic winter when surface ships cannot navigate.",
      keyResearch: [
        "Atlantic water intrusion and its role in melting Arctic marine-terminating glaciers",
        "Year-round salinity, temperature, and current profile tracking",
        "Arctic marine acoustic environment and biological bloom triggers"
      ],
      facilities: [
        "Acoustic Doppler Current Profiler (ADCP)",
        "Conductivity-Temperature-Depth (CTD) sensor chains",
        "Dissolved oxygen and photosynthetic active radiation (PAR) loggers"
      ],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      weather: {
        temp: "+1.2°C (Water)",
        feelsLike: "Water column depth 192m",
        wind: "Surface Current 0.3 knots",
        humidity: "100%",
        condition: "Sub-surface Glacial Fjord Water",
        daylight: "Benthic Darkness"
      }
    }
  ],

  // ================= 2. RESEARCH PAPERS REPOSITORY (20 PAPERS) =================
  research: [
    {
      id: "res-001",
      title: "Arctic Amplification and its Dynamic Linkage to Indian Summer Monsoon Teleconnections",
      region: "Arctic",
      category: "Climate",
      authors: "Dr. K. S. Murthy, Dr. A. Rajagopal, Dr. M. Ravichandran",
      year: 2025,
      journal: "Journal of Polar Climate & Geophysical Research, Vol. 42",
      doi: "10.1016/j.polar.2025.104821",
      citations: 38,
      tags: ["Arctic", "Climate", "Monsoon", "Teleconnections", "Sea Ice"],
      abstract: "This study utilizes decade-long atmospheric profiling from Himadri station (Ny-Ålesund) alongside CMIP6 high-resolution climate simulations to demonstrate how rapid Arctic sea-ice loss in the Barents-Kara seas induces stationary Rossby wave trains that modulate upper-tropospheric jet streams, causing precipitation anomalies across the Indian subcontinent.",
      keyFindings: [
        "A 10% decrease in Barents-Kara winter ice extent correlates with a 6-8 day delay in monsoon onset over central India.",
        "Increased Arctic warming weakens mid-latitude baroclinicity, causing meandering jet streams.",
        "Ground observations at Himadri confirm winter boundary-layer heat fluxes up to 45 W/m² higher than 2008 baselines."
      ],
      readTime: "12 min read"
    },
    {
      id: "res-002",
      title: "Mass Balance and Calving Dynamics of East Antarctic Ice Sheet: Observations from Bharati & Maitri",
      region: "Antarctica",
      category: "Cryosphere",
      authors: "Dr. Thamban Meloth, Dr. Swati Nagar, Dr. R. Asthana",
      year: 2024,
      journal: "Antarctic Glaciology & Geosciences, Vol. 58",
      doi: "10.1029/2024AG009182",
      citations: 54,
      tags: ["Antarctica", "Cryosphere", "Ice Sheet", "Bharati", "Glacier"],
      abstract: "Combining spaceborne InSAR, GNSS ground stations at Larsemann Hills (Bharati) and Schirmacher Oasis (Maitri), and deep radar sounding surveys, we present a high-resolution mass budget of East Antarctic coastal glaciers. While the interior polar plateau remains relatively stable, coastal outlet glaciers show increased grounding-line retreat.",
      keyFindings: [
        "Schirmacher Oasis peripheral ice tongues experienced -0.28 m/yr water equivalent thinning over 2018-2024.",
        "Prydz Bay coastal currents measured from Bharati indicate 0.4°C subsurface warming, eroding ice shelves from below.",
        "Subglacial topography mapping reveals deep troughs allowing ocean water intrusion under coastal ice."
      ],
      readTime: "15 min read"
    },
    {
      id: "res-003",
      title: "Biogeochemical Carbon Sequestration and Krill Biomass Shifts in the Indian Sector of the Southern Ocean",
      region: "Southern Ocean",
      category: "Ocean",
      authors: "Dr. Sarat C. Tripathy, Dr. P. V. Bhaskar, Dr. Neelu Singh",
      year: 2025,
      journal: "Marine Ecology & Deep-Sea Res. Part II",
      doi: "10.1016/j.dsr2.2025.105118",
      citations: 29,
      tags: ["Southern Ocean", "Ocean", "Marine", "Carbon Flux", "Krill"],
      abstract: "During the 14th Indian Southern Ocean Expedition aboard RV Bharati, multi-depth biogeochemical assays analyzed the biological carbon pump across the Subtropical, Subantarctic, and Polar Fronts. Changes in silicate-to-nitrate ratios and diatom-to-phaeocystis community shifts show significant impacts on particulate organic carbon export.",
      keyFindings: [
        "Particulate organic carbon (POC) flux at 100m depth averaged 82 mg C/m²/day in the Polar Frontal Zone.",
        "Antarctic krill (Euphausia superba) swarms have shifted 1.8 degrees southward compared to 2010 surveys.",
        "Ocean acidification (pH decrease of 0.04 over 15 years) is beginning to affect pteropod shell calcification."
      ],
      readTime: "10 min read"
    },
    {
      id: "res-004",
      title: "Decadal Glacier Thinning and Hydrological Runoff Modeling in the Chandra-Spiti Basin from Himansh Station",
      region: "Himalaya",
      category: "Cryosphere",
      authors: "Dr. Parmanand Sharma, Dr. Bhanu Pratap, Dr. Lavkush Patel",
      year: 2024,
      journal: "The Cryosphere, Vol. 18",
      doi: "10.5194/tc-18-2024-89",
      citations: 47,
      tags: ["Himalaya", "Cryosphere", "Glacier", "Himansh", "Third Pole"],
      abstract: "Long-term monitoring at Himansh high-altitude field station provides continuous in-situ glacio-meteorological data for the benchmark Bara Shigri and Samudra Tapu glaciers. Unmanned aerial vehicles (UAVs) and ground-penetrating radar quantify debris cover insulation effects versus supraglacial pond melt acceleration.",
      keyFindings: [
        "Bara Shigri glacier exhibited an average mass deficit of -0.74 m w.e. per year between 2016 and 2024.",
        "Supraglacial ponds and ice cliffs account for 28% of total glacier ablation despite covering only 6% of glacier surface.",
        "Peak meltwater runoff in the Chandra river has advanced by 14 days, with profound implications for downstream agriculture."
      ],
      readTime: "14 min read"
    },
    {
      id: "res-005",
      title: "Microbial Extremophiles and Novel Cold-Active Enzymes in Svalbard Permafrost",
      region: "Arctic",
      category: "Biodiversity",
      authors: "Dr. Archana Singh, Dr. S. Shivaji, Dr. K. P. Krishnan",
      year: 2025,
      journal: "Polar Biology & Applied Microbiology, Vol. 48",
      doi: "10.1007/s00300-025-03211-1",
      citations: 22,
      tags: ["Arctic", "Microbiology", "Extremophiles", "Himadri", "Biotechnology"],
      abstract: "Cryogenic core samples collected near Himadri station revealed 42 novel psychrotolerant bacterial strains. Functional metagenomics identified polyketide synthases and cold-active lipases that retain >70% enzymatic activity at 4°C, presenting huge industrial and pharmaceutical potential.",
      keyFindings: [
        "Isolation of Pseudomonas svalbardensis producing antifreeze glycoproteins inhibiting ice recrystallization.",
        "Cold-adapted enzymes reduce thermal energy costs in detergent manufacturing by up to 60%.",
        "Ancient permafrost layers contain intact metabolic pathways adapted to extreme desiccation and sub-zero survival."
      ],
      readTime: "11 min read"
    },
    {
      id: "res-006",
      title: "Atmospheric Black Carbon and Mineral Dust Deposition on Himalayan Snow Albedo",
      region: "Himalaya",
      category: "Atmosphere",
      authors: "Dr. Amit Kumar, Dr. V. D. Joshi, Dr. Thamban Meloth",
      year: 2025,
      journal: "Atmospheric Chemistry & Physics, Vol. 25",
      doi: "10.5194/acp-25-2025-44",
      citations: 31,
      tags: ["Himalaya", "Atmosphere", "Black Carbon", "Albedo", "Himansh"],
      abstract: "Real-time soot absorption photometers and snowpack chemistry samplers deployed at Himansh station measure light-absorbing impurities. We demonstrate that pre-monsoon deposition of anthropogenic black carbon reduces snow albedo by 4-8%, triggering premature seasonal snowmelt.",
      keyFindings: [
        "Pre-monsoon black carbon concentrations in fresh snow ranged between 45 and 280 ppb.",
        "Albedo reduction caused by dust and black carbon increases radiative forcing by +12.4 W/m².",
        "Trajectory analysis pinpoints transboundary emissions and regional biomass burning as primary sources."
      ],
      readTime: "13 min read"
    },
    {
      id: "res-007",
      title: "Paleoclimate Reconstruction over 50,000 Years from Central Dronning Maud Land Ice Cores",
      region: "Antarctica",
      category: "Geology",
      authors: "Dr. C. M. Lal, Dr. R. Mohan, Dr. Thamban Meloth",
      year: 2024,
      journal: "Quaternary Science Reviews, Vol. 332",
      doi: "10.1016/j.quascirev.2024.108420",
      citations: 62,
      tags: ["Antarctica", "Ice Core", "Paleoclimate", "Maitri", "Geology"],
      abstract: "Oxygen isotope ratios (δ18O), deuterium excess, and trapped atmospheric methane from a 650m ice core recovered near Maitri base unlock high-resolution climate records spanning the Last Glacial Maximum into the Holocene.",
      keyFindings: [
        "Identification of millennial-scale Antarctic Isotope Maxima (AIM) events synchronizing with Atlantic Meridional Overturning Circulation.",
        "Methane spikes coincide precisely with abrupt Northern Hemisphere warming phases, highlighting inter-hemispheric coupling.",
        "Modern accumulation rates over the Schirmacher Oasis are 15% higher than the pre-industrial average."
      ],
      readTime: "16 min read"
    },
    {
      id: "res-008",
      title: "Circumpolar Deep Water Upwelling and Sea-Ice Dynamics in the Ross & Weddell Gyres",
      region: "Southern Ocean",
      category: "Ocean",
      authors: "Dr. S. M. Pednekar, Dr. Anoop Kumar, Dr. M. Ravichandran",
      year: 2024,
      journal: "Deep-Sea Research, Vol. 198",
      doi: "10.1016/j.dsr.2024.103982",
      citations: 41,
      tags: ["Southern Ocean", "Ocean", "Sea Ice", "Circumpolar", "Upwelling"],
      abstract: "Argo float profiles combined with acoustic current meters trace the shoaling of warm, salty Circumpolar Deep Water (CDW). The intrusion of CDW onto the continental shelf enhances basal melt beneath ice shelves and shapes sea-ice concentration variability.",
      keyFindings: [
        "CDW core temperature along the Indian Antarctic sector warmed by 0.18°C per decade since 2000.",
        "Shoaling of the pycnocline brings micronutrient iron into euphotic zones, fueling summer phytoplankton blooms.",
        "Polynya formation frequency has doubled along the East Antarctic margin due to localized wind stress changes."
      ],
      readTime: "13 min read"
    },
    {
      id: "res-009",
      title: "Microplastics in Svalbard Snowpack and Kongsfjorden Marine Surface Waters",
      region: "Arctic",
      category: "Pollution",
      authors: "Dr. Geetika Sen, Dr. K. P. Krishnan, Dr. Anoop Tiwari",
      year: 2025,
      journal: "Environmental Science & Technology, Vol. 59",
      doi: "10.1021/acs.est.2025.10984",
      citations: 18,
      tags: ["Arctic", "Microplastics", "Pollution", "Kongsfjorden", "Atmosphere"],
      abstract: "Investigation of pristine seasonal snow in Ny-Ålesund and surface waters of Kongsfjorden using FTIR spectroscopy. Microplastic fibers and tire wear particles were quantified, revealing long-range airborne transport from populated mid-latitudes.",
      keyFindings: [
        "Snowpack near Himadri station exhibited an average of 14.2 microplastic particles per liter of melted snow.",
        "Polyester and polyethylene terephthalate (PET) fibers constituted 68% of identified synthetic polymers.",
        "Atmospheric modeling reveals fast trans-Eurasian jet transport delivering particulates within 5 to 7 days."
      ],
      readTime: "9 min read"
    },
    {
      id: "res-010",
      title: "Glacial Lake Outburst Flood (GLOF) Vulnerability Assessment across the Western Himalayas",
      region: "Himalaya",
      category: "Cryosphere",
      authors: "Dr. Sunil Dhar, Dr. Bhanu Pratap, Dr. Pradeep Srivastava",
      year: 2024,
      journal: "Natural Hazards & Earth System Sciences, Vol. 24",
      doi: "10.5194/nhess-24-2024-112",
      citations: 35,
      tags: ["Himalaya", "GLOF", "Disaster", "Spiti", "Hazards"],
      abstract: "Utilizing multitemporal satellite imagery from 1990 to 2024 and in-situ bathymetric sounding from Himansh station, this study identifies 14 high-risk moraine-dammed glacial lakes in the Chandra-Bhaga catchment susceptible to catastrophic breaches.",
      keyFindings: [
        "Glacial lake total surface area in the Spiti-Chandra basin expanded by 84% since 1995.",
        "Hydrodynamic 2D breach simulations project peak downstream flood discharges exceeding 4,200 m³/s.",
        "Establishment of automated water-level sensor telemetry at Himansh provides up to 45 minutes of advance community evacuation warning."
      ],
      readTime: "14 min read"
    },
    {
      id: "res-011",
      title: "Antarctic Ozone Hole Stabilization and Upper Stratospheric Cooling Dynamics",
      region: "Antarctica",
      category: "Atmosphere",
      authors: "Dr. R. P. Singh, Dr. S. K. Roy, Dr. V. M. Tiwari",
      year: 2025,
      journal: "Geophysical Research Letters, Vol. 52",
      doi: "10.1029/2025GL108711",
      citations: 27,
      tags: ["Antarctica", "Ozone", "Stratosphere", "Maitri", "Atmosphere"],
      abstract: "Ozonesonde soundings launched weekly from Maitri station over three decades document the gradual recovery of the spring Antarctic ozone hole under the Montreal Protocol, alongside polar vortex temperature changes.",
      keyFindings: [
        "Spring stratospheric column ozone over Maitri has increased at a rate of +1.8% per decade since 2000.",
        "Total ozone minimum in October 2024 stabilized at 148 Dobson Units (DU), well above the 1994 low of 92 DU.",
        "Persistent lower stratospheric greenhouse gas cooling acts as an opposing force delaying complete closure until ~2065."
      ],
      readTime: "11 min read"
    },
    {
      id: "res-012",
      title: "Subglacial Lake Dynamics Beneath the East Antarctic Ice Sheet: Geophysical Inferences",
      region: "Antarctica",
      category: "Geology",
      authors: "Dr. B. C. Joshi, Dr. Ajay Dhar, Dr. Rajesh Asthana",
      year: 2024,
      journal: "Journal of Glaciology, Vol. 70",
      doi: "10.1017/jog.2024.31",
      citations: 40,
      tags: ["Antarctica", "Subglacial", "Lake Vostok", "Geophysics", "Maitri"],
      abstract: "Airborne radio-echo sounding and satellite altimetry around Princess Astrid Coast detect six interconnected subglacial water bodies beneath 3,200 meters of polar ice, shedding light on basal lubricated sliding.",
      keyFindings: [
        "Discovery of a 24 km² subglacial lake designated 'Amrit Sagar' near Schirmacher Oasis hinterland.",
        "Episodic hydraulic drainage cycles transfer millions of cubic meters of basal meltwater between subglacial lakes.",
        "Basal geothermal heat flux measured at 58 mW/m², maintaining sub-ice water in a liquid state at -2.4°C under high overburden pressure."
      ],
      readTime: "15 min read"
    }
  ],

  // ================= 3. SCIENTIFIC TIME-SERIES DATASETS (8 DATASETS) =================
  datasets: [
    {
      id: "ds-01",
      title: "Arctic Sea Ice Extent Annual Trend (1979 - 2025)",
      region: "Arctic",
      parameters: "September Minimum Sea Ice Extent (Million km²)",
      source: "Cryoverse / NSIDC Satellite Multi-sensor Merge",
      updated: "January 2025",
      labels: ["1980", "1985", "1990", "1995", "2000", "2005", "2010", "2015", "2020", "2024", "2025"],
      data: [7.85, 6.91, 6.24, 6.13, 6.32, 5.57, 4.93, 4.63, 3.92, 4.28, 4.12],
      unit: "Million km²",
      description: "September Arctic sea ice minimum measurements demonstrating a sustained decadal decline of approximately 12.6% per decade relative to the 1981-2010 average."
    },
    {
      id: "ds-02",
      title: "Antarctic Ice Sheet Mass Anomaly (2002 - 2025)",
      region: "Antarctica",
      parameters: "Cumulative Mass Change (Gigatonnes / Gt)",
      source: "GRACE & GRACE-FO Satellite Gravimetry / NCPOR",
      updated: "December 2024",
      labels: ["2002", "2006", "2010", "2014", "2018", "2021", "2024", "2025"],
      data: [0, -420, -980, -1720, -2450, -3180, -3940, -4220],
      unit: "Gigatonnes (Gt)",
      description: "Net mass balance loss of the Antarctic Ice Sheet derived from gravimetric satellite measurements, heavily driven by accelerated ice discharge in West Antarctica."
    },
    {
      id: "ds-03",
      title: "Himalayan Bara Shigri Glacier Cumulative Mass Balance",
      region: "Himalaya",
      parameters: "Cumulative Specific Mass Balance (m w.e.)",
      source: "Himansh Field Station In-situ Glaciology Network",
      updated: "October 2024",
      labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      data: [0, -0.68, -1.42, -2.05, -2.85, -3.48, -4.26, -4.95, -5.72],
      unit: "meters water equivalent (m w.e.)",
      description: "Continuous stake and geodetic mass balance measurements at the benchmark Bara Shigri glacier, Chandra Basin, showing consistent negative mass balances."
    },
    {
      id: "ds-04",
      title: "Maitri Station Atmospheric CO2 Mixing Ratio",
      region: "Antarctica",
      parameters: "Monthly Mean Background CO2 Concentration (ppm)",
      source: "Maitri Atmospheric Laboratory Baseline Station",
      updated: "February 2025",
      labels: ["1995", "2000", "2005", "2010", "2015", "2020", "2023", "2025"],
      data: [359.8, 368.5, 378.2, 388.4, 399.1, 412.3, 420.8, 424.6],
      unit: "parts per million (ppm)",
      description: "Pristine background atmospheric CO2 baseline tracked in East Antarctica, free from local industrial contamination, reflecting global greenhouse gas accumulation."
    },
    {
      id: "ds-05",
      title: "Greenland Ice Sheet Mass Loss (2002 - 2025)",
      region: "Arctic",
      parameters: "Cumulative Mass Change (Gigatonnes / Gt)",
      source: "ESA Climate Change Initiative & GRACE-FO",
      updated: "January 2025",
      labels: ["2002", "2006", "2010", "2014", "2018", "2021", "2024", "2025"],
      data: [0, -890, -1890, -3150, -4120, -4950, -5720, -6080],
      unit: "Gigatonnes (Gt)",
      description: "Surface melt and calving discharge from Greenland, contributing approximately 0.8 mm per year directly to global mean sea-level rise."
    },
    {
      id: "ds-06",
      title: "Southern Ocean pH Acidification Index (1990 - 2025)",
      region: "Southern Ocean",
      parameters: "Mean Surface Seawater pH (Total Scale)",
      source: "Indian Southern Ocean Expedition CTD Profilers / GLODAP",
      updated: "December 2024",
      labels: ["1990", "1995", "2000", "2005", "2010", "2015", "2020", "2025"],
      data: [8.18, 8.16, 8.14, 8.12, 8.09, 8.07, 8.05, 8.03],
      unit: "pH units",
      description: "Surface ocean acidification in the Polar Frontal Zone as oceanic uptake of anthropogenic carbon shifts carbonate equilibrium, threatening shell-forming pteropods."
    },
    {
      id: "ds-07",
      title: "Kongsfjorden Fjord Winter Water Temperature (192m Mooring)",
      region: "Arctic",
      parameters: "Mean Benthic Temperature (°C) from IndARC",
      source: "IndARC Underwater Observatory / NCPOR",
      updated: "February 2025",
      labels: ["2015", "2017", "2019", "2021", "2023", "2024", "2025"],
      data: [0.42, 0.68, 0.95, 1.12, 1.34, 1.48, 1.55],
      unit: "°C",
      description: "Continuous underwater recording at 192m depth in Kongsfjorden, Svalbard, revealing the steady intrusion of warm Atlantic Water into the Arctic fjord."
    },
    {
      id: "ds-08",
      title: "Global Mean Sea Level Rise Contribution from Polar Ice",
      region: "Global",
      parameters: "Cumulative Sea Level Rise (mm) from Cryosphere Melt",
      source: "IPCC AR6 / WCRP Global Sea Level Budget",
      updated: "January 2025",
      labels: ["1995", "2000", "2005", "2010", "2015", "2020", "2024", "2025"],
      data: [0, 4.2, 9.8, 17.5, 27.2, 38.6, 49.8, 53.4],
      unit: "Millimeters (mm)",
      description: "Direct sea level rise contribution stemming exclusively from melting ice sheets (Greenland & Antarctica) and mountain glaciers worldwide."
    }
  ],

  // ================= 4. GENERAL QUIZ QUESTIONS (12 QUESTIONS) =================
  quizzes: [
    {
      id: "q1",
      question: "Which was India's first permanent research station in Antarctica?",
      options: ["Maitri", "Bharati", "Dakshin Gangotri", "Himadri"],
      answer: 2,
      explanation: "Dakshin Gangotri was established in 1983-84 as India's first Antarctic station during the third Indian expedition. It was later replaced by Maitri in 1989."
    },
    {
      id: "q2",
      question: "Where is India's high-altitude research station 'Himansh' located?",
      options: ["Siachen Glacier, Ladakh", "Spiti Valley, Himachal Pradesh", "Gangotri Glacier, Uttarakhand", "Kanchenjunga, Sikkim"],
      answer: 1,
      explanation: "Himansh is situated at 4,080 meters (13,500 ft) elevation in the Chandra basin, Spiti Valley, Himachal Pradesh, operated by NCPOR."
    },
    {
      id: "q3",
      question: "In which Arctic settlement is India's Arctic station 'Himadri' situated?",
      options: ["Tromsø, Norway", "Ny-Ålesund, Svalbard", "Nuuk, Greenland", "Reykjavik, Iceland"],
      answer: 1,
      explanation: "Himadri was inaugurated in July 2008 at Ny-Ålesund, Spitsbergen, Svalbard (Norway), the northernmost civilian scientific settlement on Earth."
    },
    {
      id: "q4",
      question: "What term describes the ratio of light reflected by snow and ice compared to total incoming solar radiation?",
      options: ["Cryosphere Index", "Albedo Effect", "Thermohaline Convection", "Permafrost Latency"],
      answer: 1,
      explanation: "Albedo is the measure of surface reflectivity. Fresh polar snow has an albedo of up to 0.9 (reflecting 90% of sunlight), whereas open ocean has an albedo of ~0.06."
    },
    {
      id: "q5",
      question: "Which Indian Antarctic station is built from 134 modular shipping containers and serves as an ISRO satellite tracking base?",
      options: ["Dakshin Gangotri", "Bharati", "Maitri", "IndARC"],
      answer: 1,
      explanation: "Bharati, commissioned in 2012 at Larsemann Hills, was constructed using 134 prefabricated shipping containers on stilts to withstand extreme polar blizzards and house an ISRO satellite tracking station."
    },
    {
      id: "q6",
      question: "What is 'IndARC'?",
      options: [
        "An Indian polar icebreaker vessel",
        "An underwater moored ocean observatory in Kongsfjorden, Arctic",
        "An Antarctic weather radar satellite",
        "A deep ice-core drilling project in Antarctica"
      ],
      answer: 1,
      explanation: "IndARC is India's multi-sensor underwater moored observatory deployed in 2014 at a depth of 192 meters in the Arctic fjord Kongsfjorden."
    },
    {
      id: "q7",
      question: "What is the primary ecological keystone species in the Southern Ocean food web?",
      options: ["Polar Bear", "Antarctic Krill (Euphausia superba)", "Arctic Tern", "Ringed Seal"],
      answer: 1,
      explanation: "Antarctic krill is the cornerstone species of the Southern Ocean ecosystem, directly feeding whales, seals, penguins, and seabirds, while driving the biological carbon pump."
    },
    {
      id: "q8",
      question: "Why is the Himalayan region often referred to as the 'Third Pole'?",
      options: [
        "It contains the magnetic third pole",
        "It stores the largest concentration of snow and ice outside the Arctic and Antarctic",
        "It is located exactly halfway between the North and South Poles",
        "It has the same penguin species as Antarctica"
      ],
      answer: 1,
      explanation: "The Hindu Kush-Himalayan region contains the greatest volume of ice and snow outside the polar ice caps, feeding ten major river systems that sustain nearly 2 billion people."
    },
    {
      id: "q9",
      question: "What dangerous mountain hazard occurs when a moraine dam holding a glacial lake suddenly breaches?",
      options: ["Katabatic Windstorm", "Glacial Lake Outburst Flood (GLOF)", "Cryoconite Hole", "Polynya Eruption"],
      answer: 1,
      explanation: "A Glacial Lake Outburst Flood (GLOF) occurs when moraines or ice dams holding high-altitude meltwater lakes fail, releasing devastating flash floods downstream."
    },
    {
      id: "q10",
      question: "What is permafrost?",
      options: [
        "Temporary ice formed on mountain summits during winter",
        "Ground or soil that remains at or below 0°C for at least two consecutive years",
        "Frozen sea spray accumulating on ship hulls",
        "Ice that never melts even in boiling water"
      ],
      answer: 1,
      explanation: "Permafrost is ground (soil, rock, and organic matter) that remains completely frozen at 0°C (32°F) or colder for at least two consecutive years."
    },
    {
      id: "q11",
      question: "Which polar region has native wild penguins, and which has native polar bears?",
      options: [
        "Both live together in the Arctic",
        "Both live together in Antarctica",
        "Penguins are native to Antarctica / Southern Ocean; Polar Bears are native to the Arctic",
        "Polar Bears are native to Antarctica; Penguins are native to the Arctic"
      ],
      answer: 2,
      explanation: "Polar bears are exclusive to the Arctic Northern Hemisphere, while penguins are native to the Southern Hemisphere (Antarctica and subantarctic islands). They never meet in the wild!"
    },
    {
      id: "q12",
      question: "What causes the vivid polar auroras (Aurora Borealis & Aurora Australis)?",
      options: [
        "Light reflecting off giant tabular icebergs",
        "Solar charged particles colliding with atmospheric gases near Earth's magnetic poles",
        "Laser experiments conducted at polar research bases",
        "Bioluminescence from massive Antarctic krill swarms"
      ],
      answer: 1,
      explanation: "Auroras are caused by charged particles from the solar wind colliding with oxygen and nitrogen atoms in Earth's upper atmosphere, guided by magnetic field lines towards the poles."
    }
  ],

  // ================= 5. TEACHER LESSON PLANS & LAB PROTOCOLS (6 LESSONS) =================
  lessons: [
    {
      id: "lp-01",
      title: "Understanding the Cryosphere: Earth's Frozen Thermostat",
      grade: "Middle & High School (Grades 7 - 10)",
      duration: "45 - 60 minutes",
      subject: "Earth Science, Physics, Geography",
      overview: "Students explore the five components of the cryosphere (sea ice, ice sheets, glaciers, snow cover, and permafrost) and experiment with the Ice-Albedo feedback loop.",
      objectives: [
        "Identify the five key components of Earth's cryosphere.",
        "Demonstrate how melting ice reduces Earth's reflectivity (albedo) using a simple lamp-and-paper experiment.",
        "Differentiate between Arctic sea ice melt (no sea-level rise) vs land ice sheet melt (direct sea-level rise)."
      ],
      activities: [
        "Hands-on Lab: Melting Ice in Water vs Melting Ice on Land (Archimedes principle demo)",
        "Interactive Cryoverse Map exploration of Maitri, Bharati, and Himadri",
        "Group debate: Why are polar bears in the Arctic but penguins in Antarctica?"
      ],
      labExperiment: "Fill two identical glass beakers. In Beaker A, place 4 ice cubes floating in water (Sea Ice model). In Beaker B, place a mesh wire holding 4 ice cubes suspended above the water (Land Ice sheet model). Mark water levels with a dry-erase marker. Wait for melt. Observe that Beaker A water level remains unchanged, while Beaker B water level overflows!",
      resourcesIncluded: ["Worksheet PDF", "Presentation Slides (12 slides)", "Quiz assessment rubric"]
    },
    {
      id: "lp-02",
      title: "The Third Pole: Himalayan Glaciers and South Asian Water Security",
      grade: "High School & Undergrad (Grades 11 - 12+)",
      duration: "90 minutes (2 periods)",
      subject: "Environmental Science, Hydrology",
      overview: "Examines glacier mass balance, black carbon deposition on snow, and the risks of Glacial Lake Outburst Floods (GLOFs) in the Himalayas using real Himansh station data.",
      objectives: [
        "Interpret mass balance graphs from Bara Shigri glacier.",
        "Evaluate the radiative forcing of black carbon soot on Himalayan albedo.",
        "Propose early warning and mitigation measures for downstream vulnerable communities."
      ],
      activities: [
        "Graph analysis: Plotting cumulative mass balance from Himansh station.",
        "Case study: The Chamoli disaster and GLOF dynamics.",
        "Roleplay debate: Balancing energy infrastructure in fragile mountain ecosystems."
      ],
      labExperiment: "Take two blocks of packed snow or crushed ice under an incandescent lamp. Sprinkle a pinch of activated carbon powder (representing soot/black carbon) over one block. Measure melting rates over 20 minutes with a graduated cylinder. Compare runoff volumes.",
      resourcesIncluded: ["Glacier Data Sheet (Excel/CSV)", "Teacher Guide", "Student Assignment Sheet"]
    },
    {
      id: "lp-03",
      title: "Deep Ocean Currents and the Global Thermohaline Conveyor Belt",
      grade: "High School (Grades 9 - 12)",
      duration: "60 minutes",
      subject: "Oceanography, Physics, Chemistry",
      overview: "Investigates how intense cooling and brine rejection in Antarctica drives Antarctic Bottom Water (AABW), powering global ocean circulation.",
      objectives: [
        "Understand density-driven circulation based on salinity and temperature.",
        "Perform the classic cold-salty water sinking lab demonstration.",
        "Analyze how Southern Ocean upwelling brings vital nutrients to global fisheries."
      ],
      activities: [
        "Laboratory demonstration: Colored hot freshwater vs cold saltwater tank convection.",
        "Interactive tracing of Antarctic Bottom Water across global ocean basins.",
        "Data inquiry into Southern Ocean pH and carbon sequestration."
      ],
      labExperiment: "Fill a clear rectangular plastic container with room-temperature water. Mix cold water with blue food coloring and 3 tablespoons of salt. Mix hot water with red food coloring. Gently introduce both into opposite ends of the container using pipettes. Observe blue cold-salty water sinking to the bottom and spreading like Antarctic Bottom Water!",
      resourcesIncluded: ["Laboratory Protocol Sheet", "Visual Infographic Poster", "Teacher Answer Key"]
    },
    {
      id: "lp-04",
      title: "Atmospheric Teleconnections: How Arctic Warming Shapes Monsoons",
      grade: "Grades 10 - 12 / College",
      duration: "60 minutes",
      subject: "Climatology, Atmospheric Physics",
      overview: "Explores the planetary Rossby waves linking sea-ice loss in the Arctic Barents-Kara seas to erratic precipitation patterns and drought cycles in the Indian Summer Monsoon.",
      objectives: [
        "Define atmospheric teleconnections and Rossby wave dynamics.",
        "Map the jet stream path under normal vs Arctic amplified conditions.",
        "Assess meteorological data collected at India's Himadri station in Svalbard."
      ],
      activities: [
        "Jet stream tracing activity on world contour weather maps.",
        "Data comparison: Barents ice cover vs Indian monsoon onset dates.",
        "Student policy briefing: Climate adaptation for agriculture."
      ],
      labExperiment: "Rotating fluid table demonstration or online jet stream simulator tracing planetary wave meanders when the equator-to-pole temperature gradient is reduced.",
      resourcesIncluded: ["Monsoon Teleconnection Primer", "Contour Map Activity", "Assessment Rubric"]
    },
    {
      id: "lp-05",
      title: "Extreme Biology: Metagenomics & Adaptations of Polar Extremophiles",
      grade: "High School Biology & Biochemistry",
      duration: "60 - 75 minutes",
      subject: "Biology, Genetics, Biochemistry",
      overview: "Delves into molecular strategies of psychrophilic bacteria and Antarctic krill surviving sub-zero conditions, including antifreeze proteins and polyunsaturated cell membranes.",
      objectives: [
        "Explain thermal kinetic challenges facing enzymes at freezing temperatures.",
        "Investigate the mechanism of Antifreeze Glycoproteins (AFGPs) in polar fish and microbes.",
        "Evaluate commercial applications of cold-active enzymes in biotechnology."
      ],
      activities: [
        "Microscope analysis of cryophilic vs mesophilic bacterial models.",
        "Molecular modeling of antifreeze protein binding to ice crystal facets.",
        "Bioethics case study: Bioprospecting in the Antarctic Treaty Area."
      ],
      labExperiment: "Ice recrystallization inhibition assay demo: Observe ice crystals in pure water vs ice crystals in water with 1% gelatin/albumin under a polarized light microscope.",
      resourcesIncluded: ["Extremophile Identification Key", "Biotechnology Case Study", "Quiz"]
    },
    {
      id: "lp-06",
      title: "Polar Geopolitics & The Antarctic Treaty System",
      grade: "High School Social Sciences & International Relations",
      duration: "45 minutes",
      subject: "History, Political Science, Environmental Law",
      overview: "Studies the landmark 1959 Antarctic Treaty that dedicated an entire continent exclusively to peaceful scientific research, prohibiting military activity and mineral mining.",
      objectives: [
        "Analyze the core articles of the Antarctic Treaty and the Madrid Protocol.",
        "Understand India's consultative status and contributions since 1983.",
        "Debate future governance challenges regarding resource extraction and tourism."
      ],
      activities: [
        "Model Antarctic Treaty Consultative Meeting (ATCM) simulation.",
        "Drafting a conservation resolution for marine protected areas.",
        "Mapping historical claims vs scientific stations across Queen Maud Land and Larsemann Hills."
      ],
      labExperiment: "Mock treaty negotiation session where student groups represent India, Norway, USA, Chile, and environmental NGOs to negotiate ice-core drilling protocols.",
      resourcesIncluded: ["Treaty Text Summary", "Diplomatic Simulation Guide", "Country Fact Sheets"]
    }
  ],

  // ================= 6. POLAR CAREERS ROADMAP (8 CAREERS) =================
  careers: [
    {
      title: "Glaciologist & Cryosphere Modeler",
      field: "Earth Sciences & Physics",
      description: "Glaciologists study ice masses, drill deep polar ice cores, and build numerical computer models to predict future sea level rise and glacier retreat under warming climates.",
      degrees: "B.Sc/M.Sc in Geology, Geophysics, Environmental Physics, followed by Ph.D in Glaciology or Polar Science.",
      institutes: ["NCPOR Goa", "Wadia Institute of Himalayan Geology (WIHG)", "IIT Roorkee", "IISc Bangalore"],
      dayInLife: "Deploying radar systems on crevassed glaciers, operating high-resolution drone LIDAR, modeling ice shelf collapse with supercomputers."
    },
    {
      title: "Polar Marine Biologist",
      field: "Life Sciences & Oceanography",
      description: "Explores adaptations of polar organisms from Antarctic krill and benthic starfish to micro-algae surviving under polar sea ice in sub-zero temperatures.",
      degrees: "B.Sc/M.Sc in Marine Biology, Zoology, or Oceanography.",
      institutes: ["National Institute of Oceanography (NIO)", "Cochin University (CUSAT)", "Annamalai University (CAS in Marine Biology)"],
      dayInLife: "Conducting biological trawls aboard research vessels like ORV Sagar Kanya, sequencing extremophile microbial DNA, monitoring whale acoustic signals."
    },
    {
      title: "Polar Logistics & Expedition Engineer",
      field: "Mechanical, Civil & Electrical Engineering",
      description: "Designs, maintains, and operates the life-support systems, renewable microgrids, heavy tracked snowcat vehicles, and communications domes at Maitri and Bharati stations.",
      degrees: "B.Tech in Mechanical, Electrical, Civil or Telecommunication Engineering.",
      institutes: ["IITs / NITs", "Defence Institute of High Altitude Research (DIHAR)", "NCPOR Expedition Division"],
      dayInLife: "Managing winter survival systems in -40°C blizzards, maintaining satellite earth links, managing snowmelters and green wind-solar microgrids."
    },
    {
      title: "Atmospheric & Space Physicist",
      field: "Physics & Space Science",
      description: "Studies geomagnetic storms, solar-terrestrial interactions, auroras (Aurora Australis & Borealis), and upper-atmospheric ionospheric scintillation.",
      degrees: "M.Sc / Ph.D in Physics, Atmospheric Science, or Space Physics.",
      institutes: ["Indian Institute of Geomagnetism (IIG Mumbai)", "Space Applications Centre (SAC ISRO)", "Physical Research Laboratory (PRL Ahmedabad)"],
      dayInLife: "Operating fluxgate magnetometers and riometers at Bharati, analyzing coronal mass ejections, calibrating ISRO polar orbital satellite instruments."
    },
    {
      title: "Satellite Remote Sensing & GIS Analyst",
      field: "Geoinformatics & Computer Science",
      description: "Processes multi-terabyte SAR, optical satellite imagery, and altimetry data from Sentinel, Landsat, and NISAR to track iceberg calving and glacier velocities.",
      degrees: "B.Tech / M.Sc in Remote Sensing, Geoinformatics, Computer Science, or Data Science.",
      institutes: ["Indian Institute of Remote Sensing (IIRS Dehradun)", "SAC-ISRO", "IIT Bombay"],
      dayInLife: "Running automated AI computer vision models on satellite imagery, computing digital elevation models (DEMs), detecting sudden glacial lake expansion."
    },
    {
      title: "Ice Core Paleoclimatologist",
      field: "Geochemistry & Analytical Chemistry",
      description: "Analyzes trapped ancient greenhouse gas bubbles and stable isotopic ratios inside deep ice cores to reconstruct past atmospheric composition going back 800,000 years.",
      degrees: "M.Sc / Ph.D in Geochemistry, Earth Sciences, or Environmental Chemistry.",
      institutes: ["NCPOR Ice Core Laboratory (Goa)", "Physical Research Laboratory (PRL)", "IIT Kharagpur"],
      dayInLife: "Working in clean-room cold laboratories at -20°C, operating mass spectrometers, measuring trace dust and ancient methane spikes."
    },
    {
      title: "Permafrost Geotechnical Engineer",
      field: "Civil & Geological Engineering",
      description: "Designs stable foundations for buildings, airstrips, pipelines, and research habitats on thaw-susceptible permafrost terrain in the Arctic and high Himalayas.",
      degrees: "B.Tech / M.Tech in Civil Engineering, Geotechnical Engineering, or Cold Regions Engineering.",
      institutes: ["IIT Roorkee", "CRRI New Delhi", "International Arctic Universities"],
      dayInLife: "Installing thermistor strings to monitor ground thaw depths, modeling thermosiphon passive cooling columns to prevent building subsidence."
    },
    {
      title: "Polar Medical Specialist & Cold Physiologist",
      field: "Medicine & Human Physiology",
      description: "Provides critical trauma and emergency healthcare for isolated polar winter-over crews while researching human circadian rhythm disruption and cold acclimatization.",
      degrees: "MBBS with specialization in Emergency Medicine, Surgery, or Anesthesiology, plus extreme environment survival certification.",
      institutes: ["Armed Forces Medical College (AFMC Pune)", "AIIMS New Delhi", "DIPAS (DRDO)"],
      dayInLife: "Managing medical clinics at Maitri/Bharati through months of pitch-black polar night, tracking sleep hormones, treating hypothermia and frostbite."
    }
  ],

  // ================= 7. EXPEDITION STORIES & BREAKING NEWS (8 STORIES) =================
  news: [
    {
      id: "news-01",
      title: "44th Indian Scientific Expedition to Antarctica Flagged Off",
      category: "Expedition",
      date: "November 2024",
      image: "https://images.unsplash.com/photo-1548678967-f1fc58f6ecf6?auto=format&fit=crop&w=800&q=80",
      summary: "A 52-member multidisciplinary team of scientists and logistics personnel departed from Cape Town heading to Maitri and Bharati stations, tasked with new automated weather installations and geological drilling."
    },
    {
      id: "news-02",
      title: "Breakthrough Microbial Enzyme Isolated by Himadri Team",
      category: "Discovery",
      date: "January 2025",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      summary: "Biologists at Himadri Arctic station isolated a cold-active lipase from Kongsfjorden marine sediments that functions efficiently at 2°C, opening eco-friendly avenues for biotechnology and low-temperature laundry enzymes."
    },
    {
      id: "news-03",
      title: "Himansh Station Deploys Autonomous Glacier Drone Swarm",
      category: "Technology",
      date: "September 2024",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
      summary: "Researchers at 13,500 ft in Spiti deployed custom autonomous UAVs equipped with multispectral LiDAR to create centimeter-accurate 3D elevation models of the retreat on Bara Shigri glacier."
    },
    {
      id: "news-04",
      title: "Southern Ocean Expedition Measures Unprecedented Warming Currents",
      category: "Climate",
      date: "February 2025",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      summary: "Deep mooring loggers recover oceanographic data revealing Circumpolar Deep Water shoaling 80 meters higher towards the Antarctic ice sheet fringe, accelerating basal melt rates."
    },
    {
      id: "news-05",
      title: "First Indian Maiden Winter Arctic Expedition Successfully Completed",
      category: "Milestone",
      date: "March 2024",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      summary: "For the first time in history, Indian researchers manned Himadri station in Ny-Ålesund through the freezing, pitch-black polar night, unlocking continuous winter aerosol and ionospheric measurements."
    },
    {
      id: "news-06",
      title: "Ancient Methane Clathrate Dynamics Discovered in Antarctic Cores",
      category: "Paleoclimate",
      date: "August 2024",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
      summary: "NCPOR ice core scientists in Goa analyzed trapped bubbles from a 650m ice core recovered near Maitri, identifying sharp atmospheric methane spikes that preceded global warming exits."
    }
  ],

  // ================= 8. HIGH-RES POLAR GALLERY (8 ITEMS) =================
  gallery: [
    {
      title: "Himadri Station under Svalbard Midnight Sun",
      region: "Arctic",
      url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      desc: "Ny-Ålesund international science village surrounded by snow-covered peaks and Kongsfjorden."
    },
    {
      title: "Aurora Australis Dancing over Maitri Base",
      region: "Antarctica",
      url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
      desc: "Vivid green southern aurora illuminating the Schirmacher Oasis rocky terrain during polar night."
    },
    {
      title: "Bharati Station Ultra-Modern Architecture",
      region: "Antarctica",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      desc: "State-of-the-art elevated aerodynamic structure built to survive 300 km/h blizzards in Larsemann Hills."
    },
    {
      title: "Glaciology Monitoring at Himansh Station",
      region: "Himalaya",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      desc: "High-altitude monitoring station nestled at 13,500 ft elevation in the Chandra basin, Spiti Valley."
    },
    {
      title: "Antarctic Ice Shelf Edge and Tabular Iceberg",
      region: "Antarctica",
      url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80",
      desc: "Gigantic tabular iceberg calving from the continental ice shelf into the Southern Ocean."
    },
    {
      title: "Arctic Fjord Kongsfjorden & Tidewater Glacier",
      region: "Arctic",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      desc: "Glacial terminus where the Kronebreen glacier enters the Arctic fjord."
    },
    {
      title: "Deep Crevasse Field on Bara Shigri Glacier",
      region: "Himalaya",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      desc: "Massive crevasses and seracs formed by extensional ice flow in the high Western Himalayas."
    },
    {
      title: "Emperor Penguin Colony along East Antarctic Margin",
      region: "Antarctica",
      url: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1200&q=80",
      desc: "Breeding colony of Emperor Penguins gathered on land-fast sea ice near Princess Astrid Coast."
    }
  ],

  // ================= 9. VERIFIED SCIENTIFIC POLAR FACTS (25 FACTS) =================
  facts: [
    "Antarctica holds approximately 70% of the world's freshwater and 90% of all terrestrial ice.",
    "If the entire Antarctic Ice Sheet melted completely, global sea levels would rise by approximately 58 meters (190 feet).",
    "The Arctic is an ocean surrounded by continents, whereas Antarctica is a continent surrounded by an ocean.",
    "The lowest natural surface temperature ever recorded on Earth was -89.2°C (-128.6°F) at Vostok Station, Antarctica, in July 1983.",
    "The Himalayan cryosphere feeds 10 major Asian river systems that provide water for over 1.9 billion people.",
    "Fresh polar sea ice is salty, but as ice ages into multi-year pack ice, brine drains through microscopic drainage channels, making multi-year ice meltwater drinkable freshwater!",
    "Ny-Ålesund, where India's Himadri station sits, has a strict 20 km radio-silent zone around it to preserve ultra-sensitive astronomical and atmospheric sensor readings.",
    "Bharati station is built on stilts from 134 modular shipping containers, engineered specifically to prevent snow drifts from burying the building.",
    "Antarctic krill (Euphausia superba) have a collective biomass estimated at 400 to 500 million tonnes—surpassing the total biomass of all humans on Earth!",
    "The Arctic is warming nearly four times faster than the global average, a process known as Arctic Amplification.",
    "Antarctica is technically the largest desert on Earth, receiving an average of only 50 mm (2 inches) of precipitation per year in its interior plateau.",
    "Lake Vostok in Antarctica is buried under nearly 4,000 meters (2.5 miles) of ice and has been sealed off from the Earth's atmosphere for over 15 million years.",
    "Polar bears have black skin beneath their thick translucent fur, which helps them absorb heat from the Arctic sun.",
    "Himansh station in Himachal Pradesh operates at an altitude of 4,080 meters (13,500 ft), requiring scientists to acclimatize to thin air before conducting glacier surveys.",
    "The Antarctic Treaty of 1959 was the first arms-control agreement established during the Cold War, setting aside an entire continent solely for peaceful scientific research.",
    "Glacial ice appears deep blue because dense ice compresses air bubbles out, allowing the ice to absorb red wavelengths of light while scattering blue wavelengths.",
    "Antarctic ice shelves do not contribute to sea level rise when they melt in place, because they are already floating on water (Archimedes' Principle); however, their loss uncorks land-based glaciers behind them.",
    "In Kongsfjorden, Svalbard, India's moored IndARC observatory sits 192 meters beneath the surface to continuously measure water temperatures through the dark polar winter.",
    "Katabatic winds in Antarctica can exceed 300 km/h (185 mph), driven purely by high-density cold air rushing down the steep slopes of the polar plateau.",
    "Maitri station obtains its drinking water from Lake Priyadarshini, an ultra-pure freshwater lake fed by melting glaciers in the Schirmacher Oasis.",
    "Black carbon deposits from vehicular and industrial pollution darken Himalayan snow, reducing its albedo and causing snow to melt up to two weeks earlier in spring.",
    "The ozone hole over Antarctica forms exclusively in the polar spring (September-October) due to extremely cold stratospheric temperatures activating chlorine radicals on polar stratospheric clouds.",
    "Antarctica has no permanent human population; only rotating scientific and support crews ranging from ~1,000 in winter to over 5,000 in summer.",
    "More meteorites have been recovered in Antarctica than anywhere else on Earth because the white ice makes dark rocks easy to spot, and flowing ice sheets concentrate them against mountain barriers.",
    "Arctic sea ice reaches its minimum extent every year in mid-September and its maximum extent in March."
  ],

  // ================= 10. A-Z POLAR SCIENCE GLOSSARY (16 TERMS) =================
  glossary: [
    {
      term: "Albedo Effect",
      category: "Climate Physics",
      definition: "The fraction of solar energy reflected from the Earth's surface back into space. Fresh snow reflects up to 90% (albedo ~0.90), while open water absorbs 94% (albedo ~0.06)."
    },
    {
      term: "Arctic Amplification",
      category: "Climate Dynamics",
      definition: "The phenomenon where the Arctic warms at nearly four times the global average rate, driven primarily by sea-ice loss and positive ice-albedo feedbacks."
    },
    {
      term: "Calving",
      category: "Glaciology",
      definition: "The mechanical breaking off of chunks of ice from the edge of a glacier or ice shelf, which subsequently float as icebergs in the ocean or lakes."
    },
    {
      term: "Cryosphere",
      category: "Earth System",
      definition: "The collective portions of Earth's surface where water is in solid form, including sea ice, lake ice, river ice, snow cover, glaciers, ice caps, ice sheets, and permafrost."
    },
    {
      term: "GLOF (Glacial Lake Outburst Flood)",
      category: "Hydrology & Hazards",
      definition: "A sudden, catastrophic release of meltwater impounded behind a moraine or ice dam, creating hazardous downstream flash floods in mountain valleys."
    },
    {
      term: "Katabatic Wind",
      category: "Meteorology",
      definition: "Fierce, gravity-driven drainage winds that form when dense, radiatively cooled air plunges downslope from high polar ice sheets toward the coast."
    },
    {
      term: "Nunatak",
      category: "Geomorphology",
      definition: "An exposed, rocky ridge, mountain, or peak not covered with ice or snow within or at the margin of an ice sheet or glacier."
    },
    {
      term: "Permafrost",
      category: "Cryopedology",
      definition: "Ground (soil, sediment, or rock) that remains continuously at or below 0°C (32°F) for at least two consecutive years, storing massive ancient carbon pools."
    },
    {
      term: "Polynya",
      category: "Oceanography",
      definition: "An area of persistent open water surrounded by sea ice, formed either by upwelling warm ocean water (sensible heat) or driven by relentless katabatic winds (latent heat)."
    },
    {
      term: "Psychrophile",
      category: "Microbiology",
      definition: "Extremophile micro-organisms (bacteria, archaea, fungi) that are capable of growth and reproduction in extremely low temperatures (-20°C to +10°C)."
    },
    {
      term: "Firn",
      category: "Glaciology",
      definition: "Partially compacted granular snow that has survived at least one summer season without melting, intermediate between fresh snow and dense glacial ice."
    },
    {
      term: "Thermohaline Circulation",
      category: "Oceanography",
      definition: "Large-scale ocean conveyor circulation driven by global density gradients created by surface heat and freshwater (salinity) fluxes, anchored by sinking polar bottom water."
    },
    {
      term: "Cryoconite",
      category: "Glaciology",
      definition: "Airborne dust, mineral particles, soot, and microbes deposited on glacial ice that absorb solar radiation and melt cylindrical holes down into the ice surface."
    },
    {
      term: "Frazil Ice",
      category: "Sea Ice",
      definition: "A collection of loose, randomly oriented needle- or plate-like ice crystals formed in supercooled turbulent ocean water, the initial stage of sea-ice growth."
    },
    {
      term: "Mass Balance",
      category: "Glaciology",
      definition: "The net difference between total ice accumulation (snowfall, avalanches) and total ablation (melt, sublimation, calving) across a glacier over one hydrological year."
    },
    {
      term: "Teleconnection",
      category: "Climatology",
      definition: "Significant, recurring climate linkages between widely separated geographic regions across the globe (e.g. Arctic sea-ice loss altering the Indian Summer Monsoon)."
    }
  ],

  // ================= 11. POLAR CLIMATE DATASETS (HISTORICAL ICE-CORE CO2, SEA ICE, GLACIERS, AURORAS) =================
  climateDatasets: {
    iceCoreCO2: {
      title: "Historical Ice-Core Atmospheric CO2 Concentration (800,000 BP to Present)",
      description: "Continuous atmospheric CO2 samples extracted from air bubbles trapped inside EPICA Dome C & Vostok Antarctic ice cores, juxtaposed against modern instrumental Mauna Loa and polar baseline sensors.",
      unit: "Parts Per Million (ppm)",
      source: "EPICA / NOAA / NASA GISTEMP / NCPOR Cryo-Archives",
      timeline: [
        { period: "800,000 BCE", co2: 192, era: "Mid-Pleistocene Glacial Maximum", notes: "Deep ice core bubble equilibrium" },
        { period: "600,000 BCE", co2: 260, era: "Interglacial Warm Peak", notes: "Natural cyclical boundary" },
        { period: "400,000 BCE", co2: 280, era: "Marine Isotope Stage 11", notes: "Prolonged interglacial analogue" },
        { period: "200,000 BCE", co2: 185, era: "Penultimate Glacial Maximum", notes: "Severe cooling cycle" },
        { period: "125,000 BCE", co2: 290, era: "Eemian Interglacial", notes: "Global sea levels were 6-9m higher" },
        { period: "20,000 BCE", co2: 180, era: "Last Glacial Maximum (LGM)", notes: "Global ice sheets peak" },
        { period: "1850 CE", co2: 284, era: "Pre-Industrial Baseline", notes: "Stable Holocene range (260-280 ppm)" },
        { period: "1960 CE", co2: 317, era: "Early Industrial Acceleration", notes: "Keeling Curve inception" },
        { period: "1990 CE", co2: 354, era: "Global Satellite Era", notes: "Rapid industrial expansion" },
        { period: "2010 CE", co2: 390, era: "Approaching 400 ppm Threshold", notes: "First Arctic stations cross 400 ppm" },
        { period: "2024 CE", co2: 425, era: "Modern Anthropocene Peak", notes: "50% higher than pre-industrial baseline" }
      ]
    },
    seaIceExtent: {
      title: "Polar Sea-Ice Extent Decadal Trends (1979 - 2024)",
      description: "Satellite passive microwave sensor measurements tracking the annual minimum sea-ice coverage (Arctic September minimum) and Antarctic sea-ice variations.",
      unit: "Million Square Kilometers (M km²)",
      source: "National Snow and Ice Data Center (NSIDC) & NCPOR Satellite Registry",
      records: [
        { year: 1979, arcticMin: 7.50, antarcticMax: 18.80, notes: "Beginning of continuous satellite observational record" },
        { year: 1985, arcticMin: 6.95, antarcticMax: 18.60, notes: "Multi-year thick ice constitutes >45% of Arctic pack" },
        { year: 1995, arcticMin: 6.12, antarcticMax: 19.10, notes: "Early signs of Arctic sea-ice thinning" },
        { year: 2005, arcticMin: 5.50, antarcticMax: 19.20, notes: "Major downward shift in Arctic summer extent" },
        { year: 2012, arcticMin: 3.39, antarcticMax: 19.45, notes: "All-time historic Arctic minimum following powerful summer cyclone" },
        { year: 2018, arcticMin: 4.59, antarcticMax: 18.15, notes: "Antarctic sea ice shifts from stable/growing to sharp decline" },
        { year: 2020, arcticMin: 3.82, antarcticMax: 18.90, notes: "Second lowest Arctic minimum on record" },
        { year: 2023, arcticMin: 4.23, antarcticMax: 16.96, notes: "Unprecedented record low Antarctic winter maximum" },
        { year: 2024, arcticMin: 4.28, antarcticMax: 17.05, notes: "Persistent polar multi-year ice depletion confirmed" }
      ]
    },
    glacierMeltSpeeds: {
      title: "Major Polar & Benchmark Glacier Velocity & Retreat Dynamics",
      description: "Ground Penetrating Radar, satellite InSAR, and GPS tracking of calving speeds, mass loss, and grounding line retreat across Greenland, Antarctica, and the Himalayas.",
      glaciers: [
        {
          name: "Jakobshavn Isbræ (Sermeq Kujalleq)",
          region: "West Greenland (Arctic)",
          velocity: "45 meters / day (16 km/year)",
          status: "Fastest flowing outlet glacier on Earth; major contributor to global sea level rise",
          retreatRate: "-3.5 km per decade",
          mechanism: "Deep ocean warm Atlantic water intrusion destabilizing marine grounding line"
        },
        {
          name: "Thwaites Glacier ('Doomsday Glacier')",
          region: "Amundsen Sea, West Antarctica",
          velocity: "2.5 to 3.2 km / year",
          status: "Critical vulnerability; holds potential to trigger 65 cm direct sea level rise and 3m regional collapse",
          retreatRate: "-1.1 km grounding line retreat / year",
          mechanism: "Circumpolar Deep Water (CDW) melting the underside of the floating ice tongue"
        },
        {
          name: "Pine Island Glacier (PIG)",
          region: "West Antarctica",
          velocity: "4.0 km / year",
          status: "Rapid acceleration and calving of colossal tabular icebergs (B-46, B-49)",
          retreatRate: "-1.8 km / year",
          mechanism: "Bedrock reverse slope allowing runaway marine ice sheet instability (MISI)"
        },
        {
          name: "Bara Shigri Glacier",
          region: "Chandra Basin, Himalayas (Third Pole)",
          velocity: "28 meters / year",
          status: "Long-term monitored benchmark glacier tracked by Himansh station",
          retreatRate: "-25 to -30 meters / year",
          mechanism: "Anthropogenic black carbon lowering surface albedo combined with rising alpine temperatures"
        }
      ]
    },
    auroraDynamics: {
      title: "Auroral Oval & Geomagnetic Dynamics (Borealis & Australis)",
      description: "Real-time and statistical metrics of space weather interactions between coronal mass ejections (CMEs) and the Earth's polar magnetic cusps.",
      parameters: {
        solarWindSpeed: "400 - 850 km/s",
        interplanetaryMagneticField: "Bz component orientation (Southward coupling triggers geomagnetic sub-storms)",
        auroraZones: "Arctic Auroral Zone (65°-72°N) & Antarctic Zone (65°-70°S)",
        kpIndexScale: "0 to 9 planetary disturbance rating (Kp >= 5 indicates geomagnetic storm)",
        excitationAltitude: "Green light (557.7 nm) from Atomic Oxygen at 100-150 km; Crimson Red (630.0 nm) at 200-300 km; Blue/Violet (427.8 nm) from Ionized Nitrogen at 80-100 km"
      },
      observatories: [
        "Maitri & Bharati: Dual riometers and induction coil magnetometers monitoring auroral electrojets",
        "Amundsen-Scott: Optical spectrometers at the Geographic South Pole during 6-month continuous darkness",
        "Ny-Ålesund: Rocket sounding launches into the Arctic daytime auroral cusp"
      ]
    }
  }
};

// Asynchronously sync with external polar_data.json if hosted via HTTP/HTTPS
if (typeof fetch === "function") {
  fetch("polar_data.json")
    .then(res => res.json())
    .then(data => {
      if (data && data.stations && Array.isArray(data.stations)) {
        data.stations.forEach(externalSt => {
          const idx = CryoverseData.stations.findIndex(s => s.id === externalSt.id);
          if (idx !== -1) {
            CryoverseData.stations[idx] = Object.assign({}, CryoverseData.stations[idx], externalSt);
          } else {
            CryoverseData.stations.push(externalSt);
          }
        });
      }
      if (data && data.climateDatasets) {
        CryoverseData.climateDatasets = Object.assign({}, CryoverseData.climateDatasets, data.climateDatasets);
      }
    })
    .catch(() => {
      // Offline or local file protocol fallback: embedded structured dataset active
    });
}

// Export to window
if (typeof window !== "undefined") {
  window.CryoverseData = CryoverseData;
}
