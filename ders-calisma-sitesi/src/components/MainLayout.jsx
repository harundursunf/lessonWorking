import React from 'react';
import Header from './Header'; // Header bileşenini içe aktar
import Footer from './Footer'; // Footer bileşenini içe aktar

const MainLayout = ({ children }) => {
    return (
        <>
            <Header /> {/* Header üstte */}
            <main>{children}</main> {/* Sayfa içeriği */}
            <Footer /> {/* Footer altta */}
        </>
    );
};

export default MainLayout;
