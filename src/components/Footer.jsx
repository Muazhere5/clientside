import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Required: Use the new X logo

const Footer = () => {
    return (
        // DaisyUI Footer with shadow, using secondary color for distinction
        <footer className="footer p-10 bg-base-200 text-base-content border-t shadow-inner">
            <aside>
                {/* Logo and Website Name */}
                <span className="text-3xl font-bold text-habit-primary">
                    🔥 Habit Builder
                </span>
                <p>
                    Habit Tracker Ltd.<br />Building consistency, one day at a time.
                </p>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </aside>
            
            {/* Contact Details */}
            <nav>
                <h6 className="footer-title">Contact & Legal</h6> 
                <a className="link link-hover">Email: support@habitbuilder.com</a>
                <a className="link link-hover">Phone: +1 (555) 123-4567</a>
                <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
                <a className="link link-hover">Privacy Policy</a>
            </nav> 
            
            {/* Social Media Links (Use new X logo requirement) */}
            <nav>
                <h6 className="footer-title">Social</h6> 
                <div className="grid grid-flow-col gap-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;