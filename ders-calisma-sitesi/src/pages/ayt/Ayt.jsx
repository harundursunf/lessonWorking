import React, { useState, useMemo } from 'react';
import axios from 'axios'; // Backend API çağrıları için axios

export default function AytKonular() {
    const topics = {
        Matematik: ["Limit", "Türev", "İntegral", "Denklemler"],
        Fizik: ["Kuvvet ve Hareket", "Enerji", "Dalgalar", "Optik"],
        Kimya: ["Atom Yapısı", "Dönüşümler", "Asitler ve Bazlar", "Organik Kimya"],
        Biyoloji: ["Hücre", "Genetik", "Ekosistem", "Bitki ve Hayvanlar"],
    };

    const [completedTopics, setCompletedTopics] = useState({
        Matematik: [false, false, false, false],
        Fizik: [false, false, false, false],
        Kimya: [false, false, false, false],
        Biyoloji: [false, false, false, false],
    });

    // Toplam ilerleme yüzdesini hesaplama
    const progress = useMemo(() => {
        const totalTopics = Object.values(completedTopics).flat().length;
        const completed = Object.values(completedTopics).flat().filter(Boolean).length;
        return Math.round((completed / totalTopics) * 100);
    }, [completedTopics]);

    // Kutucukları değiştirme
    const toggleTopic = (category, index) => {
        setCompletedTopics(prev => ({
            ...prev,
            [category]: prev[category].map((status, i) => (i === index ? !status : status)),
        }));
    };

    // Veriyi backend'e gönderme
    const handleSave = async () => {
        try {
            const response = await axios.post('https://your-backend-api-url.com/save-progress', {
                completedTopics,
            });
            if (response.status === 200) {
                alert('Veriler başarıyla kaydedildi!');
            }
        } catch (error) {
            console.error('Veri gönderilirken bir hata oluştu:', error);
        }
    };

    return (
        <div className="mt-[100px] min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
            {/* İlerleme Gösterimi */}
            <div className="flex flex-col items-center mb-8">
                <div
                    className="relative w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    style={{
                        background: `conic-gradient(#4caf50 ${progress}%, #e0e0e0 0%)`,
                    }}>
                    <span className="z-10">%{progress}</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-green-700 blur-sm"></div>
                </div>
                <p className="text-gray-700 mt-4 text-lg font-semibold">Tüm konuların %{progress} tamamlandı!</p>

                {/* Yatay İlerleme Çubuğu */}
                <div className="relative w-full max-w-[300px] bg-gray-300 h-4 rounded-full mt-4 overflow-hidden shadow-inner">
                    <div
                        className="absolute top-0 left-0 bg-gradient-to-r from-green-500 to-green-700 h-full rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Konu Listesi */}
            <div className="relative w-full max-w-[1163px] rounded-3xl shadow-xl bg-gradient-to-br from-green-500 via-green-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-no-repeat bg-cover bg-center opacity-20" style={{
                    backgroundImage: 'url(https://source.unsplash.com/random/1920x1080?science)',
                }}></div>

                <div className="p-8">
                    <h1 className="text-white text-4xl font-extrabold text-center mb-4 drop-shadow-lg">AYT Tüm Konular</h1>
                    <p className="text-white text-lg text-center leading-relaxed mb-8 drop-shadow-md">
                        AYT kapsamındaki tüm ders konularını bu sayfada inceleyebilirsiniz.
                    </p>

                    {Object.entries(topics).map(([category, topicList], categoryIndex) => (
                        <div key={categoryIndex} className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 shadow-md">
                            <h2 className="text-white text-2xl font-semibold mb-2 drop-shadow-sm">{category}</h2>
                            <ul className="list-none flex flex-wrap gap-4">
                                {topicList.map((topic, index) => (
                                    <li key={index} className="flex items-center gap-2 text-white">
                                        <input
                                            type="checkbox"
                                            checked={completedTopics[category][index]}
                                            onChange={() => toggleTopic(category, index)}
                                            className="w-5 h-5 cursor-pointer accent-green-500 shadow-inner"
                                        />
                                        <span
                                            className={`${completedTopics[category][index] ? "line-through" : ""} transition-all duration-300`}
                                        >
                                            {topic}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kaydet Butonu */}
            <div className="mt-8">
                <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300">
                    Kaydet
                </button>
            </div>
        </div>
    );
}
