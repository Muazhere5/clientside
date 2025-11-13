import { createContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged, 
    signOut,
    updateProfile 
} from 'firebase/auth';
import auth from '../utils/firebase.config'; // Import the initialized Firebase Auth instance

// 1. Create Context
export const AuthContext = createContext(null);

// Define Google provider instance
const googleProvider = new GoogleAuthProvider();

// 2. Auth Provider Component
const AuthProvider = ({ children }) => {
    // State to hold the current logged-in user object from Firebase
    const [user, setUser] = useState(null); 
    // State to handle initial loading (checking if a user is already logged in)
    const [loading, setLoading] = useState(true); 
    
    // --- Authentication Methods ---
    
    // 1. Register User (Email/Password)
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. Login User (Email/Password)
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    
    // 3. Google Sign-in
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 4. Log Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    
    // 5. Update Profile (Name and photoURL) - Used during Registration
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photoUrl
        });
    };

    // --- State Observer (Crucial for persistence) ---
    // Manages user state on page load and when login/logout happens
    useEffect(() => {
        // onAuthStateChanged is the Firebase observer
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false); // Once state is checked, stop loading
            
            // NOTE: JWT/Token implementation for server-side security (Optional Challenge) 
            // would go here using Firebase's getIdToken().
            
            console.log('Current User:', currentUser);
        });

        // Cleanup subscription on component unmount
        return () => {
            unsubscribe();
        };
    }, []);

    // 3. Context Value (The data accessible via useContext(AuthContext))
    const authInfo = {
        user,
        loading,
        registerUser,
        loginUser,
        googleLogin,
        logOut,
        updateUserProfile
    };

    // 4. Provider Component
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;