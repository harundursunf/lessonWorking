import React, { useState, useEffect } from 'react';

const Uni = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [universities, setUniversities] = useState([]);
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedUniImage, setSelectedUniImage] = useState('');

  // Şehir ve üniversite verilerini çekme
  const fetchData = async () => {
    try {
      const response = await fetch('/cities.txt');
      const text = await response.text();
      const cityData = text.split('\n').map((line) => {
        const [city, unis] = line.split(':');
        const universities = unis
          ? unis.split(';').map((u) => {
              const [uniName, uniImage] = u.split(',');
              return { name: uniName.trim(), image: uniImage?.trim() || '' };
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

  // Üniversite seçimi yapıldığında çalışır
  const handleSelectUni = (uni) => {
    setSelectedUni(uni.name);
    setSelectedUniImage(uni.image);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-blue-50 p-4">
      {/* Şehir Seçim Bölümü */}
      <div className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex items-center space-x-8">
        <div className="w-1/2">
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
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img
            src="/public/selection-image.png"
            alt="Şehir Seçim"
            className="rounded-lg w-[300px] h-[300px] object-cover"
          />
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
                  onClick={() => handleSelectUni(uni)}
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

      {/* Seçilen Üniversite Bölümü */}
      {selectedUni && (
        <div
          id="target-section"
          className="bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex items-center space-x-8 mt-8"
          style={{ height: '420px' }}
        >
          <div className="w-1/2">
            <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">
              {selectedUni}
            </h2>
            {selectedUniImage ? (
              <p className="mt-6 text-lg text-gray-800 max-w-lg mx-auto bg-gradient-to-r from-green-50 to-white p-6 rounded-lg shadow-md border border-green-100">
                Bu üniversite hakkında daha fazla bilgi için aşağıdaki resmi inceleyin!
              </p>
            ) : (
              <p className="mt-6 text-gray-500">Resim bulunamadı.</p>
            )}
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center">
            {selectedUniImage && (
              <img
                src={selectedUniImage}
                alt={selectedUni}
                className="rounded-lg w-[350px] h-[350px] object-cover"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Uni;