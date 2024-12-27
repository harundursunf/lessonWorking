import React, { useState } from 'react';
import SoruForm from '../components/SoruForm';
import SoruList from '../components/SoruList';

const TestAndSolution = () => {
    const [sorular, setSorular] = useState([]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-4xl p-4">
                <SoruForm setSorular={setSorular} />
                <SoruList sorular={sorular} />
            </div>
        </div>
    );
};

export default TestAndSolution;
