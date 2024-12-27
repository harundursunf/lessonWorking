import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isAuth, setIsAuth] = useState(false);
    const tokenControl = localStorage.getItem("authToken");
    const navigate = useNavigate();  // Navigate hook

    useEffect(() => {
        if (tokenControl) {
            setIsAuth(true);
        }
    }, [tokenControl]);

    const handleExploreClick = () => {
        const targetSection = document.getElementById('target-section');

        if (targetSection) {
            window.scrollBy({
                top: 455, // 600 piksel aşağı kaydırılır
                behavior: 'smooth'
            });
        } else {
            navigate('/explore');
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="mt-32 relative w-full max-w-[1163px] rounded-3xl shadow-lg bg-white overflow-hidden">

                {/* Basitleştirilmiş Dalgalı Arka Plan */}
                <div className="absolute inset-0">
                    <svg
                        className="absolute bottom-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        fill="currentColor"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="rgba(38, 70, 83, 0.6)" /* Hafif, yumuşak mavi tonları */
                            d="M0,224L80,197.3C160,171,320,117,480,96C640,75,800,85,960,101.3C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                        />
                    </svg>
                </div>

                {/* İçerik */}
                <div className="relative p-8 flex flex-col items-center lg:items-start space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8" style={{ height: '420px' }}>
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="font-semibold text-3xl 2xs:text-4xl lg:text-5xl tracking-tight leading-tight text-gray-800">
                            Gelecek Senin Elinde!
                        </h2>
                        <p className="mt-4 font-medium text-base text-gray-700 max-w-lg mx-auto lg:mx-0">
                            Bu site, akademik başarılarınızı artırmanıza yardımcı olmak için tasarlandı. Matematik ve Türkçe netlerinizi girerek hedeflerinize daha kolay ulaşabilirsiniz.
                        </p>
                        <div className="mt-6 bg-gradient-to-r from-blue-500 to-blue-800 rounded-full p-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300" onClick={handleExploreClick}>
                            {isAuth ? <button className='text-white font-bold text-sm'>Daha fazlasını keşfet, kendini bul!</button> : <button className='text-white font-bold text-sm'>Kayıt ol</button>}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <img
                            src="/public/derslig-nedir.webp"
                            alt="Gelecek Resmi"
                            className="rounded-lg w-full h-auto object-cover shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* İkinci Bölüm */}
            <div id="target-section" className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex items-center space-x-8 mt-8" style={{ height: '420px' }}>
                <div className="w-1/2 flex flex-col items-center justify-center relative">
                    <img
                        src="/public/ogretmen.webp"
                        alt="Başarı Resmi"
                        className="rounded-lg w-3/4 h-auto object-cover"
                    />
                </div>
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold text-center mb-4">Hedeflerinizi Şimdi Belirleyin!</h2>
                    <p className="text-center text-gray-600 mb-6">
                        Kendi akademik yolculuğunuzu planlayın ve başarıya ulaşmak için adım atın.
                        Denemelerinizdeki puanları girin ve ilerlemenizi takip edin.
                    </p>
                    <div className="text-center">
                        <div className="bg-green-500 rounded-full p-6 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-bold text-lg">Şimdi Başla</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Üçüncü Bölüm */}
            <div className="mt-8 bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex flex-wrap items-center justify-between">
                {/* 1. Resim ve içerik */}
                <div className="w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center mb-8">
                    <img
                        src="/public/1.webp"
                        alt="Öğretmen"
                        className="rounded-lg w-1/2 h-auto object-cover"
                    />
                    <h2 className="text-xl font-bold text-center mb-2">Öğretmen</h2>
                    <p className="text-center text-gray-600">Öğretmenlerinize danışın.</p>
                </div>

                {/* 2. Resim ve içerik */}
                <div className="w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center mb-8">
                    <img
                        src="/public/2.png"
                        alt="Öğrenci"
                        className="rounded-lg w-1/2 h-auto object-cover"
                    />
                    <h2 className="text-xl font-bold text-center mb-2">Öğrenci</h2>
                    <p className="text-center text-gray-600">Kendi başarı yolculuğunuzu başlatın.</p>
                </div>

                {/* 3. Resim ve içerik */}
                <div className="w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center mb-8">
                    <img
                        src="/public/3.webp"
                        alt="Başarı"
                        className="rounded-lg w-1/2 h-auto object-cover"
                    />
                    <h2 className="text-xl font-bold text-center mb-2">Başarı</h2>
                    <p className="text-center text-gray-600">Başarı sizin elinizde.</p>
                </div>

                {/* 4. Resim ve içerik */}
                <div className="w-full sm:w-1/2 md:w-1/4 flex flex-col items-center justify-center">
                    <img
                        src="/public/4.webp"
                        alt="Mutluluk"
                        className="rounded-lg w-1/2 h-auto object-cover"
                    />
                    <h2 className="text-xl font-bold text-center mb-2">Mutluluk</h2>
                    <p className="text-center text-gray-600">Başarı mutluluğu getirir.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
