import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 dakika
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' veya 'break'

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setMode((prevMode) => (prevMode === 'work' ? 'break' : 'work'));
            setTimeLeft(mode === 'work' ? 5 * 60 : 25 * 60);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, mode]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 -mt-16    ">

            <div className="mt-5 relative w-full max-w-[1163px] rounded-3xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-800 overflow-hidden">
                {/* Dalgalı Arka Plan */}
                <div className="absolute inset-0 -z-10 bg-no-repeat bg-cover bg-center opacity-30" style={{
                    backgroundImage:
                        'url(https://source.unsplash.com/random/1920x1080?focus)',
                }}></div>

                <div className="p-8">
                    <h1 className="text-white text-4xl font-bold text-center mb-4">
                        {mode === 'work' ? 'Çalışma Zamanı!' : 'Mola Zamanı!'}
                    </h1>
                    <p className="text-white text-lg text-center leading-relaxed mb-8">
                        {mode === 'work'
                            ? 'Odaklan ve en iyi şekilde çalış!'
                            : 'Dinlen ve enerji topla!'}
                    </p>

                    <div className="text-6xl font-mono text-white mb-8 text-center">
                        {formatTime(timeLeft)}
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={toggleTimer}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-yellow-600 transition">
                            {isRunning ? 'Duraklat' : 'Başlat'}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="bg-red-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-red-600 transition">
                            Sıfırla
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pomodoro;
