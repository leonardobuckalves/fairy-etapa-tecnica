import React from 'react';

const ProfileInfoRow = ({ label, children }) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="font-bold">{label}</p>
            </div>
            <div>
                <p className="mr-6">{children}</p>
            </div>
        </div>
    );
};

export default ProfileInfoRow;