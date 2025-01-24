import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Personal = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [completionRate, setCompletionRate] = useState(0);

    // Hedef tamamlama oranını hesaplama
    useEffect(() => {
        const completedGoals = goals.filter((goal) => goal.completed).length;
        const totalGoals = goals.length;
        const rate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
        setCompletionRate(rate);
    }, [goals]);

    // Hedef ekleme işlevi
    const addGoal = () => {
        if (newGoal.trim()) {
            setGoals([...goals, { text: newGoal, completed: false }]);
            setNewGoal('');
        }
    };

    // Hedef tamamlama işlevi
    const toggleGoalCompletion = (index) => {
        setGoals(goals.map((goal, i) => i === index ? { ...goal, completed: !goal.completed } : goal));
    };

    // Hedef silme işlevi
    const deleteGoal = (index) => {
        setGoals(goals.filter((_, i) => i !== index));
    };

    return (
        <div className="mt-[127px] relative bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex flex-col items-center space-y-8 mx-auto">
            {/* Sağ Alt Köşede Sabit İlerleme Çarkı */}
            <div className="fixed bottom-4 right-4 w-[110px] h-[110px] bg-white rounded-full shadow-lg p-2 z-50">
                <CircularProgressbar
                    value={completionRate}
                    text={`${Math.round(completionRate)}%`}
                    styles={buildStyles({
                        textColor: "#4CAF50",
                        pathColor: completionRate === 100 ? "#4CAF50" : "#00BFFF",
                        trailColor: "#f0f0f0",
                        textSize: "30px",
                    })}
                />
            </div>

            <div className="w-full flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">
                    Hedeflerinizi Belirleyin!
                </h2>
                <p className="mt-2 text-lg text-gray-800 max-w-lg mx-auto bg-gradient-to-r from-green-50 to-white p-6 rounded-lg shadow-md border border-green-100">
                    🎯 Kişiselleştirilebilir hedefler oluşturun ve ilerlemenizi kolayca takip edin.
                </p>

                <div className="mt-4 w-full max-w-md">
                    <input
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Yeni hedefinizi yazın..."
                        className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={addGoal}
                        className="bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-4 w-full"
                    >
                        Hedef Ekle
                    </button>
                </div>

                <div className="w-full flex flex-col space-y-4 mt-8">
                    <h3 className="text-lg font-bold text-gray-700">Hedefleriniz</h3>
                    <div className="w-full max-h-[350px] overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
                        {goals.length > 0 ? (
                            goals.map((goal, index) => (
                                <div
                                    key={index}
                                    className={`p-4 mb-4 rounded-lg shadow-md flex justify-between items-center border ${goal.completed ? 'bg-green-100' : 'bg-white'}`}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={goal.completed}
                                            onChange={() => toggleGoalCompletion(index)}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                        <span className={`ml-4 ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{goal.text}</span>
                                    </div>
                                    <button
                                        onClick={() => deleteGoal(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    >
                                        Sil
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Henüz bir hedef eklenmedi.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personal;
