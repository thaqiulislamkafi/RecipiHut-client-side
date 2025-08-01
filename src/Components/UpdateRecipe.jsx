import React, { use, useState } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import Swal from 'sweetalert2';

const UpdateRecipe = ({recipe}) => {
const { user } = use(AuthContext);
    // console.log(user.email);

    const [UpRecipe, setUpRecipe] = useState({
        userEmail: `${user.email}`,
        title: `${recipe.title}`,
        ingredients: `${recipe.ingredients}`,
        instructions: `${recipe.instructions}`,
        cuisineType: `${recipe.cuisineType}`,
        prepTime: `${recipe.prepTime}`,
        categories: [],
        likes: 0,
        photoURL: `${recipe.photoURL}`
    });

    // Handle all changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setUpRecipe(prev => ({
                ...prev,
                categories: checked
                    ? [...prev.categories, name]
                    : prev.categories.filter(item => item !== name)
            }));
        } else {
            setUpRecipe(prev => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }));
        }
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Recipe Data:', UpRecipe);
        // alert('Recipe added! Check console for data.');


        fetch(`http://localhost:5000/recipes/${recipe._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UpRecipe)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Good job!",
                        text: "SuccessFully Updated!",
                        icon: "success"
                    });
                }
            })
    };



    return (
        <div>
            <div className='mx-auto mb-30 sora-font '>
                <p className='poppins font-bold text-3xl text-center my-10'>Update Recipe</p>
                <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 mx-auto gap-6 dark:bg-gray-700">

                    <div className='flex flex-col gap-3'>
                        <label className="label">Title</label>
                        <input type="text" name='title' className="input w-full dark:bg-gray-700" value={UpRecipe.title} onChange={handleChange} placeholder="Enter Recipe Title" />

                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className="label">Ingredients</label>
                        <input type="text" name='ingredients'
                            value={UpRecipe.ingredients} className="input w-full dark:bg-gray-700" onChange={handleChange} placeholder="Enter Recipe's Ingredients" />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className="label">Instructions</label>
                        <input type="text" name='instructions'
                            value={UpRecipe.instructions} className="input w-full dark:bg-gray-700" onChange={handleChange} placeholder="Enter Instructions" />

                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className="label">Prep Time (mins):</label>
                        <input
                            type="number"
                            name="prepTime"
                            value={UpRecipe.prepTime}
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
                                        className='mx-2 checkbox'
                                        checked={UpRecipe.categories.includes(category.toLowerCase())}
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
                            value={UpRecipe.cuisineType}
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

                    <div className='flex flex-col gap-3 '>
                        <label className="label">Photo</label>
                        <input type="text" name='photoURL' className="input w-full dark:bg-gray-700" value={UpRecipe.photoURL}
                            onChange={handleChange} placeholder="Your PhotoURL" />
                    </div>

                    <button className="btn mx-auto  w-full">Update Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateRecipe;