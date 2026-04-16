(function() {
  // App Store URL — 上架後填入
  const APP_STORE_URL = "";

  function getParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      id: p.get("id") || "",
      name: p.get("name") || "",
      host: p.get("host") || "",
      schedule: p.get("schedule") || "",
      title: p.get("title") || "",
      program: p.get("program") || "",
      duration: p.get("duration") || ""
    };
  }

  function buildCustomSchemeURL(type, p) {
    const base = "bravo://" + type + "?";
    const params = new URLSearchParams();
    Object.keys(p).forEach(k => { if (p[k]) params.append(k, p[k]); });
    return base + params.toString();
  }

  function setText(sel, v) {
    const el = document.querySelector(sel);
    if (!el) return;
    if (v && v.trim()) {
      el.textContent = v;
      el.parentElement && el.parentElement.classList.remove("hide");
    } else {
      el.parentElement && el.parentElement.classList.add("hide");
    }
  }

  function setAppStoreButton() {
    const btn = document.getElementById("downloadBtn");
    if (!btn) return;
    if (APP_STORE_URL) {
      btn.href = APP_STORE_URL;
      btn.classList.remove("btn-disabled");
      btn.classList.add("btn-primary");
      btn.textContent = "下載 App 來聽";
    } else {
      btn.removeAttribute("href");
      btn.classList.add("btn-disabled");
      btn.textContent = "App 即將上架 · Coming Soon";
    }
  }

  function setupOpenInApp(type, p) {
    const btn = document.getElementById("openInAppBtn");
    if (!btn || type === "home") return;
    const url = buildCustomSchemeURL(type, p);
    btn.href = url;
  }

  window.BravoLanding = {
    init: function(type) {
      const p = getParams();
      if (type === "program" || type === "unit") {
        setText("#itemName", p.name);
        setText("#itemHost", p.host);
        setText("#itemSchedule", p.schedule);
      } else if (type === "episode") {
        setText("#itemName", p.title);
        setText("#itemProgram", p.program);
        setText("#itemDuration", p.duration);
      }
      setupOpenInApp(type, p);
      setAppStoreButton();
    }
  };
})();
