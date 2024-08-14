import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Form from '../components/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

const EditUser = () => {
    const { id } = useParams(); // Obtém o UUID do parâmetro da URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = sessionStorage.getItem('@user:access_token');

                const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/users/find-by-uuid');
                url.searchParams.append('uuid', id);

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
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Lógica para atualizar as informações do usuário
    };

    if (!user) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <Header />
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
                <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>
                <Form>
                    <div className="flex items-center min-h-12">
                        <Label
                            htmlFor={user.name}
                            className="p-2 basis-1/4"
                        >
                            Nome:
                        </Label>
                        <Input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="basis-3/4"
                        />
                    </div>
                    <div className="flex items-center min-h-12">
                        <Label
                            htmlFor={user.email}
                            className="p-2 basis-1/4"
                        >
                            Email:
                        </Label>
                        <Input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="basis-3/4"
                        />
                    </div>
                    <div className="flex items-center min-h-12">
                        <Label
                            htmlFor={user.email}
                            className="p-2 basis-1/4"
                        >
                            Tipo:
                        </Label>
                        <Input
                            type="text"
                            value={user.type}
                            onChange={(e) => setUser({ ...user, type: e.target.value })}
                            className="p-2 basis-3/4"
                        />
                    </div>
                    <div className="flex items-center min-h-12">
                        <Label
                            htmlFor={user.email}
                            className="p-2 basis-1/4"
                        >
                            Url da imagem:
                        </Label>
                        <Input
                            type="text"
                            value={user.profileImageUrl}
                            onChange={(e) => setUser({ ...user, profileImageUrl: e.target.value })}
                            className="p-2 basis-3/4"
                        />
                    </div>
                    <Button>Atualizar</Button>
                </Form>
            </div>
        </>

    );
};

export default EditUser;