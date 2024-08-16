import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
import Button from '../components/Button';
import Container from '../components/Container';
import TitleSection from '../components/TitleSection';
import UserSection from '../components/UserSection';
import ProfilePicture from '../components/ProfilePicture';
import ProfileInformation from '../components/ProfileInformation';
import ProfileInfoRow from '../components/ProfileInfoRow';
import LoadingInfo from '../components/LoadingInfo';

const EditUser = () => {

    const [isEditing, setIsEditing] = useState({
        email: false,
        type: false
    });

    const [editForm, setEditForm] = useState({
        email: '',
        type: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = sessionStorage.getItem('@user:access_token');
            if (!token) {
                navigate("/");
            }

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
            setEditForm({
                email: result.email,
                type: result.type || ''
            });
        } catch (error) {
            console.error('Erro ao buscar o usuário:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    const handleEditClick = (field) => {
        setIsEditing({
            ...isEditing,
            [field]: true
        });
    };

    const handleChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleCancel = () => {
        setIsEditing({
            ...isEditing,
            email: false,
            type: false,
        });
        setError('');
    };

    const handleSave = async (event) => {
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
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha em atualizar o usuário');
            }

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <LoadingInfo />
    }

    return (
        <Container>

            <TitleSection>
                Editar Usuário
            </TitleSection>

            <UserSection>

                <ProfilePicture perfil={user} />

                <div className="w-1 bg-black mx-4 h-full"></div>

                <ProfileInformation>

                    {error && <p className="text-red-500">{error}</p>}

                    <ProfileInfoRow label={"Nome:"}>
                        {user.name}
                    </ProfileInfoRow>

                    <ProfileInfoRow label={"Email:"}>
                        {isEditing.email ? (
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={editForm.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                {user.email}
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="ml-2 cursor-pointer text-blue-500"
                                    onClick={() => handleEditClick('email')}
                                />
                            </>
                        )}
                    </ProfileInfoRow>

                    <ProfileInfoRow label={"Tipo:"}>
                        {isEditing.type ? (
                            <Input
                                type="text"
                                name="type"
                                id="type"
                                value={editForm.type}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                {user.type}
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="ml-2 cursor-pointer text-blue-500"
                                    onClick={() => handleEditClick('type')}
                                />
                            </>
                        )}
                    </ProfileInfoRow>

                    <ProfileInfoRow label={"Data Criação:"}>
                        {new Date(user.createdAt).toLocaleDateString()}
                    </ProfileInfoRow>

                    <ProfileInfoRow label={"Ultima Atualização:"}>
                        {new Date(user.updatedAt).toLocaleDateString()}
                    </ProfileInfoRow>

                    <ProfileInfoRow label={"Deletado:"}>
                        {user.deletedAt ? new Date(user.deletedAt).toLocaleDateString() : 'Nunca'}
                    </ProfileInfoRow>

                    {(isEditing.email || isEditing.type) && (
                        <div className="mt-2">
                            <Button
                                onClick={handleSave}
                                className="bg-green-500 hover:bg-green-700 my-2"
                            >
                                Salvar
                            </Button>
                            <Button
                                onClick={handleCancel}
                                className="bg-red-500 hover:bg-red-700 my-2"
                            >
                                Cancelar
                            </Button>
                        </div>
                    )}
                </ProfileInformation>
                {/*
                        <p>Deletado em: {user.deletedAt ? new Date(user.deletedAt).toLocaleDateString() : 'Nunca'}</p>
                    */}
            </UserSection>
        </Container>

    );
};

export default EditUser;