import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiousSecure";



const useKhotiyan = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isKhotiyan, refetch, isLoading: isKhotiyanLoading } = useQuery({
        queryKey: ['isKhotiyan'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/khotiyans`);
            return res.data;
        }
    })
    return [isKhotiyan,refetch, isKhotiyanLoading]
};

export default useKhotiyan;