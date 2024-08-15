import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import TitleSection from '../components/TitleSection';
import Container from '../components/Container';

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
        <Container className="justify-center">

            <TitleSection>
                Login
            </TitleSection>

            <div className="flex justify-center p-4 bg-white rounded">
                <form onSubmit={handleSubmit} className='w-auto lg:w-96 shadow-md'>
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
                            autoComplete="email"
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
                            autoComplete="new-password"
                        />
                    </div>
                    <Button className="my-2">
                        Entrar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;