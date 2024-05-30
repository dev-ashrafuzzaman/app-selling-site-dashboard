import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiousSecure";

const useOrders = (searchQuery, page, limit) => {
    const [axiosSecure] = useAxiosSecure();
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['isOrders', searchQuery, page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/orders`, {
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

export default useOrders;