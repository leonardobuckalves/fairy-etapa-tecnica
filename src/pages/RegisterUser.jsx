import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Header from '../components/Header';

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
        <>
        <Header />
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
                <h2 className="text-xl font-semibold mb-4">Cadastro de Usuário</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name">
                            Nome:
                        </Label>
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
                        <Label htmlFor="email">
                            Email:
                        </Label>
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
                        <Label htmlFor="password">
                            Senha:
                        </Label>
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
                        <Label htmlFor="type">
                            Tipo:
                        </Label>
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
        </>
    );
};

export default RegisterUser;
