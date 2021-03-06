import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
import UserContext from "../src/Context";
import { Home } from "./Component";
import Loading from "./loading";


export default function AllItems() {
    const { user } = useContext(UserContext);

    const [tokenInput, setTokenInput] = useState();
    const [items, setItems] = useState();

    useEffect(() => {
        // const token = async (e) => {
        //     e.preventDefault()
        //     console.log(tokenInput);

        // axios.get('http://localhost:3001/api/items/', {
        axios.get('https://m-fake-store.herokuapp.com/api/items/', {

            headers: { 'Authorization': `Bearer ${localStorage.token}` },


        }).then((res) => {
            setItems(res.data)
            console.log(items);
        })
        //     const requestOptions = {
        //         method: 'GET',
        //         // headers: { 'Authorization': `Berer ${tokenInput}` },
        //         headers: { 'Authorization': `Berer ${localStorage.token}` },

        //     };
        //     const res = await fetch('http://localhost:3001/api/items/', requestOptions)
        //     const data = await res.json()
        //     setItems(data)
        //     console.log({ data });
        // }
        // token()
    }, []

    )

    // if (!user.admin) return "no admin"
    return (

        <>
            {/* <Loading /> */}
            <Home />
            {/* <form onSubmit={token}>
                <label htmlFor="input" aria-hidden="true">
                    token
                </label>
                <input
                    type="text"
                    name="input"
                    placeholder="token..."
                    className="inputLogin"
                    value={tokenInput}
                    onChange={(e) => {
                        setTokenInput(e.target.value);
                    }}
                />
                <button className="buttonLogin">go</button>

            </form> */}
            <div className='products'>
                {items?.map(v => {
                    return (
                        <div className='col-md-3 mb-3'>
                            <div className='card h-100 text-center p-2'>
                                <img src={v.img} className='card-img-top' height='270px' />
                                <div className='card-body'>
                                    <h5 className='card-title mb-0'>{v.name.substring(0, 12)}... </h5>
                                    <p className='card-text lead fw-bold'>{v.price}$ </p>

                                    < NavLink to={`/category/${v.id}`} className='btn btn-outline-dark'>Buy me</NavLink>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        </>
    )
}