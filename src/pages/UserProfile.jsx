import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const UserProfile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem('@user:access_token');
        const userUuid = sessionStorage.getItem('@user:uuid');

        const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/users/find-by-uuid');
        url.searchParams.append('uuid', userUuid);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        
        setUser(result);
      } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div>
        <Header />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Perfil</h2>
          <p>Carregando informações...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Perfil</h2>
        <div className="flex items-center space-x-4">
          <img
            src={user.profileImageUrl}
            alt={`${user.name}'s profile`}
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <p className="text-lg font-semibold">Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>UUID: {user.uuid}</p>
            <p>Criado em: {new Date(user.createdAt).toLocaleDateString()}</p>
            <p>Atualizado em: {new Date(user.updatedAt).toLocaleDateString()}</p>
            <p>Deletado em: {user.deletedAt ? new Date(user.deletedAt).toLocaleDateString() : 'Nunca'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;