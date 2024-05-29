import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiousSecure";



const useUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: isUsers, refetch, isLoading: isUsersLoading } = useQuery({
        queryKey: ['isUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/admin/users`);
            return res.data;
        }
    })
    return [isUsers,refetch, isUsersLoading]
};

export default useUsers;