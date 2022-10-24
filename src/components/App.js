import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useState } from 'react';
import Login from "../pages/Login";
import Register from "../pages/Register"
import HabitsPage from '../pages/HabitsPage';
import UserContext from '../context/UserContext';
import PercentageContext from '../context/PercentageContext';



export default function App() {
    const [user, setUser] = useState({});
    const [percentage, setPercentage] = useState(0);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setUser={setUser} />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/habitos" element={ <UserContext.Provider value={user}>
                        <PercentageContext.Provider
                            value={{ percentage, setPercentage }}
                        > <HabitsPage />
                        </PercentageContext.Provider>
                    </UserContext.Provider>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
