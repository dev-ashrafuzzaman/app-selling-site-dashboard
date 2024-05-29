import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

const AdminAuth = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useAuth();
    const [logError, setLogError] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPass, setFocusPass] = useState(false)
    const [visiblePass, setvisiblePass] = useState(false)

    const navigate = useNavigate();

    const handleOnFocusEmail = (value) => {
        setFocusEmail(value)
    }
    const handleOnFocusPass = (value) => {
        setFocusPass(value)
    }
    const handlePassVisible = (value) => {
        setvisiblePass(value)
    }


    const onSubmit = (data) => {
        loginUser(data.email, data.password)
            .then(() => {
                toast.success('Login success', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate('/admin/dashboard/home')
                    setLogError(false)
                }, 1500)
            })
            .catch(() => {
                setLogError(true)
                toast.error('Wrong Email/Password try again!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }
    return (
        <div>
            <div className='max-w-xl mx-auto pt-32 px-2 '>
                <Helmet>
                    <title>M/S. Royal Hossain Admin Auth Validation</title>
                </Helmet>
                <div className='card glass  shadow-2xl md:p-10 p-4 border'>
                    <div>
                        <div className='mb-10 text-center'>
                            {/* <img src={logo} className='w-1/2 mx-auto' alt="" /> */}
                            <h3 className="text-4xl  text-red-600 font-bold">
                                স্বাগতম !
                            </h3>
                            <h3 className="md:text-xl font-semibold mt-4 mainText">
                                রয়েল হোসেন ম্যানেজমেন্ট সফটওয়্যার
                            </h3>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className={`border-2 rounded-xl md:p-2 p-1`}>
                                <label className="label">
                                    <span className="label-text">ইমেইল</span>
                                </label>
                                <input {...register("email", { required: true })} onFocus={() => handleOnFocusEmail(!focusEmail)} onBlur={() => handleOnFocusEmail(!focusEmail)} type="email" placeholder="ইমেইল লিখুন " className=" bg-slate-50 border-none outline-none w-full " />
                            </div>
                            {errors.email && <span className=" text-red-600">Email is required</span>}
                            <div className={`border-2 flex justify-between items-center rounded-xl md:p-2 p-1`}>
                                <div className="w-11/12">
                                    <label className="label">
                                        <span className="label-text">পাসওয়ার্ড</span>
                                    </label>
                                    <input {...register("password", { required: true })} onFocus={() => handleOnFocusPass(!focusPass)} onBlur={() => handleOnFocusPass(!focusPass)} type={`${visiblePass ? 'text' : 'password'}`} placeholder="পাসওয়ার্ড লিখুন" className=" bg-slate-50 border-none outline-none  w-full" />
                                </div>
                                <p className="text-2xl" onClick={() => handlePassVisible(!visiblePass)}>{visiblePass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</p>
                            </div>
                            {errors.password?.type === 'required' && <span className=" text-red-600">Password is required</span>}


                            {/* Submit Btn */}
                            <div>
                                <input className="btn w-full text-white bg-red-600 mt-4 font-bold  text-xl" type="submit" value="লগইন" />
                            </div>
                        </form>
                    </div>

                </div>
                <p className='mt-2 font-semibold text-center text-gray-500'>© 2024 Development by Leery iT</p>
                <p className='mt- font-semibold text-center text-gray-500'>Contact: 01711 347 754</p>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};



export default AdminAuth;