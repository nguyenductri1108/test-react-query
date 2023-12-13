import { Route, Router, Routes } from "react-router";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MutationPage from "./pages/Mutation";
import User from "./pages/Users";
import DPQueries from "./pages/DP-Queries";
import UserDetail from "./pages/User-Detail";

function App() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"users"}>User</Link>
                        </li>
                        <li>
                            <Link to={"dynamic-parallel-queries"}>
                                DPQueries
                            </Link>
                        </li>
                        <li>
                            <Link to={"mutateData"}>Mutation</Link>
                        </li>
                    </ul>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/users" element={<User />} />

                    <Route
                        path="/dynamic-parallel-queries"
                        element={<DPQueries ids={["1", "3", "4"]} />}
                    />

                    <Route path="/user-detail/:id" element={<UserDetail />} />

                    <Route path="/mutateData" element={<MutationPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
