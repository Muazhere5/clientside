import React from 'react';
import { calculateCurrentStreak } from '../../utils/streakCalculator';
import { FaEdit, FaTrash, FaCheckCircle, FaFire } from 'react-icons/fa';

const HabitTable = ({ habits, onUpdateClick, onDeleteClick, onCompleteClick }) => {
    if (habits.length === 0) {
        return <p className="text-center text-gray-500">No habits to display.</p>;
    }

    return (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-2xl">
            <table className="table w-full">
                {/* Table Header */}
                <thead>
                    <tr className="bg-habit-primary text-white text-base">
                        <th>Title</th>
                        <th>Category</th>
                        <th>Current Streak</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map((habit) => {
                        // Calculate streak for display
                        const streak = calculateCurrentStreak(habit.completionHistory);
                        const createdDate = new Date(habit.createdAt).toLocaleDateString();

                        return (
                            <tr key={habit._id} className="hover:bg-base-200 transition-colors">
                                <td className="font-semibold">{habit.title}</td>
                                <td><div className="badge badge-info badge-outline">{habit.category}</div></td>
                                
                                <td>
                                    {/* Display Streak Badge */}
                                    <span className={`flex items-center gap-1 font-bold ${streak > 0 ? 'text-error' : 'text-gray-500'}`}>
                                        <FaFire className={streak > 0 ? 'text-error' : 'text-gray-400'} /> 
                                        {streak} Day{streak !== 1 && 's'}
                                    </span>
                                </td>
                                
                                <td>{createdDate}</td>

                                {/* Actions Column: Update | Delete | Mark Complete */}
                                <td className="space-x-2">
                                    <button 
                                        onClick={() => onUpdateClick(habit)}
                                        className="btn btn-sm btn-warning btn-square tooltip"
                                        data-tip="Update"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => onDeleteClick(habit._id)}
                                        className="btn btn-sm btn-error btn-square tooltip"
                                        data-tip="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button 
                                        onClick={() => onCompleteClick(habit._id)}
                                        className="btn btn-sm btn-success btn-square tooltip"
                                        data-tip="Mark Complete"
                                    >
                                        <FaCheckCircle />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HabitTable;