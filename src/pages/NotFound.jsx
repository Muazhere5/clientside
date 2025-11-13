import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        // The 404 page is excluded from the standard Header/Footer
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Minimal but fun design (maybe a Lottie animation here later) */}
                <h1 className="text-9xl font-extrabold text-habit-primary opacity-50">404</h1>
                <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-6">Page Not Found</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Oops! It looks like you've gone off the path. The habit you were looking for doesn't exist.
                </p>
                <Link to="/" className="btn btn-lg btn-primary">
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;