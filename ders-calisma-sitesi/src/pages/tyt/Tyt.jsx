import React, { useState, useMemo, useEffect } from "react";

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

    const progress = useMemo(() => {
        const totalTopics = Object.values(completedTopics).flat().length;
        const completed = Object.values(completedTopics).flat().filter(Boolean).length;
        return Math.round((completed / totalTopics) * 100);
    }, [completedTopics]);

    const toggleTopic = (category, index) => {
        setCompletedTopics((prev) => ({
            ...prev,
            [category]: prev[category].map((status, i) => (i === index ? !status : status)),
        }));
    };

    return (
        <div className=" mt-[130px] min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-6">
            <style>{`
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.6); }
                    100% { box-shadow: 0 0 35px rgba(255, 255, 255, 0.9); }
                }
            `}</style>

            <div className="relative flex flex-col items-center mb-8">
                <div
                    className="relative w-52 h-52 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-2xl"
                    style={{
                        background: `conic-gradient(#8e24aa ${progress}%, #e0e0e0 ${progress}%)`,
                        animation: "pulseGlow 2s infinite alternate",
                    }}
                >
                    <span className="z-10 text-purple-900 drop-shadow-md">
                        %{progress}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-800 to-purple-400 blur-xl opacity-40"></div>
                </div>
                <p className="text-purple-700 mt-6 text-xl font-semibold">
                    Konuların %{progress} tamamlandı!
                </p>
            </div>

            <div className="w-full max-w-[1163px] bg-white bg-opacity-90 rounded-3xl shadow-xl p-8">
                <h1 className="text-purple-800 text-3xl font-extrabold text-center mb-8">
                    AYT Tüm Konular
                </h1>
                {Object.entries(topics).map(([category, topicList], categoryIndex) => (
                    <div
                        key={categoryIndex}
                        className="bg-purple-100 p-6 rounded-lg mb-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-purple-800 text-xl font-bold mb-4">
                            {category}
                        </h2>
                        <ul className="list-none">
                            {topicList.map((topic, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={completedTopics[category][index]}
                                            onChange={() => toggleTopic(category, index)}
                                            className="w-5 h-5 cursor-pointer accent-purple-500 shadow-inner"
                                        />
                                        <span
                                            className={`${
                                                completedTopics[category][index]
                                                    ? "line-through text-purple-400"
                                                    : "text-purple-700"
                                            } font-medium`}
                                        >
                                            {topic}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
            