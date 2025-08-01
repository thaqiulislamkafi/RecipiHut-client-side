import React, {use} from 'react';
import { AuthContext } from './Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Fade } from 'react-awesome-reveal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from './Hooks/useAxios';
import { useForm } from 'react-hook-form';

const FormInput = ({ label, name, register, type, errors, placeholder }) => (

    <div className='flex flex-col gap-3'>

        <label className='label'>{label}</label>
        <input type={type} className='input w-full dark:bg-gray-700' placeholder={placeholder} {...register(name, { required: `${label} is Required` })} />
        {errors.name && (<p style={{ color: 'red' }}>{errors.name.message}</p>)}

    </div>
)


const AddRecipe = () => {

    const { user } = use(AuthContext);
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const categoryList = ['breakfast', 'dessert', 'vegan', 'dinner', 'launch'];
    const quisineTypes = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Others'];

    const mutation = useMutation({
        mutationFn: async (recipe) => {
            return axiosSecure.post('/recipes', recipe)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['recipes']);
            Swal.fire({ title: "Good job!", text: "SuccessFully Added!", icon: "success" });
        }
      }
    )

    const onSubmit = (data) => {

        data.prepTime = parseInt(data.prepTime);
        data.userEmail = user?.email;
        data.categories = Object.keys(data.categories).filter(category => data.categories[category])
        data.likes = 0;
        mutation.mutate(data);
        console.log(data);

    };

    return (
        <div>
            <Fade>
                <div className='w-[85.94vw] mx-auto mb-30 sora-font'>
                    <p className='poppins font-bold text-3xl text-center my-10'>Add Recipe</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset grid grid-cols-1 lg:grid-cols-2 bg-base-200 border-base-300 rounded-box  border p-4 mx-auto gap-6 dark:bg-gray-700 dark:text-gray-200 ">

                        <FormInput label='Title' type='text' name='title' register={register} errors={errors} placeholder='Enter Recipe Title' />

                        <FormInput label='Ingredients' type='text' name='ingredients' register={register} errors={errors} placeholder="Enter Recipe's Ingredients" />

                        <FormInput label='Instructions' type='text' name='instructions' register={register} errors={errors} placeholder="Enter Instructions" />

                        <FormInput label='Prep Time (mins)' type='number' name='prepTime' register={register} errors={errors} placeholder="Enter Instructions" />

                        <div className='flex flex-col gap-3'>

                            <label className="label">Categories:</label>
                            <div className='flex items-center gap-2'>
                                {categoryList.map(cat => (
                                    <label key={cat} className='label cursor-pointer flex items-center gap-2'>
                                        <span className='capitalize'>{cat}</span>
                                        <input type="checkbox" className='checkbox' {...register(`categories.${cat}`)} />
                                    </label>
                                ))}
                            </div>

                        </div>

                        <div className='flex flex-col gap-3'>

                          <label className="label">Cuisine Type:</label>
                          <select {...register('cuisineType', { required: 'Cuisine Type is Required' })} className="select dark:bg-gray-700" >
                                
                          {quisineTypes.map(type =>(
                            <option value={type}>{type}</option>
                          ))}
                          </select>
                          {errors.cuisineType && (<p style={{ color: 'red' }}>{errors.cuisineType.message}</p>)}

                        </div>

                        <FormInput label='Photo' type='text' name='photoURL' register={register} errors={errors} placeholder="Enter Your PhotoURL" />

                        <button className="btn mx-auto lg:col-span-2 w-full dark:bg-gray-700 dark:text-gray-200">Add Recipe</button>

                    </form>
                </div>
            </Fade>
        </div>
    );
};

export default AddRecipe;