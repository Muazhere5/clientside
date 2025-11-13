import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast'; // For success/error messages

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    // Navigation Links
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/browse">Browse Public Habits</NavLink></li>
            {/* These links are visible even when logged out, but the route is guarded */}
            <li><NavLink to="/add-habit">Add Habit</NavLink></li>
            <li><NavLink to="/my-habits">My Habits</NavLink></li>
        </>
    );

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully logged out!');
            })
            .catch(error => {
                console.error("Logout Error:", error);
                toast.error('Logout failed. Please try again.');
            });
    };

    return (
        // DaisyUI Navbar with sticky positioning
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                {/* Mobile Menu Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                {/* Logo/Website Name (Consistent style requirement) */}
                <Link to="/" className="btn btn-ghost text-xl font-bold text-habit-primary">
                    🔥 Habit Builder
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            {/* Conditional Login/User Section */}
            <div className="navbar-end">
                {user ? (
                    // User is logged in: Show Avatar and Dropdown
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {/* Use user's photoURL or a default avatar */}
                                <img 
                                    alt={user.displayName || "User Avatar"} 
                                    src={user.photoURL || 'https://i.ibb.co/6y4K0Gv/default-avatar.png'} 
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {/* Display Name and Email requirement */}
                            <li className="font-semibold text-sm px-4 py-2 pointer-events-none text-gray-700">
                                {user.displayName || 'User'}
                            </li>
                            <li className="text-xs px-4 py-2 pointer-events-none text-gray-500">
                                {user.email}
                            </li>
                            <div className="divider my-0"></div>
                            <li>
                                <button 
                                    onClick={handleLogOut} 
                                    className="btn btn-sm btn-error text-white mt-1"
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // User is NOT logged in: Show Login/Signup buttons
                    <>
                        <Link to="/login" className="btn btn-sm btn-ghost">Login</Link>
                        <Link to="/signup" className="btn btn-sm btn-primary">Signup</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;