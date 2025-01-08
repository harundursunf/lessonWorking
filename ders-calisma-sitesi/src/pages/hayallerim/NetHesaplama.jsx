import React, { useState } from 'react';

const NetHesaplama = () => {
  const [netler, setNetler] = useState([]); // Netler için state
  const [tytDogru, setTytDogru] = useState(0); // TYT doğru sayısı
  const [tytYanlis, setTytYanlis] = useState(0); // TYT yanlış sayısı
  const [aytDogru, setAytDogru] = useState(0); // AYT doğru sayısı
  const [aytYanlis, setAytYanlis] = useState(0); // AYT yanlış sayısı

  const hesaplaNet = () => {
    const tytNet = tytDogru - tytYanlis * 0.25;
    const aytNet = aytDogru - aytYanlis * 0.25;

    setNetler([
      ...netler,
      {
        tytDogru,
        tytYanlis,
        aytDogru,
        aytYanlis,
        tytNet: tytNet.toFixed(2),
        aytNet: aytNet.toFixed(2),
      },
    ]);

    // Alanları sıfırla
    setTytDogru(0);
    setTytYanlis(0);
    setAytDogru(0);
    setAytYanlis(0);
  };

  const handleDeleteNet = (index) => {
    const updatedNetler = netler.filter((_, i) => i !== index);
    setNetler(updatedNetler);
  };

  return (
    <div className="mt-10 bg-white p-5 rounded-3xl shadow-md w-full max-w-[800px] flex flex-col items-center space-y-8 mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
        TYT ve AYT Net Hesaplama
      </h2>

      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">TYT Matematik</h3>
          <input
            type="number"
            value={tytDogru}
            onChange={(e) => setTytDogru(Number(e.target.value))}
            placeholder="Doğru sayısı"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={tytYanlis}
            onChange={(e) => setTytYanlis(Number(e.target.value))}
            placeholder="Yanlış sayısı"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold">AYT Matematik</h3>
          <input
            type="number"
            value={aytDogru}
            onChange={(e) => setAytDogru(Number(e.target.value))}
            placeholder="Doğru sayısı"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={aytYanlis}
            onChange={(e) => setAytYanlis(Number(e.target.value))}
            placeholder="Yanlış sayısı"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={hesaplaNet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-4 w-full"
        >
          Netleri Hesapla
        </button>
      </div>

      <div className="w-full max-h-[350px] overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-700">Netleriniz</h3>
        {netler.length > 0 ? (
          netler.map((net, index) => (
            <div
              key={index}
              className="p-4 mb-4 rounded-lg shadow-md border bg-white flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800">
                  <span className="font-bold">TYT Net:</span> {net.tytNet} (
                  {net.tytDogru} doğru, {net.tytYanlis} yanlış)
                </p>
                <p className="text-gray-800">
                  <span className="font-bold">AYT Net:</span> {net.aytNet} (
                  {net.aytDogru} doğru, {net.aytYanlis} yanlış)
                </p>
              </div>
              <button
                onClick={() => handleDeleteNet(index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full shadow-lg"
              >
                Sil
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Henüz bir net eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default NetHesaplama;
