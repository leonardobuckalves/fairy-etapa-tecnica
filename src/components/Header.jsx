import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="max-h-64 bg-black text-white py-1 top-0 left-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <img
                    src="https://fairysolutions.co/wp-content/webp-express/webp-images/uploads/2022/10/logo-fairy-slogan-v1-1024x579.png.webp"
                    alt="Fairy Logo"
                    className="w-20 h-fit sm:w-24 md:w-28 lg:w-36 cursor-pointer"
                    onClick={() => window.open("https://fairysolutions.co/", "_blank")}
                />
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/dashboard"
                                className="text-white hover:text-lime-500"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register/user"
                                className="text-white hover:text-lime-500"
                            >
                                Criar Usuário
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/user/profile"
                                className="text-white hover:text-lime-500"
                            >
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;