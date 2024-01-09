import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import DPQueries from "./pages/DP-Queries";
import Home from "./pages/Home";
import MutationPage from "./pages/Mutation";
import UserDetail from "./pages/User-Detail";
import User from "./pages/Users";

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
