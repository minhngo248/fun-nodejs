import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.jsx';
import LoginPage from './pages/loginpage/loginpage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
