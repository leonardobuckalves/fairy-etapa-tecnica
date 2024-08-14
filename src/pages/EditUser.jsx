import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Form from '../components/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

const EditUser = () => {

    const [formData, setFormData] = useState({
        // name: '',
        email: '',
        type: '',
      });

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

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

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');

        try {
            const token = sessionStorage.getItem('@user:access_token');

            const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/users/update');
            url.searchParams.append('uuid', id);

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha em atualizar o usuário');
            }

            console.log(response)

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
                <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>
                {error && <p className="text-red-500">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    {/* <div className="flex items-center min-h-12">
                        <Label
                            htmlFor="name"
                            className="p-2 basis-1/4"
                        >
                            Nome:
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="basis-3/4"
                            autoComplete="name"
                        />
                    </div> */}
                    <div className="flex items-center min-h-12">
                        <Label
                            htmlFor="email"
                            className="p-2 basis-1/4"
                        >
                            Email:
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="basis-3/4"
                            autoComplete="email"
                        />
                    </div>
                    <div className="flex items-center min-h-12">
                        <Label
                            htmlFor="type"
                            className="p-2 basis-1/4"
                        >
                            Tipo:
                        </Label>
                        <Input
                            type="text"
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="p-2 basis-3/4"
                        />
                    </div>
                    
                    <Button>
                        Atualizar
                    </Button>
                </Form>
            </div>
        </>

    );
};

export default EditUser;