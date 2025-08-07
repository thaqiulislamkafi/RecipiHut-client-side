import React, { use } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FormInput } from './AddRecipe';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from './Hooks/useAxios';

const UpdateRecipe = ({ recipe }) => {

    const { user } = use(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm() ;
    const queryClient = useQueryClient() ;

    const categoryList = ['breakfast', 'dessert', 'vegan', 'dinner', 'launch'];
    const quisineTypes = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Others'];

    const {mutate} = useMutation({
        mutationFn : async(newRecipe)=>{
            const {data} = await axiosSecure.put(`/recipes/${recipe._id}`,newRecipe);
            return data ;
        },
        onSuccess : ()=>{
            Swal.fire({title: "Good job!",text: "SuccessFully Updated!",icon: "success"});
            queryClient.invalidateQueries(['myRecipe']) ;
        },
        onError : ()=>{
            Swal.fire({title: "Failed!",text: "Failed to Update!",icon: "error"});
        },
        
    })

    const onSubmit = (data) => {

        data.likes = recipe.likes ;
        data.prepTime = parseInt(data.prepTime);
        data.categories = Object.keys(data.categories).filter(category => data.categories[category])
        mutate(data) ;
        
    };

    return (
        <div>
            <div className='mx-auto mb-30 sora-font '>
                <p className='poppins font-bold text-3xl text-center my-10'>Update Recipe</p>

                <form onSubmit={handleSubmit(onSubmit)} className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 mx-auto gap-6 dark:bg-gray-700">

                    <FormInput label='Title' name='title' type='text' defaultValue={recipe.title} register={register} errors={errors} placeholder='Enter Recipe Title' />

                    <FormInput label='Ingredients' type='text' name='ingredients' defaultValue={recipe.ingredients} register={register} errors={errors} placeholder="Enter Recipe's Ingredients" />

                    <FormInput label='Instructions' type='text' name='instructions' defaultValue={recipe.instructions} register={register} errors={errors} placeholder="Enter New Instructions" />

                    <FormInput label='Prep Time (mins)' type='number' name='prepTime' defaultValue={recipe.prepTime} register={register} errors={errors} placeholder="Enter New Instructions" />

                    <div className='flex flex-col gap-3'>

                        <label className="label">Categories:</label>
                        <div className='flex items-center gap-2'>
                            {categoryList.map(cat => (
                                <label key={cat} className='label cursor-pointer flex items-center gap-2'>
                                    <span className='capitalize'>{cat}</span>
                                    <input type="checkbox" 
                                    defaultChecked={recipe.categories.includes(cat.toLowerCase())}
                                    className='checkbox' {...register(`categories.${cat}`)} />
                                </label>
                            ))}
                        </div>

                    </div>

                    <div className='flex flex-col gap-3'>

                          <label className="label">Cuisine Type:</label>
                          <select {...register('cuisineType', { required: 'Cuisine Type is Required' })} className="select dark:bg-gray-700" defaultValue={recipe.cuisineType}>
                                
                          {quisineTypes.map(type =>(
                            <option value={type}>{type}</option>
                          ))}
                          </select>
                          {errors.cuisineType && (<p style={{ color: 'red' }}>{errors.cuisineType.message}</p>)}

                    </div>

                    <FormInput label='Photo' type='text' name='photoURL' defaultValue={recipe.photoURL} register={register} errors={errors} placeholder="Enter New PhotoURL" />

                    <button className="btn mx-auto  w-full">Update Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateRecipe;