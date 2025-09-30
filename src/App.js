import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
// import Footer from "./components/footer";
import Login from "./login";
import Registration from './registration';
import Dashboard from './dashboard';
import Profile from './profile';
import Products from './products';
import Home from "./pages/home";
import AddToCart from "./addtocart";
import Protected from "./protected";
import Private from "./private";
import AdminLayout from "./adminpanel/adminlayout";
import AddNewProduct from "./adminpanel/addnewproduct";
import ProductList from "./adminpanel/productlist";
import AdminUsers from "./adminpanel/adminuser";
import NotFoundPage from "./pagenotfound";
import AdminProtected from "./adminProtected";

import './App.css';

function App() {

  const privateRoutes = [
    {
      path: '/login',
      element: <Login />,
    },

    {
      path: '/registration',
      element: <Registration />,
    },

  ];

  const protectedRoutes = [
    {
      path: '/profile',
      element: <Profile />,
    },

    {
      path: '/dashboard',
      element: <Dashboard />,
    },

    {
      path: '/addtocart',
      element: <AddToCart />,
    },

  ];

  const adminRoutes = [
    {
      path: "addproduct",
      element: <AddNewProduct />,
    },
    {
      path: "edit-product/:id",
      element: <AddNewProduct />,
    },
    {
      path: "productlist",
      element: <ProductList />,
    },
    {
      path: "addproduct/:id",
      element: <AddNewProduct />,
    },
    {
      path: 'adminuser',
      element: <AdminUsers />
    },
  ];

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* admin routing-------------------------------------------------------------------- */}
        <Route element={<AdminProtected />}>
          <Route path="/adminpage" element={<AdminLayout />}>
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* public-----------------------------------------------------------------------------*/}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFoundPage />} />


        {/*protected----------------------------------------------------------------------------*/}
        <Route element={<Protected />}>
          {
            protectedRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))
          }
        </Route>


        {/*private------------------------------------------------------------------------------*/}
        <Route element={<Private />}>
          {
            privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))
          }
        </Route>

      </Routes>


      {/* <Footer /> */}
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>


  );
}

export default App;


