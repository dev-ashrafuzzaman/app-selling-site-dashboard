import SectionTitle from "../../components/SectionTitle";

const SoftDetails = () => {
    const data = {
        name: 'Mr. Royal Hossain',
        devName: 'Mr. Ashrafuzzaman',
        mName: 'Mr. Kamruzzaman',
        packageName: 'Rewarder',
        packagePrice: '9500/yr',
        mCost: '0/yr',
        oCost: '0/yr',
        acDate: '01-04-2024',
        nextDate: '25-03-2025',
        softPrice: 30000,
        status: true,
        log: [
            { date: '01-04-2024', text: 'Server Change Client Server' },
            { date: '26-03-2024', text: 'SOME CHANGE Remark Change To CR SIDE' },
            { date: '14-03-2024', text: 'SOME CHANGE CR Note Clear' },
            { date: '14-03-2024', text: 'DONE ALL FILE' },
            { date: '13-03-2024', text: 'DONE Bug Fixed Bill Add Section Due Bill Calculation' },
            { date: '04-03-2024', text: 'DONE Change Profile Image TODO: ADMIN AUTH Validation Check' },
            { date: '27-02-2024', text: 'DONE SERVER UPLOAD 1ST CHECK' },
            { date: '10-02-2024', text: 'Developing Start' },
        ]
    }
    return (
        <div className="my-10">
            <SectionTitle heading={'Soft Details'}></SectionTitle>
            <div className="flex flex-col justify-center items-center gap-2">
                <div className="flex justify-center items-center gap-2">
                    <p className="border p-2">Client Name: {data.name}</p>
                    <p className="border p-2">Manager Name: {data.mName}</p>
                </div>
                <p className="border p-2">Developer Name: {data.devName}</p>

                <div className="flex justify-center items-center gap-2">
                    <p className="border p-2">Package: {data.packageName}</p>
                    <p className="border p-2">Package Price: {data.packagePrice}</p>
                    <p className="border p-2">Package Active Date: {data.acDate}</p>
                    <p className="border p-2">Package Next Bill Date: {data.nextDate}</p>
                </div>

                <div className="flex justify-center items-center gap-2">
                    <p className="border p-2">Software Price: {data.softPrice}</p>
                    <p className="border p-2">Montly Cost: {data.mCost}</p>
                    <p className="border p-2">Operation Cost: {data.oCost}</p>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-4">
                <p className="text-xl font-bold">Change Log:</p>
                {
                    data.log.map((log, index) => <div
                        className="border-2 border-dashed p-2"
                        key={index}
                    >Date:{log.date} -- {log.text}</div>)
                }
            </div>
        </div>
    );
};

export default SoftDetails;