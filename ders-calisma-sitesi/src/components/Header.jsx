import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Header = () => {
    const [isMenu1Open, setIsMenu1Open] = useState(false);
    const [isMenu2Open, setIsMenu2Open] = useState(false);
    const [isSubMenu1Open, setIsSubMenu1Open] = useState(false);
    const [isSubMenu2Open, setIsSubMenu2Open] = useState(false);
    const [isMenu3Open, setIsMenu3Open] = useState(false); // Yeni Menümüz için
    const menu1Ref = useRef(null);
    const menu2Ref = useRef(null);
    const menu3Ref = useRef(null); // Yeni Menu Ref’i
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate()


    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        setIsAuth(false);
    }

    const token = localStorage.getItem("authToken");
    const getUserIdFromToken = (token) => {
        if (!token) console.log("Token Bulunamadı");
        try {
            const payload = atob(token.split(".")[1]);
            const decoded = JSON.parse(payload);
            return decoded.userId;

        } catch (error) {
            console.error("Token decode edilemedi:", error);
            return null;
        }
    };
    const userId = getUserIdFromToken(token);
    useEffect(() => {
        const getUser = async () => {
            if (!userId) {
                console.error("User ID bulunamadı!");
                return;
            }
            try {
                const res = await fetch(`http://localhost:5000/api/users/getUserInfo/${userId}`);
                if (!res.ok) {
                    throw new Error("Veriler Alınamadı!");
                }
                const data = await res.json();
                setUser(data);
                setIsAuth(true);
            } catch (error) {
                console.error("Kullanıcı bilgileri alınamadı:", error);
            }
        };
        getUser();
    }, [userId]);


    const handleMenuToggle1 = () => {
        setIsMenu1Open((prev) => !prev);
        setIsMenu2Open(false);
    };

    const handleMenuToggle2 = () => {
        setIsMenu2Open((prev) => !prev);
        setIsMenu1Open(false);
    };

    const handleMenuToggle3 = () => {
        setIsMenu3Open((prev) => !prev); // Menu3 toggle
        setIsMenu1Open(false);
        setIsMenu2Open(false);
    };

    const handleClickOutside = (event) => {
        if (menu1Ref.current && !menu1Ref.current.contains(event.target)) {
            setIsMenu1Open(false);
        }
        if (menu2Ref.current && !menu2Ref.current.contains(event.target)) {
            setIsMenu2Open(false);
        }
        if (menu3Ref.current && !menu3Ref.current.contains(event.target)) {
            setIsMenu3Open(false); // Menu3 dışı tıklandığında kapat
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 ">
            {/* Üst Bilgi */}
            <div className="bg-red-700 text-white w-full">
    <div className="flex items-center justify-between px-6 h-[31px] text-sm max-w-screen-xl mx-auto">
        <div className="flex items-center gap-1 ml-10">
            <div className="flex items-center gap-1">
                <FaPhoneAlt className="text-xl text-white" />
                <span className="text-base font-medium">+90 555 555 55 55</span>
            </div>
            <IoIosMail className="text-3xl text-white ml-3" />
            <span className="text-base font-medium">@examplemail.com</span>
        </div>
        <div className="flex items-center gap-4">
            <span>Şok Şok Fiyat: 99₺</span>
        </div>
    </div>
</div>


            {/* Ana Menü */}
            <div className="flex items-center justify-between bg-white px-6 h-20 shadow-lg">
                <div className="flex items-center gap-8">
                    <Link to="/">
                        <img
                            src="/public/logo2.jpg "

                            className="h-20 w-aouto ml-[100px]  "
                        />
                    </Link>


                    <nav className="flex items-center gap-6">
                        <div ref={menu1Ref} className="relative">
                            <button
                                onClick={handleMenuToggle1}
                                className={`flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-100 transition relative ${isMenu1Open ? "underline" : ""}`}
                            >
                                Ders İşlemleri <FaChevronDown size={16} />
                            </button>
                            {isMenu1Open && (
                                <div className="absolute right-0 mt-[1px] w-48 bg-white text-gray-800 shadow-md rounded z-50">
                                    <ul>
                                        <li>
                                            <Link to="/score-calculator" className="px-4 py-2 hover:bg-gray-100 block">
                                                Puan Hesaplama
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/pomodoro" className="px-4 py-2 hover:bg-gray-100 block">
                                                Pomodoro
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/GunlukSoz" className="px-4 py-2 hover:bg-gray-100 block">
                                                Sözler
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/test" className="px-4 py-2 hover:bg-gray-100 block">
                                                Testler
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/personal" className="px-4 py-2 hover:bg-gray-100 block">
                                                Günlük Hedef
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div ref={menu2Ref} className="relative">
                            <button
                                onClick={handleMenuToggle2}
                                className={`flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-100 transition relative ${isMenu2Open ? "underline" : ""}`}
                            >
                                AYT/TYT <FaChevronDown size={16} />
                            </button>
                            {isMenu2Open && (
                                <div className="absolute right-0 mt-[1px] w-48 bg-white text-gray-800 shadow-md rounded z-50">
                                    <ul>
                                        <li>
                                            <button
                                                onClick={() => setIsSubMenu1Open(!isSubMenu1Open)}
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 block w-full text-left"
                                            >
                                                AYT
                                                <FaChevronDown size={16} />
                                            </button>
                                            {isSubMenu1Open && (
                                                <ul className="pl-4">
                                                    <li>
                                                        <Link to="/ayt" className="px-4 py-2 hover:bg-gray-100 block">
                                                            AYT Konuları
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/aytMat" className="px-4 py-2 hover:bg-gray-100 block">
                                                            AYT Matematik
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/aytTur" className="px-4 py-2 hover:bg-gray-100 block">
                                                            AYT Türkçe
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setIsSubMenu2Open(!isSubMenu2Open)}
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 block w-full text-left"
                                            >
                                                TYT
                                                <FaChevronDown size={16} />
                                            </button>
                                            {isSubMenu2Open && (
                                                <ul className="pl-4">
                                                    <li>
                                                        <Link to="/tyt" className="px-4 py-2 hover:bg-gray-100 block">
                                                            TYT Konuları
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/tytMat" className="px-4 py-2 hover:bg-gray-100 block">
                                                            TYT Matematik
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/tytTurkce" className="px-4 py-2 hover:bg-gray-100 block">
                                                            TYT Türkçe
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div ref={menu3Ref} className="relative">
                            <button
                                onClick={handleMenuToggle3}
                                className={`flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-100 transition relative ${isMenu3Open ? "underline" : ""}`}
                            >
                                Hayallerim <FaChevronDown size={16} />
                            </button>
                            {isMenu3Open && (
                                <div className="absolute right-0 mt-[1px] w-48 bg-white text-gray-800 shadow-md rounded z-50">
                                    <ul>
                                        <li>
                                            <Link to="/hayallerim/uni" className="px-4 py-2 hover:bg-gray-100 block">
                                                Üniversiteler
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

                {isAuth ? (
                    <div className="flex flex-row items-center space-x-4  mr-[105px]">
                        {/* Kullanıcı Bilgisi */}
                        <div className="w-[120px] h-[50px] border bg-gray-100 flex items-center justify-center rounded shadow-sm ">
                            <span className="flex items-center text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 mr-2 text-gray-600"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                {user.username}
                            </span>
                        </div>
                        {/* Çıkış Butonu */}
                        <div className="w-[120px] h-[50px] bg-red-600 flex items-center justify-center rounded shadow-sm hover:bg-red-700 transition">
                            <button
                                onClick={handleLogOut}
                                className="text-white flex items-center font-medium"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path d="M10 17l5-5-5-5v10zm9-5c0-5.523-4.477-10-10-10S0 6.477 0 12s4.477 10 10 10 10-4.477 10-10z" />
                                </svg>
                                Çıkış Yap
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4  mr-[105px]">
                        {/* Giriş Yap */}
                        <Link
                            to="/login"
                            className="bg-gray-200 px-4 py-2 rounded flex items-center text-gray-700 hover:bg-gray-100 shadow-sm transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 mr-2"
                            >
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 13H9v-2h6v2z" />
                            </svg>
                            Giriş Yap
                        </Link>
                        {/* Kayıt Ol */}
                        <Link
                            to="/signup"
                            className="bg-red-700 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 shadow-sm transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 mr-2"
                            >
                                <path d="M16.5 10.5L19.5 7.5 16.5 4.5m0 0L12 9m4.5-4.5V15m-9-7.5L4.5 10.5 7.5 13.5m0 0L12 9m-4.5 4.5V15" />
                            </svg>
                            Kayıt Ol
                        </Link>
                    </div>
                )}

            </div>
        </header>
    );
};

export default Header;
