import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import Main from "../../layout/Main/Main";
import AddCategory from "../../pages/AddCategory/AddCategory";
import AddProduct from "../../pages/AddProduct/AddProduct";
import AllUsers from "../../pages/AllUsers/AllUsers";
import Blogs from "../../pages/Blogs/Blogs";
import BookModal from "../../pages/BookModal/BookModal";
// import Categories from "../../pages/Categories/Categories";
import Category from "../../pages/Category/Category";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import MyProducts from "../../pages/MyProducts/MyProducts";
import Products from "../../pages/Products/Products";
import Register from "../../pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    loader: () => fetch('http://localhost:5000/categories'),
    children: [
      {
        path: '/home',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/categories')
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
      // {
      //   path: '/products/:id',
      //   element: <BookModal></BookModal>,
      //   loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
      // },
      // {
      //   path: '/categories',
      //   element: <Categories></Categories>,
      //   loader: () => fetch('http://localhost:5000/categories')
      // },
      {
        path: '/categories/:name',
        element: <PrivateRoute><Category></Category></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.name}`)
      },
      {
        path: '/addcategory',
        element: <AddCategory></AddCategory>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'dashboard/myproducts',
        element: <MyProducts></MyProducts>
      },
      {
        path: 'dashboard/allusers',
        element: <AllUsers></AllUsers>
      }

    ]
  }
])
