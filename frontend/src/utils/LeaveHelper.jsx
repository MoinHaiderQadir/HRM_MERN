// import { useNavigate } from "react-router-dom";


// export const columns = [
//     {
//         name: "S No",
//         selector: (row) => row.sno,
//         width: "70px",
//     },
//     {
//         name: "Emp Id",
//         selector: (row) => row.employeeeId,
//         width: "120px",
//     },
//     {
//         name: "Name",
//         selector: (row) => row.name,
//         width: "120px",
//     },
//     {
//         name: "Department",
//         selector: (row) => row.department,
//         width: "170px",
//     },
//     {
//         name: "Days",
//         selector: (row) => row.days,
//         width: "80px",
//     },
//     {
//         name: "Status",
//         selector: (row) => row.status,
//         width: "120px",
//     },
//     {
//         name: "Action",
//         selector: (row) => row.action,
//         center:true,
//     },
    

// ]

// // export const LeaveButtons = ({Id}) => {
// //     const navigate = useNavigate();

// //     const handleView = (id)=>{
// //         navigate(`/admin-dashboard/leave/${id}`);
// //     };

// //     return(
// //         <button 
// //         className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
// //         onClick={() => handleView(Id)}
// //         >
// //             View
// //         </button>
// //     )

// // }

// export const LeaveButtons = ({ _id, handleDelete }) => {
//     const navigate = useNavigate();

//     return (
//         <div className="flex gap-2">
//             <button
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//                 onClick={() => navigate(`/admin-dashboard/leave/${_id}`)}
//             >
//                 View
//             </button>
//             <button
//                 className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
//                 onClick={() => handleDelete(_id)}
//             >
//                 Delete
//             </button>
//         </div>
//     );
// };