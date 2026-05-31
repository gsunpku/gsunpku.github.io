// Language Toggle for bilingual support
(function () {
  const STORAGE_KEY = "preferred-lang";
  const DEFAULT_LANG = "en";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    // Toggle content visibility
    document.querySelectorAll(".lang-en").forEach(function (el) {
      el.style.display = lang === "en" ? "" : "none";
    });
    document.querySelectorAll(".lang-zh").forEach(function (el) {
      el.style.display = lang === "zh" ? "" : "none";
    });

    // Update toggle button text
    var btn = document.getElementById("lang-toggle-btn");
    if (btn) {
      btn.textContent = lang === "en" ? "中文" : "EN";
      btn.setAttribute("data-lang", lang);
    }

    // Update nav links text
    var navTranslations = {
      publications: { en: "publications", zh: "发表论文" },
      teaching: { en: "Teaching", zh: "教学" },
      cv: { en: "CV", zh: "简历" },
    };
    document.querySelectorAll("nav a, .navbar a").forEach(function (link) {
      var text = link.textContent.trim().toLowerCase();
      Object.keys(navTranslations).forEach(function (key) {
        var t = navTranslations[key];
        if (text === t.en.toLowerCase() || text === t.zh) {
          link.textContent = t[lang];
        }
      });
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }

  function createToggleButton() {
    // Find the navbar
    var nav =
      document.querySelector("nav") || document.querySelector(".navbar");
    if (!nav) return;

    // Avoid duplicate
    if (document.getElementById("lang-toggle-btn")) return;

    var btn = document.createElement("button");
    btn.id = "lang-toggle-btn";
    btn.type = "button";
    btn.style.cssText =
      "background:none;border:1px solid rgba(0,0,0,0.2);border-radius:6px;padding:4px 10px;cursor:pointer;font-size:0.85rem;margin-left:8px;color:inherit;font-weight:500;transition:all 0.2s;";
    btn.addEventListener("mouseenter", function () {
      btn.style.background = "rgba(0,0,0,0.05)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "none";
    });
    btn.addEventListener("click", function () {
      var current = btn.getAttribute("data-lang");
      setLang(current === "en" ? "zh" : "en");
    });

    // Insert into nav
    var navContainer = nav.querySelector(".nav-right, .navbar-nav, ul, .flex");
    if (navContainer) {
      navContainer.appendChild(btn);
    } else {
      nav.appendChild(btn);
    }
  }

  // Initialize on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    createToggleButton();
    applyLang(getLang());
  });
})();
