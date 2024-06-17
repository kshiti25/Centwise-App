/**
 * LandingPageRightPanel Component
 * 
 * The LandingPageRightPanel component represents the right panel of the landing page.
 * It includes an animated image, and it uses the react-spring library for animation.
 * 
 * @component
 * @example
 * // Import the LandingPageRightPanel component
 * import LandingPageRightPanel from './path/to/LandingPageRightPanel';
 * 
 * // Render the LandingPageRightPanel component in your React application
 * <LandingPageRightPanel />
 */
import React from 'react';

// Importing animation libraries, navigation hook, image, and styles
import { useSpring, animated } from 'react-spring';
import { useNavigate } from "react-router-dom";
import landingPageImg from "../../../../public/Images/LandingPageImg.png";
import styles from "./LandingPageRightPanel.module.css";

const LandingPageRightPanel = () => {
    /**
     * Animation Properties
     * 
     * @description Animation properties for the react-spring library.
     * @type {Object}
     */
    const props = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
    });

    /**
     * Navigation Hook
     * 
     * @description React hook for programmatic navigation using react-router-dom.
     */
    const navigate = useNavigate();

    /**
     * Handle Login
     * 
     * @description Function to navigate to the login page.
     */
    const handleLogin = () => {
        navigate("/signin");
    }

    /**
     * Render function
     * 
     * @returns {JSX.Element} The JSX representation of the LandingPageRightPanel component.
     */
    return (
        <div>
            {/* Animated Content */}
            <animated.div style={props}>
                <div className={styles.landingPageImage}>
                    {/* Landing Page Image */}
                    <img src={landingPageImg} alt="LandingPageImage" height="400px" width="700px"/>
                </div>
            </animated.div>
        </div>
    );
}

// Exporting the LandingPageRightPanel component as the default export
export default LandingPageRightPanel;
