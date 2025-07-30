import React, { use, useState } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Fade } from 'react-awesome-reveal';

const AddRecipe = () => {

    const { user } = use(AuthContext);
    console.log(user.email);

    const [recipe, setRecipe] = useState({
        userEmail: `${user.email}`,
        title: '',
        ingredients: '',
        instructions: '',
        cuisineType: 'Italian',
        prepTime: 0,
        categories: [],
        likes: 0,
        photoURL: ''
    });

    // Handle all changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setRecipe(prev => ({
                ...prev,
                categories: checked
                    ? [...prev.categories, name]
                    : prev.categories.filter(item => item !== name)
            }));
        } else {
            setRecipe(prev => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }));
        }
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Recipe Data:', recipe);
        // alert('Recipe added! Check console for data.');


        fetch('https://server-site-nine-sandy.vercel.app/recipes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "SuccessFully Added!",
                        icon: "success"
                    });
                }
            })
    };



    return (
        <div>
            <Fade>
                <div className='w-[85.94vw] mx-auto mb-30 sora-font'>
                    <p className='poppins font-bold text-3xl text-center my-10'>Add Recipe</p>
                    <form onSubmit={handleSubmit} className="fieldset grid grid-cols-1 lg:grid-cols-2 bg-base-200 border-base-300 rounded-box  border p-4 mx-auto gap-6 dark:bg-gray-700 dark:text-gray-200 ">

                        <div className='flex flex-col gap-3'>
                            <label className="label">Title</label>
                            <input type="text" name='title' className="input w-full dark:bg-gray-700" value={recipe.title} onChange={handleChange} placeholder="Enter Recipe Title" />

                        </div>

                        <div className='flex flex-col gap-3'>
                            <label className="label">Ingredients</label>
                            <input type="text" name='ingredients'
                                value={recipe.ingredients} className="input w-full dark:bg-gray-700" onChange={handleChange} placeholder="Enter Recipe's Ingredients" />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label className="label">Instructions</label>
                            <input type="text" name='instructions'
                                value={recipe.instructions} className="input w-full dark:bg-gray-700" onChange={handleChange} placeholder="Enter Instructions" />

                        </div>

                        <div className='flex flex-col gap-3'>
                            <label className="label">Prep Time (mins):</label>
                            <input
                                type="number"
                                name="prepTime"
                                value={recipe.prepTime}
                                className="input w-full dark:bg-gray-700"
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label className="label">Categories:</label>
                            <div>
                                {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'].map(category => (
                                    <label className="label" key={category} >
                                        <input
                                            type="checkbox"
                                            name={category.toLowerCase()}
                                            className='mx-2 checkbox dark:bg-gray-700'
                                            checked={recipe.categories.includes(category.toLowerCase())}
                                            onChange={handleChange}
                                        />
                                        {category}
                                    </label>
                                ))}
                            </div>

                        </div>

                        <div className='flex flex-col gap-3'>
                            <label className="label">Cuisine Type:</label>
                            <select
                                name="cuisineType"
                                value={recipe.cuisineType}
                                onChange={handleChange}
                                className="select dark:bg-gray-700"
                            >
                                <option value="Italian">Italian</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Indian">Indian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-3 lg:col-span-2'>
                            <label className="label">Photo</label>
                            <input type="text" name='photoURL' className="input w-full dark:bg-gray-700" value={recipe.photoURL}
                                onChange={handleChange} placeholder="Your PhotoURL" />
                        </div>

                        <button className="btn mx-auto lg:col-span-2 w-full dark:bg-gray-700 dark:text-gray-200">Add Recipe</button>
                    </form>
                </div>
            </Fade>
        </div>
    );
};

export default AddRecipe;