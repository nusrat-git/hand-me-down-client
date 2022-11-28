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
import Payment from "../../pages/Payment/Payment";
import Register from "../../pages/Register/Register";
import ReportedItems from "../../pages/ReportedItems/ReportedItems";
import Route404 from "../../pages/Route404/Route404";
import Sellers from "../../pages/Sellers/Sellers";
import DisplayError from "../../shared/DisplayError/DisplayError";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    loader: () => fetch('http://localhost:5000/categories'),
    errorElement: <DisplayError></DisplayError>,
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
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/categories/:name',
        element: <PrivateRoute><Category></Category></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.name}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        })
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
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: 'dashboard/myproducts',
        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
      },
      {
        path: 'dashboard/allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'dashboard/allsellers',
        element: <AdminRoute><Sellers></Sellers></AdminRoute>
      },
      {
        path: 'dashboard/allbuyers',
        element: <AdminRoute><Buyers></Buyers></AdminRoute>
      },
      {
        path: 'dashboard/addproduct',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path: 'dashboard/myorders',
        element: <MyOrders></MyOrders>
      },
      {
        path: 'dashboard/reporteditems',
        element: <ReportedItems></ReportedItems>
      },
      {
        path: 'dashboard/addcategory',
        element: <AddCategory></AddCategory>
      },
      // {
      //   path: 'dashboard/payment/:id',
      //   element: <Payment></Payment>,
      //   loader: ({ params }) => fetch(`http://localhost:5000/booked/${params.id}`, {
      //     headers: {
      //       authorization: `bearer ${localStorage.getItem('accessToken')}`
      //     }
      //   })
      // }

    ]
  },
  {
    path: '*',
    element: <Route404></Route404>
  }
])
