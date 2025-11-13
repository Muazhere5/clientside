import React from 'react';
import { Link } from 'react-router-dom';
import { FaFire } from 'react-icons/fa'; // Icon for Streak Badge

const FeaturedHabitCard = ({ habit }) => {
    // Note: Streak calculation is complex; for the home page, we show a basic badge.
    const hasStreak = habit.completionHistory && habit.completionHistory.length > 0;
    
    return (
        // DaisyUI Card component with consistent height
        <div className="card bg-base-100 shadow-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
            <figure>
                {/* Ensure image is uniform size (assignment requirement 3) */}
                <img 
                    src={habit.image || 'https://i.ibb.co/default-habit.jpg'} 
                    alt={habit.title} 
                    className="w-full h-48 object-cover" 
                />
            </figure>
            <div className="card-body flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-2xl text-habit-primary">
                        {habit.title}
                    </h3>
                    {/* Basic Streak Badge */}
                    {hasStreak && (
                        <div className="badge badge-error gap-2 text-white">
                            <FaFire /> Streak
                        </div>
                    )}
                </div>
                
                {/* Necessary Habit Information */}
                <p className="text-sm text-gray-600 mb-2">{habit.description.substring(0, 80)}...</p>
                
                {/* Creator Info */}
                <div className="badge badge-outline badge-sm mb-4">
                    Category: {habit.category}
                </div>
                <div className="text-xs text-gray-500">
                    Created by: **{habit.creatorName}**
                </div>

                <div className="card-actions justify-end mt-4">
                    {/* View Details Button (requires login for full access) */}
                    <Link to={`/habit/${habit._id}`} className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedHabitCard;