import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';


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
                            fill="rgba(255, 175, 1, 0.6)" /* Hafif, yumuşak mavi tonları */
                            d="M0,320C150,288,300,256,450,256C600,256,750,288,900,288C1050,288,1200,256,1350,224L1440,192V320H1350C1200,320,1050,320,900,320C750,320,600,320,450,320C300,320,150,320,0,320Z"
                        />
                    </svg>

                </div>

                {/* İçerik */}
                <div className="relative p-8 flex flex-col items-center lg:items-start space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8" style={{ height: '420px' }}>
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="font-extrabold text-5xl lg:text-5xl tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
                            Gelecek Senin Elinde!
                        </h2>


                        <p className="mt-[40px] text-lg text-gray-800 max-w-lg mx-auto lg:mx-0 bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow-md border border-blue-100">
                            🌟 Bu site, akademik başarılarınızı artırmanıza yardımcı olmak için tasarlandı.
                            Matematik ve Türkçe netlerinizi girerek hedeflerinize daha kolay ulaşabilirsiniz.
                        </p>

                        <div className="mt-[110px] flex justify-center lg:justify-start">
                            <button
                                className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center space-x-2"
                                onClick={handleExploreClick}
                            >
                                <span>Keşfet</span>
                                <FaArrowDown className="ml-2 animate-bounce" />
                            </button>

                        </div>
                        <style jsx>{`
    .animate-bounce {
      animation: bounce 1.5s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  `}</style>
                    </div>


                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <img
                            src="/public/ogrenci.webp"
                            alt="Gelecek Resmi"
                            className="rrounded-lg w-3/4 h-auto object-cover mt-[-90px]"
                        />
                    </div>
                </div>
            </div>

            {/* İkinci Bölüm */}
            <div id="target-section" className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex items-center space-x-8 mt-8" style={{ height: '420px' }}>
                <div className="w-1/2 flex flex-col items-center justify-center relative">
                    <img
                        src="/public/pomodoro2.avif"
                        alt="Pomodoro Tekniği"
                        className="rounded-lg w-[450px] h-[400px] object-cover"
                    />
                </div>

                <div className="w-1/2">
                    <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Hedeflerinizi Şimdi Belirleyin ve Pomodoro Tekniği ile Daha Verimli Çalışın!
                    </h2>

                    <p className="mt-6 text-lg text-gray-800 max-w-lg mx-auto bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow-md border border-blue-100">
                        🌟 Akademik başarılarınızı artırmak için matematik ve Türkçe netlerinizi girin.
                        Pomodoro tekniği ile verimli çalışma alışkanlıkları geliştirin.
                    </p>

                    <div className="mt-8 text-center">
                        <a href="/pomodoro" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                            Pomodoro Tekniği ile Şimdi Başla
                        </a>
                    </div>
                </div>
            </div>

            {/* Üçüncü Bölüm */}
            <div id="target-section" className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex items-center space-x-8 mt-8" style={{ height: '420px' }}>
                <div className="w-1/2">
                    <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">
                        Hedeflerinize Ulaşmak İçin Motivasyon Gücünü Kullanın!
                    </h2>
                    <p className="mt-6 text-lg text-gray-800 max-w-lg mx-auto bg-gradient-to-r from-green-50 to-white p-6 rounded-lg shadow-md border border-green-100">
                        🌟 Yeni hedefler belirleyin ve motivasyon sözleriyle ilerleyin. Akademik başarılarınızı artırmak ve verimli çalışma alışkanlıkları geliştirmek için buraya tıklayın.
                    </p>

                    <div className="mt-8 text-center">
                        <a href="/gunluksoz" className="bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                            Motivasyon Sözleriyle Başlayın
                        </a>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center relative">
                    <img
                        src="/public/123.png"
                        alt="Motivasyon Sözleri"
                        className="rounded-lg w-[350px] h-[350px] object-cover"
                    />
                </div>
            </div>


            {/* dördüncü Bölüm */}
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
