import React, { useState, useMemo } from 'react';

export default function TytMat() {
    const topics = {
        Matematik: ["Sayılar ve İşlemler", "Fonksiyonlar", "Denklemler", "Geometri"],
        Türkçe: ["Dil Bilgisi", "Anlatım Teknikleri", "Paragraf Bilgisi", "Metin Türleri"],
        Coğrafya: ["Coğrafya Bilgisi", "İklim ve Bitki", "Ülkeler ve Coğrafi Konum"],
        Tarih: ["Osmanlı Tarihi", "Türk-İslam Tarihi", "Dünya Tarihi", "Atatürk İlkeleri"],
    };

    const [completedTopics, setCompletedTopics] = useState({
        Matematik: [false, false, false, false],
        Türkçe: [false, false, false, false],
        Coğrafya: [false, false, false],
        Tarih: [false, false, false, false],
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

    return (
        <div className="mt-[100px] min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            {/* İlerleme Gösterimi */}
            <div className="flex flex-col items-center mb-8">
                <div
                    className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{
                        background: `conic-gradient(#4caf50 ${progress}%, #e0e0e0 0%)`,
                    }}>
                    %{progress}
                </div>
                <p className="text-gray-700 mt-4">Tüm konuların %{progress} tamamlandı!</p>

                {/* Yatay İlerleme Çubuğu */}
                <div className="w-full max-w-[300px] bg-gray-300 h-4 rounded-full mt-4">
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Konu Listesi */}
            <div className="relative w-full max-w-[1163px] rounded-3xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-800 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-no-repeat bg-cover bg-center" style={{
                    backgroundImage: 'url(https://source.unsplash.com/random/1920x1080?education)'
                }}></div>

                <div className="p-8">
                    <h1 className="text-white text-4xl font-bold text-center mb-4">TYT Tüm Konular</h1>
                    <p className="text-white text-lg text-center leading-relaxed mb-8">
                        TYT kapsamındaki tüm ders konularını bu sayfada inceleyebilirsiniz.
                    </p>

                    {Object.entries(topics).map(([category, topicList], categoryIndex) => (
                        <div key={categoryIndex} className="bg-white bg-opacity-10 p-4 rounded-lg mb-4">
                            <h2 className="text-white text-2xl font-semibold mb-2">{category}</h2>
                            <ul className="list-none flex flex-wrap gap-4">
                                {topicList.map((topic, index) => (
                                    <li key={index} className="flex items-center gap-2 text-white">
                                        <input
                                            type="checkbox"
                                            checked={completedTopics[category][index]}
                                            onChange={() => toggleTopic(category, index)}
                                            className="w-5 h-5 cursor-pointer accent-green-500"
                                        />
                                        <span className={completedTopics[category][index] ? "line-through" : ""}>
                                            {topic}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
