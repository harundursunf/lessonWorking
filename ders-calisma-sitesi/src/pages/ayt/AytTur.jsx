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

    const [timers, setTimers] = useState(
        Object.keys(topics).reduce(
            (acc, category) => ({
                ...acc,
                [category]: Array(topics[category].length).fill(0),
            }),
            {}
        )
    );

    const [activeTimers, setActiveTimers] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prev) => updateTimers(prev, activeTimers));
        }, 1000);

        return () => clearInterval(interval);
    }, [activeTimers]);

    const updateTimers = (prevTimers, activeTimers) => {
        const updated = { ...prevTimers };
        Object.entries(activeTimers).forEach(([category, indexes]) => {
            indexes.forEach((index) => {
                updated[category][index] += 1;
            });
        });
        return updated;
    };

    const toggleTimer = (category, index) => {
        setActiveTimers((prev) => {
            const updated = { ...prev };
            if (!updated[category]) updated[category] = [];
            if (updated[category].includes(index)) {
                updated[category] = updated[category].filter((i) => i !== index);
                if (updated[category].length === 0) delete updated[category];
            } else {
                updated[category].push(index);
            }
            return updated;
        });
    };

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
        <div className="mt-[130px] min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 p-4">
            <div className="flex flex-col items-center mb-8">
                <div
                    className="relative w-36 h-36 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl"
                    style={{
                        background: `conic-gradient(#6a1b9a ${progress}%, #e0e0e0 0%)`,
                    }}
                >
                    <span className="z-10 text-purple-900 drop-shadow-md">%{progress}</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 blur-sm"></div>
                </div>
                <p className="text-purple-800 mt-4 text-lg font-semibold">
                    Tüm konuların %{progress} tamamlandı!
                </p>
            </div>

            <div className="relative w-full max-w-[1163px] rounded-3xl shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-no-repeat bg-cover bg-center opacity-10" style={{
                    backgroundImage: 'url(https://source.unsplash.com/1920x1080/?education)',
                }}></div>

                <div className="p-8">
                    <h1 className="text-white text-4xl font-extrabold text-center mb-6 drop-shadow-lg">
                        AYT Tüm Konular
                    </h1>
                    {Object.entries(topics).map(([category, topicList], categoryIndex) => (
                        <div
                            key={categoryIndex}
                            className="bg-white bg-opacity-10 p-6 rounded-lg mb-6 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-white text-2xl font-bold mb-4 drop-shadow-md">
                                {category}
                            </h2>
                            <ul className="list-none">
                                {topicList.map((topic, index) => (
                                    <li key={index} className="flex flex-col mb-4 bg-white bg-opacity-20 p-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
                                        <div className="flex items-center gap-3 justify-between">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={completedTopics[category][index]}
                                                    onChange={() => toggleTopic(category, index)}
                                                    className="w-5 h-5 cursor-pointer accent-purple-500 shadow-inner"
                                                />
                                                <span
                                                    className={`${
                                                        completedTopics[category][index]
                                                            ? "line-through text-opacity-70"
                                                            : ""
                                                    } text-lg font-medium transition-all duration-300`}
                                                >
                                                    {topic}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => toggleTimer(category, index)}
                                                    className="bg-purple-600 hover:bg-purple-800 text-white py-1 px-3 rounded-lg text-sm shadow-md transform transition-transform duration-300 hover:scale-105"
                                                >
                                                    {activeTimers[category]?.includes(index)
                                                        ? "Durdur"
                                                        : "Başlat"}
                                                </button>
                                                <span className="text-sm text-gray-200 bg-purple-800 py-1 px-3 rounded-lg">
                                                    Süre: {Math.floor(timers[category][index] / 60)} dk{" "}
                                                    {timers[category][index] % 60} sn
                                                </span>
                                            </div>
                                        </div>
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
