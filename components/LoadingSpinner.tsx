import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading weather data...</p>
    </div>
);

export default LoadingSpinner;