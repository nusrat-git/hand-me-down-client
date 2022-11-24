import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import AddCategory from "../../pages/AddCategory/AddCategory";
import AddProduct from "../../pages/AddProduct/AddProduct";
import Blogs from "../../pages/Blogs/Blogs";
import Categories from "../../pages/Categories/Categories";
import Home from "../../pages/Home/Home";
import Products from "../../pages/Products/Products";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    loader: () => fetch('http://localhost:5000/homeCategory'),
    children: [
      {
        path: '/home',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/homeCategory')
      }
    ]
  },
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/addproduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: '/products',
        element: <Products></Products>,
        loader: () => fetch('http://localhost:5000/products')
      },
      {
        path: '/categories',
        element: <Categories></Categories>,
        loader: () => fetch('http://localhost:5000/categories')
      },
      {
        path: '/addcategory',
        element: <AddCategory></AddCategory>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      },
    ]
  }
])
