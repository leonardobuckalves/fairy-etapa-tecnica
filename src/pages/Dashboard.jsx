import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Container from '../components/Container';
import TitleSection from '../components/TitleSection';
import LoadingInfo from '../components/LoadingInfo';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const navigate = useNavigate();

    const fetchData = async () => {

        try {
            const token = sessionStorage.getItem('@user:access_token');
            if (!token) {
                navigate("/");
            }

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
            setData([]);
            throw new Error('Erro ao buscar os dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, itemsPerPage]);

    if (loading) {
        return <LoadingInfo />
    }

    const handleNextPage = () => {
        if (page < 99) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };


    return (
        <Container>

            <TitleSection>
                Lista de Usuários
            </TitleSection>

            <div className="flex justify-center overflow-x-auto">
                <table className="table-auto border border-gray-500 border-collapse bg-white">
                    <thead className="bg-lime-500">
                        <tr>
                            <th className="border border-gray-500 px-4 py-2">Imagem de Perfil</th>
                            <th className="border border-gray-500 px-4 py-2">Nome</th>
                            <th className="border border-gray-500 px-4 py-2">Email</th>
                            <th className="border border-gray-500 px-4 py-2">Tipo</th>
                            <th className="border border-gray-500 px-4 py-2">Editar Perfil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.uuid}>
                                <td className="border border-gray-500 px-4 py-2">
                                    <div className="flex justify-center">
                                        <img
                                            src={item.profileImageUrl}
                                            alt={`${item.name} profile`}
                                            className="h-16 w-16 object-fill rounded-full"
                                        />
                                    </div>
                                </td>
                                <td className="border border-gray-500 px-4 py-2 text-center">{item.name}</td>
                                <td className="border border-gray-500 px-4 py-2 text-center">{item.email}</td>
                                <td className="border border-gray-500 px-4 py-2 text-center">{item.type}</td>
                                <td className="border border-gray-500 px-4 py-2 text-center">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="ml-2 cursor-pointer text-lime-500 hover:text-lime-700"
                                        onClick={() => navigate(`/users/edit/${item.uuid}`)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="px-4 py-2">{page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page >= 99}
                    className="px-4 py-2 bg-white rounded disabled:opacity-50"
                >
                    Próximo
                </button>
            </div>

        </Container>
    );
};

export default Dashboard;