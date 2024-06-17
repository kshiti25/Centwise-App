/**
 * CentwiseNavigator Component
 *
 * The CentwiseNavigator component is a layout component that organizes
 * the main components of the Centwise application, including Navbar,
 * LeftSidePanel, and MainContainer. It receives a `title` prop to display
 * in the MainContainer component.
 *
 * @component
 * @param {Object} props - The properties passed to the CentwiseNavigator component.
 * @param {string} props.title - The title to be displayed in the MainContainer.
 * @returns {JSX.Element} - The JSX representation of the CentwiseNavigator component.
 * @example
 * // Import the CentwiseNavigator component
 * import CentwiseNavigator from './path/to/CentwiseNavigator';
 *
 * // Render the CentwiseNavigator component with a specific title
 * <CentwiseNavigator title="Dashboard" />
 */

import React from 'react';
import MainContainer from '../MainContainer/MainContainer';
import styles from '../CentwiseNavigator/CentwiseNavigator.module.css';
import Navbar from '../Navbar/Navbar';
import LeftSidePanel from '../LeftSidePanel/LeftSidePanel';

/**
 * Props interface for the CentwiseNavigator component.
 * @interface
 * @property {string} title - The title to be displayed in the MainContainer.
 */
type Props = {
    title: string;
};

/**
 * CentwiseNavigator Functional Component
 *
 * @param {Props} props - The properties passed to the CentwiseNavigator component.
 * @returns {JSX.Element} - The JSX representation of the CentwiseNavigator component.
 */
const CentwiseNavigator = (props: Props) => {
    // Component renders Navbar, LeftSidePanel, and MainContainer with the provided title
    return (
        <>
            {console.log(props.title)}
            <div className={styles.container}>
                <div className={styles.navbar}>
                    {/* Render Navbar component */}
                    <Navbar />
                </div>
                <div className={styles.mainBody}>
                    <div className={styles.leftSidePanel}>
                        {/* Render LeftSidePanel component */}
                        <LeftSidePanel />
                    </div>
                    <div className={styles.mainContainer}>
                        {/* Render MainContainer component with the provided title */}
                        <MainContainer title={props.title} />
                    </div>
                </div>
            </div>
        </>
    );
};

// Export the CentwiseNavigator component as the default export
export default CentwiseNavigator;
