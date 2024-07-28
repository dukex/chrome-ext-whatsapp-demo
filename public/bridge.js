(function () {
  "use strict";
  const eventTypes = [
    "webpack.full_ready",
    "chat.new_message",
    "chat.active_chat",
  ];

  // WhatsApp -> Bridge
  eventTypes.forEach((type) => {
    WPP.ev.addListener(type, (event) => {
      console.log(`Dispatching ${type}...`);

      // Bridge -> Content
      window.postMessage(JSON.stringify({ type, event }));
    });
  });

  self.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);

    if (
      !(
        event.origin === "https://web.whatsapp.com" &&
        event.source === window &&
        (data.response || (data.event && data.event.action))
      )
    ) {
      return;
    }

    if (data.event.action) {
      const { namespace, action, args } = data.event;

      WPP[namespace][action](...args);
    }

    console.log("bridge", data);
  });
})();
