import { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export function SignUp() {
  const [user, setUser] = useState<SignUpProps>({
    name: '',
    email: '',
    password: '',
  });

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
      await api.post('/cadastro', {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      alert('cadastrado com sucesso');
    } catch (error) {
      console.log(error);
      console.log(user);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 max-sm:px-5">
      <div className="w-full max-w-lg space-y-3 text-center">
        <h1 className="text-3xl font-bold text-white">Create an Account</h1>
        <p className="font-medium text-gray-400">
          <span className="text-gray-300 duration-200 hover:text-gray-400"> Enter your details to get started.</span>
        </p>

        <div>
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
              <label className="text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-gray-300 bg-transparent border rounded-md appearance-none border-input focus:outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col items-start">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
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
              Sign Up
            </button>
          </form>
          <Link to={'/'}>
            <p className="pt-5 text-white">Ja criei minha cont</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
