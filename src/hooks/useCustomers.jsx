import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiousSecure";

const useCustomers = (searchQuery, page, limit) => {
    const [axiosSecure] = useAxiosSecure();
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['isCustomers', searchQuery, page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/customers`, {
                params: {
                    search: searchQuery,
                    page,
                    limit,
                }
            });
            return res.data;
        }
    });
    return { ...data, refetch, isLoading };
};

export default useCustomers;