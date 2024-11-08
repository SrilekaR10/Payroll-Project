import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/DepartmentHelper'

const Table = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    // Fetch leave data from the API
    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/leaves', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setLeaves(response.data.leaves);
            setFilteredLeaves(response.data.leaves); // Initialize filtered leaves
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };


useEffect(() => {
   fetchLeaves() 
}, [])

const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
        leave.employeeId 
           .toLowerCase()
           .includes(e.target.value.toLowerCase())
)
setFilteredLeaves(data)
}
const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
        leave.status 
           .toLowerCase()
           .includes(e.target.value.toLowerCase())
    )
    setFilteredLeaves(data)
}


  return (
    <>
    {filteredLeaves ? (
     <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
        <input 
        type="text" 
        placeholder='Search By Emp Id'
        className='px-4 py-0.5 border'
        onChange={filterByInput}
        />
        <div className='space-x-3'>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick={() => filterByButton("Pending")}>
                Pending
            </button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick={() => filterByButton("Approved")}>
                Approved
            </button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick={() => filterByButton("Rejected")}>
                Rejected
            </button>
        </div>
     </div>

    <div className='mt-3'>
        <DataTable columns={columns} data={filteredLeaves} pagination/>
    </div>
    </div>

    ) : (
    <div>Loading....</div>
)}
    </>
  )
}

export default Table