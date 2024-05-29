import { useForm } from "react-hook-form";
import { Link, useLoaderData } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiousSecure";
import { ErrorToast, UpdateToast } from "../../utils/UpdateToast";
import SectionTitle from "../../components/SectionTitle";
import { HandleStatusChange } from "../../utils/HandleStatusChange";
import useKhotiyan from "../../hooks/useKhotiyan";
import { FaEye, FaTrash } from "react-icons/fa";
import { calculateTotalCredit, calculateTotalDebit } from "../../utils/HandleBillDebitCal";
import { useEffect, useState } from "react";
import { HandleDelete } from "../../utils/HandleDelete";

const DetailsCustomer = () => {
    const customerInfo = useLoaderData();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const [isKhotiyan, refetch] = useKhotiyan();
    const [inaccType, setInaccType] = useState();
    const [inConfirmType, setInConfirmType] = useState();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Format date as "dd-mm-yyyy"
    const formattedDate = currentDateTime.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });



    //Filter Customer Issued Khotiyan List 
    const customerAccount = isKhotiyan?.filter(acc => acc.cus_id === customerInfo._id)

    const onSubmit = async (data) => {
        try {
            const customer = {
                cus_name: data.cus_name,
                cus_mobile: data.cus_mobile,
                cus_address: data.cus_address,
                cus_company: data.cus_company,
                status: true,
            };

            await axiosSecure.patch(`/api/v1/admin/customer/${customerInfo._id}`, { customer })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        UpdateToast("Update");
                    }
                })

        } catch (error) {
            console.error(error);
        }
    };

    const HandleAccountType = (e) => {
        const accType = e.target.value
        setInaccType(accType);
    }

    const HandleConfirmType = (e) => {
        const confirmType = e.target.value
        setInConfirmType(confirmType);
    }
    const handleKhotiyanAdd = async () => {
        if (inConfirmType === 'CONFIRM') {
            try {
                const khotiyan = {
                    status: true,
                    cus_name: customerInfo.cus_company,
                    accType: inaccType,
                    cus_id: customerInfo._id,
                    billing: [],
                    date: formattedDate,

                }
                await axiosSecure.post("/api/v1/admin/khotiyan", { khotiyan })
                    .then(data => {
                        if (data.data.insertedId) {
                            refetch();
                            UpdateToast('Khotiyan Add')
                        }
                    });

            } catch (error) {
                console.error(error);
            }

        } else {
            ErrorToast('Please Type CONFIRM')
        }

    }

    return (
        <div className="w-full py-10 px-2">
            {/* Manage Khotiyan */}
            <div className="rounded-xl md:p-4">
                <SectionTitle heading={'ম্যানেজ খতিয়ান'}></SectionTitle>
                <div>
                    <div className='flex justify-end items-center mb-4 px-2'>
                        <button className="btn w-[180px] bg-[#F0F3F4] " onClick={() => document.getElementById('my_modal_3').showModal()}>অ্যাড করুন</button>
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
                                    <th>একাউন্ট ধরণ</th>
                                    <th>বাকী টাকা </th>
                                    <th>খতিয়ান আইডি</th>
                                    <th>তারিখ </th>
                                    <th>স্ট্যাটাস</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customerAccount?.map((khotiyan, index) =>
                                        <tr className="hover:bg-green-50" key={khotiyan._id}>
                                            <th>
                                                <label>
                                                    {index + 1}
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <div className="font-bold text-center">{khotiyan.cus_name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {khotiyan.accType}
                                            </td>
                                            <td className="text-red-600 font-bold">
                                                {calculateTotalDebit(khotiyan?.billing) - calculateTotalCredit(khotiyan?.billing)}
                                            </td>
                                            <td>
                                                {khotiyan._id}
                                            </td>
                                            <td>
                                                {khotiyan.date}
                                            </td>


                                            <td ><button onClick={() => HandleStatusChange(axiosSecure, refetch, khotiyan._id, !khotiyan.status, '/api/v1/admin/khotiyan/status/')} className={`text-sm font-bold   text-white badge bg-green-700 ${khotiyan.status === false ? 'bg-red-700' : 'bg-green-700'}`}>{khotiyan.status === true ? 'Active' : 'Dctive'}</button></td>
                                            <th>
                                                <Link to={`/admin/dashboard/khotiyan-bill/${khotiyan._id}`}><button className=" btn  btn-accent text-white btn-xs"><FaEye></FaEye></button></Link>
                                                {
                                                    !khotiyan?.status && <>
                                                        <button onClick={() => HandleDelete(axiosSecure, refetch, khotiyan._id, '/api/v1/admin/khotiyan/')} className="btn  btn-error text-white btn-xs ms-2"><FaTrash></FaTrash></button>
                                                    </>
                                                }
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

            <div className="my-32">
                <SectionTitle heading={'আপডেট পার্টি'}></SectionTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="md:ml-20 bg-[#F0F3F4] rounded-xl md:p-10 p-4" >
                    <div className="md:flex gap-6">
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">নাম*</span>
                            </label>
                            <input type="text" defaultValue={customerInfo.cus_name} placeholder="কাস্টমারের নাম লিখুন" {...register("cus_name", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">মোবাইল *</span>
                            </label>
                            <input type="number" defaultValue={customerInfo.cus_mobile} placeholder="কাস্টমারের মোবাইল লিখুন  017---" {...register("cus_mobile", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                    </div>

                    <div className="md:flex gap-6">
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">কোম্পানির নাম*</span>
                            </label>
                            <input type="text" defaultValue={customerInfo.cus_company} placeholder="কোম্পানির নাম" {...register("cus_company")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">ঠিকানা *</span>
                            </label>
                            <input type="text" defaultValue={customerInfo.cus_address} placeholder="ঠিকানা " {...register("cus_address")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                    </div>
                    <div className='flex justify-end items-center'>
                        <button type="submit" className="py-2 btn  rounded bg-green-700 hover:bg-[#36a977] font-semibold text-white mt-6 md:w-[200px] w-full">
                            আপডেট কাস্টমার
                        </button>
                    </div>
                </form>
            </div>


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg text-center">পার্টি একাউন্ট অ্যাড করুন !</h3>
                        <div className="flex flex-col-reverse justify-center items-center  gap-2 my-6">
                            <input type="text" required onChange={(e) => HandleAccountType(e)} placeholder="একাউন্ট টাইপ লিখুন...." className="input input-bordered w-full max-w-xs" />
                            <input type="text" onChange={(e) => HandleConfirmType(e)} placeholder="CONFIRM লিখুন" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="flex justify-center items-center my-4">
                            <button onClick={() => handleKhotiyanAdd()} className="btn btn-accent text-white w-full max-w-xs">অ্যাড করুন</button>
                        </div>
                    </form>

                    <p className="py-4 text-center">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </div>
    );
};

export default DetailsCustomer;