/**
 * DashboardCmp Component
 *
 * The DashboardCmp component is responsible for displaying the user's dashboard
 * summary, including the total amount owed, total amount owed to the user, and
 * the total balance. It also shows a list of friends and groups along with their
 * respective debts and owes.
 *
 * @component
 * @returns {JSX.Element} - The JSX representation of the DashboardCmp component.
 * @example
 * // Import the DashboardCmp component
 * import DashboardCmp from './path/to/DashboardCmp';
 *
 * // Render the DashboardCmp component within a React application
 * <DashboardCmp />
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowAmountDetails from '../ShowAmountDetails/ShowAmountDetails';
import styles from './DashboardCmp.module.scss';
import ShowDebtOwesList from '../ShowDebtOwesList/ShowDebtOwesList';
import ShowDebtOwesGroupList from '../ShowDebtOwesList/ShowDebtOwesGroupList';
import { Document, Types } from 'mongoose';

/**
 * Interface for the UserInvolved object.
 * @interface
 * @property {Types.ObjectId} user - The user's ObjectId.
 * @property {number} paidShare - The amount the user has paid.
 * @property {number} owedShare - The amount the user owes.
 * @property {string} user_first_name - The user's first name.
 * @property {string} user_last_name - The user's last name.
 */
interface UserInvolved {
    user: Types.ObjectId;
    paidShare: number;
    owedShare: number;
    user_first_name: string;
    user_last_name: string;
}

/**
 * Interface for the GroupInvolved object.
 * @interface
 * @property {Types.ObjectId} group - The group's ObjectId.
 * @property {string} group_name - The name of the group.
 */
interface GroupInvolved {
    group: Types.ObjectId;
    group_name: string;
}

/**
 * Interface for the Partition object.
 * @interface
 * @property {string} type - The type of partition.
 */
interface Partition {
    type: string;
}

/**
 * Interface for the Expense object.
 * @interface
 * @extends Document
 * @property {Types.ObjectId} Payer - The payer's ObjectId.
 * @property {string} description - The description of the expense.
 * @property {UserInvolved[]} usersInvolved - The users involved in the expense.
 * @property {GroupInvolved[]} groupInvolved - The groups involved in the expense.
 * @property {number} amount - The total amount of the expense.
 * @property {string} currency - The currency of the expense.
 * @property {Types.ObjectId} created_by - The user who created the expense.
 * @property {Date} created_date - The date the expense was created.
 * @property {Partition[]} partition - The partition details of the expense.
 * @property {string} expenseType - The type of expense (Individual or Group).
 */
interface Expense extends Document {
    Payer: Types.ObjectId;
    description: string;
    usersInvolved: UserInvolved[];
    groupInvolved: GroupInvolved[];
    amount: number;
    currency: string;
    created_by: Types.ObjectId;
    created_date: Date;
    partition: Partition[];
    expenseType: string;
}

/**
 * Interface for the UserData object.
 * @interface
 * @extends Document
 * @property {string} _id - The user's ObjectId.
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 * @property {string} first_name - The user's first name.
 * @property {string} last_name - The user's last name.
 * @property {string} ph_no - The user's phone number.
 * @property {Date} created_date - The date the user account was created.
 * @property {number} totalOweAmount - The total amount the user owes.
 * @property {number} totalOweToSelf - The total amount owed to the user.
 * @property {number} totalBalance - The total balance of the user.
 */
interface UserData extends Document {
    _id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    ph_no: string;
    created_date: Date;
    totalOweAmount: number;
    totalOweToSelf: number;
    totalBalance: number;
}

/**
 * DashboardCmp Functional Component
 *
 * @returns {JSX.Element} - The JSX representation of the DashboardCmp component.
 */
const DashboardCmp = () => {
    // State variables to store friend expenses, group expenses, and user data
    const [friendExpense, setFriendExpense] = useState<Expense[] | null>(null);
    const [groupExpense, setGroupExpense] = useState<Expense[] | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    // Fetch data from the server on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch friend, group, and user data
                const friendResponse = axios.get('/api/expense/FriendData', { params: { expenseType: 'Individual' } });
                const groupResponse = axios.get('/api/expense/GroupData', { params: { expenseType: 'Group' } });
                const userResponse = axios.get('/api/dashboard');

                // Wait for all requests to complete
                const [friendData, groupData, userData] = await Promise.all([friendResponse, groupResponse, userResponse]);

                // Update state variables with fetched data
                setFriendExpense(friendData.data);
                setGroupExpense(groupData.data);
                setUserData(userData.data);

                console.log('friendExpense', groupData.data);
            } catch (error: any) {
                console.error('Error getting data from the database:', error.message);
            }
        };

        // Call fetchData function
        fetchData();
    }, []);

    return (
        <div>
            <div className={styles.mainContainer}>
                {/* Display total summary */}
                <div>
                    <div className={styles.summary}>Total Summary</div>
                    <div className={styles.container}>
                        {/* Show amount details for total owe, total owe to self, and total balance */}
                        <ShowAmountDetails label="Total amount you owe" amount={`$${userData?.totalOweAmount.toFixed(2)}`} color="orange" />
                        <ShowAmountDetails label="Total amount owe to you" amount={`$${userData?.totalOweToSelf.toFixed(2)}`} color="green" />
                        <ShowAmountDetails label="Total balance" amount={`$${(userData?.totalBalance ?? 0).toFixed(2)}`} color="grey" />
                    </div>
                    <hr className={styles.hr} />
                </div>

                {/* Display list of friend expenses */}
                <div className={styles.listCard}>
                    <div className={styles.summary}>Friends</div>
                    <ShowDebtOwesList friendExpense={friendExpense} />
                </div>
            </div>

            {/* Horizontal line separator */}
            <hr className={styles.hr} />

            {/* Display list of group expenses */}
            <div className={styles.listCard}>
                <div className={styles.summary}>Groups</div>
                <ShowDebtOwesGroupList groupExpense={groupExpense} />
            </div>
        </div>
    );
};

// Export the DashboardCmp component as the default export
export default DashboardCmp;
