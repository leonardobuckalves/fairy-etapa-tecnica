import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Dashboard = ({ page, itemsPerPage }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const token = sessionStorage.getItem('@user:access_token');

                const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/users/list');
                url.searchParams.append('page', page);
                url.searchParams.append('itemsPerPage', itemsPerPage);

                const response = await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();

                setData(result.data);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, itemsPerPage]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <Header />
            <h1>Dashboard</h1>
            <h3>Lista de usuários:</h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Imagem de Perfil</th>
                                <th className="border border-gray-300 px-4 py-2">Nome</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                                <th className="border border-gray-300 px-4 py-2">Criado em</th>
                                <th className="border border-gray-300 px-4 py-2">Editar Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.uuid}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src={item.profileImageUrl}
                                            alt={`${item.name} profile`}
                                            className="w-16 h-16 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link
                                            to={`/users/edit/${item.uuid}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/register">Criar novo usuário</Link>
            </div>
        </>
    );
};

export default Dashboard;