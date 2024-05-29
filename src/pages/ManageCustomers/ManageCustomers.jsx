import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../components/SectionTitle';
import { HandleStatusChange } from '../../utils/HandleStatusChange';
import { HandleDelete } from '../../utils/HandleDelete';
import useAxiosSecure from '../../hooks/useAxiousSecure';
import useCustomers from '../../hooks/useCustomers';
import { useState } from 'react';

const ManageCustomers = () => {
    const [axiosSecure] = useAxiosSecure();
    const [isCustomers, refetch] = useCustomers();
    const [searchInput, setSearchInput] = useState("");
    console.log(isCustomers);
    const handleSelectChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Filter devices based on search input
    const searchCustomer = isCustomers?.filter(user =>
        user.cus_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.cus_mobile.toLowerCase().includes(searchInput.toLowerCase())
    );



    return (
        <div className="w-full md:py-10  px-2 ">
            <SectionTitle heading={'ম্যানেজ পার্টি'}></SectionTitle>
            <div>
                <Helmet>
                    <title>ড্যাশবোর্ড | ম্যানেজ পার্টি</title>
                </Helmet>
                <div className='flex justify-end items-center mb-4 px-2'>
                    <div className="join w-full md:w-[800px]">
                        <div className='w-full md:w-[800px]'>
                            <div>
                                <input onChange={(e) => setSearchInput(e.target.value)} className="input input-bordered join-item w-full" value={searchInput} placeholder="Search" />
                            </div>
                        </div>
                        <select
                            className="select select-bordered join-item"
                            onChange={handleSelectChange}
                        >
                            <option disabled value={'Filter'}>Filter</option>
                            <option value={''}>All</option>
                        </select>
                        <Link className="btn join-item btn-outline " to={'/admin/dashboard/add-customer'}>Add</Link>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-xl">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#106a4f] text-white rounded-xl">
                            <tr >
                                <th>
                                    #
                                </th>
                                <th>নাম</th>
                                <th>মোবাইল</th>
                                <th>কোম্পানি</th>
                                <th>ঠিকানা</th>
                                <th>স্ট্যাটাস</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchCustomer?.map((user, index) =>
                                    <tr className="hover:bg-green-50" key={user._id}>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold text-center">{user.cus_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-bold'>{user.cus_mobile}</td>
                                        <td className='font-bold'>
                                            <div>{user.cus_company}</div>
                                        </td>
                                        <td className='font-bold'>
                                            <div>{user.cus_address}</div>
                                        </td>

                                        <td ><button onClick={() => HandleStatusChange(axiosSecure, refetch, user._id, !user.status, '/api/v1/admin/customer/status/')} className={`text-sm font-bold   text-white badge bg-green-700 ${user.status === false ? 'bg-red-700' : 'bg-green-700'}`}>{user.status === true ? 'Active' : 'Dctive'}</button></td>
                                        <th>
                                            <Link to={`/admin/dashboard/customer-details/${user._id}`}><button className=" btn  btn-accent text-white btn-xs md:me-2"><FaEye></FaEye></button></Link>
                                            <button onClick={() => HandleDelete(axiosSecure, refetch, user._id, '/api/v1/admin/customer/')} className="btn  btn-error text-white btn-xs mt-2 md:mt-1"><FaTrash></FaTrash></button>
                                        </th>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default ManageCustomers;