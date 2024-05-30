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
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(10);
    const { customers, totalPages, refetch, isLoading } = useCustomers(searchInput, currentPage, customersPerPage);
    console.log(customers);

    const handleSelectChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-full md:py-10 px-2">
            <SectionTitle heading={'ম্যানেজ কাস্টমার'}></SectionTitle>
            <div>
                <Helmet>
                    <title>ড্যাশবোর্ড | ম্যানেজ কাস্টমার</title>
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
                        {/* <Link className="btn join-item btn-outline " to={'/admin/dashboard/add-customer'}>Add</Link> */}
                    </div>
                </div>
                <div className="overflow-x-auto rounded-xl">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#106a4f] text-white rounded-xl">
                            <tr>
                                <th>#</th>
                                <th>নাম</th>
                                <th>ইমেইল</th>
                                <th>স্ট্যাটাস</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers?.map((user, index) =>
                                    <tr className="hover:bg-green-50" key={user._id}>
                                        <th>
                                            <label>
                                                {(currentPage - 1) * customersPerPage + index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold text-center">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-bold'>{user.email}</td>
                                  
                                        <td>
                                            <button onClick={() => HandleStatusChange(axiosSecure, refetch, user._id, !user.status, '/api/v1/admin/customer/status/')} className={`text-sm font-bold text-white badge ${user.status === false ? 'bg-red-700' : 'bg-green-700'}`}>
                                                {user.status === true ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <th>
                                            <Link to={`/admin/dashboard/customer-details/${user._id}`}><button className="btn btn-accent text-white btn-xs md:me-2"><FaEye></FaEye></button></Link>
                                            <button onClick={() => HandleDelete(axiosSecure, refetch, user._id, '/api/v1/admin/customer/')} className="btn btn-error text-white btn-xs mt-2 md:mt-1"><FaTrash></FaTrash></button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="btn-group">
                        {
                            Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`btn btn-sm  ${currentPage === i + 1 ? 'btn-active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))
                        }
                    </div>
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