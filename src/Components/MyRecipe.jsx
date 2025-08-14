import React, { use, useState } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Swal from 'sweetalert2'
import { FaEye } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import UpdateRecipe from './UpdateRecipe';
import { Fade } from 'react-awesome-reveal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosSecure from './Hooks/useAxios';
import Loading from './SharedElement/Loading';


const TimeLine = ({ value }) => (
    <>
        <li>
            <div className="timeline-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div className="timeline-end timeline-box">{value}</div>
            <hr />
        </li>
    </>
)


const MyRecipe = () => {

    const { user } = use(AuthContext);
    const [recipeId, setrecipeId] = useState('');

    const { data: myrecipes, isLoading } = useQuery({
        queryKey: ['myRecipe', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/recipes?email=${user?.email}`);
            return data;

        },
        enabled: !!user?.email
    })

    const { data: recipe } = useQuery({
        queryKey: ['recipe', recipeId],
        queryFn: async () => {
            const { data } = await axiosSecure(`/recipes/${recipeId}`);
            return data;
        },
        enabled: !!recipeId
    })

    const queryClient = useQueryClient();

    const deleteRecipe = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/recipes/${id}`);
            return data;
        },
        onSuccess: () => {
            Swal.fire({ title: "Deleted!", text: "Your recipe has been deleted.", icon: "success" });
            queryClient.invalidateQueries(['myRecipe'])
        }
    })

    const handleRecipe = async (id) => {
        setrecipeId(id)
    }
    const handleDelete = (_id) => deleteRecipe.mutate(_id);

    if (!myrecipes || isLoading) return <Loading />

    return (
        <div>
            <div className=' sora-font my-15'>
                <Fade cascade >
                    <div>
                        <p className='text-center text-3xl poppins font-bold' >My Recipe</p>
                        <div className=' my-10 flex gap-3'>

                            <div className="overflow-x-auto w-3/5">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Food Type</th>
                                            <th>Ingredients</th>
                                            <th>Prep time</th>
                                            <th>Action</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myrecipes.map((recipe, index) => (
                                                <tr onClick={() => handleRecipe(recipe._id)}>
                                                    <th>{index + 1}</th>
                                                    <td>{recipe.title}</td>
                                                    <td>{recipe.cuisineType}</td>
                                                    <td>{recipe.ingredients}</td>
                                                    <td>{recipe.prepTime}</td>
                                                    <td><button onClick={() => document.getElementById(`${recipe._id}`).showModal()} className='btn btn-xs'>Edit</button></td>

                                                    <td ><button onClick={()=>handleDelete(recipe?._id)} className='btn btn-xs'>Delete</button></td>

                                                    <dialog id={recipe?._id} className="modal">
                                                        <div className="modal-box lg:w-6/12 max-w-5xl dark:bg-gray-800 dark:text-gray-200">

                                                            {/* <p className="py-4">Click the button below to close</p> */}

                                                            <UpdateRecipe recipe={recipe}></UpdateRecipe>

                                                            <div className="modal-action">
                                                                <form method="dialog">

                                                                    <button className="btn">Close</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </tr>


                                            ))

                                        }

                                    </tbody>
                                </table>


                            </div>
                            <div className=' rounded-xl p-3 text-sm'>
                                <ul className="timeline timeline-vertical w-0 ">

                                    <TimeLine value={recipe?.title} />
                                    <TimeLine value={recipe?.cuisineType} />
                                    <TimeLine value={recipe?.ingredients} />
                                    <TimeLine value={recipe?.prepTime} />
                                    <TimeLine value={recipe?.instructions} />

                                </ul>

                            </div>


                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default MyRecipe;




const RecipeCard = ({ recipe }) => {




   

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
                                recipe?.categories?.map(category => <p className='text-[#176AE5] text-[10px] px-2 py-1 bg-[#1769e51c] rounded-2xl dark:text-white'># {category}</p>)
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