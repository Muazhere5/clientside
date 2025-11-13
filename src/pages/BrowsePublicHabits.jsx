import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import LoadingSpinner from '../components/SharedUI/LoadingSpinner';
import FeaturedHabitCard from '../components/SharedUI/FeaturedHabitCard'; // Reuse the card component
import { motion } from 'framer-motion';

const categories = ['All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study']; // For filtering

const BrowsePublicHabits = () => {
    const axiosInstance = useAxios();
    const [publicHabits, setPublicHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function to fetch data based on current filter/search state
    useEffect(() => {
        setLoading(true);
        // Build the query string using template literals
        const queryParams = new URLSearchParams();
        
        if (selectedCategory !== 'All') {
            queryParams.append('category', selectedCategory);
        }
        if (searchTerm) {
            queryParams.append('search', searchTerm);
        }

        // Fetch using the /public-habits API route with query parameters
        axiosInstance.get(`/public-habits?${queryParams.toString()}`)
            .then(res => {
                setPublicHabits(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching public habits:", error);
                setLoading(false);
            });
    }, [axiosInstance, selectedCategory, searchTerm]); // Re-run effect when these states change

    // Handle form submission for search bar
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const input = e.target.search.value;
        setSearchTerm(input);
    };
    
    // Handle category change (sets state which triggers useEffect)
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-habit-primary">
                Browse All Public Habits
            </h1>
            
            {/* Search and Filter Controls (Challenge 3 Implementation) */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-base-100 shadow-lg rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center"
            >
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="form-control w-full md:w-1/2">
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="search"
                            placeholder="Search by title or keyword..." 
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>

                {/* Category Filter */}
                <div className="form-control w-full md:w-1/4">
                    <label className="label hidden md:block">
                        <span className="label-text">Filter by Category:</span>
                    </label>
                    <select 
                        className="select select-bordered"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </motion.div>

            {/* Habit Grid Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publicHabits.length > 0 ? (
                    publicHabits.map(habit => (
                        // Reusing the same card component for consistency (UI requirement)
                        <FeaturedHabitCard key={habit._id} habit={habit} />
                    ))
                ) : (
                    <div className="lg:col-span-3 text-center py-16 bg-base-100 rounded-lg shadow-lg">
                        <p className="text-xl text-gray-600">
                            No habits match your search or filter criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowsePublicHabits;