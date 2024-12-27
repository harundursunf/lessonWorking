import React from 'react';

const SoruList = ({ sorular }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Eklenen Sorular</h2>
            <div className="flex flex-wrap -mx-4">
                {sorular.map((soru) => (
                    <div key={soru.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
                        <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
                            <p className="font-bold text-gray-800">{soru.metin}</p>
                            <img src={soru.resim} alt="Soru Resmi" className="mt-4 w-full rounded-lg shadow-md" />
                            <a
                                href={soru.resim}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-blue-500 underline mt-2"
                            >
                                Resmi Büyüt ve Detaylı Görüntüle
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoruList;
