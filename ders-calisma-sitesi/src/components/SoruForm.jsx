import React, { useState } from 'react';

const SoruForm = ({ setSorular }) => {
    const [soruMetni, setSoruMetni] = useState('');
    const [resim, setResim] = useState(null);

    // Soru metnini güncelleme
    const handleSoruMetniChange = (e) => {
        setSoruMetni(e.target.value);
    };

    // Resim seçme işlemi
    const handleResimChange = (e) => {
        setResim(e.target.files[0]);
    };

    // Yeni soru ekleme
    const handleSubmit = (e) => {
        e.preventDefault();
        const newSoru = {
            id: Date.now(),
            metin: soruMetni,
            resim: URL.createObjectURL(resim),
        };
        setSorular((prev) => [...prev, newSoru]); // Sorular listesini güncelle
        setSoruMetni(''); // Input alanını temizle
        setResim(null); // Resim alanını sıfırla
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Soru Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="w-full sm:w-1/2">
                        <label className="block text-gray-700 font-medium">Soru Metni</label>
                        <input
                            type="text"
                            value={soruMetni}
                            onChange={handleSoruMetniChange}
                            placeholder="Soru girin"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label className="block text-gray-700 font-medium">Resim</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleResimChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Soruyu Ekle
                </button>
            </form>
        </div>
    );
};

export default SoruForm;
