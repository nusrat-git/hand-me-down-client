import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import AddCategory from "../../pages/AddCategory/AddCategory";
import Blogs from "../../pages/Blogs/Blogs";
import Categories from "../../pages/Catergories/Categories";
import Home from "../../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    loader: () => fetch('http://localhost:5000/home'),
    children: [
      {
        path: '/home',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/home')
      }
    ]
  },
  {
    path: '/',
    element: <Main></Main>,
    children: [
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
