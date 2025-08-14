import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axiosSecure from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Swal from 'sweetalert2';

const MyOrder = () => {

    const { user } = use(AuthContext);
    const queryClient = useQueryClient();


    const { data: orders, isLoading } = useQuery({
        queryKey: ['my-query', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-orders?email=${user?.email}`);
            return data;
        },
        enabled: !!user?.email
    })

    const { mutate } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.patch(`/updateDeliver?buyerEmail=${user?.email}&recipeId=${id}`, { status: 'delivered' });
            return data;
        },
        onSuccess: () => {
            Swal.fire({ title: "Good job!", text: "SuccessFully Delivered!", icon: "success" });
            queryClient.invalidateQueries(['myRecipe']);
        }
    })

    const handleDeliver = (id)=>{
        mutate(id) ;
    }

    if (isLoading) return <Loading />;

    return (
        <div>
            <p className='text-2xl my-5'>My Order</p>

            <div>
                <div className="overflow-x-auto w-4/5">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Food Type</th>
                                <th>Payment</th>
                                <th>Order Time</th>
                                <th>Delivered</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, index) => (
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{order.recipeDetails.title}</td>
                                        <td>{order.recipeDetails.cuisineType}</td>
                                        <td>{order.paid ? 'Paid' : 'UnPaid'}</td>
                                        <td>{order.orderTime}</td>
                                        <td>{order.delivered}</td>

                                        <td><button onClick={()=>handleDeliver(order?.recipeDetails?._id)} disabled={!(order?.delivered == 'parcelled')} className='btn btn-xs'>Confirrm Deliver</button></td>
                                    </tr>


                                ))

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;