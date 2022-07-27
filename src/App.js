import './App.css';
import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, Products, Product, Error, Cart } from './Component';
import Navbar from './Navbar';
import Login from "./Login";
import AllItems from "./allItems";
import UpItem from './UpItem';
import UserContext from "../src/Context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import DelItem from './delItem';
import Form from './upFile1';

function App() {
  const [user, setUser] = useState();


  const [cartItems, setCartItems] = useState([]);
  const add = (prod) => {

    const exist = cartItems.find(x => x.id === prod.id);
    if (exist) {
      setCartItems(cartItems.map(x => x.id === prod.id ? { ...exist, qty: exist.qty + 1 } : x

      ))

    } else {
      setCartItems([...cartItems, { ...prod, qty: 1 }])
    }

  }
  const remove = (prod) => {
    const exist = cartItems.find(x => x.id === prod.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter(x => x.id !== prod.id))
    } else {
      setCartItems(cartItems.map(x => x.id === prod.id ? { ...exist, qty: exist.qty - 1 } : x))
    }
  }



  return (
    <UserContext.Provider value={{ user, setUser }}>


      <div className="App">
        <Navbar setCartItems={setCartItems} />
        <Routes>
          {!user ? (

            <>
              {console.log("no user")}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />

            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<AllItems />} />


              <Route path="/up" element={<UpItem />} />
              <Route path="/allItems" element={<AllItems />} />
              <Route path="/del" element={<DelItem />} />
              <Route path='upfile' element={<Form />} />



              <Route path="/category" element={<Home />} />
              <Route path="/:category" element={<Products />} />
              <Route path="/category/:id" element={<Product add={add} />} />
              <Route path="/*" element={<Error />} />

            </>
          )}
        </Routes>
        {user ? (
          <>
            <Cart cartItems={cartItems} add={add} remove={remove} />
          </>
        ) : null}


      </div>
    </UserContext.Provider>

  );
}

export default App;
