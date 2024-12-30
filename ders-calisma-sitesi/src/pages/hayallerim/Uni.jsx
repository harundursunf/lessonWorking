    import React, { useState, useEffect } from 'react';

    const Uni = () => {
        const [cities, setCities] = useState([]);
        const [selectedCity, setSelectedCity] = useState('');
        const [universities, setUniversities] = useState([]);
        const [selectedUni, setSelectedUni] = useState('');

        // Şehir ve üniversite verilerini almak için txt dosyasını oku
        const fetchData = async () => {
            try {
                const response = await fetch('/cities.txt');
                const text = await response.text();

                // Veriyi işle
                const cityData = text.split('\n').map((line) => {
                    const [city, uniString] = line.split(':');
                    const universities = uniString ? uniString.split(',') : [];
                    return { city: city.trim(), universities: universities.map((u) => u.trim()) };
                });

                setCities(cityData);
            } catch (error) {
                console.error('Veriler alınırken bir hata oluştu:', error);
            }
        };

        useEffect(() => {
            fetchData();
        }, []);

        // Şehir seçildiğinde üniversiteleri ayarla
        useEffect(() => {
            if (selectedCity) {
                const cityInfo = cities.find((c) => c.city === selectedCity);
                setUniversities(cityInfo ? cityInfo.universities : []);
            } else {
                setUniversities([]);
            }
        }, [selectedCity, cities]);

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                {/* Şehir Seçimi */}
                <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Şehrinizi Seçin</h2>
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3"
                    >
                        <option value="">Şehir Seçin</option>
                        {cities.map((city) => (
                            <option key={city.city} value={city.city}>
                                {city.city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Üniversiteler */}
                <div className="w-full max-w-lg mt-6 bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Üniversiteler</h3>
                    {universities.length > 0 ? (
                        universities.map((uni, index) => (
                            <div
                                key={index}
                                className="p-3 bg-gray-100 rounded-md shadow-sm mb-2 flex justify-between items-center"
                            >
                                <span>{uni}</span>
                                <button
                                    onClick={() => setSelectedUni(uni)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                >
                                    Seç
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Üniversite bulunamadı.</p>
                    )}
                </div>

                {/* Seçili Üniversite */}
                {selectedUni && (
                    <div className="w-full max-w-lg mt-6 bg-white shadow-md rounded-lg p-6 text-center">
                        <h2 className="text-xl font-bold text-green-600 uppercase">
                            Seçili Üniversite: {selectedUni}
                        </h2>
                    </div>
                )}
            </div>
        );
    };

    export default Uni;
