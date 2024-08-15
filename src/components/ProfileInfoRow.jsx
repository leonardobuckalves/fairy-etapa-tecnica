import React from 'react';

const ProfileInfoRow = ({ label, children }) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <p>{label}</p>
            </div>
            <div>
                <p>{children}</p>
            </div>
        </div>
    );
};

export default ProfileInfoRow;