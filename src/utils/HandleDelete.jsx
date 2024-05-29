import Swal from "sweetalert2";
import { UpdateToast } from "./UpdateToast";

export const HandleDelete = async (axiosSecure, refetch, id, route) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
        const data = await axiosSecure.delete(`${route}${id}`);
        
        if (data.data.deletedCount > 0) {
            refetch();
            UpdateToast('Delete')
        }
    }
}