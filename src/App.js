/*global chrome*/

import Chat from "./components/Chat";
import useWhatsApp from "./hooks/useWhatsApp";

function App() {
  const { isReady, currentChat } = useWhatsApp();

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Ola mundo</p>

        {currentChat && <Chat />}
      </header>
    </div>
  );
}

export default App;
