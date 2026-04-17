(function() {
  // App Store URL — 上架後填入
  const APP_STORE_URL = "";

  // 官網 URL 樣板（http，讓舊 mp3 URL 不會 mixed-content）
  const OFFICIAL_URLS = {
    program: (id) => "http://bravo913.com.tw/index.php?route=choice/program_detail&choice_program_id=" + encodeURIComponent(id),
    unit:    (id) => "http://bravo913.com.tw/index.php?route=choice/unit_detail&choice_program_id=" + encodeURIComponent(id)
  };

  function getParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      id: p.get("id") || "",
      name: p.get("name") || "",
      host: p.get("host") || "",
      schedule: p.get("schedule") || "",
      title: p.get("title") || "",
      program: p.get("program") || "",
      duration: p.get("duration") || "",
      audio: p.get("audio") || ""
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

  // 曲目：把 audio query 嵌成 <audio controls>；http 自動升 https
  function injectAudioPlayer(audioURL) {
    const wrap = document.getElementById("audioPlayer");
    if (!wrap || !audioURL) return;
    const src = audioURL.replace(/^http:\/\//i, "https://");
    const el = document.createElement("audio");
    el.controls = true;
    el.preload = "metadata";
    el.src = src;
    el.style.width = "100%";
    el.style.display = "block";
    el.style.marginTop = "12px";
    wrap.appendChild(el);
  }

  // 節目/單元：設官網收聽按鈕
  function setupOfficialButton(type, id) {
    const btn = document.getElementById("officialBtn");
    if (!btn || !id) return;
    const builder = OFFICIAL_URLS[type];
    if (!builder) return;
    btn.href = builder(id);
  }

  window.BravoLanding = {
    init: function(type) {
      const p = getParams();
      if (type === "program" || type === "unit") {
        setText("#itemName", p.name);
        setText("#itemHost", p.host);
        setText("#itemSchedule", p.schedule);
        setupOfficialButton(type, p.id);
      } else if (type === "episode") {
        setText("#itemName", p.title);
        setText("#itemProgram", p.program);
        setText("#itemDuration", p.duration);
        injectAudioPlayer(p.audio);
      }
      setupOpenInApp(type, p);
      setAppStoreButton();
    }
  };
})();
