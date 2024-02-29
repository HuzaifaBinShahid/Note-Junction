import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
function App() {
  return (
    <NoteState>

      <BrowserRouter>
        <Navbar />
        <Alert message = "Checking Alert" />
        <div className='container my-4'>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path = '/login' element = {<Login/>}/>
            <Route exact path = '/signup' element = {<SignUp/>}/>

          </Routes>
        </div>
      </BrowserRouter>

    </NoteState >
  );
}

export default App;
