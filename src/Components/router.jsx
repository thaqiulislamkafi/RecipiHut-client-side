import { createBrowserRouter } from "react-router";
import Home from "./Home";
import Body from "./Home/Body";
import AddRecipe from "./addRecipe";
import AllRecipe from "./AllRecipe";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import PrivateRoute, { Loading } from "./Provider/PrivateRoute";
import MyRecipe from "./MyRecipe";
import AllRecipeDetails from "./AllRecipeDetails";
import Error from "./Error";
import ResetPassword from "./ResetPassword";


const router = createBrowserRouter (
    [
        {
            path : '/',
            element : <Home/>,
            errorElement : <Error/>,
            children : [
                {
                    index : true,
                    element : <Body/>,
                    loader : ()=> fetch('https://server-site-nine-sandy.vercel.app/topRecipes'),
                    hydrateFallbackElement : <Loading/>
                    
                },
                {
                    path : 'addRecipe',
                    element : <PrivateRoute><AddRecipe/></PrivateRoute>,
                    hydrateFallbackElement : <Loading/>

                },
                {
                    path : 'allRecipe',
                    element : <AllRecipe/>,
                    loader : ()=> fetch('https://server-site-nine-sandy.vercel.app/recipes'),
                    hydrateFallbackElement : <Loading/>

                },
                {
                    path : 'login',
                    element : <LogIn/>,
                    hydrateFallbackElement : <Loading/>

                },
                {
                    path : 'signup',
                    element : <SignUp/>,
                    hydrateFallbackElement : <Loading/>

                },
                {
                    path : 'resetPassword',
                    element : <ResetPassword/>,
                    hydrateFallbackElement : <Loading/>
                },
                {
                    path : 'myRecipe',
                    element : <PrivateRoute><MyRecipe/></PrivateRoute> ,
                    loader : ()=> fetch('https://server-site-nine-sandy.vercel.app/recipes'),
                    hydrateFallbackElement : <Loading/>

                },
                {
                    path : 'allRecipeDetails/:id',
                    element : <PrivateRoute><AllRecipeDetails/></PrivateRoute> ,
                    loader : ({params}) => fetch(`https://server-site-nine-sandy.vercel.app/recipes/${params.id}`),
                    hydrateFallbackElement : <Loading/>

                },
                
            ]
        },
        {
            path : '*',
            element : <Error/>,
            hydrateFallbackElement : <Loading/>
        }
    ]
)

export default router ;