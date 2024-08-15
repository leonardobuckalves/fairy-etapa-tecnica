import React from "react";

const ProfilePicture = ({ perfil, children }) => {
    return (
        <div className="flex flex-col justify-center items-center mx-4 basis-1/2">
            <div className="w-24 h-24 md:w-48 md:h-48 lg:w-96 lg:h-96 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                    src={perfil.profileImageUrl}
                    alt={`Foto de perfil: ${perfil.name}`}
                    className="w-full h-full object-cover"
                />
            </div>
            {children}
        </div>
    )
}

export default ProfilePicture;