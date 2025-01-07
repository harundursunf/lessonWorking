import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 dakika
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' veya 'break'
    const [workMinutes, setWorkMinutes] = useState(0);
    const [breakCount, setBreakCount] = useState(0);
    const [dailyGoal, setDailyGoal] = useState(localStorage.getItem('dailyGoal') || 1500); // Günlük hedefi local storage'dan al
    const [goalProgress, setGoalProgress] = useState(0); // İlerleme oranı
    const audioRef = React.useRef();

    useEffect(() => {
        const savedWorkMinutes = parseInt(localStorage.getItem('workMinutes'), 10) || 0;
        const savedBreakCount = parseInt(localStorage.getItem('breakCount'), 10) || 0;
        setWorkMinutes(savedWorkMinutes);
        setBreakCount(savedBreakCount);

        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            if (mode === 'work') {
                setMode('break');
                setTimeLeft(5 * 60); // Mola süresi
                setWorkMinutes((prev) => prev + 25); // Çalışma dakikalarını artır
                setGoalProgress((prev) => prev + 25); // Hedef ilerlemesi
                localStorage.setItem('workMinutes', workMinutes + 25); // Çalışma süresini kaydet
            } else {
                setMode('work');
                setTimeLeft(25 * 60); // Çalışma süresi
                setBreakCount((prev) => prev + 1); // Mola sayısını artır
                localStorage.setItem('breakCount', breakCount + 1); // Mola sayısını kaydet
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, mode, workMinutes, breakCount]);

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

    // İlerleme çubuğu yüzdesi
    const progressPercentage = (goalProgress / dailyGoal) * 100;

    const handleGoalChange = (event) => {
        const newGoal = parseInt(event.target.value, 10);
        setDailyGoal(newGoal);
        localStorage.setItem('dailyGoal', newGoal); // Hedefi kaydet
    };

    return (
        <div className="mt-[150px] bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex flex-col items-center space-y-8 mx-auto">
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
            </div>

            {/* Günlük Hedef ve İlerleme Çubuğu */}
            <div className="relative mt-8 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                    Günlük Hedef ve İlerleme
                </h3>
                <p className="text-lg text-gray-800">
                    🏁 Hedefiniz: <strong>{dailyGoal} dakika</strong>
                </p>
                <input
                    type="number"
                    value={dailyGoal}
                    onChange={handleGoalChange}
                    className="mt-2 p-2 border border-gray-300 rounded-lg"
                    placeholder="Yeni Hedef"
                />
                <p className="text-lg text-gray-800">
                    🚀 Günlük İlerleme: <strong>{goalProgress} dakika</strong>
                </p>
                <div className="w-full bg-gray-300 h-2 rounded-full">
                    <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                {goalProgress >= dailyGoal && (
                    <p className="mt-2 text-lg text-green-600 font-bold">Tebrikler! Hedefinizi başardınız!</p>
                )}
            </div>

            {/* Günlük Çalışma İstatistikleri */}
            <div className="relative mt-8 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                    Günlük Çalışma İstatistikleri
                </h3>
                <p className="text-lg text-gray-800">
                    🕒 Toplam Çalışma Süresi: <strong>{workMinutes} dakika</strong>
                </p>
                <p className="text-lg text-gray-800">
                    ☕ Molalar: <strong>{breakCount}</strong>
                </p>
            </div>
        </div>
    );
};

export default Pomodoro;
