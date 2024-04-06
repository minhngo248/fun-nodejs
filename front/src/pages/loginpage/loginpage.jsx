import {useState} from "react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Get the email and password from the form
        axios.post('http://localhost:3000/api/auth', {
            email: email,
            password: password
        })
            .then(res => {
                // Save the token in localStorage
                localStorage.setItem('jwtToken', res.data.token);

                // Redirect to the home page
                window.location.href = '/';
            })
            .catch(err => {
                // Print the error message from the server
                alert(err.response.data.message);
            });
    }

    return (
        <div>
            <h1>Login Page</h1>
            {/* Login form */}
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;