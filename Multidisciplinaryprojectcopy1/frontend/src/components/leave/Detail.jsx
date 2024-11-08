import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
    const {id} = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/leave/detail/${id}`,{
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                if(response.data.success) {
                    setLeave(response.data.leave);
                }
            }catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchLeave()
    }, [id])
  return (
    <div>
            {leave ? (
                <div>
                    <h2>Leave Details</h2>
                    <p><strong>Leave Type:</strong> {leave.leaveType}</p>
                    <p><strong>Start Date:</strong> {leave.startDate}</p>
                    <p><strong>End Date:</strong> {leave.endDate}</p>
                    <p><strong>Reason:</strong> {leave.reason}</p>
                </div>
            ) : (
                <p>Loading leave details...</p>
            )}
        </div>
  )
}

export default Detail