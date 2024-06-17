/**
 * LandingPage Component
 * 
 * The LandingPage component is the main component for the landing page of the application.
 * It organizes and renders different sections of the landing page, including the logo, left and right panels,
 * a middle division, and the footer.
 * 
 * @component
 * @example
 * // Import the LandingPage component
 * import LandingPage from './path/to/LandingPage';
 * 
 * // Render the LandingPage component in your React application
 * <LandingPage />
 */
import React from 'react';

// Importing styles and assets
import styles from "./LandingPage.module.css";
import logo from "../../../public/images/CentwiseLogo.png";

// Importing sub-components
import LandingPageLeftPanel from "./LandingPageLeftPanel/LandingPageLeftPanel";
import LandingPageRightPanel from "./LandingPageRightPanel/LandingPageRightPanel";
import LandingPageFooter from "./LandingPageFooter/LandingPageFooter";

const LandingPage = () => {
    /**
     * Render function
     * 
     * @returns {JSX.Element} The JSX representation of the LandingPage component.
     */
    return (
        <div className={styles.overAllContainer}>
            {/* Logo Section */}
            <div>
                <div className={styles.logo}>
                    <img src={logo} alt="" height="40px" width="180px" />
                </div>
            </div>

            {/* Main Content Container */}
            <div className={styles.mainContainer}>
                {/* Content Container */}
                <div className={styles.contentContainer}>
                    {/* Left Side Panel */}
                    <div className={styles.leftSidePanel}>
                        <LandingPageLeftPanel />
                    </div>

                    {/* Right Side Panel */}
                    <div className={styles.rightSidePanel}>
                        <LandingPageRightPanel />
                    </div>
                </div>

                {/* Middle Division */}
                <div className={styles.midDiv}></div>

                {/* Footer Section */}
                <div className={styles.footer}>
                    <LandingPageFooter/>
                </div>
            </div>
        </div>
    );
}

// Exporting the LandingPage component as the default export
export default LandingPage;
