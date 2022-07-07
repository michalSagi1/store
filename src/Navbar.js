import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import UserContext from "../src/Context";


export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    console.log(user);


    return (
        <div>

            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <Link to="/" class="navbar-brand fw-bold fs-4">Fake Store</Link>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/" class="nav-link active" aria-current="page">Home</Link>
                            </li>
                            {user ? (
                                <li class="nav-item">
                                    <Link to="/" class="nav-link active" aria-current="page"> {user.email} 🙂</Link>
                                </li>) : null}
                            {user ? (
                                <li class="nav-item">
                                    <Link to="/allItems" class="nav-link active" aria-current="page"> all items</Link>
                                </li>) : null}

                            {user ? (
                                <li class="nav-item">
                                    <Link to="/up" class="nav-link active" aria-current="page"> up item</Link>
                                </li>) : null}
                            {user ? (
                                <li class="nav-item">
                                    <Link to="/del" class="nav-link active" aria-current="page"> delete item</Link>
                                </li>) : null}

                            <li class="nav-item">
                                <button to="/" class="nav-link active" aria-current="page" onClick={() => setUser("")}>logout</button>
                            </li>


                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )

}