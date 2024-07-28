import { useContext } from "react";
import WhatsAppContext from "../context/WhatsAppProvider";

export default function useWhatsApp() {
  return useContext(WhatsAppContext);
}
