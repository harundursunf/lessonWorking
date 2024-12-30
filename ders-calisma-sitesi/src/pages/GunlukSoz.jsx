import React, { useState, useEffect } from "react";

const GunlukSoz = () => {
    const [sozler, setSozler] = useState([]);
    const [guncelSoz, setGuncelSoz] = useState("");
    const [favoriler, setFavoriler] = useState([]);
    const [loading, setLoading] = useState(true);

    // sozler.txt dosyasını yükle
    useEffect(() => {
        const fetchSozler = async () => {
            try {
                const response = await fetch("/public/sozler.txt");
                if (!response.ok) throw new Error("Veri yüklenirken bir hata oluştu!");
                const data = await response.text();
                const sozListesi = data.split("\n").map((soz) => soz.trim());
                setSozler(sozListesi);
                setGuncelSoz(sozListesi[Math.floor(Math.random() * sozListesi.length)]);
                setLoading(false);
            } catch (error) {
                console.error("Sözler yüklenirken bir hata oluştu:", error);
                setLoading(false);
            }
        };
        fetchSozler();
    }, []);

    const rastgeleSozSec = () => {
        const rastgeleIndex = Math.floor(Math.random() * sozler.length);
        setGuncelSoz(sozler[rastgeleIndex]);
    };

    const favoriSozEkle = () => {
        if (guncelSoz && !favoriler.includes(guncelSoz)) {
            setFavoriler([...favoriler, guncelSoz]);
        }
    };

    const favoriSozSil = (index) => {
        setFavoriler(favoriler.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="mt-32 relative w-full max-w-[1163px] rounded-3xl shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 overflow-hidden">
                {/* Dalgalı Arka Plan */}
                <div className="absolute inset-0 -z-10 bg-no-repeat bg-cover bg-center opacity-30" style={{
                    backgroundImage: 'url(https://source.unsplash.com/random/1920x1080?inspiration)',
                }}></div>

                <div className="p-8">
                    <h1 className="text-white text-4xl font-bold text-center mb-4">
                        Günün Sözü
                    </h1>

                    {loading ? (
                        <div className="bg-white bg-opacity-80 shadow-xl rounded-lg p-6 max-w-lg mx-auto text-center">
                            <p className="text-xl italic text-gray-800">Sözler yükleniyor...</p>
                        </div>
                    ) : (
                        <div className="bg-white bg-opacity-80 shadow-xl rounded-lg p-6 max-w-lg mx-auto text-center">
                            <p className="text-xl italic text-gray-800">{guncelSoz || "Söz yok"}</p>
                        </div>
                    )}

                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            onClick={rastgeleSozSec}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-yellow-600 transition">
                            Değiştir
                        </button>
                        <button
                            onClick={favoriSozEkle}
                            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition">
                            Favorilere Ekle
                        </button>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-center mb-4">Favori Sözler</h2>
                        <ul className="space-y-4 max-h-[300px] overflow-auto">
                            {favoriler.map((soz, index) => (
                                <li key={index} className="flex justify-between items-center bg-white bg-opacity-80 shadow-xl rounded-lg p-4 max-w-lg mx-auto text-center">
                                    <span className="text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">{soz}</span>
                                    <button
                                        onClick={() => favoriSozSil(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600 transition">
                                        Sil
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GunlukSoz;
