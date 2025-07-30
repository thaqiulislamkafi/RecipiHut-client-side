import React from 'react';
import { SlLike } from "react-icons/sl";
import { Link } from 'react-router';


const TopRecipe = ({recipe}) => {
    return (
        <div>
            <div className=" bg-base-100 shadow-sm p-4 gap-4  flex flex-col dark:bg-gray-700 dark:text-gray-200 rounded-xl">
                <div className='w-full h-50 md:h-56 '>
                    <img className='rounded-xl w-full h-50 md:h-50 ' src={recipe.photoURL} />
                </div>
                <div className="flex flex-col gap-5 ">
                    <div className='sora-font space-y-2 text-xs md:text-sm'>

                        <div className='flex gap-2 items-center'>
                            {
                                recipe.categories.map(category => <p className='text-[#176AE5] text-[10px] px-2 py-1 bg-[#1769e51c] rounded-2xl dark:text-white'># {category}</p>)
                            }
                        </div>

                        <p className='text-lg text-gray-800 dark:text-gray-200 font-bold'> Name : {recipe.title}</p>
                        <p> Ingredients : {recipe.ingredients}</p>
                        <p> Cuisine Type : {recipe.cuisineType}</p>
                        <p> Total Likes : {recipe.likes}</p>  
                    </div>
                    <div>
                        <Link to={`/allRecipeDetails/${recipe._id}`}>
                        <button className='btn btn-sm text-xs rounded-xl '>View more</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopRecipe;