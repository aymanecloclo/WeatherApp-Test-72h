import React from 'react';

interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => (
    <div className="error-display">
        <h3>Error Loading Weather Data</h3>
        <p>{message}</p>
        <button onClick={onRetry} className="retry-button">
            Retry
        </button>
    </div>
);

export default ErrorDisplay;