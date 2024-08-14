import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-lime-500 text-black py-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Fairy</h1>
                <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/dashboard" className="text-black hover:text-gray-300">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="text-black hover:text-gray-300">
                            Perfil
                        </Link>
                    </li>
                </ul>
                </nav>
            </div>
        </header>  
    )
}

export default Header;