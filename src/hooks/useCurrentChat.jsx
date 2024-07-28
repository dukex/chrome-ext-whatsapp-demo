import { useContext } from "react";
import WhatsAppContext from "../context/WhatsAppProvider";

export default function useCurrentChat() {
  const { currentChat } = useContext(WhatsAppContext);

  return currentChat;
}
