/* global chrome*/
import { createContext, useState, useEffect } from "react";

const WhatsAppContext = createContext({
  isReady: false,
  currentTabId: null,
  currentChat: null,
  sentTextMessage: () => {},
});

export default WhatsAppContext;

export function WhatsAppProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [currentTabId, setCurrentTabId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const sentTextMessage = async (text, chatId) => {
    if (!chatId) {
      chatId = currentChat.id;
    }

    chrome.tabs.sendMessage(currentTabId, {
      namespace: "chat",
      action: "sendTextMessage",
      args: [chatId, text, { createChat: true }],
    });
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (!(sender.tab && sender.url.startsWith("https://web.whatsapp.com"))) {
        return;
      }

      setCurrentTabId(sender.tab.id);

      if (request.type === "webpack.full_ready") {
        setIsReady(true);
        setCurrentChat(null);
        sendResponse({ ready: true });
      } else if (request.type === "chat.active_chat") {
        setCurrentChat(request.event);
      } else if (request.type === "chat.new_message") {
        const { from, body } = request.event;
        if (body === "ping") {
          sendResponse({
            namespace: "chat",
            action: "sendTextMessage",
            args: [from, "pong", { createChat: true }],
          });
        }
      } else {
      }
    });

    chrome.tabs.reload();
  }, []);

  return (
    <WhatsAppContext.Provider
      value={{ isReady, currentChat, currentTabId, sentTextMessage }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
}
