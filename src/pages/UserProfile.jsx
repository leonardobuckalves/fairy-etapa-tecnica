import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Container from '../components/Container';
import TitleSection from '../components/TitleSection';
import ProfilePicture from '../components/ProfilePicture';
import UserSection from '../components/UserSection';
import Input from '../components/Input';
import ProfileInformation from '../components/ProfileInformation';
import ProfileInfoRow from '../components/ProfileInfoRow';
import Button from '../components/Button';
import LoadingInfo from '../components/LoadingInfo';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const [error, setError] = useState('');

    const [isEditing, setIsEditing] = useState({
        email: false,
        type: false,
    });

    const [isEditingPicture, setIsEditingPicture] = useState(false);

    const [editForm, setEditForm] = useState({
        email: '',
        type: ''
    });

    const token = sessionStorage.getItem('@user:access_token');
    const userUuid = sessionStorage.getItem('@user:uuid');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/users/find-by-uuid');
                url.searchParams.append('uuid', userUuid);

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

        fetchUser();
    }, []);

    const handleEditClick = (field) => {
        setIsEditing({
            ...isEditing,
            [field]: true
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

    const handleChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/users/update')
            url.searchParams.append('uuid', userUuid);

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing({
                email: false,
                type: false
            });
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <LoadingInfo />
    };

    const handleSubmit = async (event) => {

        const url = new URL('https://template-backend-fairy-d6gx9.ondigitalocean.app/api/v1/storage/profile-image');
    
        event.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("userUuid", userUuid);
            formData.append("file", file);
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
    
            const result = await response.json();
            setStatus(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsEditingPicture(false);
        }
    };

    const handlePictureEditClick = () => {
        setIsEditingPicture(true);
    };

    const handlePictureCloseClick = () => {
        setIsEditingPicture(false);
    };

    return (
        <Container>

            <Header />

            <TitleSection>
                Perfil
            </TitleSection>

            <UserSection>

                <ProfilePicture perfil={user}>
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="ml-2 cursor-pointer text-blue-500"
                        onClick={handlePictureEditClick}
                    />
                    {isEditingPicture && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h1 className="text-center text-lg mb-4">Enviar Arquivo</h1>
                                <form onSubmit={handleSubmit}>
                                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />

                                    <div className="flex justify-between">
                                        <button 
                                            type="submit" 
                                            disabled={!file}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Upload
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={handlePictureCloseClick}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {/* <form onSubmit={handleSubmit}>
                        <h1>React File Upload</h1>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                        <button type="submit" disabled={!file}>
                            Upload File
                        </button>
                    </form> */}
                </ProfilePicture>

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

export default UserProfile;
