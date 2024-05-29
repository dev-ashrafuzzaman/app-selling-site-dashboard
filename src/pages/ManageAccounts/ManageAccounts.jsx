import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from '../../components/SectionTitle';
import { useEffect, useRef, useState } from 'react';
import useKhotiyan from '../../hooks/useKhotiyan';
import useCustomers from '../../hooks/useCustomers';
import Select from 'react-select';
import { useReactToPrint } from 'react-to-print';
import { FaPrint } from 'react-icons/fa';
import { calculateTotalCredit, calculateTotalDebit } from '../../utils/HandleBillDebitCal';

const ManageAccounts = () => {
    const componentPDF = useRef();




    const [isKhotiyan] = useKhotiyan();
    const [isCustomers] = useCustomers();

    // Select Party Area Function
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerData, setCustomerData] = useState(isCustomers);


    useEffect(() => {
        setCustomerData(isCustomers);
    }, [isCustomers]);

    const handleCustomerSelect = (selectedOption) => {
        setSelectedCustomer(selectedOption);
    };

    const filteredOptions = customerData?.map(user => ({
        value: user.cus_name,
        data: user,
        label: `${user.cus_name} --- ${user.cus_mobile} --- ${user.cus_company}`
    }));

    // Select Party Account Area Function
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [cusAccount, setCusAccount] = useState([]);


    useEffect(() => {
        if (selectedCustomer) {
            const filteredAccounts = isKhotiyan?.filter(acc => acc.cus_id === selectedCustomer.data._id) || [];
            setCusAccount(filteredAccounts);
        }
    }, [selectedCustomer, isKhotiyan]);


    const handleAccountSelect = (selectedOption) => {
        setSelectedAccount(selectedOption);
    };

    const filteredPartyAccount = cusAccount?.map(user => ({
        value: user._id,
        data: user,
        label: `${user.accType} --- ${user.date} --- ${user.status === true ? 'ACTIVE' : 'DEACTIVE'}`
    }));


    const genaratePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: `Account Statement: ${selectedAccount?.data?.cus_name}`,
        pageStyle: `
    @page {
      size: A4;
      margin: 0;
    }
    @media print {
      body {
        size: A4;
        margin: 0;
      }
    }
  `
    })


    return (
        <div className="mx-auto max-w-screen-lg relative md:py-10 md:px-10 px-2 ">
            <div className='fixed z-10 md:bottom-28 md:end-72'>
                <button className='btn w-[200px]  bg-[#2E3094] hover:bg-[#6b6cc2] text-white' onClick={genaratePDF}><FaPrint></FaPrint> Print</button>
            </div>
            <SectionTitle heading={'ম্যানেজ একাউন্ট'}></SectionTitle>
            <div>
                <Helmet>
                    <title>ড্যাশবোর্ড | ম্যানেজ একাউন্ট</title>
                </Helmet>
                <div className='md:flex md:justify-end md:items-center mb-4 px-2'>
                    <div className="md:flex gap-6">
                        <div>
                            <label className="label">
                                <span className="label-text">Select Party*</span>
                            </label>
                            <Select
                                className=" w-[426px]"
                                value={selectedCustomer}
                                onChange={handleCustomerSelect}
                                options={filteredOptions}
                                placeholder="Select a Party"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Select Party Account*</span>
                            </label>
                            <Select
                                isDisabled={selectedCustomer === null ? true : false}
                                className=" w-[426px]"
                                value={selectedAccount}
                                onChange={handleAccountSelect}
                                options={filteredPartyAccount}
                                placeholder="Select a Party Account"
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto p-10 pt-10 w-[8.5in]" ref={componentPDF}>
                    <div className='text-center  uppercase  mb-4'>
                        <p className='text-center font-bold'>ACCOUNT STATEMENT</p>
                        <p className='underline font-bold'>{selectedAccount?.data?.cus_name}</p>
                        <div className='flex justify-center gap-6'>
                            <p className='text-center'>Create Date: {selectedAccount?.data?.date}</p>
                            <p className='text-center'>ACCOUNT Status: {selectedAccount?.data?.status === true ? 'ACTIVE' : 'DEACTIVE'}</p>
                        </div>
                    </div>
                    <table className="table  table-xs" >
                        {/* head */}
                        <thead className=" text-black border">
                            <tr className='border text-center'>
                                <th className='border w-4'>Bill No.</th>
                                <th className='border w-24'>Date</th>
                                <th className='border'>Cost</th>
                                <th></th>
                                <th className='border w-24'>Date</th>
                                <th className='border'>Paid</th>
                                <th className='border'>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedAccount?.data?.billing?.slice().reverse().map((account) =>
                                    <tr key={account.bill_no}>
                                        <th className='border text-center w-4'>{account.bill_no}</th>
                                        <td className='border text-center w-24'>{account.cr_date}</td>
                                        <td className='border text-end'>{account.debit}</td>
                                        <td></td>
                                        <td className='border text-center w-24'>{account.cr_date}</td>
                                        <td className='border text-end'>{account.credit}</td>
                                        <td className='border text-center'>{account.debitInfo.de_total_remark}</td>
                                    </tr>
                                )
                            }
                            <tr>
                                <th className='border text-center w-4'></th>
                                <th className='border text-center w-4'>Total Cost</th>
                                <th className='border text-end'>{calculateTotalDebit(selectedAccount?.data?.billing)}</th>
                                <td></td>
                                <th className='border text-center w-24'>Total Paid</th>
                                <th className='border text-end'>{calculateTotalCredit(selectedAccount?.data?.billing)}</th>
                                <th className='border text-center'></th>
                            </tr>
                        </tbody>
                    </table>
                    <table className='mt-4'>
                        <tbody >
                            <tr className='text-sm font-bold uppercase'>
                                {
                                    calculateTotalDebit(selectedAccount?.data?.billing) - calculateTotalCredit(selectedAccount?.data?.billing) >= 0 ? <td>
                                        Total Due: {calculateTotalDebit(selectedAccount?.data?.billing) - calculateTotalCredit(selectedAccount?.data?.billing)} TK Only. (M/S Royal Hossain will receive from Party).
                                    </td> : <td>
                                        Total Paid:  {calculateTotalDebit(selectedAccount?.data?.billing) - calculateTotalCredit(selectedAccount?.data?.billing)} TK Only. (Party will receive from M/S Royal Hossain)
                                    </td>
                                }
                            </tr>
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

export default ManageAccounts;