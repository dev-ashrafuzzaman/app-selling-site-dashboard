import {
    createBrowserRouter
} from "react-router-dom";
import NotFound from "../NotFound";
import AdminAuth from "../pages/AdminAuth/AdminAuth";
import AdminHome from "../pages/Dashboard/AdminHome";
import Dashboard from "../layout/Dashboard";
import ManageAdmins from "../pages/ManageAdmins/ManageAdmins";
import AddCustomer from "../pages/ManageCustomers/AddCustomer";
import ManageCustomers from "../pages/ManageCustomers/ManageCustomers";
import DetailsCustomer from "../pages/ManageCustomers/DetailsCustomer";
import { serverURL } from "../hooks/useAxiousSecure";
import ManageBill from "../pages/ManageBill/ManageBill";
import AddBill from "../pages/ManageBill/AddBill";
import EditBill from "../pages/ManageBill/EditBill";
import PrintBill from "../pages/ManageBill/PrintBill";
import ManageAccounts from "../pages/ManageAccounts/ManageAccounts";
import SoftDetails from "../pages/SoftDetails/SoftDetails";
import ManageOrders from "../pages/ManageOrders/ManageOrders";

export const router = createBrowserRouter([
    {
        path: 'admin-auth/validation',
        element: <AdminAuth></AdminAuth>
    },
    {
        path: 'print-bill/:id/:bill_no/:lastTotalBillDue',
        element: <PrintBill></PrintBill>,
        loader: ({ params }) => fetch(`${serverURL}/api/v1/public/getsinglebill/${params.id}/${params.bill_no}`)
    },
    {
        path: "admin/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'home',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'manage-admins',
                element: <ManageAdmins></ManageAdmins>
            },
      
            {
                path: 'manage-customers',
                element: <ManageCustomers></ManageCustomers>
            },
            {
                path: 'customer-details/:id',
                element: <DetailsCustomer></DetailsCustomer>,
                loader: ({ params }) => fetch(`${serverURL}/api/v1/public/customer/${params.id}`)
            },
            {
                path: 'add-bill/:id',
                element: <AddBill></AddBill>
            },
            {
                path: 'edit-bill/:id/:bill_no/:lastTotalBillDue',
                element: <EditBill></EditBill>,
                loader: ({ params }) => fetch(`${serverURL}/api/v1/public/getsinglebill/${params.id}/${params.bill_no}`)
            },
            {
                path: 'khotiyan-bill/:id',
                element: <ManageBill></ManageBill>,
                loader: ({ params }) => fetch(`${serverURL}/api/v1/public/khotiyan/${params.id}`)
            },
            {
                path: 'manage-orders',
                element: <ManageOrders></ManageOrders>
            },
            {
                path: 'manage-details',
                element: <SoftDetails></SoftDetails>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }
])
