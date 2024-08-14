import React from "react";

const Header = () => {
    return (
        <header className="bg-lime-500 text-black py-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Fairy</h1>
                <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-black hover:text-gray-300">Home</a></li>
                    <li><a href="/dashboard" className="text-black hover:text-gray-300">Dashboard</a></li>
                    <li><a href="/profile" className="text-black hover:text-gray-300">Perfil</a></li>
                </ul>
                </nav>
            </div>
        </header>  
    )
}

export default Header;