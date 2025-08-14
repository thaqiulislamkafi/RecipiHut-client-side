import { createBrowserRouter } from "react-router";
import Home from "./Home";
import Body from "./Home/Body";
import AllRecipe from "./AllRecipe";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import PrivateRoute, { Loading } from "./Provider/PrivateRoute";
import MyRecipe from "./MyRecipe";
import AllRecipeDetails from "./AllRecipeDetails";
import Error from "./Error";
import ResetPassword from "./ResetPassword";
import AddRecipe from "./AddRecipe";
import Dashboard from "./Dashboard/Dashboard";
import MyProfile from "./Dashboard/MyProfile";
import MyOrder from "./Dashboard/MyOrder";
import RequestedOrder from "./Dashboard/RequestedOrder";


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
                    loader : ()=> fetch('http://localhost:5000/topRecipes'),
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
                    hydrateFallbackElement : <Loading/>

                },
                {
                    path : 'allRecipeDetails/:recipeId',
                    element : <PrivateRoute><AllRecipeDetails/></PrivateRoute>,
                    hydrateFallbackElement : <Loading/>

                },
                
            ]
        },
        {
            path : '/dashboard',
            element : <Dashboard/>,
            children : [
                {
                    path : 'profile',
                    element : <MyProfile/>
                },
                {
                    path : 'addRecipe',
                    element : <AddRecipe/>
                },
                {
                    path : 'my-recipe',
                    element : <MyRecipe/>
                },
                {
                    path : 'my-order',
                    element : <MyOrder/>
                },
                {
                    path : 'requested-orders',
                    element : <RequestedOrder/>
                }
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