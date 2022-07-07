import { Link, NavLink, useParams } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function category() {

            const url = "https://fakestoreapi.com/products/categories"
            const res = await fetch(url);
            const data = await res.json();
            setCategory(data);
            setLoading(false)

        }
        category()
    }, [])
    console.log(category);
    if (loading) {
        return <div>loading...</div>
    }



    return (
        <div className='home'>
            {category.map(category =>
                <NavLink to={`/${category}`} className="link"

                >{category} </NavLink>

            )}


        </div>
    )
}

function Products() {
    const { category } = useParams()
    const [loading, setLoading] = useState(true)

    const [categorys, setCategorys] = useState([])
    useEffect(() => {
        async function category1() {
            // const url = `https://fakestoreapi.com/products/category/${category}`
            const url = `http://localhost:3001/api/items/category/?category=${category}`

            const res = await fetch(url);
            const data = await res.json();
            setCategorys(data);
            setLoading(false)
        }
        category1()
    }, [])
    if (loading) {
        return <div>loading...</div>
    }

    console.log(categorys);

    return (
        <div className='products'>

            {categorys.map(v => {
                return (
                    <div className='col-md-3 mb-3'>
                        <div className='card h-100 text-center p-4'>
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
    )
}
function Product(props) {
    const { add } = props

    const { id } = useParams()

    const [prod, setProd] = useState([])
    useEffect(() => {
        async function prodact() {

            // const url = `https://fakestoreapi.com/products/${id}`
            const url = `http://localhost:3001/api/items/id/?id=${id}`


            const res = await fetch(url);
            const data = await res.json();
            setProd(data);
        }
        prodact()
    }, [prod])
    // console.log(prod);

    return (
        <div className='product'>

            <div className='col-md-6 container'>
                <img src={prod.img} alt={prod.name} height={"300px"} width={"300px"} />
            </div>
            <div className='col-md-6 container' >

                <h3 className='display-6'>{prod.name}</h3>
                <h3 className='display-8 fw-bold my-4'> {prod.price}$</h3>
                <p className='lead'>{prod.description}</p>

                <button className='btn btn-outline-dark' onClick={() => { add(prod) }}>add to cart</button>
                {/* <button className='btn btn-outline-dark ms-2'>go to cart</button> */}

            </div>


        </div>

    )
}



function Error() {
    return (
        <div>
            <br></br>
            <b>Sorry... 404</b>


        </div>
    )
}

function Cart(props) {
    const { cartItems, add, remove } = props;
    // localStorage.item = cartItems
    let calc = 0
    return (
        <div className='_cart'>

            <h4>Cart 🛒</h4>
            {cartItems.lenght === 0 && <div>cart is empty</div>}
            {cartItems.map((item) => (

                <div className='cart'>
                    < NavLink to={`/category/${item.id}`}>
                        <div>
                            <img src={item.img} alt={item.name} height={"100px"} width={"100px"} />
                        </div>
                    </NavLink>
                    <div><b>{(item.price * item.qty).toFixed(2)}$</b></div>

                    <button className='add' onClick={() => add(item)}>+</button>
                    <b> {item.qty} </b>
                    <button className='add' onClick={() => remove(item)}>-</button>
                    <div className='calc'>{calc += item.price * item.qty}</div>

                </div>
            ))}

            <div> <b>To payment: {calc.toFixed(2)} $</b> </div>


        </div>
    )
}

export { Home, Products, Product, Cart, Error };