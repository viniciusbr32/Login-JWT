import { useEffect, useState } from 'react';
import api from '../../services/api';

interface User {
  name: string;
  email: string;
  id: string;
}

export function ListedUser() {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function loadUser() {
      try {
        const {
          data: { users },
        } = await api.get('/listar-usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(users)) {
          setAllUsers(users);
        } else {
          setAllUsers([]);
        }
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }
    loadUser();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen space-y-5 bg-zinc-950">
      <h2 className="pt-10 text-3xl text-center text-white">Lista de Usuários</h2>
      <div className="w-full max-w-3xl">
        <table className="w-full border-collapse table-auto">
          <thead className="text-white">
            <tr className="bg-zinc-800">
              <th className="px-4 py-2 cursor-pointer">Username</th>
              <th className="px-4 py-2 cursor-pointer">Email </th>
              <th className="px-4 py-2 cursor-pointer">ID</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <tr key={user.id} className="text-center text-white transition-colors border-b hover:bg-zinc-600">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-white">
                  Não há usuários disponíveis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
