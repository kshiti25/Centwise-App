/**
 * ShowAmountDetails Component
 *
 * The ShowAmountDetails component displays an amount with a specified label and color.
 * It is used to present financial information in a visually appealing way by assigning
 * different colors to amounts based on their nature (e.g., owed amount, owed-to amount,
 * or balance).
 *
 * @component
 * @param {object} props - The properties passed to the ShowAmountDetails component.
 * @param {string} props.label - The label describing the type or purpose of the amount.
 * @param {string} props.amount - The numerical value of the amount to be displayed.
 * @param {string} props.color - The color associated with the amount, determining its visual representation.
 * @returns {JSX.Element} - The JSX representation of the ShowAmountDetails component.
 * @example
 * // Import the ShowAmountDetails component
 * import ShowAmountDetails from './path/to/ShowAmountDetails';
 *
 * // Render the ShowAmountDetails component within a React application
 * <ShowAmountDetails label="Total amount you owe" amount="$100.00" color="orange" />
 */

import React from 'react';
import styles from './ShowAmountDetails.module.css';

/**
 * Props interface for the ShowAmountDetails component.
 * @interface
 * @property {string} label - The label describing the type or purpose of the amount.
 * @property {string} amount - The numerical value of the amount to be displayed.
 * @property {string} color - The color associated with the amount, determining its visual representation.
 */
type Props = {
    label: string;
    amount: string;
    color: string;
};

/**
 * ShowAmountDetails Functional Component
 *
 * @param {Props} props - The properties passed to the ShowAmountDetails component.
 * @returns {JSX.Element} - The JSX representation of the ShowAmountDetails component.
 */
const ShowAmountDetails = (props: Props) => {
    // Initialize amountColor with the provided color
    let amountColor: string = props.color;

    // Map color values to corresponding CSS class names
    if (props.color === 'orange') {
        amountColor = styles.orange;
    } else if (props.color === 'green') {
        amountColor = styles.green;
    } else if (props.color === 'grey') {
        amountColor = styles.grey;
    }

    // Combine CSS class names for styling
    const classList = [styles.amount, amountColor];

    // Render the ShowAmountDetails component
    return (
        <div className={styles.box}>
            {/* Display the label of the amount */}
            <div className={styles.label}>{props.label}</div>
            {/* Display the amount with associated color */}
            <div className={classList.join(' ')}>{props.amount}</div>
        </div>
    );
};

// Export the ShowAmountDetails component as the default export
export default ShowAmountDetails;
