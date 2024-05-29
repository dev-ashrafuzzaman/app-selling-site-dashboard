import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiousSecure";



const useAdminStat = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isAdminStat, refetch, isLoading: isAdminStatLoading } = useQuery({
        queryKey: ['isAdminStat'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/stat`);
            return res.data;
        }
    })
    return [isAdminStat,refetch, isAdminStatLoading]
};

export default useAdminStat;