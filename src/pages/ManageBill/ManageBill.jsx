import { Link, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaEdit, FaPrint } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../components/SectionTitle';
import { useState } from 'react';
import { HandleEachBillTotalDue, HandleSingleBillTotalDue } from '../../utils/HandleBillDebitCal';

const ManageBill = () => {
    const [searchInput, setSearchInput] = useState("");
    const khotiyanData = useLoaderData();
    const handleSelectChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Filter devices based on search input
    const sortedBills = khotiyanData?.billing.sort((a, b) => b.bill - a.bill);

    const searchBilling = sortedBills?.filter(user =>
        user.bill_no.toString().includes(searchInput.toLowerCase())
    );



    return (
        <div className="w-full md:py-10  px-2 mb-10">
            <SectionTitle heading={'ম্যানেজ বিল'}></SectionTitle>
            <p className='text-center mb-10 font-bold text-red-600'>পার্টি কোম্পানি নাম: {khotiyanData?.cus_name || 'Not Found'}</p>
            <div>
                <Helmet>
                    <title>ড্যাশবোর্ড | ম্যানেজ বিল </title>
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
                        <Link className="btn join-item btn-outline " to={`/admin/dashboard/add-bill/${khotiyanData?._id}`}>ADD BILL</Link>
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
                                <th>বিল নং</th>
                                <th>ইম্পোর্টার</th>
                                <th>এক্সপোর্টার</th>
                                <th>মোট জমা</th>
                                <th>মোট পাওনা</th>
                                <th>তারিখ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchBilling?.map((billing, index) =>
                                    <tr className="hover:bg-green-50" key={billing.bill_no}>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold text-xl text-center">{billing.bill_no}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-bold'>{billing.billInfo.imp_name}</td>
                                        <td className='font-bold'>{billing.billInfo.exp_name}</td>
                                        <td className='font-bold'>{billing.credit}</td>
                                        <td className='font-bold'>{HandleEachBillTotalDue(sortedBills, billing.debit, billing.credit)}</td>
                                        <td >{billing.cr_date}</td>
                                        <th>
                                            <Link
                                                to={{
                                                    pathname: `/admin/dashboard/edit-bill/${khotiyanData._id}/${billing.bill_no}/${HandleSingleBillTotalDue(sortedBills, billing.bill_no)}`
                                                }}
                                            >
                                                <button className="btn btn-accent text-white btn-xs md:me-2">
                                                    <FaEdit></FaEdit>
                                                </button>
                                            </Link>
                                            <Link to={`/print-bill/${khotiyanData._id}/${billing.bill_no}/${HandleSingleBillTotalDue(sortedBills, billing.bill_no)}`}><button className=" btn  btn-info text-white btn-xs mt-2 md:mt-0"><FaPrint></FaPrint></button></Link>
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

export default ManageBill;