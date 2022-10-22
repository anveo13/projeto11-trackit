import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register"



export default function App() {
    /* const [user, setUser] = useState({});
    const [percentage, setPercentage] = useState(0); */

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register/>} /> 
            </Routes>
        </BrowserRouter>
    </>
    )
}
