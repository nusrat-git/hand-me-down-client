import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import Main from "../../layout/Main/Main";
import AddCategory from "../../pages/AddCategory/AddCategory";
import AddProduct from "../../pages/AddProduct/AddProduct";
import AllUsers from "../../pages/AllUsers/AllUsers";
import Blogs from "../../pages/Blogs/Blogs";
import Buyers from "../../pages/Buyers/Buyers";
import Category from "../../pages/Category/Category";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import MyOrders from "../../pages/MyOrders/MyOrders";
import MyProducts from "../../pages/MyProducts/MyProducts";
import Register from "../../pages/Register/Register";
import Route404 from "../../pages/Route404/Route404";
import Sellers from "../../pages/Sellers/Sellers";
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
      }
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
      },
      {
        path: 'dashboard/allsellers',
        element: <Sellers></Sellers>
      },
      {
        path: 'dashboard/allbuyers',
        element: <Buyers></Buyers>
      },
      {
        path: 'dashboard/addproduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'dashboard/myorders',
        element: <MyOrders></MyOrders>
      },

    ]
  },
  {
    path: '*',
    element: <Route404></Route404>
  }
])
