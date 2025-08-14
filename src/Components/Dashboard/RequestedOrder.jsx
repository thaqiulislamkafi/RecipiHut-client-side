import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axiosSecure from '../Hooks/useAxios';
import Swal from 'sweetalert2';

const RequestedOrder = () => {

    const { user } = use(AuthContext);
    const queryClient = useQueryClient();

    const { data: reqOrders } = useQuery({
        queryKey: ['req_Orders', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/getReqOrders?email=${user?.email}`);
            return data;
        },
        enabled: !!user?.email
    })

    const { mutate } = useMutation({
        mutationFn: async ({id,buyerEmail}) => {
            const { data } = await axiosSecure.patch(`/updateDeliver?buyerEmail=${buyerEmail}&recipeId=${id}`, {status : 'percelled'}) ;
            return data ;
        },
        onSuccess: () => {
            Swal.fire({ title: "Good job!", text: "SuccessFully Percelled!", icon: "success" });
            queryClient.invalidateQueries(['myRecipe']);
        }
    })

    const handleParcel = (id)=>{
        mutate(id) ;
    }

    return (
        <div>
            <p className='text-2xl my-5'>Requested Orders</p>

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
                            reqOrders?.map((order, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{order.recipeTitle}</td>
                                    <td>{order.recipeDetails.cuisineType}</td>
                                    <td>{order.paid ? 'Paid' : 'UnPaid'}</td>
                                    <td>{order.orderTime}</td>
                                    <td>{order.delivered}</td>

                                    <td><button disabled={!(order.delivered == 'pending')} onClick={()=>handleParcel({id : order.recipeId,buyerEmail :order?.buyerEmail})} className='btn btn-sm'>{order.delivered == 'pending' ? 'Make Parcel' : order.delivered == 'parcelled' ? 'Percelled' : 'Delivered'}
                                    </button></td>
                                </tr>


                            ))

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedOrder;