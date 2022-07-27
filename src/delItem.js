import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./upitem.css";
import UserContext from "../src/Context";



export default function DelItem() {
    const { user } = useContext(UserContext);

    const [item, setItem] = useState([])
    const [message, setMessage] = useState(false)
    const [itemUp, setItemUp] = useState(false)

    // useEffect(() => {
    const delItem1 = async (e) => {
        e.preventDefault()
        setItemUp(false)
        setMessage(false)
        console.log(e.target.id.value);



        //     axios.get('http://localhost:3001/api/items/', {
        //         headers: { 'Authorization': `Bearer ${localStorage.token}` },


        //     }).then((res) => {
        //         setItems(res.data)
        //         console.log(items);
        //     })
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Berer ${localStorage.token}`
            },
            body: JSON.stringify({
                id: e.target.id.value,

            })
        };
        const res = await fetch('https://m-fake-store.herokuapp.com/api/items/delItem', requestOptions)
        const data = await res.json()
        setItem(data)
        console.log(data);
        if (data.message) {
            setMessage(true)
        }
        if (data.name) {
            setItemUp(true)
        }
        // console.log(item);
    }
    // }
    // }, [])
    // }
    if (!user.admin) return "no admin"
    else {

        return (

            <div className="del">
                <form onSubmit={delItem1}>
                    <input
                        type="text"
                        name="id"
                        placeholder="id..."
                        className="inputLogin1"
                    />


                    <button className="buttonLogin1">delete</button>
                    {message ? ("no id") : null}
                    {itemUp ? ("succes") : null}


                </form>
            </div>
        )
    }
}
