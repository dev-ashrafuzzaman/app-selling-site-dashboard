import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionTitle from "../../components/SectionTitle";
import { HandleDelete } from "../../utils/HandleDelete";
import useAxiosSecure from "../../hooks/useAxiousSecure";
import { useState } from "react";
import useOrders from "../../hooks/useOrders";
import CartTotal from "../../components/CartTotal";
import { useForm } from "react-hook-form";
import { UpdateToast } from "../../utils/UpdateToast";

const ManageOrders = () => {
  const [axiosSecure] = useAxiosSecure();
  const [searchInput, setSearchInput] = useState("");
  const [modalInput, setModalInput] = useState();
  const [linkInput, setLinkInput] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const { orders, totalPages, refetch, isLoading } = useOrders(
    searchInput,
    currentPage,
    customersPerPage
  );
  console.log(orders);

  const handleSelectChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleModalOpen = (user) => {
    setLinkInput("");
    setModalInput(user);
    document.getElementById("my_modal_3").showModal();
  };

  const handleDelivary = async () => {
    console.log(linkInput);
    console.log(modalInput);

    try {
      const delivary = {
        downloadStatus: true,
        link: linkInput,
        status: "Complete",
      };

      await axiosSecure
        .patch(`/api/v1/admin/order/${modalInput._id}`, { delivary })
        .then((data) => {
          if (data.data.modifiedCount > 0) {
            refetch()
            document.getElementById("my_modal_3").close();
            setLinkInput("");
            setModalInput(null)
            UpdateToast("Delivary Success");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full md:py-10 px-2">
      <SectionTitle heading={"ম্যানেজ অর্ডার"}></SectionTitle>
      <div>
        <Helmet>
          <title>ড্যাশবোর্ড | ম্যানেজ অর্ডার</title>
        </Helmet>
        <div className="flex justify-end items-center mb-4 px-2">
          <div className="join w-full md:w-[800px]">
            <div className="w-full md:w-[800px]">
              <div>
                <input
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="input input-bordered join-item w-full"
                  value={searchInput}
                  placeholder="Search"
                />
              </div>
            </div>
            <select
              className="select select-bordered join-item"
              onChange={handleSelectChange}>
              <option disabled value={"Filter"}>
                Filter
              </option>
              <option value={""}>All</option>
            </select>
            {/* <Link className="btn join-item btn-outline " to={'/admin/dashboard/add-customer'}>Add</Link> */}
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="table">
            {/* head */}
            <thead className="bg-[#106a4f] text-white rounded-xl">
              <tr>
                <th>#</th>
                <th>ইউসার</th>
                <th>এপপ্স ডিটেলস</th>
                <th>পেমেন্ট</th>
                <th>এপপ্স</th>
                <th>স্টেটাস</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((user, index) => (
                <tr className="hover:bg-green-50" key={user._id}>
                  <th>
                    <label>
                      {(currentPage - 1) * customersPerPage + index + 1}
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/admin/dashboard/customer-details/${user.user}`}
                        className="hover:text-green-700">
                        <div className="font-bold text-center">
                          {"Visit Profile"}
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className="font-bold">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold ">
                          Apps Name: {user.appName}
                        </div>
                        <div className="font-bold ">Email: {user.email}</div>
                        <div className="font-bold ">Pass: {user.password}</div>
                        <div className="font-bold ">
                          WP Mobile: {user.mobile}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-bold">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold ">Order Id: {user._id}</div>
                        <div className="font-bold ">
                          Trax Id: {user.transactionId}
                        </div>
                        <div className="font-bold ">
                          Pay: {user.paymentMethod}
                        </div>
                        <div className="font-bold ">
                          Type: {user.paymentType}
                        </div>
                        <div className="font-bold text-red-700">
                          Total Taka: <CartTotal cart={user.cart} />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-bold">
                    <div className="flex items-center space-x-3">
                      <div>
                        {user.cart.map((order, index) => (
                          <div
                            key={index}
                            className="bg-slate-50 p-2 rounded-lg border border-dashed my-2">
                            <div>Name: {order.title}</div>
                            <div>Catagory: {order.categoryName}</div>
                            <div>Qtn: {order.quantity}</div>
                            <div>Price: {order.price * order.quantity}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>

                  <td>
                    <button
                      className={`text-sm font-bold text-white badge  ${
                        user.status === "Complete"
                          ? "bg-green-700"
                          : "bg-red-600"
                      }`}>
                      {user.status}
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handleModalOpen(user)}
                      className="btn btn-accent text-white btn-xs md:me-2">
                      Delivary
                    </button>

                    <button
                      onClick={() =>
                        HandleDelete(
                          axiosSecure,
                          refetch,
                          user._id,
                          "/api/v1/admin/order/"
                        )
                      }
                      className="btn btn-error text-white btn-xs mt-2 md:mt-1">
                      <FaTrash></FaTrash>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <div className="btn-group">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`btn btn-sm  ${
                  currentPage === i + 1 ? "btn-active" : ""
                }`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div>
            <h3 className="font-bold text-xl text-center">Delivary Details</h3>
            <input
              onChange={(e) => setLinkInput(e.target.value)}
              required
              defaultValue={modalInput?.link}
              type="text"
              placeholder="Type here delivary link"
              className="input input-bordered w-full my-2"
            />
            <button
              onClick={handleDelivary}
              className="btn w-full bg-green-700 text-white">
              Submit
            </button>
          </div>

          <p className="pt-8 text-center">
            Press ESC key or click on ✕ button to close
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default ManageOrders;
