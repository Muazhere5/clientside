import React from 'react';

const LoadingSpinner = () => {
    return (
        // Center the spinner on the screen
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <div className="flex flex-col items-center space-y-4">
                {/* DaisyUI Loading Component (Spinner style) */}
                <span className="loading loading-spinner loading-lg text-habit-primary"></span>
                <p className="text-lg font-medium text-gray-500">Loading data...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;