import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiousSecure';
import SectionTitle from '../../components/SectionTitle';
import { UpdateToast } from '../../utils/UpdateToast';

const AddCustomer = () => {
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {
        try {
            const customer = {
                cus_name: data.cus_name,
                cus_mobile: data.cus_mobile,
                cus_address: data.cus_address,
                cus_company: data.cus_company,
                status: true,
            };

            console.log(customer);
            await axiosSecure.post("/api/v1/admin/customer/", { customer })
                .then(data => {
                    if (data.data.insertedId) {
                        UpdateToast('Customer Add')
                        reset();
                        setTimeout(() => {
                            navigate('/admin/dashboard/manage-customers');
                        }, 2000)

                    }
                });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full py-10 px-10">
            <ToastContainer></ToastContainer>
            <SectionTitle heading={'অ্যাড কাস্টমার'}></SectionTitle>
            <Helmet>
                <title>Dashboard | অ্যাড কাস্টমার </title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="md:ml-20 bg-[#F0F3F4] rounded-xl md:p-10 p-4" >
                <div className="md:flex gap-6">
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">নাম*</span>
                        </label>
                        <input type="text" placeholder="পার্টির নাম লিখুন" {...register("cus_name", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">মোবাইল *</span>
                        </label>
                        <input type="number" placeholder="পার্টির মোবাইল লিখুন  017---" {...register("cus_mobile", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>

                <div className="md:flex gap-6">
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">কোম্পানির নাম*</span>
                        </label>
                        <input type="text" placeholder="কোম্পানির নাম" {...register("cus_company")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">ঠিকানা *</span>
                        </label>
                        <input type="text" placeholder="ঠিকানা " {...register("cus_address")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <button type="submit" className="py-2 btn  rounded bg-green-700 hover:bg-[#36a977] font-semibold text-white mt-6 md:w-[200px] w-full">
                        অ্যাড পার্টি 
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;