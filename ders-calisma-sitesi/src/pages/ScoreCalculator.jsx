import React from 'react';

const ScoreCalculator = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full">
                {/* Başlık */}
                <h1 className="text-2xl font-bold mb-4 text-center">Score Calculator</h1>

                {/* Input ve Butonlar */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-2">
                        Score:
                    </label>
                    <input
                        type="number"
                        id="score"
                        name="score"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your score"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Calculate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScoreCalculator;
