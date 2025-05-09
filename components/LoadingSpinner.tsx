import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="loading-spinner mx-auto h-screen flex items-center">
        <div className="spinner"></div>
        <div
            className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
        ></div>

    </div>
);

export default LoadingSpinner;