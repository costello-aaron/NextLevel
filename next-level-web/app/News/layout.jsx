import React from 'react';

export default function ContactUsLayout({ children }) {
    return (
        <div>
            <main className="bg-gray-100">{children}</main>
        </div>
    );
}