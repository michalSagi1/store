import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import UserContext from "../src/Context";





export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [errorEnterDetailsLogin, setErrorEnterDetailsLogin] = useState(false);
    const [errorEnterDetailsRegister, setErrorEnterDetailsRegister] =
        useState(false);

    // const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userNameRegister, setUserNameRegister] = useState();
    const [userEmailRegister, setUserEmailRegister] = useState();
    const [userPassRegister, setUserPassRegister] = useState();

    const navigate = useNavigate();


    const login = async (e) => {
        e.preventDefault()
        console.log("login");
        console.log(email);
        console.log(password);
        if (email.length > 0 && password.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            };
            // const res = await fetch('http://localhost:3001/api/users/login', requestOptions)
            const res = await fetch('https://m-fake-store.herokuapp.com/api/users/login', requestOptions)

            const data = await res.json()
            if (data.admin) {
                localStorage.token = data.token
                console.log("admin: ", data.admin);
                setUser({ email, password, admin: true })
                navigate(`/`)
            }
            else if (data.token) {
                localStorage.token = data.token
                console.log(data.token);
                setUser({ email, password, admin: false })
                console.log(user);
                navigate(`/`)
            }
            else {
                setErrorEnterDetailsLogin(true);
            }
            console.log(data);
            return data


        }
        else {
            setErrorEnterDetailsLogin(true);
        }


    }
    const register = async (e) => {
        e.preventDefault();
        console.log("register");
        console.log(userNameRegister);
        console.log(userEmailRegister);
        console.log(userPassRegister);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmailRegister, password: userPassRegister, firstName: userNameRegister })
        };
        // const res = await fetch('http://localhost:3001/api/users/register', requestOptions)
        const res = await fetch('https://m-fake-store.herokuapp.com/api/users/register', requestOptions)

        const data = await res.json()
        console.log(data);
        if (data.message) {
            console.log("error")
            alert("error")
            setErrorEnterDetailsRegister(true);

        }
        else {
            setUser({ email: userEmailRegister, password: userPassRegister, name: userNameRegister })
            localStorage.token = data.token
            navigate(`/`)

        }


    }


    return (
        <div id="login">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />



                <div className="signup">
                    <form onSubmit={register}>
                        <label htmlFor="chk" aria-hidden="true">
                            create count
                        </label>
                        <input
                            type="text"
                            name="txt"
                            placeholder="User name"
                            className="inputLogin"
                            value={userNameRegister}
                            onChange={(e) => {
                                setUserNameRegister(e.target.value);
                            }}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="inputLogin"
                            value={userEmailRegister}
                            onChange={(e) => {
                                setUserEmailRegister(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            name="pswd"
                            placeholder="Password"
                            className="inputLogin"
                            value={userPassRegister}
                            onChange={(e) => {
                                setUserPassRegister(e.target.value);
                            }}
                        />
                        {errorEnterDetailsRegister && (
                            <div className="errorEnterDetails">Error- Email / Password</div>
                        )}
                        <button className="buttonLogin">Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form onSubmit={login}>
                        <label htmlFor="chk" aria-hidden="true">
                            I have a count                       </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="inputLogin"
                            value={email}
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            name="pswd"
                            placeholder="Password"
                            className="inputLogin"
                            value={password}
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {errorEnterDetailsLogin && (
                            <div className="errorEnterDetails">
                                Error - Email / Password              </div>
                        )}
                        <button className="buttonLogin">Login</button>
                    </form>
                </div>
            </div>
        </div>

    )
}