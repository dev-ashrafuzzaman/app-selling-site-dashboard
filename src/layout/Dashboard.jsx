import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaCalculator, FaHome, FaUsers } from "react-icons/fa";
import userPhoto from '../assets/royal.jpg'
import profilePhoto from '../assets/royal.jpg'
import useAuth from "../hooks/useAuth";
import { MdVerified, MdLogout, MdMenuOpen, MdCheck } from "react-icons/md";


const Dashboard = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();
    const isAdmin = true;


    const handleLogout = () => {
        logoutUser()
            .then(() => {
                navigate('/admin-auth/validation')
            })
            .then(error => {
                console.log(error)
            })
    }



    return (

        <>
            <div className="drawer lg:drawer-open  md:px-6 px-1 w-full pt-2">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center absolute md:w-[98%] w-full ">

                    {/* Mobile View start*/}
                    <div className='my-4 lg:hidden w-full  px-2 flex justify-between rounded-xl bg-slate-50 shadow-md py-2 items-center'>
                        <div>
                            <p className='font-bold  flex items-center gap-2 text-slate-500'>স্বাগতম, {'অ্যাডমিন'} <MdVerified className='text-blue-500'></MdVerified></p>
                            <label htmlFor="my-drawer-2" className='font-bold text-xl drawer-button'>ড্যাশবোর্ড</label>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img className="w-[40px] rounded-full" src={userPhoto} alt="surokkha gps" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm text-green-700 dropdown-content mt-3 z-[1] p-2 border bg-white shadow-md rounded-box w-40">
                                <li>
                                    <a className="justify-between">
                                        <p className="flex justify-center items-center gap-2"><FaUsers></FaUsers> {"অ্যাডমিন"}</p>
                                    </a>
                                </li>
                                <li onClick={handleLogout}><a><p className="flex justify-center items-center gap-2"><MdLogout></MdLogout>লগ আউট</p></a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Mobile View start*/}

                    {/* Page content here */}
                    <div className="md:navbar hidden  md:flex pt-10 md:px-2 text-[#106a4f] md:bg-[#F0F3F4] md:ml-10 md:pe-20 rounded-xl  relative  z-10 bg-opacity-90">
                        <div className="flex-1">

                            <div className="form-control hidden md:block pl-28">
                                <div className="flex">
                                    <input type="text" placeholder="Search…" className="input input-bordered" />
                                    <button className="btn bg-black text-white btn-square">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </button>
                                </div>
                            </div>
                            <label htmlFor="my-drawer-2" className="btn mainColorbg btn-sm  drawer-button lg:hidden"><MdMenuOpen></MdMenuOpen></label>
                        </div>

                        <div>
                            <p className='font-bold  flex items-center gap-2 text-slate-500'>স্বাগতম, {'অ্যাডমিন'} <MdVerified className='text-blue-500'></MdVerified></p>
                        </div>

                        <div className="flex-none hidden md:block">
                            <div className="dropdown dropdown-end">

                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img className="border-2 bg-white border-[#106a4f] rounded-full" src={profilePhoto} />
                                    </div>

                                </label>
                                <ul tabIndex={0} className="menu menu-sm text-[#106a4f] dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                                    <li onClick={handleLogout}><a><p className="flex justify-center items-center gap-2"><MdLogout></MdLogout>লগ আউট</p></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side rounded-xl">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4  h-[100%] bg-[#F0F3F4]  text-base  text-black">
                        {/* Sidebar content here */}
                        <a className="mb-20 font-bold">M/S. ROYAL HOSSAIN</a>
                        {
                            isAdmin && <>
                                <li><NavLink to="/admin/dashboard/home"><FaHome></FaHome>অ্যাডমিন হোম</NavLink></li>
                                {/* <li><NavLink to="/admin/dashboard/manage-admins"><MdVerifiedUser></MdVerifiedUser> ইউসার ম্যানেজ</NavLink></li> */}
                                <li><NavLink to="/admin/dashboard/manage-customers"><FaUsers></FaUsers>পার্টি ম্যানেজ</NavLink></li>
                                <li><NavLink to="/admin/dashboard/manage-accounts"><FaCalculator></FaCalculator>একাউন্টস</NavLink></li>
                                <li><NavLink to="/admin/dashboard/manage-details"><MdCheck></MdCheck>ডিটেলস</NavLink></li>

                            </>
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Dashboard;