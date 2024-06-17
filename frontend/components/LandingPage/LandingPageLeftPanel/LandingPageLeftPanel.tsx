/**
 * LandingPageLeftPanel Component
 * 
 * The LandingPageLeftPanel component represents the left panel of the landing page.
 * It includes a title with a type animation effect, a brief description, and buttons for login and sign up.
 * The panel uses react-spring for animation and react-type-animation for the typewriting effect.
 * 
 * @component
 * @example
 * // Import the LandingPageLeftPanel component
 * import LandingPageLeftPanel from './path/to/LandingPageLeftPanel';
 * 
 * // Render the LandingPageLeftPanel component in your React application
 * <LandingPageLeftPanel />
 */
import React from 'react';

// Importing styles and animation libraries
import styles from "./LandingPageLeftPanel.module.css";
import { useSpring, animated } from 'react-spring';
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

const LandingPageLeftPanel = () => {
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
        navigate("/user/signin");
    }

    /**
     * Handle Signup
     * 
     * @description Function to navigate to the sign-up page.
     */
    const handleSignup = () => {
        navigate("/user/signup");
    }

    /**
     * Render function
     * 
     * @returns {JSX.Element} The JSX representation of the LandingPageLeftPanel component.
     */
    return (
        <div className={styles.container}>
            {/* Animated Content */}
            <animated.div style={props}>
                <div className={styles.animatedTitle}>
                    {/* Typewriting Title */}
                    <h1 className={styles.titleContent}>
                        <TypeAnimation
                            sequence={['Welcome to Centwise']}
                            speed={200} // Typing speed in ms
                            style={{ fontSize: '1.5em', color: '#353434' }}
                            repeat={1}
                        />
                    </h1>
                </div>

                {/* Secondary Content */}
                <div className={styles.secondaryContent}>
                    Elevate your shared living experience with Centwise – the key to fair and friendly expense management.
                </div>

                {/* Button Container */}
                <div className={styles.buttonContainer}>
                    {/* Login Button */}
                    <button className={styles.login} onClick={handleLogin}>Login</button>

                    {/* Sign Up Button */}
                    <button className={styles.signup} onClick={handleSignup}>Sign Up</button>
                </div>
            </animated.div>
        </div>
    );
}

// Exporting the LandingPageLeftPanel component as the default export
export default LandingPageLeftPanel;
