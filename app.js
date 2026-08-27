(() => {
  "use strict";
  const current = document.currentScript;
  const restore = document.getElementById("restoreBackupSetup");
  if (!restore) {
    const setup = document.getElementById("setup");
    if (setup) {
      const label = document.createElement("label");
      label.className = "file-button";
      label.textContent = "Restore encrypted backup";
      const input = document.createElement("input");
      input.id = "restoreBackupSetup";
      input.type = "file";
      input.accept = "application/json,.json";
      label.appendChild(input);
      const form = document.getElementById("setupForm");
      if (form) form.appendChild(label); else setup.appendChild(label);
    } else {
      const input = document.createElement("input");
      input.id = "restoreBackupSetup";
      input.type = "file";
      input.hidden = true;
      document.body.appendChild(input);
    }
  }

  const RAW_FEED = "https://raw.githubusercontent.com/zander123abc/nn-zero-to-hero/financial-command-feed/financial-command/latest.enc.json";
  const LOCAL_FEED = "/nn-zero-to-hero/financial-command/latest.enc.json";
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    try {
      const url = typeof input === "string" ? input : input?.url;
      if (url === RAW_FEED || (typeof url === "string" && url.startsWith(RAW_FEED + "?"))) {
        return nativeFetch(`${LOCAL_FEED}?v=${Date.now()}`, {
          ...(init || {}),
          cache: "no-store",
          credentials: "same-origin",
          referrerPolicy: "no-referrer"
        });
      }
    } catch (_) {}
    return nativeFetch(input, init);
  };

  const stamp = Date.now();
  const css = document.querySelector('link[rel="stylesheet"]');
  if (css) css.href = `/nn-zero-to-hero/financial-command-app/styles.css?v=${stamp}`;

  const script = document.createElement("script");
  script.src = `/nn-zero-to-hero/financial-command-app/app.js?v=${stamp}`;
  script.async = false;
  script.onerror = () => {
    document.body.innerHTML = '<main style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:24px"><h1>Financial Command</h1><p>App code failed to load. Reload this page once while connected to the internet.</p></main>';
  };
  document.body.appendChild(script);
})();