import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Container from '../components/Container';
import TitleSection from '../components/TitleSection';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        type: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const token = sessionStorage.getItem('@user:access_token');
        if (!token) {
            navigate("/");
        }

        const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/auth/register');

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha em registrar');
            }

            console.log("Resposta da API: " + response)

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container>

            <TitleSection>
                Cadastro de Usuário
            </TitleSection>

            {error && <p className="text-red-500">{error}</p>}

            <div className="p-4 bg-white rounded bg-zinc-200">
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="w-auto md:w-48 lg:w-96">
                        <div className="mb-4">
                            <div className="flex justify-start">
                                <Label
                                    htmlFor="name"
                                >
                                    Nome:
                                </Label>
                            </div>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-start">
                                <Label
                                    htmlFor="email"
                                >
                                    Email:
                                </Label>
                            </div>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-start">
                                <Label
                                    htmlFor="password"
                                >
                                    Senha:
                                </Label>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-start">
                                <Label
                                    htmlFor="type"
                                >
                                    Tipo:
                                </Label>
                            </div>
                            <Input
                                type="text"
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </div>
                        <Button>
                            Cadastrar
                        </Button>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default RegisterUser;
