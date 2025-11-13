import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import LoadingSpinner from '../components/SharedUI/LoadingSpinner';
import HeroSlider from '../components/Sections/HeroSlider';
import FeaturedHabits from '../components/Sections/FeaturedHabits';
import WhyBuildHabits from '../components/Sections/WhyBuildHabits';
import Testimonials from '../components/Sections/Testimonials'; // Extra Section 1
import DailyMotivation from '../components/Sections/DailyMotivation'; // Extra Section 2
import { motion } from 'framer-motion'; // Required: Framer Motion for animation

const Home = () => {
    const [featuredHabits, setFeaturedHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios(); // Hook to connect to http://localhost:5000

    useEffect(() => {
        setLoading(true);
        // Fetch 6 newest public habits from the server
        axiosInstance.get('/featured-habits')
            .then(res => {
                setFeaturedHabits(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching featured habits:", error);
                setLoading(false);
                // Optionally show a toast error here
            });
    }, [axiosInstance]);

    if (loading) {
        return <LoadingSpinner />;
    }

    // Animation Variants for Framer Motion entrance
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div className="container mx-auto px-4 py-8">
            
            {/* 1. Hero Banner / Slider (with Framer Motion for entrance) */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="mb-12"
            >
                <HeroSlider />
            </motion.section>

            {/* 2. Featured Habits Section (6 newest public habits) */}
            <motion.section
                initial="hidden"
                whileInView="visible" // Animate when section scrolls into view
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-16"
            >
                <FeaturedHabits habits={featuredHabits} />
            </motion.section>

            {/* 3. Why Build Habits Section (Static Benefits) */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-16"
            >
                <WhyBuildHabits />
            </motion.section>

            {/* 4. Extra Section 1: User Testimonials */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-16"
            >
                <Testimonials />
            </motion.section>
            
            {/* 5. Extra Section 2: Daily Motivation */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-8"
            >
                <DailyMotivation />
            </motion.section>

        </div>
    );
};

export default Home;