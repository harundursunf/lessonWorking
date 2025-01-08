import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js için gerekli bileşenleri kaydediyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NetHesaplayici = () => {
  const [nets, setNets] = useState([]); // Netler için state
  const [aytMat, setAytMat] = useState(''); // AYT Mat inputu
  const [tytMat, setTytMat] = useState(''); // TYT Mat inputu

  const handleAddNet = () => {
    if (aytMat.trim() || tytMat.trim()) {
      setNets([
        ...nets,
        { aytMat: parseFloat(aytMat), tytMat: parseFloat(tytMat), date: new Date().toLocaleDateString() }
      ]);
      setAytMat('');
      setTytMat('');
    }
  };

  const handleDeleteNet = (index) => {
    const updatedNets = nets.filter((_, i) => i !== index);
    setNets(updatedNets);
  };

  // AYT ve TYT için netlerin ortalamasını hesaplama
  const calculateAverages = () => {
    const totalAyt = nets.reduce((acc, net) => acc + net.aytMat, 0);
    const totalTyt = nets.reduce((acc, net) => acc + net.tytMat, 0);
    const averageAyt = totalAyt / nets.length;
    const averageTyt = totalTyt / nets.length;
    return { averageAyt, averageTyt };
  };

  // Grafik için veri
  const chartData = {
    labels: nets.map((_, index) => `Deneme ${index + 1}`),
    datasets: [
      {
        label: 'AYT Matematik Neti',
        data: nets.map((net) => net.aytMat),
        borderColor: '#4CAF50', // Yeşil renk
        backgroundColor: 'rgba(76, 175, 80, 0.2)', // Hafif yeşil arka plan
        pointBackgroundColor: '#388E3C', // Nokta rengi
        pointBorderColor: '#fff', // Nokta kenar rengi
        pointRadius: 5,
        borderWidth: 2,
        tension: 0.4, // Daha yumuşak çizgi
      },
      {
        label: 'TYT Matematik Neti',
        data: nets.map((net) => net.tytMat),
        borderColor: '#2196F3', // Mavi renk
        backgroundColor: 'rgba(33, 150, 243, 0.2)', // Hafif mavi arka plan
        pointBackgroundColor: '#1976D2', // Nokta rengi
        pointBorderColor: '#fff', // Nokta kenar rengi
        pointRadius: 5,
        borderWidth: 2,
        tension: 0.4, // Daha yumuşak çizgi
      },
    ],
  };

  // Grafik seçeneklerini özelleştirme
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        bodyFont: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Daha açık ızgara çizgisi
        },
        title: {
          display: true,
          text: 'Denemeler',
          font: {
            size: 16,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Daha açık ızgara çizgisi
        },
        title: {
          display: true,
          text: 'Netler',
          font: {
            size: 16,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
      },
    },
  };

  const { averageAyt, averageTyt } = calculateAverages();

  return (
    <div className="mt-[150px] bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex flex-col items-center space-y-8 mt-8 mx-auto">
      <div className="w-full flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">
          AYT ve TYT Netlerinizi Kaydedin!
        </h2>
        <p className="mt-2 text-lg text-gray-800 max-w-lg mx-auto bg-gradient-to-r from-green-50 to-white p-6 rounded-lg shadow-md border border-green-100">
          📋 Netlerinizi düzenli bir şekilde takip edin.
        </p>

        <div className="mt-4 w-full max-w-md">
          <input
            type="text"
            value={aytMat}
            onChange={(e) => setAytMat(e.target.value)}
            placeholder="AYT Matematik Neti"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={tytMat}
            onChange={(e) => setTytMat(e.target.value)}
            placeholder="TYT Matematik Neti"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
          <button
            onClick={handleAddNet}
            className="bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-4 w-full"
          >
            Net Ekle
          </button>
        </div>

        {/* Kaydedilen netler için kartlar */}
        <div className="w-full mt-4 max-h-[300px] overflow-y-auto">
          {nets.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {nets.map((net, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-lg flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">
                      Deneme {index + 1} ({net.date})
                    </span>
                    <button
                      onClick={() => handleDeleteNet(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Sil
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">AYT Matematik: {net.aytMat}</span>
                    <span className="text-sm text-gray-600">TYT Matematik: {net.tytMat}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Henüz bir net eklenmedi.</p>
          )}
        </div>
      </div>

      <div className="w-full max-h-[350px] overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
        {nets.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-500 text-center">Henüz bir net eklenmedi.</p>
        )}
      </div>

      <div className="w-full max-w-md mt-8">
        <div className="mt-4 text-center text-xl font-bold text-gray-700">
          AYT Ortalaması: {averageAyt.toFixed(2)} | TYT Ortalaması: {averageTyt.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default NetHesaplayici;
