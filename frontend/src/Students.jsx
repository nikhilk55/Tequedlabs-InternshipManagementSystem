import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

function Students(){
   const [data , setData] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:8081/getStudents')
      .then(res=>{
        if(res.data.Status=="Success"){
            setData(res.data.Result);
        }
        else{
            alert("Something went wrong");
        }
      })
      .catch(err=>console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/'+id)
        .then(res=>{
            if(res.data.Status=="Success"){
                window.location.reload(true);
            }
            else{
                alert("Something went wrong");
            }
          })
          .catch(err=>console.log(err));
    }

    return(
        <div className="px-5 py-3">
            <div className="d-flex justify-content-center mt-2">
                <h3>Students list</h3>
            </div>
            <Link to="/create" className="btn btn-success">Add Student</Link>
            <div className='mt-3'>
            <table className="table">
                <thead>
                   <tr>
                     <th>Id</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Whatsapp</th>
                     <th>College</th>
                     <th>Domain</th>
                     <th>Project Finished?</th>                  
                     <th>Certificate Issued?</th>                  
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((students,index)=>{
                         return <tr key={index}>
                                <td>{students.id}</td>
                                <td>{students.name}</td>
                                <td>{students.email}</td>
                                <td>{students.whno}</td>
                                <td>{students.college}</td>
                                <td>{students.domain}</td>
                                <td>{students.project? "Yes":"No"}
                                </td>
                                <td>{students.certification? "Yes":"No"}</td>
                                <td>
                                    <Link to={`/StudentEdit/`+students.id} className="btn btn-primary btn-sm me-2">Update</Link>
                                </td>
                                <td><button onClick={e=>handleDelete(students.id)}className="btn btn-sm btn-danger">delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Students