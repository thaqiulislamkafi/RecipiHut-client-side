import React, { use } from 'react';
import { useParams } from 'react-router';
import { SlLike } from "react-icons/sl";
import { AuthContext } from './Provider/AuthProvider';
import { Fade } from 'react-awesome-reveal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosSecure from './Hooks/useAxios';
import Loading from './SharedElement/Loading';
import Swal from 'sweetalert2';


const AllRecipeDetails = () => {

    const { user } = use(AuthContext);
    const { recipeId } = useParams();
    const queryClient = useQueryClient();

    const { data: recipeData, isLoading } = useQuery({
        queryKey: ['recipeDetails', recipeId],
        queryFn: async () => {
            const { data } = await axiosSecure(`/recipes/${recipeId}`);
            return data;
        },
        enabled: !!recipeId
    })

    const { mutate } = useMutation({
        mutationFn: async (likes) => {
            const { data } = await axiosSecure.patch(`/recipes/${recipeId}`, { likes });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['recipeDetails'])
        }
    })

    const orderRecipe = useMutation({
        mutationFn: async (id) => {
            const data = await axiosSecure.patch(`/orderRecipe?email=${user?.email}`, {
                paid: true,
                recipeId: recipeData?._id,
                recipeTitle: recipeData?.title,
                orderTime: new Date().toISOString(),
                delivered: 'pending'
            });
            return data;
        },
        onSuccess: () => {
            Swal.fire({ title: "Deleted!", text: "Your recipe has been Successfulyy Ordered.", icon: "success" });
    
        }
    })

    const handleLike = () => {
        const newLikes = recipeData.likes + 1;
        console.log(newLikes)
        mutate(newLikes)
    }

    const handleOrder = (id)=>{
        orderRecipe.mutate(id)
    }
    if (isLoading) return <Loading />

    return (
        <div>
            <div>
                <Fade>
                    <div className='w-[85.94vw] mx-auto sora-font my-12'>

                        {/* ..............Title Bar.............. */}

                        <div className='bg-gray-100 text-center py-16 rounded-xl px-4 lg:px-16 dark:bg-gray-700'>
                            <p className='text-3xl md:text-4xl my-3 poppins font-bold'>Recipe Details</p>
                            <p className='text-gray-800 my-2 text-xs md:text-sm dark:text-gray-200'>Explore everything you need to know about this exciting Recipe! Get the full details on dates, venue, featured performers, and schedules. You can like a recipe multiple times as your wish which is count as a rating of a recipe.</p>
                        </div>

                        {/* ..............Recipe Bar.............. */}

                        <div className='my-10 p-5 md:p-7 border-2 border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center gap-8 font-medium'>
                            <div className='bg-gray-200 md:p-6 rounded-xl lg:w-[29.13vw] h-auto'><img className='rounded-xl h-60 w-full' src={recipeData?.photoURL} alt="" /></div>

                            <div className='text text-gray-700 dark:text-gray-200'>

                                <div className='flex items-center gap-3'>
                                    {
                                        recipeData.categories.map(category => <p className='text-[#176AE5] text-xs px-3 py-2 bg-[#1769e51c] rounded-2xl w-fit my-2 dark:text-gray-200'># {category} </p>)
                                    }
                                </div>

                                <p className='poppins my-2 text-2xl lg:text-3xl font-bold'>{recipeData.title}</p>
                                <p className='flex flex-col gap-2 my-2 lg:text-lg'>
                                    <span>Ingredients : {recipeData.ingredients}</span>
                                    <span>Preparation Time : {recipeData.prepTime
                                    }</span>
                                </p>

                                <p className='font-medium my-2'>Cuisine Type : <span className='text-[#23BE0A] font-bold'>{recipeData.cuisineType}</span></p>
                                <p className='font-medium my-2'>Instructions : <span className='text-[#23BE0A] font-bold'>{recipeData.instructions}</span></p>

                                <div className='flex gap-3'>
                                    <button onClick={handleLike} className="btn btn-sm"><SlLike /> {recipeData.likes} </button>
                                    <button onClick={()=>handleOrder(recipeData?._id)} className='btn btn-sm'>Order</button>
                                </div>


                            </div>
                        </div>

                        {/* ..............Event Details Bar.............. */}
                        {/* 
                    <div className='border-2 border-gray-200 rounded-xl p-7 text-center my-20 mb-40'>
                        <p className='poppins text-2xl my-3 font-bold'>Details</p>
                        <div className='border-t-2 border-dashed border-gray-200 my-4'></div>
                        <div className='text-start'>
                            <p className='font-medium'>{recipeData.details}</p>

                        </div>
                        <div className='border-t-2  border-gray-100 my-4'></div>


                    </div>
                     */}
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default AllRecipeDetails;