import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(0.1 * 60); // 25 dakika
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' veya 'break'
    const [isSoundOn, setIsSoundOn] = useState(true); // Ses durumu
    const audioRef = React.useRef();

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setMode((prevMode) => (prevMode === 'work' ? 'break' : 'work'));
            setTimeLeft(mode === 'work' ? 5 * 60 : 25 * 60); // Mola veya Çalışma zamanı için zaman döngüsü
            if (isSoundOn) {
                audioRef.current.play(); // Ses çal
            }
        }
        return () => clearInterval(timer); // Temizle
    }, [isRunning, timeLeft, mode, isSoundOn]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60); // Başlangıç sürelerini resetler
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div className="mt-[150px] bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex flex-col items-center space-y-8 mt-8 mx-auto">
            <div className="w-full flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">
                    Pomodoro Zamanlayıcı!
                </h2>
                <p className="mt-2 text-lg text-gray-800 max-w-lg mx-auto bg-gradient-to-r from-green-50 to-white p-6 rounded-lg shadow-md border border-green-100">
                    🕑 Odaklan ve molalarla verimliliğini artır.
                </p>
                <div className="text-6xl font-mono text-gray-800 mb-8 text-center">
                    {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={toggleTimer}
                        className="bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        {isRunning ? 'Duraklat' : 'Başlat'}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        Sıfırla
                    </button>
                </div>
                <div className="mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isSoundOn}
                            onChange={(e) => setIsSoundOn(e.target.checked)}
                            className="mr-2"
                        />
                        Sesli Uyarılar
                    </label>
                </div>
                <audio ref={audioRef} src="/sounds/pulse-2.mp3" preload="auto" />
            </div>
        </div>
    );
};

export default Pomodoro;
