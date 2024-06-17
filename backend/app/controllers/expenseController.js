// Importing necessary modules and services
import * as expenseService from '../services/expense-services.js';
import Expense from '../models/ExpenseSchema.js';

// Post method to add expenses
export const addExpense = async function(request, response) {
    try {
        // Call the API service to add expense
        const expenseDocuments = await expenseService.addExpense(request);
        return response.json({ message: 'Expense created successfully', expenseDocuments });
    } catch (error) {
        // Handle errors if any
        console.error('Error creating Expense:', error);
        return response.json({ message: 'Internal Server Error' });
    }
}

// Fetch expenses for individual users
export const fetchFriend = async function(request, response) {
    try {
        const { expenseType } = request.query;
        const userId = request.user._id;
        
        // Find expenses for individual users using the Expense model
        const expenses = await Expense.find({ expenseType: 'Individual', 'usersInvolved.user': userId });
        
        // Return the fetched expenses as JSON
        return response.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}

// Fetch expenses for group users
export const fetchGroup = async function(request, response) {
    try {
        const { expenseType } = request.query;
        const userId = request.user._id;
        
        // Find expenses for group users using the Expense model
        const expenses = await Expense.find({ expenseType: 'Group', 'usersInvolved.user': userId });
        
        // Return the fetched expenses as JSON
        response.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

// Fetch all expenses for a user
export const fetchAll = async function(request, response) {
    try {
        const userId = request.user._id;
        
        // Find all expenses for a user using the Expense model
        const expenses = await Expense.find({'usersInvolved.user': userId});

        // Add user ID to each expense and return as JSON
        const expensesWithUserId = expenses.map(expense => ({ ...expense.toObject(), userId }));
        
        // Log the expenses with user ID for debugging
        console.log(expensesWithUserId);
        
        // Return the expenses with user ID as JSON
        return response.json(expensesWithUserId);
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};
