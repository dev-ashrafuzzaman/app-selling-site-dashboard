const SectionTitle = ({ heading }) => {
    return (
        <div className="mx-auto text-center md:w-4/12 w-60 my-8">
            <h3 className="md:text-3xl font-bold text-black uppercase border-y-4 border-dotted py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;