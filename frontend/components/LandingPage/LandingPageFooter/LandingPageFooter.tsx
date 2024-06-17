/**
 * LandingPageFooter Component
 * 
 * The LandingPageFooter component represents the footer section of the landing page.
 * It includes the project logo, social media icons (commented out), information about the team members,
 * details about the project, and contact information. It also displays a horizontal line and a credit statement.
 * 
 * @component
 * @example
 * // Import the LandingPageFooter component
 * import LandingPageFooter from './path/to/LandingPageFooter';
 * 
 * // Render the LandingPageFooter component in your React application
 * <LandingPageFooter />
 */
import React from 'react';

// Importing styles and assets
import styles from "./LandingPageFooter.module.css";
import whiteLogo from "../../../../public/Images/centwisePhoto_W.png"

const LandingPageFooter = () => {
    /**
     * Render function
     * 
     * @returns {JSX.Element} The JSX representation of the LandingPageFooter component.
     */
    return (
        <footer className={styles.main_footer}>
            <div className={styles.footer}>
                {/* Logo and Social Media Section */}
                <section className={styles.logo_social_media}>
                    <div>
                        <div><img className={styles.footer_logo} src={whiteLogo} width="150px" height="30px" /></div>
                        <div className={styles.socialIcons}>
                            {/* Social media icons (commented out for now)
                                <a href="#"><img className={styles.social} src="assets/assets/images/facebook_app_symbol.png" alt="fb"/></a>
                                <a href="#"><img className={styles.social} src="assets/assets/images/twitter.png" alt="fb"/></a>
                                <a href="#"><img className={styles.social} src="assets/assets/images/youtube.png" alt="fb"/></a>
                                <a href="#"><img className={styles.social} src="assets/assets/images/instagram.png" alt="fb"/></a>
                            */}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className={styles.logo_social_media}>
                    <li className={styles.footer_list}>
                        <ul><h3>Team</h3></ul>
                        <ul>Yashvardhan Limbodiya</ul>
                        <ul>Manan Vijayvargiya</ul>
                        <ul>Ashay Saoji</ul>
                        <ul>Kshiti Dangore</ul>
                    </li>
                </section>

                {/* About Project Section */}
                <section className={styles.logo_social_media}>
                    <li className={styles.footer_list}>
                        <ul><h3>About Project</h3></ul>
                        <ul>Description</ul>
                        <ul>Features</ul>
                        <ul>Technology Used</ul>
                        <ul>UI Mockup</ul>
                    </li>
                </section>

                {/* Contact Us Section */}
                <section className={styles.logo_social_media}>
                    <li className={styles.footer_list}>
                        <ul><h3>Contact Us</h3></ul>
                        <ul>Our Story</ul>
                        <ul>Work with Us</ul>
                    </li>
                </section>
            </div>

            {/* Horizontal Line */}
            <hr className={styles.hr}/>

            {/* Credit Statement */}
            <p className={styles.p}>Design and develop by Team Centwise</p>
        </footer>
    );
}

// Exporting the LandingPageFooter component as the default export
export default LandingPageFooter;
