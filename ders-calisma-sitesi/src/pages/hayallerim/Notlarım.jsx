import React, { useState } from 'react';

const Notlarım = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');
    const [priority, setPriority] = useState('Düşük');
    const [isStickyView, setIsStickyView] = useState(false);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [themeColor, setThemeColor] = useState('green');

    const handleAddNote = () => {
        if (note.trim()) {
            setNotes([...notes, { text: note, priority, date: new Date().toLocaleDateString(), tags: [...tags], themeColor, isFavorite: false }]);
            setNote('');
            setTags([]);
        }
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };

    const handleToggleFavorite = (index) => {
        const updatedNotes = [...notes];
        updatedNotes[index].isFavorite = !updatedNotes[index].isFavorite;
        setNotes(updatedNotes);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Düşük':
                return 'bg-green-100 border-green-200';
            case 'Orta':
                return 'bg-yellow-100 border-yellow-200';
            case 'Yüksek':
                return 'bg-red-100 border-red-200';
            default:
                return 'bg-gray-100 border-gray-200';
        }
    };

    const handleAddTag = () => {
        if (tag.trim() && !tags.includes(tag)) {
            setTags([...tags, tag.trim()]);
            setTag('');
        }
    };

    
    return (
        <div className="mt-[150px] bg-white p-5 rounded-3xl shadow-md w-full max-w-[1163px] flex flex-col items-center space-y-8 mt-8 mx-auto">
            <div className="w-full flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600">
                    Hedeflerinizi Not Alın!
                </h2>
                <p className="mt-2 text-lg text-gray-800 max-w-lg mx-auto bg-gradient-to-r from-green-50 to-white p-6 rounded-lg shadow-md border border-green-100">
                    📋 Notlarınızı kişiselleştirerek renklendirin ve önceliklerinize göre düzenleyin.
                </p>

                <div className="mt-4 w-full max-w-md">
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Bir not ekleyin..."
                        className="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-2 mt-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Düşük">Düşük</option>
                        <option value="Orta">Orta</option>
                        <option value="Yüksek">Yüksek</option>
                    </select>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="Etiket ekle..."
                            className="w-full p-4 rounded-l-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleAddTag}
                            className="bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold py-2 px-4 rounded-r-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Etiket Ekle
                        </button>
                    </div>
                    <button
                        onClick={handleAddNote}
                        className="bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-4 w-full"
                    >
                        Not Ekle
                    </button>
                </div>


            </div>

            <div className="w-full flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">Notlarınız</h3>
                <button
                    onClick={() => setIsStickyView(!isStickyView)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                    Görünümü Değiştir
                </button>
            </div>

            <div className="w-full max-h-[350px] overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
                {!isStickyView ? (
                    notes.length > 0 ? (
                        notes.map((note, index) => (
                            <div
                                key={index}
                                className={`${getPriorityColor(note.priority)} p-4 mb-4 rounded-lg shadow-md flex justify-between items-center border`}
                            >
                                <div>
                                    <span className="text-gray-800">{note.text}</span>
                                    {note.tags.length > 0 && (
                                        <div className="flex space-x-2 mt-2">
                                            {note.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="text-sm text-gray-500 mt-2">Tarih: {note.date}</div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleToggleFavorite(index)}
                                        className={`${note.isFavorite ? 'text-yellow-500' : 'text-gray-500'
                                            } font-bold py-1 px-3 rounded-full`}
                                    >
                                        {note.isFavorite ? 'Favori' : 'Favoriye Ekle'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteNote(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full shadow-lg ml-2"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Henüz bir not eklenmedi.</p>
                    )
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {notes.map((note, index) => (
                            <div
                                key={index}
                                className={`${getPriorityColor(note.priority)} p-4 rounded-lg shadow-md border flex flex-col justify-between`}
                            >
                                <div>
                                    <span className="text-gray-800 text-sm">{note.text}</span>
                                    {note.tags.length > 0 && (
                                        <div className="flex space-x-2 mt-2">
                                            {note.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="text-sm text-gray-500 mt-2">Tarih: {note.date}</div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleToggleFavorite(index)}
                                        className={`${note.isFavorite ? 'text-yellow-500' : 'text-gray-500'
                                            } font-bold py-1 px-3 rounded-full`}
                                    >
                                        {note.isFavorite ? 'Favori' : 'Favoriye Ekle'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteNote(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full shadow-lg mt-2 self-end"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notlarım;
