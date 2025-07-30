import React, { use, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from './Provider/AuthProvider';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Swal from 'sweetalert2'
import { FaEye } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import UpdateRecipe from './UpdateRecipe';
import { Fade } from 'react-awesome-reveal';


const MyRecipe = () => {

    const { user } = use(AuthContext);
    const allRecipes = useLoaderData();
    const initialRecipes = allRecipes.filter(recipe => recipe?.userEmail == user?.email);

    const [myrecipes, setMyRecipes] = useState(initialRecipes);

    console.log(initialRecipes);
    return (
        <div>
            <div className='w-[85.94vw] mx-auto sora-font my-15'>
                <Fade cascade >
                    <div>
                    
                    <p className='text-center text-3xl poppins font-bold' >My Recipe</p>
        

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10'>

                        {

                            myrecipes.map(recipe => <RecipeCard recipe={recipe} myrecipes={myrecipes} setMyRecipes={setMyRecipes}></RecipeCard>)

                        }

                    </div>
                    </div>
                </Fade>


            </div>
        </div>
    );
};

export default MyRecipe;

const RecipeCard = ({ recipe, myrecipes, setMyRecipes }) => {

    // const updateRecipe = recipe ;

    const handleDelete = (_id) => {

        fetch(`https://server-site-nine-sandy.vercel.app/recipes/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your recipe has been deleted.",
                        icon: "success"
                    });
                }

                const remainingRecipes = myrecipes.filter(recipe => recipe._id !== _id)
                setMyRecipes(remainingRecipes);
            })
    }

    return (
        <>
            <div className=" bg-base-100 shadow-sm p-4 gap-4  flex flex-col dark:bg-gray-700 rounded-xl">
                <div className='w-full h-50  '>
                    <img className='rounded-xl w-full h-50  ' src={recipe.photoURL} />
                </div>
                <div className="flex flex-col gap-5 ">
                    <div className='sora-font space-y-2 text-xs md:text-sm'>

                        <div className='flex gap-2 items-center'>
                            {
                                recipe.categories.map(category => <p className='text-[#176AE5] text-[10px] px-2 py-1 bg-[#1769e51c] rounded-2xl dark:text-white'># {category}</p>)
                            }
                        </div>

                        <p className='text-lg text-gray-800 font-bold dark:text-white'> Name : {recipe.title}</p>
                        <p> Ingredients : {recipe.ingredients}</p>
                        <p> Instructions : {recipe.instructions}</p>
                        <p> Cuisine Type : {recipe.cuisineType}</p>
                        <p> Preparation Time : {recipe.prepTime} Min</p>
                    </div>
                    <div className="flex gap-5 justify-center">

                        <button className="btn btn-sm"><SlLike /> {recipe.likes} </button>

                        <button className="btn btn-sm" onClick={() => document.getElementById(`${recipe._id}`).showModal()}>Edit <MdEdit /></button>

                        <button onClick={() => handleDelete(recipe._id)} className="btn btn-sm">Delete <MdDelete /></button>
                    </div>
                </div>

                <dialog id={recipe._id} className="modal">
                    <div className="modal-box lg:w-6/12 max-w-5xl dark:bg-gray-800 dark:text-gray-200">

                        {/* <p className="py-4">Click the button below to close</p> */}

                        <UpdateRecipe recipe={recipe}></UpdateRecipe>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

        </>
    );
};