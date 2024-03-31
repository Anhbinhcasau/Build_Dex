import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Tokens from "./components/Tokens";
import Swap from "./components/Swap";

function App() {
  return (
    <div className="App">
        <Header/>
        <div className="mainWindow">
          <Routes>
            <Route  path="/" element={<Swap />} />
            <Route  path='/tokens' element={<Tokens />} />
          </Routes>
        </div>
        
    </div>
  )
}

export default App;
