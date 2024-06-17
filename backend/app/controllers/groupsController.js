import * as groupService from '../services/group-services.js';


//Group creation post method
export const createGroup = async function(request, response){
      try {
      
            const userDocuments = await groupService.findUsers(request);  //API service call
        
            //console.log(userDocuments);
            // Respond with a success message
            response.status(200).json({ message: 'Group created successfully', group: userDocuments });
          } catch (error) {
            // Handle errors
            console.error('Error creating group:', error);
            response.status(500).json({ message: 'Internal Server Error' });
          }
}