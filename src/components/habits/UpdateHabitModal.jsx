import React, { useState, useEffect } from 'react';
import useAxios from '../../utils/useAxios';
import toast from 'react-hot-toast';

const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

const UpdateHabitModal = ({ isOpen, setIsOpen, habit, refreshData }) => {
    const axiosInstance = useAxios();
    const [formData, setFormData] = useState({});

    // Populate form data when a habit is selected/modal opens
    useEffect(() => {
        if (habit) {
            setFormData({
                title: habit.title || '',
                description: habit.description || '',
                category: habit.category || '',
                reminderTime: habit.reminderTime || '',
                image: habit.image || '',
            });
        }
    }, [habit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        // Send updated data to the server using the PUT /update-habit/:id route
        axiosInstance.put(`/update-habit/${habit._id}`, formData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Habit updated successfully!');
                    setIsOpen(false); // Close modal
                    refreshData();   // Refresh the habit table instantly
                } else if (res.data.matchedCount > 0) {
                    toast('No changes detected.', { icon: 'ℹ️' });
                    setIsOpen(false);
                } else {
                    toast.error('Failed to update habit.');
                }
            })
            .catch(error => {
                console.error("Habit update error:", error);
                toast.error('An error occurred during update.');
            });
    };

    // Use a modal dialog element (DaisyUI standard)
    return (
        <dialog id="update_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box w-11/12 max-w-2xl">
                <h3 className="font-bold text-2xl text-habit-primary mb-4">Update Habit: {habit?.title}</h3>
                
                <form onSubmit={handleUpdate}>
                    {/* Habit Title */}
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Title</span></label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="input input-bordered" required />
                    </div>
                    
                    {/* Description */}
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered h-24" required></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Category Dropdown */}
                        <div className="form-control mb-4">
                            <label className="label"><span className="label-text">Category</span></label>
                            <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered" required>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Reminder Time Picker */}
                        <div className="form-control mb-4">
                            <label className="label"><span className="label-text">Reminder Time</span></label>
                            <input type="time" name="reminderTime" value={formData.reminderTime} onChange={handleChange} className="input input-bordered" required />
                        </div>
                    </div>
                    
                    {/* Image URL (Optional) */}
                    <div className="form-control mb-6">
                        <label className="label"><span className="label-text">Image URL (Optional Re-upload)</span></label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="input input-bordered" />
                    </div>

                    {/* Read-only fields (Assignment Requirement) */}
                    <p className="text-sm text-gray-500 mb-4">
                        Creator: {habit?.creatorName} | Email: {habit?.creatorEmail} (Cannot be edited)
                    </p>

                    <div className="modal-action">
                        <button type="button" onClick={() => setIsOpen(false)} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Update Habit</button>
                    </div>
                </form>
            </div>
            {/* Click backdrop to close */}
            <form method="dialog" className="modal-backdrop" onClick={() => setIsOpen(false)}></form>
        </dialog>
    );
};

export default UpdateHabitModal;