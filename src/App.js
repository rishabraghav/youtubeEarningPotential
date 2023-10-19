import logo from './logo.svg';

import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

function App() {
  

  return (
    <div className="App h-screen bg-black overflow-hidden fixed w-screen">
      <Header/>
      <LandingPage />
    </div>
  );
}

export default App;
