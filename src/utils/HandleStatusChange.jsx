import { UpdateToast } from "./UpdateToast";

export const HandleStatusChange = async (axiosSecure,refetch,id,status, route) => {
    try {
        const statusData = {
            status: status
        };

        await axiosSecure.patch(`${route}${id}`, {statusData})
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    refetch()
                    UpdateToast('Status Change')
                }
            })

    } catch (error) {
        console.error(error);
    }
}