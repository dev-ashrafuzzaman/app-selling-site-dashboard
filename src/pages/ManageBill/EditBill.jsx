import { ToastContainer } from 'react-toastify';
import SectionTitle from '../../components/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { ErrorToast, UpdateToast } from '../../utils/UpdateToast';
import useAxiosSecure from '../../hooks/useAxiousSecure';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NumberToWordConverter from '../../utils/NumberToWordConverter';
import useKhotiyan from '../../hooks/useKhotiyan';
import DebitTableHead from '../../component/DebitTableHead';
const EditBill = () => {

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { id, bill_no, lastTotalBillDue } = useParams();
    const billloadData = useLoaderData();
    const [isKhotiyan, refetch] = useKhotiyan();



    const [creditTk1, setcreditTk1] = useState(billloadData?.creditInfo?.credit1?.cr_tk1);
    const credit1 = (e) => {
        const credit1Tk = parseInt(e.target.value);
        setcreditTk1(credit1Tk);
    };


    const [creditTk2, setcreditTk2] = useState(billloadData?.creditInfo?.credit2?.cr_tk2);
    const credit2 = (e) => {
        const credit2Tk = parseInt(e.target.value);
        setcreditTk2(credit2Tk);
    };

    const [creditTk3, setcreditTk3] = useState(billloadData?.creditInfo?.credit3?.cr_tk3);
    const credit3 = (e) => {
        const credit3Tk = parseInt(e.target.value);
        setcreditTk3(credit3Tk);
    };
    const [creditTk4, setcreditTk4] = useState(billloadData?.creditInfo?.credit4?.cr_tk4);
    const credit4 = (e) => {
        const credit4Tk = parseInt(e.target.value);
        setcreditTk4(credit4Tk);
    };
    const [creditTk5, setcreditTk5] = useState(billloadData?.creditInfo?.credit5?.cr_tk5);
    const credit5 = (e) => {
        const credit5Tk = parseInt(e.target.value);
        setcreditTk5(credit5Tk);
    };
    const [creditTk6, setcreditTk6] = useState(billloadData?.creditInfo?.credit6?.cr_tk6);
    const credit6 = (e) => {
        const credit6Tk = parseInt(e.target.value);
        setcreditTk6(credit6Tk);
    };
    const [creditTk7, setcreditTk7] = useState(billloadData?.creditInfo?.credit7?.cr_tk7);
    const credit7 = (e) => {
        const credit7Tk = parseInt(e.target.value);
        setcreditTk7(credit7Tk);
    };
    const [creditTk8, setcreditTk8] = useState(billloadData?.creditInfo?.credit8?.cr_tk8);
    const credit8 = (e) => {
        const credit8Tk = parseInt(e.target.value);
        setcreditTk8(credit8Tk);
    };


    const creditTkTotal = () => {
        const creTotal = creditTk1 + creditTk2 + creditTk3 + creditTk4 + creditTk5 + creditTk6 + creditTk7 + creditTk8;
        return creTotal;
    }


    const [debitTk1, setdebitTk1] = useState(billloadData?.debitInfo?.duty?.de_duty_tk);

    const debit1 = (e) => {
        const debit1Tk = parseInt(e.target.value);
        setdebitTk1(debit1Tk);
    };


    const [debitTk2, setdebitTk2] = useState(billloadData?.debitInfo?.misc?.de_misc_tk);

    const debit2 = (e) => {
        const debit2Tk = parseInt(e.target.value);
        setdebitTk2(debit2Tk);
    };

    const [debitTk3, setdebitTk3] = useState(billloadData?.debitInfo?.lc?.de_lc_tk);

    const debit3 = (e) => {
        const debit3Tk = parseInt(e.target.value);
        setdebitTk3(debit3Tk);
    };


    const [debitTk4, setdebitTk4] = useState(billloadData?.debitInfo?.india?.de_india_tk);

    const debit4 = (e) => {
        const debit4Tk = parseInt(e.target.value);
        setdebitTk4(debit4Tk);
    };

    const [debitTk5, setdebitTk5] = useState(billloadData?.debitInfo?.text1?.de_any1_tk);

    const debit5 = (e) => {
        const debit5Tk = parseInt(e.target.value);
        setdebitTk5(debit5Tk);
    };


    const [debitTk6, setdebitTk6] = useState(billloadData?.debitInfo?.text2?.de_any2_tk);

    const debit6 = (e) => {
        const debit6Tk = parseInt(e.target.value);
        setdebitTk6(debit6Tk);
    };

    const [lastBillInfo, setLastBillInfo] = useState({ lastBillNo: 0, lastBillDue: 0 });

    const getLastBillInfo = (id) => {
        const account = isKhotiyan?.find(acc => acc._id === id);
        if (account) {
            const lastBill = account.billing.find(bill => bill.bill_no === billloadData.last_bill_no);
            if (typeof lastBill === 'undefined') {
                return {
                    lastBillNo: 0,
                    lastBillDue: 0
                };
            }
            return {
                lastBillNo: lastBill.bill_no,
                lastBillDue: lastBill.debit - lastBill.credit
            };
        }
        return {
            lastBillNo: 0,
            lastBillDue: 0
        };
    };

    useEffect(() => {
        if (id) {
            const info = getLastBillInfo(id);
            setLastBillInfo(info);
        }
    }, [id, refetch]);



    const debitTkTotal = () => {
        const deTotal = debitTk1 + debitTk2 + debitTk3 + debitTk4 + debitTk5 + debitTk6;
        return deTotal;
    }


    const totalBillCal = () => {
        const debitTotalTK = debitTkTotal()
        const total = debitTotalTK + parseInt(lastTotalBillDue);
        return total
    }

    const grandTotal = () => {
        const totalBill = totalBillCal()
        const totalPaid = creditTkTotal()
        const total = totalBill - totalPaid
        return total;
    }




    const onSubmit = async (data) => {
        try {
            const editedBill = {
                cr_date: data.cr_date,
                billInfo: {
                    imp_name: data.imp_name,
                    imp_country: data.imp_country,
                    exp_name: data.exp_name,
                    exp_country: data.exp_country,
                    name_goods: data.name_goods,
                    be_no: data.be_no,
                    be_date: data.be_date,
                    manifest_no: data.manifest_no,
                    manifest_date: data.manifest_date,
                    lc_no: data.lc_no,
                    usd: data.usd,
                    gross_wt: data.gross_wt,
                    net_wt: data.net_wt,
                    qty: data.qty,
                    vic_no: data.vic_no,
                },
                creditInfo: {
                    credit1: {
                        cr_date1: data.cr_date1,
                        cr_tk1: parseInt(data.cr_tk1) || parseInt(0),
                    },
                    credit2: {
                        cr_date2: data.cr_date2,
                        cr_tk2: parseInt(data.cr_tk2) || parseInt(0),
                    },
                    credit3: {
                        cr_date3: data.cr_date3,
                        cr_tk3: parseInt(data.cr_tk3) || parseInt(0),
                    },
                    credit4: {
                        cr_date4: data.cr_date4,
                        cr_tk4: parseInt(data.cr_tk4) || parseInt(0),
                    },
                    credit5: {
                        cr_date5: data.cr_date5,
                        cr_tk5: parseInt(data.cr_tk5) || parseInt(0),
                    },
                    credit6: {
                        cr_date6: data.cr_date6,
                        cr_tk6: parseInt(data.cr_tk6) || parseInt(0),
                    },
                    credit7: {
                        cr_date7: data.cr_date7,
                        cr_tk7: parseInt(data.cr_tk7) || parseInt(0),
                    },
                    credit8: {
                        cr_date8: data.cr_date8,
                        cr_tk8: parseInt(data.cr_tk8) || parseInt(0),
                    },

                },
                debitInfo: {
                    duty: {
                        de_duty_remark: data.de_duty_remark,
                        de_duty_tk: parseInt(data.de_duty_tk) || parseInt(0),
                    },
                    misc: {
                        de_misc_remark: data.de_misc_remark,
                        de_misc_tk: parseInt(data.de_misc_tk) || parseInt(0),
                    },
                    lc: {
                        de_lc_remark: data.de_lc_remark,
                        de_lc_tk: parseInt(data.de_lc_tk) || parseInt(0),
                    },
                    india: {
                        de_india_remark: data.de_india_remark,
                        de_india_tk: parseInt(data.de_india_tk) || parseInt(0),
                    },
                    text1: {
                        text_any1: data.text_any1,
                        de_any1_remark: data.de_any1_remark,
                        de_any1_tk: parseInt(data.de_any1_tk) || parseInt(0),
                    },
                    text2: {
                        text_any2: data.text_any2,
                        de_any2_remark: data.de_any2_remark,
                        de_any2_tk: parseInt(data.de_any2_tk) || parseInt(0),
                    },
                    de_total_remark: data.de_total_remark,
                    due_lastbill_remark: data.due_lastbill_remark,
                },
                last_bill_no: billloadData?.last_bill_no,
                credit: parseInt(creditTkTotal()) || 0,
                debit: parseInt(debitTkTotal()) || 0,

            };
            await axiosSecure.patch(`/api/v1/admin/editBill/${id}/${bill_no}`, { editedBill })
                .then(data => {
                    if (data.data.success) {
                        UpdateToast('BILL EDITED')
                        console.log('Bill edited successfully!');
                        setTimeout(() => {
                            navigate(`/admin/dashboard/khotiyan-bill/${id}`);
                        }, 2000)

                    } else {
                        ErrorToast('BILL EDITED')
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full mx-auto">
            <ToastContainer></ToastContainer>
            <SectionTitle heading={'বিল আপডেট'}></SectionTitle>
            <Helmet>
                <title>ড্যাশবোর্ড | বিল আপডেট</title>
            </Helmet>
            <p className='text-center text-red-600 text-xl font-bold'>সতর্ক: এই পেজটি রিফ্রেশ করা যাবেনা !!!</p>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4" >

                <div className='mx-auto mt-10 w-[8.27in] h-[11.69in] border border-black px-16 pt-48 text-black'>
                    <div className='flex justify-center ps-40 mb-4 text-xl font-bold items-center gap-2'>
                        <p>Bill No- </p>
                        <input type='number' readOnly value={billloadData?.bill_no}  {...register("bill_no")} />
                    </div>
                    <div className='flex justify-end gap-2 mb-2'>
                        <p className=''>Date:</p>
                        <input type='date' value={billloadData?.cr_date} readOnly {...register("cr_date", { required: true })} />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Importer Name'} readOnly className='border border-black px-2 w-36' />
                        <input {...register("imp_name")} defaultValue={billloadData?.billInfo?.imp_name} type='text' placeholder='Write Importer Name' className='border border-y-black px-2 w-full' />
                        <input {...register("imp_country")} defaultValue={billloadData?.billInfo?.imp_country} type='text' placeholder='Country' className='border border-black px-2 w-24' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Exporter Name'} readOnly className='border w-36 border-black border-t-white px-2' />
                        <input {...register("exp_name")} type='text' defaultValue={billloadData?.billInfo?.exp_name} placeholder='Write Exporter Name' className='border border-y-black border-t-white px-2 w-full' />
                        <input {...register("exp_country")} type='text' defaultValue={billloadData?.billInfo?.exp_country} placeholder='Country' className='border border-black border-t-white px-2 w-24' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Name Of Goods'} readOnly className='border w-36 border-black border-t-white px-2' />
                        <input {...register("name_goods")} defaultValue={billloadData?.billInfo?.name_goods} type='text' placeholder='Write Name Of Goods' className='border border-black border-s-white border-t-white px-2 w-full' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'B/E No.'} readOnly className='border w-36 border-black border-t-white px-2' />
                        <input {...register("be_no")} type='text' defaultValue={billloadData?.billInfo?.be_no} placeholder='Write B/E No' className='border border-y-black w-36 border-t-white px-2' />
                        <input type='text' defaultValue={'Date:'} readOnly className='border border-black  border-t-white px-2 w-20' />
                        <input {...register("be_date")} type='date' defaultValue={billloadData?.billInfo?.be_date} className='border border-black border-t-white border-x-white px-2 w-36' />
                        <input type='text' readOnly className='border border-black border-t-white px-2 w-14' />
                        <input type='text' readOnly className='border border-black border-t-white border-s-white px-2 w-24' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Manifest No.'} readOnly className='border w-36 border-black border-t-white px-2' />
                        <input {...register("manifest_no")} type='text' defaultValue={billloadData?.billInfo?.manifest_no} placeholder='Write Manifest No' className='border border-y-black w-36 border-t-white px-2' />
                        <input type='text' defaultValue={'Date:'} readOnly className='border border-black  border-t-white px-2 w-20' />
                        <input {...register("manifest_date")} defaultValue={billloadData?.billInfo?.manifest_date} type='date' className='border border-black border-t-white border-x-white px-2 w-36' />
                        <input type='text' readOnly className='border border-black border-t-white px-2 w-14' />
                        <input type='text' readOnly className='border border-black border-t-white border-s-white px-2 w-24' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'L/C No.'} readOnly className='border w-36 border-black border-t-white px-2' />
                        <input {...register("lc_no")} type='text' defaultValue={billloadData?.billInfo?.lc_no} placeholder='Write L/C No' className='border border-y-black w-36 border-t-white px-2' />
                        <input type='text' defaultValue={'USD $'} readOnly className='border border-black  border-t-white px-2 w-20' />
                        <input {...register("usd")} type='text' defaultValue={billloadData?.billInfo?.usd} placeholder='Write USD $' className='border border-black border-t-white border-s-white px-2 w-full' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Gross Wt.'} readOnly className='border w-36 border-black border-t-white px-2' />
                        <input {...register("gross_wt")} type='text' defaultValue={billloadData?.billInfo?.gross_wt} placeholder='Write Gross Wt' className='border border-y-black w-36 border-t-white px-2' />
                        <input type='text' defaultValue={'Net Wt.'} readOnly className='border border-black  border-t-white px-2 w-20' />
                        <input {...register("net_wt")} type='text' defaultValue={billloadData?.billInfo?.net_wt} placeholder='Write Net Wt' className='border border-black border-t-white border-x-white px-2 w-36' />
                        <input type='text' defaultValue={'Qty.'} readOnly className='border border-black border-t-white px-2 w-14' />
                        <input {...register("qty")} type='text' defaultValue={billloadData?.billInfo?.qty} placeholder='Write Qty' className='border border-black border-t-white border-s-white px-2 w-24' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Vic. No.'} readOnly className='border w-36 border-black border-t-white px-2' />
                        <input {...register("vic_no")} type='text' defaultValue={billloadData?.billInfo?.vic_no} placeholder='Write Vehicle. No.' className='border border-black border-s-white border-t-white px-2 w-full' />
                    </div>

                    <DebitTableHead></DebitTableHead>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input  {...register("cr_note1")} defaultValue={billloadData?.creditInfo?.credit1?.cr_note1} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date1")} defaultValue={billloadData?.creditInfo?.credit1?.cr_date1} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input  {...register("cr_tk1")} value={creditTk1} type='number' onChange={(e) => credit1(e)} className='border text-end font-bold  border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("de_duty_remark")} defaultValue={billloadData?.debitInfo?.duty?.de_duty_remark} type='text' className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'Duty'} readOnly className='border text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input {...register("de_duty_tk")} value={debitTk1} type='number' onChange={(e) => debit1(e)} className='border text-end  border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input {...register("cr_note2")} defaultValue={billloadData?.creditInfo?.credit2?.cr_note2} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date2")} defaultValue={billloadData?.creditInfo?.credit2?.cr_date2} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input {...register("cr_tk2")} value={creditTk2} type='number' onChange={(e) => credit2(e)} className='border text-end font-bold  border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("de_misc_remark")} defaultValue={billloadData?.debitInfo?.misc?.de_misc_remark} type='text' className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'Misc.'} readOnly className='border text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input {...register("de_misc_tk")} value={debitTk2} type='number' onChange={(e) => debit2(e)} className='border text-end  border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input {...register("cr_note3")} defaultValue={billloadData?.creditInfo?.credit3?.cr_note3} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date3")} defaultValue={billloadData?.creditInfo?.credit3?.cr_date3} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input {...register("cr_tk3")} value={creditTk3} type='number' onChange={(e) => credit3(e)} className='border text-end font-bold  border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("de_lc_remark")} defaultValue={billloadData?.debitInfo?.lc?.de_lc_remark} type='text' className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'L/C Purpose'} readOnly className='border text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input {...register("de_lc_tk")} value={debitTk3} type='number' onChange={(e) => debit3(e)} className='border text-end  border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input {...register("cr_note4")} defaultValue={billloadData?.creditInfo?.credit4?.cr_note4} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date4")} defaultValue={billloadData?.creditInfo?.credit4?.cr_date4} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input {...register("cr_tk4")} value={creditTk4} type='number' onChange={(e) => credit4(e)} className='border text-end font-bold  border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("de_india_remark")} defaultValue={billloadData?.debitInfo?.india?.de_india_remark} type='text' className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'India Purpose'} readOnly className='border text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input {...register("de_india_tk")} value={debitTk4} type='number' onChange={(e) => debit4(e)} className='border text-end  border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input {...register("cr_note5")} defaultValue={billloadData?.creditInfo?.credit5?.cr_note5} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date5")} defaultValue={billloadData?.creditInfo?.credit5?.cr_date5} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input {...register("cr_tk5")} value={creditTk5} type='number' onChange={(e) => credit5(e)} className='border text-end font-bold  border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("de_any1_remark")} defaultValue={billloadData?.debitInfo?.text1?.de_any1_remark} type='text' className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input {...register("text_any1")} defaultValue={billloadData?.debitInfo?.text1?.text_any1} type='text' className='border text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input {...register("de_any1_tk")} value={debitTk5} type='number' onChange={(e) => debit5(e)} className='border text-end  border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input {...register("cr_note6")} defaultValue={billloadData?.creditInfo?.credit6?.cr_note6} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date6")} defaultValue={billloadData?.creditInfo?.credit6?.cr_date6} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input {...register("cr_tk6")} value={creditTk6} type='number' onChange={(e) => credit6(e)} className='border text-end  font-bold border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("de_any2_remark")} defaultValue={billloadData?.debitInfo?.text2?.de_any2_remark} type='text' className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input {...register("text_any2")} defaultValue={billloadData?.debitInfo?.text2?.text_any2} type='text' className='border text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input {...register("de_any2_tk")} value={debitTk6} type='number' onChange={(e) => debit6(e)} className='border text-end   border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input {...register("cr_note7")} defaultValue={billloadData?.creditInfo?.credit7?.cr_note7} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date7")} defaultValue={billloadData?.creditInfo?.credit7?.cr_date7} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input {...register("cr_tk7")} value={creditTk7} type='number' onChange={(e) => credit7(e)} className='border text-end font-bold  border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("de_total_remark")} type='text' defaultValue={billloadData?.debitInfo?.de_total_remark} className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'TOTAL TAKA'} readOnly className='border text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input {...register("de_total_tk")} type='number' readOnly value={debitTkTotal()} className='border text-end  border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input {...register("cr_note8")} defaultValue={billloadData?.creditInfo?.credit8?.cr_note8} type='text' placeholder='Note' className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input {...register("cr_date8")} defaultValue={billloadData?.creditInfo?.credit8?.cr_date8} type='date' className='border border-t-white  text-start w-28 border-black ' />
                        </div>
                        <input {...register("cr_tk8")} value={creditTk8} type='number' onChange={(e) => credit8(e)} className='border text-end font-bold  border-black border-s-white border-t-white  px-2 w-36' />
                        <input {...register("due_lastbill_remark")} type='text' defaultValue={billloadData?.debitInfo?.due_lastbill_remark} className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <div className='flex w-44'>
                            <input type='text' defaultValue={'Due Bill No.'} readOnly className=' border text-start border-t-white border-black border-s-white  px-2 w-28' />
                            <input {...register("due_last_bill")} type='number' value={lastBillInfo.lastBillNo} readOnly className='border  border-t-white border-black border-s-white  px-1 w-44' />
                        </div>
                        <input {...register("due_lastbill_tk")} type='number' readOnly value={lastTotalBillDue} className='border text-end  border-black  border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input type='text' readOnly className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input type='text' readOnly className='border border-t-white   w-18 border-black ' />
                        </div>
                        <input type='text' className='border text-end font-bold  border-black  border-t-white  px-2 w-36' />
                        <input type='text' readOnly className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'Total Bill'} readOnly className='border font-bold text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input type='number' {...register("due_total_bill")} value={totalBillCal()} readOnly className='border text-end font-bold border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            {/* <input type='text' readOnly className='border  border-t-white text-start w-10 border-black ' /> */}
                            <input type='text' readOnly className='border border-t-white border-e-white text-start w-28 border-black ' />
                        </div>
                        <input type='text' className='border text-end font-bold  border-black  border-t-white  px-2 w-36' />
                        <input type='text' readOnly className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'Paid (-)'} readOnly className='border  text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input type='number' {...register("paid_tk")} readOnly value={creditTkTotal()} className='border text-end font-bold border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Total'} readOnly className='border  border-t-white  text-center w-28 border-black ' />
                        <input type='number' {...register("total_paid_tk")} readOnly value={creditTkTotal()} className='border text-end font-bold border-s-white  border-black  border-t-white  px-2 w-36' />
                        <input type='text' readOnly className='border text-start border-t-white  border-black border-s-white  px-2 w-24' />
                        <input type='text' defaultValue={'G. Total'} readOnly className='border font-bold text-start border-t-white border-black border-s-white  px-2 w-44' />
                        <input type='number' {...register("gTotal_tk")} readOnly value={grandTotal()} className='border text-end font-bold border-black border-s-white border-t-white  px-2 w-36' />
                    </div>
                    <h3 className='mt-6 uppercase'>In Words: {NumberToWordConverter(grandTotal())}</h3>
                </div>



                <div className='flex justify-end items-center'>
                    <button type="submit" className="py-2 btn  rounded bg-green-700 hover:bg-[#36a977] font-semibold text-white mt-6 md:w-[200px] w-full">
                        বিল আপডেট
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBill;