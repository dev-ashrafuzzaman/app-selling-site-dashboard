
const DebitTableHead = () => {
    return (
        <div>
            <div className='flex mt-10 font-bold'>
                <input type='text' readOnly className='border-2 text-end  border-e-white w-28 border-black ' />
                <input type='text' defaultValue={'Credit'} readOnly className='border-2 border-black border-s-0 border-e-white text-center px-2 w-36' />
                <input type='text' readOnly className='border-2 text-center  border-black border-s-0  px-2 w-24' />
                <input type='text' defaultValue={'Debit'} readOnly className='border-2 text-end border-black border-s-white border-e-white  px-2 w-44' />
                <input type='text' readOnly className='border-2 border-black border-s-0 text-center px-2 w-36' />
            </div>
            <div className='flex'>
                <input type='text' defaultValue={'Date'} readOnly className='border-2 border-t-white text-center w-28 border-black ' />
                <input type='text' defaultValue={'TK.'} readOnly className='border-2 border-black border-s-white border-t-white text-center px-2 w-36' />
                <input type='text' defaultValue={'Remark'} readOnly className='border-2 text-center border-t-white  border-black border-s-white  px-2 w-24' />
                <input type='text' defaultValue={'Particular'} readOnly className='border-2 text-center border-t-white border-black border-s-white  px-2 w-44' />
                <input type='text' defaultValue={'TK.'} readOnly className='border-2 border-black border-s-0 border-t-0 text-center px-2 w-36' />
            </div>
        </div>
    );
};

export default DebitTableHead;