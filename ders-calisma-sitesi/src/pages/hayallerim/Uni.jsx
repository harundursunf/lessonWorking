import React, { useState, useEffect } from 'react';

const Uni = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [universities, setUniversities] = useState([]);
    const [selectedUni, setSelectedUni] = useState('');

    // Şehir verilerini almak için API çağrısı
    const fetchCities = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/cities'); // Backend API'si
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error('Şehirler alınırken hata oluştu:', error);
        }
    };

    // Üniversiteleri almak için API çağrısı
    const fetchUniversities = async (cityId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/universities?city=${cityId}`);
            const data = await response.json();
            setUniversities(data);
        } catch (error) {
            console.error('Üniversiteler alınırken hata oluştu:', error);
        }
    };

    useEffect(() => {
        fetchCities(); // Şehirleri al
    }, []);

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        fetchUniversities(cityId); // Şehir değiştiğinde üniversiteleri al
    };

    const handleUniSelect = (uni) => {
        setSelectedUni(uni);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg rounded-lg shadow-lg bg-white p-8">
                <h2 className="text-2xl font-bold text-center mb-4">Üniversite Seç</h2>

                {/* Şehir Seçimi */}
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Şehir Seçin</label>
                    <select
                        id="city"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                        required>
                        <option value="">Şehir Seçin</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Üniversite Seçimi */}
                {universities.length > 0 && (
                    <div className="mb-4">
                        <label htmlFor="university" className="block text-sm font-medium text-gray-700">Üniversite Seçin</label>
                        <select
                            id="university"
                            value={selectedUni}
                            onChange={(e) => handleUniSelect(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                            required>
                            <option value="">Üniversite Seçin</option>
                            {universities.map((uni) => (
                                <option key={uni._id} value={uni.name}>
                                    {uni.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Seçilen Üniversitenin Ekranda Gösterimi */}
                {selectedUni && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold">Gitmek istediğim üniversite:</h3>
                        <p className="text-lg text-gray-700">{selectedUni.toUpperCase()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Uni;
