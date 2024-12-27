import React, { useState } from "react";

const Personal = () => {
    const [goals, setGoals] = useState([]); // Hedefler için ayrı state
    const [newGoal, setNewGoal] = useState(""); // Yeni hedef inputu

    // Hedef ekleme işlevi
    const addGoal = () => {
        if (newGoal.trim()) {
            setGoals([...goals, { text: newGoal, completed: false }]);
            setNewGoal("");
        }
    };

    // Hedef tamamlama işlevi
    const toggleGoalCompletion = (index) => {
        setGoals(goals.map((goal, i) => i === index ? { ...goal, completed: !goal.completed } : goal));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="mt-32 relative w-full max-w-[1163px] rounded-3xl shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-no-repeat bg-cover bg-center opacity-30" style={{
                    backgroundImage:
                        'url(https://source.unsplash.com/random/1920x1080?planning)',
                }}></div>

                <div className="p-8">
                    {/* Hedef Belirleme */}
                    <div className="mb-16">
                        <h2 className="text-white text-3xl font-bold text-center mb-4">Hedef Belirleme</h2>
                        <div className="flex items-center gap-4 mb-6">
                            <input
                                type="text"
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Yeni hedefinizi yazın..."
                            />
                            <button
                                onClick={addGoal}
                                className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600 transition">
                                Ekle
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {goals.map((goal, index) => (
                                <li
                                    key={index}
                                    className={`p-3 rounded-md shadow text-gray-800 flex items-center justify-between ${goal.completed ? 'bg-green-100' : 'bg-white'}`}>
                                    <span className={goal.completed ? "line-through text-gray-500" : ""}>{goal.text}</span>
                                    <input
                                        type="checkbox"
                                        checked={goal.completed}
                                        onChange={() => toggleGoalCompletion(index)}
                                        className="ml-4 w-5 h-5 cursor-pointer"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal;
