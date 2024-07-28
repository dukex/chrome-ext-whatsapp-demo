import useCurrentChat from "../hooks/useCurrentChat";

export default function Chat() {
  const currentChat = useCurrentChat();

  return <pre>{JSON.stringify(currentChat, null, 2)}</pre>;
}
