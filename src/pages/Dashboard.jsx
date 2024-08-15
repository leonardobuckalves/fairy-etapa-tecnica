import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Container from '../components/Container';
import TitleSection from '../components/TitleSection';
import LoadingInfo from '../components/LoadingInfo';

const Dashboard = ({ page, itemsPerPage }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        return <LoadingInfo />
    }

    return (
        <Container>
            <Header />

            <TitleSection>
                Lista de Usuários
            </TitleSection>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Imagem de Perfil</th>
                                <th className="border border-gray-300 px-4 py-2">Nome</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                                <th className="border border-gray-300 px-4 py-2">Editar Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.uuid}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex justify-center">
                                            <img
                                                src={item.profileImageUrl}
                                                alt={`${item.name} profile`}
                                                className="h-16 w-16 object-fill rounded-full"
                                            />
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.type}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className="ml-2 cursor-pointer text-blue-500"
                                            onClick={() => navigate(`/users/edit/${item.uuid}`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </Container>
    );
};

export default Dashboard;