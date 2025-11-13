import React from 'react';
import FeaturedHabitCard from '../SharedUI/FeaturedHabitCard'; // Component for each habit

const FeaturedHabits = ({ habits }) => {
    return (
        <div>
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                ⭐ Featured Habits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {habits.map(habit => (
                    // Card component ensures equal height and width (assignment requirement 8)
                    <FeaturedHabitCard key={habit._id} habit={habit} />
                ))}
            </div>
            {habits.length === 0 && (
                <p className="text-center text-xl text-gray-500">
                    No featured habits found. Please ensure data is loaded in MongoDB Atlas.
                </p>
            )}
        </div>
    );
};

export default FeaturedHabits;