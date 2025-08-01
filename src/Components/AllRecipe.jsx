import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link} from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from './Hooks/useAxios';
import Loading from './SharedElement/Loading';

const AllRecipe = () => {

    const {data : recipes ,isLoading} = useQuery({
        queryKey : ['recipes'],
        queryFn : async()=>{
            const {data} = await axiosSecure.get('/recipes') ;
            return data 
        }
    })

    if(isLoading) return <Loading/>

    const handleselect = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(value);

        if (value == "All") {
            // setRecipes(allRecipes)
        }
        else {
            // const newRecipes = allRecipes.filter(recipe => recipe.cuisineType == value);
            // setRecipes(newRecipes);
        }

    }

    return (
        <div>
            <Fade>
                <div className='w-[85.94vw] mx-auto my-20 sora-font'>
                    <p className='poppins lg:text-3xl md:text-2xl text-xl my-12 font-bold text-center'>All Recipes</p>

                    <div className='flex gap-3 items-center justify-center '>

                        <p className='text-[#23BE0A] font-bold'>Filtered By : </p>
                        <select defaultValue="Pick a color" className="select w-38 dark:bg-gray-700" name='selection' onChange={handleselect}>
                            <option disabled={true}>Pick a Type</option>
                            <option>All</option>
                            <option>Italian</option>
                            <option>Mexican</option>
                            <option>Indian</option>
                            <option>Chinese</option>
                            <option>Others</option>
                        </select>

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 my-20'>

                        {
                            recipes?.map(recipe => <Recipe recipe={recipe}></Recipe>)
                        }

                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default AllRecipe;

const Recipe = ({ recipe }) => {




    return (
        <>
            <div className='border-2 border-gray-200 p-5 lg:p-6 flex flex-col gap-6 rounded-xl sora-font'>
                <div className='bg-gray-100  rounded-xl w-full h-auto'><img className='rounded-xl w-full h-50 object-cover hover:scale-105 duration-500' src={recipe.photoURL} alt="" /></div>
                <div className='text-start'>
                    <div className='flex gap-1 font-medium'>

                        {
                            recipe.categories.map(category => <p className='text-[#176AE5] text-[12px] px-2 py-1 bg-[#1769e51c] rounded-2xl dark:text-white'># {category}</p>)
                        }

                    </div>
                    <p className='font-bold my-2 text-lg md:text-2xl'>{recipe.title}</p>
                    <p className='text-gray-700 my-1  dark:text-gray-200'>Food Type: {recipe.cuisineType}</p>
                    <div className='flex flex-col  justify-between dark:text-gray-200 text-gray-700
text-gray-700'>
                        <p className=' my-1  font-medium'> Ingredients : {recipe.ingredients}</p>
                        <p className=' my-1  font-medium'> Preparation Time : {recipe.prepTime}</p>
                    </div>

                    <div>
                        <Link to={`/allRecipeDetails/${recipe._id}`}>
                            <button className='btn  rounded-xl my-2'>View more</button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
};