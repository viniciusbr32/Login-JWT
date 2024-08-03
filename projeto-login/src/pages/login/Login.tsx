import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface LoginProps {
  email: string;
  password: string;
}

export function Login() {
  const [user, setUser] = useState<LoginProps>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const { data: token } = await api.post('/login', {
        email: user.email,
        password: user.password,
      });

      localStorage.setItem('token', token);
      navigate('/listar-usuarios');
    } catch (error) {
      alert('Senha ou email incorretos');
      console.log(error);
    }
  }
  console.log(user.email);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 max-sm:px-5">
      <div className="w-full max-w-lg space-y-3 text-center">
        <h1 className="text-3xl font-bold text-white">Sign in to your account</h1>
        <p className="font-medium text-gray-400">
          {' '}
          Or
          <Link to={'/registrar'}>
            <span className="text-gray-300 duration-200 hover:text-gray-400"> reset your password</span>
          </Link>
        </p>

        <div>
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="text"
                required
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-300 bg-transparent border rounded-md appearance-none border-input focus:outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col items-start">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-300 bg-transparent border rounded-md appearance-none border-input focus:outline-none focus:ring-1"
              />
            </div>

            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 font-semibold bg-white rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
