import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { SignUp } from './pages/signUp/SignUP';
import { ListedUser } from './pages/lista';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registrar" element={<SignUp />} />
          <Route path="/listar-usuarios" element={<ListedUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
