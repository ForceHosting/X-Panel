import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Main from "./pages/Main";
import Authing from 'pages/Authing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Authing />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
