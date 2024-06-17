/**
 * MainContainer Component
 *
 * The MainContainer component is responsible for rendering the main content
 * area of the application. It dynamically selects and renders different components
 * based on the specified component name received as a prop. The available components
 * include Dashboard, Groups, AllExpenses, and Friends.
 *
 * @component
 * @param {object} props - The properties passed to the MainContainer component.
 * @param {string} props.title - The title to be displayed in the main container heading.
 * @returns {JSX.Element} - The JSX representation of the MainContainer component.
 * @example
 * // Import the MainContainer component
 * import MainContainer from './path/to/MainContainer';
 *
 * // Render the MainContainer component within a React application
 * <MainContainer title="Dashboard" />
 */

import React from 'react';
import styles from './MainContainer.module.css';
import DashboardCmp from '../Dashboard/DashboardCmp';
import GroupCmp from '../Groups/GroupCmp';
import AllExpensesCmp from '../AllExpenses/AllExpensesCmp';
import FriendsCmp from '../Friends/FriendsCmp';

/**
 * Type definition for the ComponentMap object.
 * @typedef {object} ComponentMap
 * @property {React.ComponentType<any>} Dashboard - The DashboardCmp component.
 * @property {React.ComponentType<any>} Groups - The GroupCmp component.
 * @property {React.ComponentType<any>} AllExpenses - The AllExpensesCmp component.
 * @property {React.ComponentType<any>} Friends - The FriendsCmp component.
 */
interface ComponentMap {
    [key: string]: React.ComponentType<any>;
}

/**
 * Props interface for the DynamicComponent component.
 * @interface
 * @property {string} componentName - The name of the component to be rendered.
 */
interface DynamicComponentProps {
    componentName: string;
}

/**
 * Props interface for the MainContainer component.
 * @interface
 * @property {string} title - The title to be displayed in the main container heading.
 */
type Props = {
    title: string;
};

/**
 * Component map that associates component names with their corresponding components.
 * @constant {ComponentMap}
 */
const componentMap: ComponentMap = {
    Dashboard: DashboardCmp,
    Groups: GroupCmp,
    AllExpenses: AllExpensesCmp,
    Friends: FriendsCmp,
};

/**
 * MainContainer Functional Component
 *
 * @param {Props} props - The properties passed to the MainContainer component.
 * @returns {JSX.Element} - The JSX representation of the MainContainer component.
 */
const MainContainer = (props: Props) => {
    // Destructure the title from the props
    const { title } = props;

    /**
     * Assigns the appropriate component based on the specified component name.
     *
     * @param {DynamicComponentProps} { componentName } - The component name to be assigned.
     * @returns {JSX.Element} - The JSX representation of the assigned component.
     */
    const assignComponent: React.FC<DynamicComponentProps> = ({ componentName }) => {
        // Retrieve the component from the componentMap
        const Component = componentMap[componentName];

        // Check if the component exists in the componentMap
        if (!Component) {
            // Handle unknown component name
            return <div>Unknown component</div>;
        }

        // Render the assigned component
        return <Component />;
    };

    // Render the MainContainer component
    return (
        <div id="main-container">
            {/* Display the main container heading */}
            <h1 className={styles.mainContainerHeading}>{title}</h1>
            <div className={styles.mainCard}>
                {/* Render the assigned component based on the specified title */}
                {assignComponent({ componentName: title })}
            </div>
        </div>
    );
};

// Export the MainContainer component as the default export
export default MainContainer;
