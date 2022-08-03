import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Main from "./pages/Main";
import Daddy from 'pages/Daddy';
import Authing from 'pages/Authing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Authing />} />
        <Route path="/" element={<Main />} />
        <Route path="/daddy" element={<Daddy />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
