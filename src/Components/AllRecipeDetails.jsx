import React, { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import { SlLike } from "react-icons/sl";
import { AuthContext } from './Provider/AuthProvider';
import { Fade } from 'react-awesome-reveal';


const AllRecipeDetails = () => {

    const { user } = use(AuthContext);


    const recipeData = useLoaderData();
    const [like, setLike] = useState(recipeData.likes);
    const [showLike, setShowLike] = useState(recipeData.likes);



    const handleLike = () => {

        if (user.email != recipeData.userEmail) {

            setShowLike(showLike + 1);
            setLike(like + 1);
            // const email = recipeData.userEmail;

            const newLike = {
                like: like + 1
            }



            fetch(`http://localhost:5000/recipes/${recipeData._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newLike)
            })
                .then(res => res.json())
                .then(data =>
                    console.log(data)
                )
        }
    }

    console.log(recipeData)
    return (
        <div>
            <div>


                {/* <Helmet>
                    <title>Event Details | {id}</title>
                </Helmet> */}
                <Fade>
                    <div className='w-[85.94vw] mx-auto sora-font my-12'>

                        {/* ..............Title Bar.............. */}

                        <div className='bg-gray-100 text-center py-16 rounded-xl px-4 lg:px-16 dark:bg-gray-700'>
                            <p className='text-3xl md:text-4xl my-3 poppins font-bold'>Recipe Details</p>
                            <p className='text-gray-800 my-2 text-xs md:text-sm dark:text-gray-200'>Explore everything you need to know about this exciting Recipe! Get the full details on dates, venue, featured performers, and schedules. You can like a recipe multiple times as your wish which is count as a rating of a recipe.</p>
                        </div>

                        {/* ..............Recipe Bar.............. */}

                        <div className='my-10 p-5 md:p-7 border-2 border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center gap-8 font-medium'>
                            <div className='bg-gray-200 md:p-6 rounded-xl lg:w-[29.13vw] h-auto'><img className='rounded-xl h-60 w-full' src={recipeData.photoURL} alt="" /></div>

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
                                <button onClick={handleLike} className="btn btn-sm"><SlLike /> {showLike} </button>


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