/**
 * CentwiseAuth Component
 * 
 * The CentwiseAuth component is a generic authentication component that renders either a sign-in or sign-up form.
 * It includes a left side for the authentication form and a right side for additional information or actions.
 * The type prop determines whether to render the sign-in or sign-up form.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.type - The type of authentication form to render ('signin' or 'signup').
 * @returns {JSX.Element} - The JSX representation of the CentwiseAuth component.
 * @example
 * // Import the CentwiseAuth component
 * import CentwiseAuth from './path/to/CentwiseAuth';
 * 
 * // Render the CentwiseAuth component with the sign-in form
 * <CentwiseAuth type="signin" />
 * 
 * // Render the CentwiseAuth component with the sign-up form
 * <CentwiseAuth type="signup" />
 */
import React from "react";

// Importing styles and sub-components
import styles from "./CentwiseAuth.module.css";
import RightSidePanel from "./RightSidePanel/RightSidePanel";
import SignInForm from "./SignInForm/SignInForm";
import SignUpForm from "./SignUpForm/SignUpForm";

// TypeScript type for component props
type Props = {
    type: string; // The type of authentication form ('signin' or 'signup')
}

/**
 * CentwiseAuth Functional Component
 * 
 * @param {Props} props - The properties passed to the component.
 * @returns {JSX.Element} - The JSX representation of the CentwiseAuth component.
 */
const CentwiseAuth = (props: Props) => {
    // Destructure the type prop
    const { type } = props;

    // Rendering JSX
    return (
        <div className={styles.container}>
            {/* Left side of the authentication component */}
            <div className={styles.leftSide}>
                {/* Conditionally render either the sign-in or sign-up form based on the type prop */}
                {type === 'signin' ? <SignInForm /> : <SignUpForm />}
            </div>
            {/* Right side of the authentication component */}
            <div className={styles.rightSide}>
                {/* Render the RightSidePanel component with the specified type */}
                <RightSidePanel type={type} />
            </div>
        </div>
    );
}

// Export the CentwiseAuth component as the default export
export default CentwiseAuth;
