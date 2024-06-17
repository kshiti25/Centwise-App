/**
 * SignUpForm Component
 * 
 * The SignUpForm component represents the sign-up form for user registration.
 * It includes input fields for first name, last name, phone number, email, and password.
 * The component also provides options for signing up with Google, showing/hiding password,
 * and displays password strength requirements.
 * 
 * @component
 * @returns {JSX.Element} - The JSX representation of the SignUpForm component.
 * @example
 * // Import the SignUpForm component
 * import SignUpForm from './path/to/SignUpForm';
 * 
 * // Render the SignUpForm component
 * <SignUpForm />
 */

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import googleLogoPath from "../../../../public/images/GoogleLogo.png";
import centwiseLogo from "../../../../public/images/CentwiseLogo.png";
import { useNavigate } from 'react-router-dom';
import styles from "../FormStyles.module.css";
import axios from 'axios';

/**
 * SignUpForm Functional Component
 * 
 * @returns {JSX.Element} - The JSX representation of the SignUpForm component.
 */
const SignUpForm: React.FC = () => {
    // Effect hook to add and remove gradient background on mount and unmount
    useEffect(() => {
        document.body.classList.add(styles.bodyGradient);
        return () => {
            document.body.classList.remove(styles.bodyGradient);
        };
    }, []);

    // State variables for form input values and visibility of password-related elements
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [ph_no, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordRequirementsVisible, setPasswordRequirementsVisible] = useState<boolean>(false);

    /**
     * Validate password against specified requirements.
     * @param {string} password - The password to validate.
     * @returns {boolean} - True if the password meets the requirements, false otherwise.
     */
    const validatePassword = (password: string): boolean => {
        // Password must be at least 8 characters long
        // It must contain at least one uppercase letter, one lowercase letter, and one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    /**
     * Handle focus event on password input to show password strength requirements.
     */
    const handlePasswordFocus = (): void => {
        setPasswordRequirementsVisible(true);
    };

    /**
     * Handle blur event on password input to hide password strength requirements.
     */
    const handlePasswordBlur = (): void => {
        setPasswordRequirementsVisible(false);
    };

    /**
     * Handle change event on password input.
     * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setPassword(value);
    };

    /**
     * Handle change event on confirm password input.
     * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setConfirmPassword(value);
    };

    /**
     * Handle change event on phone number input.
     * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
        // To ensure that the entered value is numeric and has exactly 10 digits
        const value = e.target.value.trim();
        if (/^\d{0,10}$/.test(value)) {
            setPhoneNumber(value === '' ? '' : value);
        }
    };

    /**
     * Toggle visibility of the password.
     */
    const toggleShowPassword = (): void => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    /**
     * Toggle visibility of the confirm password.
     */
    const toggleConfirmShowPassword = (): void => {
        setShowConfirmPassword((prevConfirmShowPassword) => !prevConfirmShowPassword);
    };

    /**
     * Handle form submission.
     * @param {FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Validate password and confirm password
        if (!validatePassword(password)) {
            alert("Invalid password! Please follow the password requirements.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please enter matching passwords.");
            return;
        }
        // Additional actions after validation if needed
    };

    /**
     * Handle Google OAuth authentication.
     */
    const handleGoogleOauth = () => {
        window.location.href = '/api/user/auth/google';
    };

    /**
     * Handle local signup form submission.
     * @param {FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleLocalSignupSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await handleLocalSignup(email, first_name, last_name, ph_no, password);
    };

    /**
     * Handle local signup.
     * @param {string} email - The email for signup.
     * @param {string} first_name - The first name for signup.
     * @param {string} last_name - The last name for signup.
     * @param {string} ph_no - The phone number for signup.
     * @param {string} password - The password for signup.
     */
    const handleLocalSignup = async (email: string, first_name: string, last_name: string, ph_no: string, password: string) => {
        try {
            const response = await axios.post('/api/user/create', {
                email: email,
                first_name: first_name,
                last_name: last_name,
                ph_no: ph_no,
                password: password,
            });

            if (response.status === 200) {
                navigate('/user/signin');
            } else {
                alert('User already exists');
            }

        } catch (error) {
            console.log(error + " Issue with sign up");
        }
    };

    // JSX representation of the SignUpForm component
    return (
        <div className={styles.container}>
            <div className={styles.centwiseLogo}>
                <img src={centwiseLogo} alt="Centwise Logo" height="40" width="190" />
            </div>
            <div className={styles.mainFormContainer}>
                <h2 className={styles.formHeading}>Sign up to account</h2>

                <button className={styles.googleButton} onClick={handleGoogleOauth}>
                    <img className={styles.googleLogo} src={googleLogoPath} alt="Google Logo" />
                    <p className={styles.googleText}><b>Sign up with Google</b></p>
                </button>

                <div className={styles.Or}>OR</div>

                <form onSubmit={(e) => handleLocalSignupSubmit(e)} method="POST">
                    <input className={styles.inputs} value={first_name} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter your first name" required id="first_name" name='first_name' />
                    <br /><input className={styles.inputs} value={last_name} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter your last name" required id="last_name" name='last_name' />
                    <br /><input className={styles.inputs} value={ph_no || ''} onChange={handlePhoneNumberChange} type="tel" placeholder="Enter your phone number" required id="ph_no" name='ph_no' />
                    <br /><input className={styles.inputs} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email id" required id="email" name='email' />
                    <br /> <input className={styles.inputs} value={password} onChange={handlePasswordChange} onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur} type={showPassword ? "text" : "password"} placeholder="Enter your password" required id="password" name='password' />
                    <button className={styles.showpassword} type="button" onClick={toggleShowPassword}>{showPassword ? "Hide" : "Show"} Password</button>
                    {passwordRequirementsVisible && (
                        <ul className={styles.passwordRequirements}>
                            <li>Password must be at least 8 characters long</li>
                            <li>Contain at least one uppercase letter</li>
                            <li>Contain at least one lowercase letter</li>
                            <li>Contain at least one number</li>
                        </ul>
                    )}
                    <br /><input className={styles.inputs} value={confirmPassword} onChange={handleConfirmPasswordChange} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" required id="confirmPassword" name='cnfPassword' />
                    <button className={styles.showconfirmpassword} type="button" onClick={toggleConfirmShowPassword}>{showConfirmPassword ? "Hide" : "Show"} Password</button>
                    <br /><button className={styles.submitBtn} type="submit">Sign Up</button>
                </form>

            </div>

        </div>
    );
}

// Export the SignUpForm component as the default export
export default SignUpForm;
