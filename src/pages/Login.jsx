import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Form from '../components/Form';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/auth/login');

        const data = { email, password };

        try {
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const result = await response.json();
            
            sessionStorage.setItem('@user:access_token', result.accessToken);
            sessionStorage.setItem('@user:uuid', result.userData.uuid);
            
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="email">
                    Email
                </Label>

                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="password">
                    Senha
                </Label>

                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">
                Entrar
            </Button>
        </Form>
    );
};

export default Login;