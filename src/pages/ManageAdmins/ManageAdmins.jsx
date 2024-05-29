import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {MdPhone, MdWhatsapp } from 'react-icons/md';
import { FaEye, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUsers from '../../hooks/useUsers';
import SectionTitle from '../../components/SectionTitle';
import { HandleStatusChange } from '../../utils/HandleStatusChange';
import { HandleDelete } from '../../utils/HandleDelete';
import useAxiosSecure from '../../hooks/useAxiousSecure';

const ManageInstallMan = () => {
    const [axiosSecure] = useAxiosSecure();
    const [isUsers , refetch] = useUsers();


    return (
        <div className="w-full md:py-10 md:px-10 px-2 ">
            <SectionTitle heading={'ম্যানেজ অ্যাডমিন'}></SectionTitle>
            <div>
                <Helmet>
                    <title>ড্যাশবোর্ড | ম্যানেজ অ্যাডমিন</title>
                </Helmet>

                <div className="overflow-x-auto rounded-xl hidden md:block">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#106a4f] text-white rounded-xl">
                            <tr >
                                <th>
                                    #
                                </th>
                                <th>নাম</th>
                                <th>ইমেইল</th>
                                <th>টাইপ </th>
                                <th>স্ট্যাটাস</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isUsers?.map((user, index) =>
                                    <tr className="hover:bg-green-50" key={user._id}>
                                        <th>
                                            <label>
                                                {index + 1}
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
                                        <td className='font-bold'>
                                            <div>
                                                <div>{user.type}</div>
                                            </div>
                                        </td>

                                        <td ><button onClick={() => HandleStatusChange(axiosSecure, refetch, user._id, !user.status, '/api/v1/admin/installer/status/')} className={`text-sm font-bold   text-white badge bg-green-700 ${user.status === false ? 'bg-red-700' : 'bg-green-700'}`}>{user.status === true ? 'Active' : 'Dctive'}</button></td>
                                        <th>
                                            <Link className='btn-disabled' to={`/admin/dashboard/installer-details/${user._id}`}><button className=" btn  text-white btn-disabled  btn-xs"><FaEye></FaEye></button></Link>
                                            <button onClick={() => HandleDelete(axiosSecure, refetch, user._id, '/api/v1/admin/installer/')} className="btn btn-disabled btn-error text-white btn-xs ms-2"><FaTrash></FaTrash></button>
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

export default ManageInstallMan;