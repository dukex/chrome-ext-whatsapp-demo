/*global chrome*/

import Chat from "./components/Chat";
import useWhatsApp from "./hooks/useWhatsApp";

function App() {
  const { isReady } = useWhatsApp();

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Ola mundo</p>
        <Chat />
      </header>
    </div>
  );
}

export default App;
