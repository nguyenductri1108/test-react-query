import { Route, Router, Routes } from "react-router";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import "./App.css";
import Post from "./pages/Post";
import RQPost from "./pages/RQ-Post";
import Home from "./pages/Home";

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
                            <Link to={"posts"}>Posts</Link>
                        </li>
                        <li>
                            <Link to={"rqposts"}>RQPosts</Link>
                        </li>
                    </ul>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/posts" element={<Post />} />

                    <Route path="/rqposts" element={<RQPost />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
