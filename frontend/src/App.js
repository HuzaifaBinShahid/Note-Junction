import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/NoteState';
function App() {
  return (
    <NoteState>

      <BrowserRouter>
        <Navbar />
        <div className='container my-4'>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />

          </Routes>
        </div>
      </BrowserRouter>

    </NoteState >
  );
}

export default App;
