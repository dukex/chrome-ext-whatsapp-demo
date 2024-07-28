function injectScript(filePath, tag, callback) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", filePath);
  script.onload = () => {
    callback();
  };
  node.appendChild(script);
}

injectScript(chrome.runtime.getURL("wppconnect-wa.js"), "body", () => {
  injectScript(chrome.runtime.getURL("bridge.js"), "body", () => {
    console.log("injected");
  });
});

// Bridge -> Content
window.addEventListener(
  "message",
  function (event) {
    if (event.data === "") {
      return;
    }

    const data = JSON.parse(event.data);

    if (data.response) {
      return;
    }

    (async () => {
      // Content -> ReactApp
      const response = await chrome.runtime.sendMessage(data);

      // ReactApp -> Bridge
      window.postMessage(
        JSON.stringify({
          response: true,
          type: `${data.type}.response`,
          event: response,
        })
      );
    })();
  },
  false
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  debugger;
  console.log(request);
});
