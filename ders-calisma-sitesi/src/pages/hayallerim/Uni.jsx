import React, { useState, useEffect } from 'react';

const Uni = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [universities, setUniversities] = useState([]);
  const [selectedUni, setSelectedUni] = useState('');

  // Şehir ve üniversite verilerini çekme
  const fetchData = async () => {
    try {
      const response = await fetch('/cities.txt');
      const text = await response.text();
      const cityData = text.split('\n').map((line) => {
        const [city, unis] = line.split(':');
        const universities = unis
          ? unis.split(';').map((u) => {
            const [uniName] = u.split(',');
            return { name: uniName.trim() };
          })
          : [];
        return { city: city.trim(), universities };
      });
      setCities(cityData);
    } catch (error) {
      console.error('Veriler alınırken bir hata oluştu:', error);
    }
  };

  // Şehir verilerini yükle
  useEffect(() => {
    fetchData();
  }, []);

  // Seçilen şehre göre üniversiteleri filtrele
  useEffect(() => {
    if (selectedCity) {
      const cityInfo = cities.find((c) => c.city === selectedCity);
      setUniversities(cityInfo ? cityInfo.universities : []);
    } else {
      setUniversities([]);
    }
  }, [selectedCity, cities]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-blue-50 p-4">
      {/* Şehir Seçim Bölümü */}
      <div className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex items-center space-x-8">
        <div className="w-full">
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">
            Şehrinizi Seçin ve Üniversitenizi Bulun!
          </h2>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="mt-6 w-full border-2 border-green-300 rounded-lg p-3 text-lg bg-green-50 shadow-md"
          >
            <option value="">Şehir Seçin</option>
            {cities.map((city) => (
              <option key={city.city} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Üniversite Listesi Bölümü */}
      <div className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] mt-8 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center text-gray-700">Üniversiteler</h3>
        {universities.length > 0 ? (
          <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
            {universities.map((uni, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                <h4 className="text-lg font-bold">{uni.name}</h4>
                <button
                  onClick={() => setSelectedUni(uni.name)}
                  className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Seç
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Üniversite bulunamadı.</p>
        )}
      </div>

      {/* Seçilen Üniversite Başlığı */}
      {selectedUni && (
        <div className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] mt-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            HAYALİMDEKİ ÜNİVERSİTE
          </h1>
          <p className="text-2xl font-bold mt-4 text-gray-800">{selectedUni}</p>
        </div>
      )}
    </div>
  );
};

export default Uni;
