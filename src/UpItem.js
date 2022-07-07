import React, { useState, useEffect } from "react";
import axios from "axios";
import "./upitem.css";

export default function UpItem() {

    const [item, setItem] = useState([])
    const [message, setMessage] = useState(false)
    const [itemUp, setItemUp] = useState(false)

    // useEffect(() => {
    const upItem1 = async (e) => {
        e.preventDefault()
        setItemUp(false)
        setMessage(false)
        console.log(e.target.id.value);

        console.log(e.target.name.value)


        //     axios.get('http://localhost:3001/api/items/', {
        //         headers: { 'Authorization': `Bearer ${localStorage.token}` },


        //     }).then((res) => {
        //         setItems(res.data)
        //         console.log(items);
        //     })
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Berer ${localStorage.token}`
            },
            body: JSON.stringify({
                name: e.target.name.value,
                id: e.target.id.value,
                price: e.target.price.value,
                description: e.target.description.value,
                category: e.target.category.value,
                inStock: e.target.inStock.value,
            })
        };
        const res = await fetch('http://localhost:3001/api/items/addItem', requestOptions)
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

    return (

        <>
            <form onSubmit={upItem1}>
                <input
                    type="text"
                    name="id"
                    placeholder="id..."
                    className="inputLogin1"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="name..."
                    className="inputLogin1"
                />

                <input
                    type="text"
                    name="price"
                    placeholder="price..."
                    className="inputLogin1"
                />
                <textarea col="30" row="30"
                    type="text"
                    name="description"
                    placeholder="description..."
                    className="inputLogin1"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="category..."
                    className="inputLogin1"
                />
                <input
                    type="text"
                    name="inStock"
                    placeholder="inStock..."
                    className="inputLogin1"
                />
                <input
                    type="text"
                    name="img"
                    placeholder="img..."
                    className="inputLogin1"
                />

                <button className="buttonLogin1">go</button>
                {message ? ("id exist in system") : null}
                {itemUp ? ("succes") : null}


            </form>
        </>)
}
