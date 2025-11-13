import React, { useContext, useEffect, useState, useCallback } from 'react';
import useAxios from '../utils/useAxios';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from '../components/SharedUI/LoadingSpinner';
import HabitTable from '../components/habits/HabitTable';
import toast from 'react-hot-toast';
import UpdateHabitModal from '../components/habits/UpdateHabitModal';
import Swal from 'sweetalert2'; // Using SweetAlert for confirm dialogs

const MyHabits = () => {
    const { user, loading: userLoading } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const [myHabits, setMyHabits] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    // Function to fetch data (Memoized for use in useEffect and after CRUD operations)
    const fetchMyHabits = useCallback(() => {
        if (!user?.email) return;

        setDataLoading(true);
        axiosInstance.get(`/my-habits/${user.email}`)
            .then(res => {
                setMyHabits(res.data);
                setDataLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user habits:", error);
                toast.error("Failed to load your habits.");
                setDataLoading(false);
            });
    }, [user, axiosInstance]);

    useEffect(() => {
        if (user && !userLoading) {
            fetchMyHabits();
        }
    }, [user, userLoading, fetchMyHabits]);


    // --- CRUD Handlers ---

    // Handler for Mark Complete button (PATCH /habit/complete/:id)
    const handleMarkComplete = (id) => {
        axiosInstance.patch(`/habit/complete/${id}`)
            .then(res => {
                if (res.data.acknowledged) {
                    toast.success(res.data.message || "Habit marked complete today!");
                    fetchMyHabits(); // Update UI instantly
                }
            })
            .catch(error => {
                console.error("Mark Complete Error:", error);
                toast.error("Failed to mark complete.");
            });
    };

    // Handler for Delete button (DELETE /habit/:id)
    const handleDelete = (id) => {
        // Assignment Requirement: Confirm before delete (using SweetAlert)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/habit/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your habit has been deleted.", "success");
                            fetchMyHabits(); // Update UI instantly
                        } else {
                            toast.error("Delete failed.");
                        }
                    })
                    .catch(error => {
                        console.error("Delete Error:", error);
                        toast.error("Failed to delete habit.");
                    });
            }
        });
    };

    // Handler to open the Update Modal
    const handleOpenUpdateModal = (habit) => {
        setSelectedHabit(habit);
        setIsModalOpen(true);
    };

    if (userLoading || dataLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-habit-primary">
                My Habits ({myHabits.length})
            </h1>

            {myHabits.length > 0 ? (
                <HabitTable 
                    habits={myHabits} 
                    onUpdateClick={handleOpenUpdateModal}
                    onDeleteClick={handleDelete}
                    onCompleteClick={handleMarkComplete}
                />
            ) : (
                <div className="text-center py-16 bg-base-100 rounded-lg shadow-lg">
                    <p className="text-xl text-gray-600 mb-4">You haven't added any habits yet.</p>
                    <Link to="/add-habit" className="btn btn-lg btn-primary">
                        Start Building a New Habit
                    </Link>
                </div>
            )}
            
            {/* Modal for updating a habit */}
            <UpdateHabitModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                habit={selectedHabit}
                refreshData={fetchMyHabits}
            />
        </div>
    );
};

export default MyHabits;