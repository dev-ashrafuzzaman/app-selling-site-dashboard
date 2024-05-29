import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import NumberToWordConverter from '../../utils/NumberToWordConverter';
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';
import { FaPrint } from 'react-icons/fa';
import logo from '../../assets/royal.jpg';
import signatore from '../../assets/signatore.png';
import './printBill.css'
import DebitTableHead from '../../component/DebitTableHead';

const PrintBill = () => {
    const { id, bill_no, lastTotalBillDue } = useParams();
    const billloadData = useLoaderData();
    const componentPDF = useRef();
    const navigate = useNavigate();

    const genaratePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: `BILL NO: ${bill_no}`,
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
  `,
        onAfterPrint: () => (setTimeout(() => {
            navigate(`/admin/dashboard/khotiyan-bill/${id}`);
        }, 500))
    })



    const GrandTotalCal = () => {
        const total = billloadData.debit + parseInt(lastTotalBillDue) - billloadData.credit;
        return total;
    }

    return (
        <div className='mx-auto max-w-screen-lg relative'>
            <div className='fixed bottom-28 end-72'>
                <button className='btn w-[200px] bg-[#2E3094] hover:bg-[#6b6cc2] text-white' onClick={genaratePDF}><FaPrint></FaPrint> Print</button>
            </div>
            <form className="p-4 pt-10 w-[8.5in]" ref={componentPDF} >
                <div className='flex  items-center gap-1 px-20 mb-16'>
                    <img src={logo} className='w-[100px]' alt="" />
                    <div>
                        <h2 className='text-[49px] font-extrabold  text-[#2E3094]'>M/S. ROYAL HOSSAIN</h2>
                        <h3 className='text-end text-[26px]  -mt-4'>Importer, Exporter & Supplier</h3>
                    </div>
                </div>
                <div className='mx-auto   px-16  text-black'>
                    <div className='flex justify-center  mb-4 text-xl  items-center gap-2'>
                        <p className='underline underline-offset-2'>BILL NO - {billloadData?.bill_no} </p>
                    </div>
                    <div className='flex justify-end w-full  gap-2 mb-2'>
                        <p className='text-xl'>{`Date: ${billloadData?.cr_date}`}</p>
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Importer Name'} readOnly className='border border-s-2 border-t-2 border-black px-2 w-36' />
                        <input defaultValue={billloadData?.billInfo?.imp_name} type='text' readOnly className='border border-black border-t-2 px-2 w-full' />
                        <input defaultValue={billloadData?.billInfo?.imp_country} type='text' readOnly className='border border-black border-t-2 border-e-2 px-2 w-24' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Exporter Name'} readOnly className='border border-s-2 w-36 border-black  px-2' />
                        <input type='text' defaultValue={billloadData?.billInfo?.exp_name} readOnly placeholder='Write Exporter Name' className='border border-black  px-2 w-full' />
                        <input type='text' defaultValue={billloadData?.billInfo?.exp_country} readOnly className='border border-black border-e-2 px-2 w-24' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Name Of Goods'} readOnly className='border border-s-2  w-36 border-black  px-2' />
                        <input defaultValue={billloadData?.billInfo?.name_goods} readOnly type='text' className='border border-black border-e-2  px-2 w-full' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'B/E No.'} readOnly className='border border-s-2 w-36 border-black  px-2' />
                        <input type='text' defaultValue={billloadData?.billInfo?.be_no} className='border border-black w-36  px-2' />
                        <input type='text' defaultValue={'Date:'} readOnly className='border border-black   px-2 w-20' />
                        <input type='text' defaultValue={billloadData?.billInfo?.be_date} className='border border-black   px-2 w-36' />
                        <input type='text' readOnly className='border border-black  px-2 w-[56px]' />
                        <input type='text' readOnly className='border border-black border-e-2  px-2  w-full' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Manifest No.'} readOnly className='border w-36 border-black  border-s-2  px-2' />
                        <input type='text' defaultValue={billloadData?.billInfo?.manifest_no} className='border border-black w-36  px-2' />
                        <input type='text' defaultValue={'Date:'} readOnly className='border border-black   px-2 w-20' />
                        <input defaultValue={billloadData?.billInfo?.manifest_date} type='text' className='border border-black   px-2 w-36' />
                        <input type='text' readOnly className='border border-black  px-2 w-[56px]' />
                        <input type='text' readOnly className='border border-black  border-e-2 px-2  w-full' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'L/C No.'} readOnly className='border w-36 border-black  border-s-2  px-2' />
                        <input type='text' defaultValue={billloadData?.billInfo?.lc_no} className='border border-black w-36  px-2' />
                        <input type='text' defaultValue={'USD $'} readOnly className='border border-black   px-2 w-20' />
                        <input type='text' defaultValue={billloadData?.billInfo?.usd} className='border border-black  border-e-2  px-2 w-full' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Gross Wt.'} readOnly className='border w-36  border-s-2 border-black  px-2' />
                        <input type='text' defaultValue={billloadData?.billInfo?.gross_wt} className='border border-black w-36  px-2' />
                        <input type='text' defaultValue={'Net Wt.'} readOnly className='border border-black   px-2 w-20' />
                        <input type='text' defaultValue={billloadData?.billInfo?.net_wt} className='border border-black   px-2 w-36' />
                        <input type='text' defaultValue={'Qty.'} readOnly className='border border-black  px-2 w-14' />
                        <input type='text' defaultValue={billloadData?.billInfo?.qty} className='border border-black  border-e-2  px-2  w-full' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Vic. No.'} readOnly className='border w-36 border-black  border-s-2 border-b-2 px-2' />
                        <input type='text' defaultValue={billloadData?.billInfo?.vic_no} className='border border-black   border-b-2  border-e-2 px-2 w-full' />
                    </div>

                    <DebitTableHead></DebitTableHead>

                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit1?.cr_date1} type='text' className='border border-s-2  text-center w-28 border-black ' />
                        </div>
                        <input defaultValue={billloadData?.creditInfo?.credit1?.cr_tk1} type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input defaultValue={billloadData?.debitInfo?.duty?.de_duty_remark} type='text' className='border text-start   border-black   px-2 w-24' />
                        <input type='text' defaultValue={'Duty'} readOnly className='border text-start  border-black   px-2 w-44' />
                        <input defaultValue={billloadData?.debitInfo?.duty?.de_duty_tk} readOnly type='text' className='border text-end border-e-2 border-black    px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit2?.cr_date2} type='text' className='border border-s-2 text-center w-28 border-black ' />
                        </div>
                        <input defaultValue={billloadData?.creditInfo?.credit2?.cr_tk2} type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input defaultValue={billloadData?.debitInfo?.misc?.de_misc_remark} type='text' className='border text-start   border-black   px-2 w-24' />
                        <input type='text' defaultValue={'Misc.'} readOnly className='border text-start  border-black   px-2 w-44' />
                        <input defaultValue={billloadData?.debitInfo?.misc?.de_misc_tk} readOnly type='text' className='border text-end border-e-2 border-black    px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit3?.cr_date3} type='text' className='border   border-s-2 text-center w-28 border-black ' />
                        </div>
                        <input defaultValue={billloadData?.creditInfo?.credit3?.cr_tk3} readOnly type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input defaultValue={billloadData?.debitInfo?.lc?.de_lc_remark} type='text' className='border text-start    border-black   px-2 w-24' />
                        <input type='text' defaultValue={'L/C Purpose'} readOnly className='border text-start  border-black   px-2 w-44' />
                        <input defaultValue={billloadData?.debitInfo?.lc?.de_lc_tk} type='text' readOnly className='border text-end  border-black  border-e-2  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit4?.cr_date4} type='text' className='border  border-s-2 text-center w-28 border-black ' />
                        </div>
                        <input defaultValue={billloadData?.creditInfo?.credit4?.cr_tk4} readOnly type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input defaultValue={billloadData?.debitInfo?.india?.de_india_remark} type='text' className='border text-start   border-black   px-2 w-24' />
                        <input type='text' defaultValue={'India Purpose'} readOnly className='border text-start  border-black   px-2 w-44' />
                        <input defaultValue={billloadData?.debitInfo?.india?.de_india_tk} readOnly type='text' className='border text-end border-e-2 border-black    px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit5?.cr_date5} type='text' className='border border-s-2 text-center w-28 border-black ' />
                        </div>
                        <input defaultValue={billloadData?.creditInfo?.credit5?.cr_tk5} readOnly type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input defaultValue={billloadData?.debitInfo?.text1?.de_any1_remark} type='text' className='border text-start   border-black   px-2 w-24' />
                        <input defaultValue={billloadData?.debitInfo?.text1?.text_any1} type='text' className='border text-start  border-black   px-2 w-44' />
                        <input defaultValue={billloadData?.debitInfo?.text1?.de_any1_tk} type='text' className='border text-end  border-black border-e-2   px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit6?.cr_date6} type='text' className='border border-s-2 text-center w-28 border-black ' />
                        </div>
                        <input defaultValue={billloadData?.creditInfo?.credit6?.cr_tk6} readOnly type='text' className='border text-end  font-bold border-black    px-2 w-36' />
                        <input defaultValue={billloadData?.debitInfo?.text2?.de_any2_remark} type='text' className='border text-start  border-black   px-2 w-24' />
                        <input defaultValue={billloadData?.debitInfo?.text2?.text_any2} type='text' className='border text-start  border-black   px-2 w-44' />
                        <input defaultValue={billloadData?.debitInfo?.text2?.de_any2_tk} readOnly type='text' className='border text-end  border-e-2 border-black    px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit7?.cr_date7} type='text' className='border border-s-2 text-center w-28 border-black ' />
                        </div>
                        <input defaultValue={billloadData?.creditInfo?.credit7?.cr_tk7} readOnly type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input type='text' defaultValue={billloadData?.debitInfo?.de_total_remark} className='border text-start  border-black   px-2 w-24' />
                        <input type='text' defaultValue={'TOTAL TAKA'} readOnly className='border text-start  border-black   px-2 w-44' />
                        <input type='text' readOnly defaultValue={billloadData.debit} className='border text-end  border-black border-e-2   px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input defaultValue={billloadData?.creditInfo?.credit8?.cr_date8} type='text' className='border border-s-2  text-center  w-28 border-black ' />
                        </div>
                        <input type='text' defaultValue={billloadData?.creditInfo?.credit8?.cr_tk8} readOnly className='border text-end font-bold  border-black    px-2 w-36' />
                        <input type='text' defaultValue={billloadData?.debitInfo?.due_lastbill_remark} className='border text-start   border-black   px-2 w-24' />
                        <div className='flex'>
                            <input type='text' defaultValue={'Due Bill No.'} readOnly className=' border text-start  border-black   px-2 w-[100px]' />
                            <input type='text' defaultValue={billloadData.last_bill_no} readOnly className='border  border-black   px-1 w-[76px]' />
                        </div>
                        <input type='text' readOnly defaultValue={lastTotalBillDue} className='border text-end  border-black  border-e-2  px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input type='text' readOnly className='border  border-s-2    w-[112px] border-black ' />
                        </div>
                        <input type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input type='text' readOnly className='border text-start   border-black   px-2 w-24' />
                        <input type='text' defaultValue={'Total Bill'} readOnly className='border font-bold text-start  border-black   px-2 w-44' />
                        <input type='text' defaultValue={billloadData.debit + parseInt(lastTotalBillDue)} readOnly className='border border-e-2 text-end font-bold border-black    px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <div className='flex w-28'>
                            <input type='text' readOnly className='border border-s-2  text-start w-28 border-black ' />
                        </div>
                        <input type='text' className='border text-end font-bold  border-black    px-2 w-36' />
                        <input type='text' readOnly className='border text-start   border-black   px-2 w-24' />
                        <input type='text' defaultValue={'Paid (-)'} readOnly className='border  text-start  border-black   px-2 w-44' />
                        <input type='text' readOnly defaultValue={billloadData.credit} className='border text-end font-bold border-black border-e-2   px-2 w-36' />
                    </div>
                    <div className='flex'>
                        <input type='text' defaultValue={'Total'} readOnly className='border  border-s-2 border-b-2 text-center w-28 border-black ' />
                        <input type='text' readOnly defaultValue={billloadData.credit} className='border text-end font-bold   border-black  border-b-2  px-2 w-36' />
                        <input type='text' readOnly className='border text-start   border-black  border-b-2  px-2 w-24' />
                        <input type='text' defaultValue={'G. Total'} readOnly className='border font-bold text-start border-b-2 border-black   px-2 w-44' />
                        <input type='text' readOnly defaultValue={GrandTotalCal()} className='border text-end font-bold border-black  border-b-2 border-e-2  px-2 w-36' />
                    </div>
                    <h3 className='mt-6 uppercase'>In Words: {NumberToWordConverter(GrandTotalCal())}</h3>
                </div>
                <div className='flex justify-end pe-10'>
                    <img src={signatore} className='w-1/5' alt="" />
                </div>
                <div className=''>
                    <div className='flex justify-evenly items-center text-xs '>
                        <div className='w-[55%]'>
                            <div className='mb-2'>
                                <p className='font-bold'>Benapole Office:</p>
                                <p>490, Rahman Chamber (4th Floor), Room No-521/522 Benapole Bazar, Jashore.</p>
                            </div>
                            <div>
                                <p className='font-bold'>Dhaka Office:</p>
                                <p>3/12, Nazimuddin Baro Bhuyan Market (1st Floor) Jonson Road, Victoriya Park, Dhaka-1100, Bangladesh.</p>
                            </div>
                        </div>
                        <div className='text-sm'>
                            <p>royalhosson@gmail.com, royalhossain022@gmail.com</p>
                            <p className='text-end'>01712-924651, 01729-199453, 01329-639600-23</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PrintBill;