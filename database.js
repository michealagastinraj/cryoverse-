/**
 * CRYOVERSE DATABASE LAYER (EXPANDED & LIGHTNING FAST)
 * Multi-collection in-memory search with background persistence
 * for stations, research, datasets, quizzes, lessons, careers, news, gallery, and glossary.
 */

class CryoverseDatabase {
  constructor() {
    this.dbName = "CryoverseDB";
    this.dbVersion = 3;
    this.db = null;
    
    // In-memory cache populated immediately from CryoverseData
    this.cache = {
      stations: (window.CryoverseData && window.CryoverseData.stations) ? [...window.CryoverseData.stations] : [],
      research: (window.CryoverseData && window.CryoverseData.research) ? [...window.CryoverseData.research] : [],
      datasets: (window.CryoverseData && window.CryoverseData.datasets) ? [...window.CryoverseData.datasets] : [],
      quizzes: (window.CryoverseData && window.CryoverseData.quizzes) ? [...window.CryoverseData.quizzes] : [],
      lessons: (window.CryoverseData && window.CryoverseData.lessons) ? [...window.CryoverseData.lessons] : [],
      careers: (window.CryoverseData && window.CryoverseData.careers) ? [...window.CryoverseData.careers] : [],
      news: (window.CryoverseData && window.CryoverseData.news) ? [...window.CryoverseData.news] : [],
      gallery: (window.CryoverseData && window.CryoverseData.gallery) ? [...window.CryoverseData.gallery] : [],
      facts: (window.CryoverseData && window.CryoverseData.facts) ? [...window.CryoverseData.facts] : [],
      glossary: (window.CryoverseData && window.CryoverseData.glossary) ? [...window.CryoverseData.glossary] : [],
      chatHistory: []
    };

    this.loadFromLocalStorage();
    this.initAsyncStorage();
  }

  loadFromLocalStorage() {
    try {
      const savedResearch = localStorage.getItem("cryoverse_user_research");
      if (savedResearch) {
        const parsed = JSON.parse(savedResearch);
        parsed.forEach(p => {
          if (!this.cache.research.some(existing => existing.id === p.id)) {
            this.cache.research.unshift(p);
          }
        });
      }

      const savedChat = localStorage.getItem("cryoverse_chatHistory");
      if (savedChat) {
        this.cache.chatHistory = JSON.parse(savedChat);
      }
    } catch (e) {
      console.warn("LocalStorage access note:", e);
    }
  }

  async initAsyncStorage() {
    if (!window.indexedDB) return;
    try {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        Object.keys(this.cache).forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id", autoIncrement: (storeName === "chatHistory") });
          }
        });
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
      };
    } catch (e) {}
  }

  async getAll(storeName) {
    if (this.cache[storeName]) {
      return this.cache[storeName];
    }
    if (window.CryoverseData && window.CryoverseData[storeName]) {
      this.cache[storeName] = [...window.CryoverseData[storeName]];
      return this.cache[storeName];
    }
    return [];
  }

  async getById(storeName, id) {
    const list = await this.getAll(storeName);
    return list.find(item => item.id === id || (item.name && item.name.toLowerCase() === String(id).toLowerCase())) || null;
  }

  async add(storeName, item) {
    if (!item.id) {
      item.id = "item_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4);
    }
    if (!this.cache[storeName]) {
      this.cache[storeName] = [];
    }
    this.cache[storeName].unshift(item);

    try {
      if (storeName === "research") {
        const userOnly = this.cache.research.filter(r => String(r.id).startsWith("user-res-") || String(r.id).startsWith("item_"));
        localStorage.setItem("cryoverse_user_research", JSON.stringify(userOnly));
      } else if (storeName === "chatHistory") {
        localStorage.setItem("cryoverse_chatHistory", JSON.stringify(this.cache.chatHistory.slice(-50)));
      }
    } catch (e) {}

    if (this.db) {
      try {
        const tx = this.db.transaction(storeName, "readwrite");
        tx.objectStore(storeName).put(item);
      } catch (e) {}
    }

    return item;
  }

  /**
   * Universal search across multiple collections (Research, Stations, Datasets, Glossary)
   */
  async searchAll(query) {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results = [];

    // Search Research
    (this.cache.research || []).forEach(p => {
      const matchScore =
        (p.title && p.title.toLowerCase().includes(q) ? 5 : 0) +
        (p.abstract && p.abstract.toLowerCase().includes(q) ? 3 : 0) +
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)) ? 4 : 0) +
        (p.region && p.region.toLowerCase().includes(q) ? 2 : 0);
      if (matchScore > 0) {
        results.push({ type: "Research Paper", item: p, score: matchScore, title: p.title, snippet: p.abstract });
      }
    });

    // Search Stations
    (this.cache.stations || []).forEach(s => {
      const matchScore =
        (s.name && s.name.toLowerCase().includes(q) ? 6 : 0) +
        (s.region && s.region.toLowerCase().includes(q) ? 3 : 0) +
        (s.description && s.description.toLowerCase().includes(q) ? 3 : 0) +
        (s.location && s.location.toLowerCase().includes(q) ? 2 : 0);
      if (matchScore > 0) {
        results.push({ type: "Research Station", item: s, score: matchScore, title: `${s.name} Station (${s.region})`, snippet: s.description });
      }
    });

    // Search Datasets
    (this.cache.datasets || []).forEach(d => {
      const matchScore =
        (d.title && d.title.toLowerCase().includes(q) ? 5 : 0) +
        (d.description && d.description.toLowerCase().includes(q) ? 3 : 0) +
        (d.region && d.region.toLowerCase().includes(q) ? 2 : 0);
      if (matchScore > 0) {
        results.push({ type: "Dataset", item: d, score: matchScore, title: d.title, snippet: d.description });
      }
    });

    // Search Glossary
    (this.cache.glossary || []).forEach(g => {
      const matchScore =
        (g.term && g.term.toLowerCase().includes(q) ? 6 : 0) +
        (g.definition && g.definition.toLowerCase().includes(q) ? 4 : 0);
      if (matchScore > 0) {
        results.push({ type: "Glossary Term", item: g, score: matchScore, title: g.term, snippet: g.definition });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results;
  }

  /**
   * Filter research papers instantly
   */
  async filterResearch(region = "All", query = "") {
    const papers = this.cache.research || [];
    const q = query.toLowerCase().trim();

    return papers.filter(p => {
      const matchesRegion = region === "All" || (p.region && p.region.toLowerCase() === region.toLowerCase());
      if (!matchesRegion) return false;
      if (!q) return true;

      const titleMatch = p.title && p.title.toLowerCase().includes(q);
      const absMatch = p.abstract && p.abstract.toLowerCase().includes(q);
      const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      const authorMatch = p.authors && p.authors.toLowerCase().includes(q);
      const catMatch = p.category && p.category.toLowerCase().includes(q);

      return titleMatch || absMatch || tagMatch || authorMatch || catMatch;
    });
  }

  async saveChatMessage(role, text) {
    const msg = {
      id: "msg_" + Date.now(),
      role,
      text,
      timestamp: new Date().toISOString()
    };
    return this.add("chatHistory", msg);
  }

  async getChatHistory() {
    return this.cache.chatHistory || [];
  }
}

// Global DB instance
window.cryoDB = new CryoverseDatabase();
