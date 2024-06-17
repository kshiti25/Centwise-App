/**
 * AllExpensesCmp Component
 * 
 * The AllExpensesCmp component is responsible for displaying all expenses.
 * It fetches expense data from the server and renders individual expense items.
 * Each expense item includes details such as description, expense type, paid amounts, and lent amounts.
 * 
 * @component
 * @example
 * // Import the AllExpensesCmp component
 * import AllExpensesCmp from './path/to/AllExpensesCmp';
 * 
 * // Render the AllExpensesCmp component in your React application
 * <AllExpensesCmp />
 */
import React, { useEffect, useState } from "react";

// Importing styles, sub-components, images, axios for making HTTP requests, and necessary TypeScript types
import styles from "./AllExpensesCmp.module.css";
import AllExpenses from "./AllExpenses";
import flightIcon from "../../../public/images/expenseIcon.png";
import axios from 'axios';
import { Document, Types } from 'mongoose';

// TypeScript types for better type checking
interface UserInvolved {
  user: Types.ObjectId;
  paidShare: number;
  owedShare: number;
  user_first_name: string;
  user_last_name: string;
}

interface GroupInvolved {
  group: Types.ObjectId;
  group_name: string;
}

interface Partition {
  type: string;
}

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
 * AllExpensesCmp Functional Component
 * 
 * @returns {JSX.Element} The JSX representation of the AllExpensesCmp component.
 */
const AllExpensesCmp: React.FC = () => {
  // State variables for managing all expenses data and user ID
  const [allExpensesData, setAllExpensesData] = useState<Expense[]>([]);
  const [userId, setUserId] = useState<Types.ObjectId | null>(null);

  // useEffect to fetch all expenses data from the server when the component mounts
  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const response = await axios.get('/api/expense/allData');
        setAllExpensesData(response.data);
        setUserId(response.data.userId);
      } catch (error: any) {
        // Handle errors
        console.error('Error fetching expenses:', error.message);
      }
    };

    // Call the function to fetch expenses
    getAllExpenses();
  }, []);

  // Rendering JSX
  const [ paidshare, setPaidShare] = useState(0);
  let tmp = 0;
  return (
    <div>
      {/* Render the AllExpenses component */}
      <AllExpenses />
      <div>
        {/* Map through all expense data and render individual expense items */}
        {allExpensesData.map((expenseData) => (
          <div key={expenseData._id} >
            <span className={styles.expenseItem}>
              {/* Displaying month, date, and icon */}
              <span className={styles.monthdate}>
                <p className={styles.month}> {'DEC'}</p>
                <p className={styles.date}> {'12'}</p>
              </span>
              <img className={styles.icon} src={flightIcon} alt="Flight Icon" />
              <div className={styles.dataExpense}>
                {/* Displaying expense description and type */}
                <p className={styles.expense}>{expenseData.description}</p>
                <p className={styles.expense_type}>{expenseData.expenseType}</p>
              </div>

              <span>
                {/* Displaying "You Paid" information */}
                <p className={styles.paid}>You Paid:</p>
                <p className={styles.paidData}>{expenseData.usersInvolved[expenseData.usersInvolved.length-1].paidShare}</p>
              </span>
              <span>
                {/* Displaying "You Lent" information */}
                <p className={styles.lent}>You Lent:</p>
                <p className={styles.lentData}>{expenseData.usersInvolved[expenseData.usersInvolved.length-1].owedShare}</p>
              </span>
            </span>
            {/* Horizontal line as a separator between expense items */}
            {<hr />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllExpensesCmp;
