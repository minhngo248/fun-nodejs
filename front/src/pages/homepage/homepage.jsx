import React, { useState, useEffect } from 'react';
import axios from "axios";

const HomePage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if token is present in localStorage
        const token = localStorage.getItem('jwtToken');

        if (token) {
            // Perform a GET request to the protected route
            axios.get('http://localhost:3000/api/auth/protected', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // Token is valid
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                })
                .catch(err => {
                    // Token is invalid
                    console.log(err);
                    setIsAuthenticated(false);
                });
        } else {
            // Token not present, user is not authenticated
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        // Perform a GET request to the logout route
        axios.get('http://localhost:3000/api/auth/logout')
            .then(res => {
                // Clear the token from localStorage
                localStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
                alert(res.data.message);
            })
            .catch(err => {
                // Print the error message from the server
                alert(err.response.data.message);
            });
    }

    return (
        <>
            <h1>Home Page</h1>
            {isAuthenticated ? (
                <div>
                    <h2>Hello, {user.name}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>User is not authenticated</h2>
                    {/* Button redirecting to login page */}
                    <button onClick={() => window.location.href = '/login'}>Login</button>
                </div>
            )}
        </>
    );
}

export default HomePage;