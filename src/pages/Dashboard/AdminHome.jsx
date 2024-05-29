import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell } from 'recharts';
import useAdminStat from '../../hooks/useAdminStat';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { calculateTotalCredit, calculateTotalDebit } from '../../utils/HandleBillDebitCal';
import useKhotiyan from '../../hooks/useKhotiyan';
import { useEffect, useState } from 'react';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];



const AdminHome = () => {
    const [isAdminStat] = useAdminStat();
    const [isKhotiyan] = useKhotiyan();
    const [selectOption, setOption] = useState();

    useEffect(() => {
        // Check if isKhotiyan has at least one element before setting the state
        if (isKhotiyan && isKhotiyan?.length > 0) {
            setOption(isKhotiyan[0]?.billing);
        }
    }, [isKhotiyan]); // useEffect will run whenever isKhotiyan changes

    const handleSelectChange = (event) => {
        const id = event.target.value;
        const bill = isKhotiyan?.find(bill => bill._id === id);
        if (bill) {
            setOption(bill.billing);
        }
    };



    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    return (
        <div className="container mx-auto  px-6 pt-4">
            <p className="mt-10 font-bold">একাউন্টস ওভারভিউ </p>
            <div className="stats shadow w-full border">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">মোট আদায় টাকা </div>
                    <div className="stat-value text-primary">{isAdminStat?.tCredit}</div>
                    <div className="stat-desc">{isAdminStat?.currentMonthTCredit} এই মাসে আদায়</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">বাকী টাকা</div>
                    <div className="stat-value text-secondary">{isAdminStat?.tDebit ? isAdminStat?.tDebit : 0 - isAdminStat?.tCredit ? isAdminStat?.tCredit : 0}</div>
                    <div className="stat-desc">{isAdminStat?.currentMonthTDebit - isAdminStat?.currentMonthTCredit} এই মাসে বাকী</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">{isAdminStat?.totalCus}</div>
                    <div className="stat-title">মোট পার্টি </div>
                    <div className="stat-desc text-secondary">{isAdminStat?.activeCus} পার্টি একটিভ</div>
                </div>

            </div>

            <div className='md:flex justify-center items-center gap-8 w-full'>
                <div className="card glass p-6 my-6 md:w-[70%] h-[450px]">
                    <div className='flex justify-between items-center mb-4'>
                        <p className="pb-4 font-bold">একাউন্ট স্ট্যাটাস</p>
                        <select
                            className="select select-bordered select-sm w-full max-w-xs"
                            value={selectOption}
                            onChange={handleSelectChange}
                        >
                            {
                                isKhotiyan?.map(acc => <option key={acc._id} value={acc?._id}>{acc.cus_name}</option>)
                            }
                        </select>
                    </div>
                    <div style={{ width: '100%' }} >
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                width={500}
                                height={300}
                                data={selectOption}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="bill_no" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="debit" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="credit" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                <div className='my-6 card glass h-[450px] md:w-[30%] overflow-auto'>
                    <div>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>নাম</th>
                                    <th>কোম্পানি</th>
                                    <th>মোবাইল</th>
                                    <th>অ্যাকশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isAdminStat?.cusList.map((customer, index) =>
                                        <tr key={index} className='hover:bg-slate-100 text-xs'>
                                            <td>
                                                <div className='line-clamp-1'>{customer.cus_name}</div>
                                            </td>
                                            <td className='line-clamp-1'>{customer.cus_company}</td>
                                            <td>{customer.cus_mobile}</td>
                                            <th>
                                                <Link to={`/admin/dashboard/customer-details/${customer._id}`}><button className=" btn  btn-accent text-white btn-xs"><FaEye></FaEye></button></Link>
                                            </th>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='md:flex justify-center items-center gap-8 w-full mb-20'>
                <div className="card glass p-6 mb-10 md:w-[70%] h-[300px]">
                    <p className="pb-4 font-bold">পার্টি একাউন্ট</p>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}

                            <tbody>
                                {
                                    isAdminStat?.khotiyan?.map((acc, index) =>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{acc.cus_name}</td>
                                            <td>{calculateTotalCredit(acc?.billing)}</td>
                                            <td>{calculateTotalDebit(acc?.billing)}</td>
                                            <td>{calculateTotalDebit(acc?.billing) - calculateTotalCredit(acc?.billing)}</td>
                                            <td className='text-green-500'>{acc?.billing?.length}</td>
                                            <td> <Link to={`/admin/dashboard/khotiyan-bill/${acc?._id}`}><button className=" btn  btn-accent text-white btn-xs"><FaEye></FaEye></button></Link></td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='mb-10 card glass md:w-[30%] h-[300px] overflow-auto'>
                    <BarChart
                        width={450}
                        height={300}
                        data={selectOption}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="credit" />
                        <Bar dataKey="debit" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {selectOption?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </div>
            <p className='text-center text-xs my-4'>SOFTWARE DESIGN & DEVELOP BY <a className='text-orange-600' href="https://ashrafuzzaman.com.bd/">LEERY IT</a></p>
        </div>
    );
};

export default AdminHome;