import useCurrentChat from "../hooks/useCurrentChat";
import useWhatsApp from "../hooks/useWhatsApp";

export default function Chat() {
  const currentChat = useCurrentChat();
  const { sentTextMessage } = useWhatsApp();

  const handleSendMessage = () => {
    sentTextMessage("Olá tudo bem? é um prazer ter você aqui");
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Enviar boas vindas</button>

      <pre>{JSON.stringify(currentChat, null, 2)}</pre>
    </div>
  );
}
