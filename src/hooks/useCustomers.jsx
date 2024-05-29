import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiousSecure";



const useCustomers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isCustomers, refetch, isLoading: isCustomersLoading } = useQuery({
        queryKey: ['isCustomers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/customers`);
            return res.data;
        }
    })
    return [isCustomers,refetch, isCustomersLoading]
};

export default useCustomers;