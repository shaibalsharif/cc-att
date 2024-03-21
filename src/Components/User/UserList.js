import React, { useState, useEffect } from 'react';
import {realtime_db} from '../../Utils/firebaseConfig'
import { ref } from 'firebase/database';

const UserList = () => {
    // State to store user data
    const [users, setUsers] = useState([]);

    // Function to fetch user data from Firebase Realtime Database
    const fetchUserData = () => {
        // Reference to 'users' node in the database
        const usersRef = ref(realtime_db,'users');
        
        // Listen for changes in the 'users' node
        usersRef.on('value', (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                // Convert the data object into an array of users
                const userList = Object.keys(userData).map(userId => ({
                    id: userId,
                    ...userData[userId]
                }));
                // Set the user data in the state
                setUsers(userList);
            } else {
                // If no user data found, set users to an empty array
                setUsers([]);
            }
        });
    };

    // Fetch user data when component mounts
    useEffect(() => {
        fetchUserData();

        // Cleanup function to remove event listener when component unmounts
        return () => {
            // realtime_db.ref('users').off('value');
        };
    }, []); // Empty dependency array ensures this effect runs only once when component mounts

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>Name: {user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Job Title: {user.jobtitle}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
