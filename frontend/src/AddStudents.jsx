import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AddStudents(){
    const [data,setData]=useState({
        name:'',
        email:'',
        whno:'',
        college:'',
        domain:''
    })

    const navigate=useNavigate()


    const handleSubmit=(event)=>{
        event.preventDefault();
        // const formdata= new FormData();
        // formdata.append("name", data.name);
        // formdata.append("email", data.email);
        // formdata.append("whno", data.whno);
        // formdata.append("college", data.college);
        // formdata.append("domain", data.domain);
        axios.post("http://localhost:8081/create",data)
        .then(res=>{
            navigate("/Students")
        })
        .catch(err => console.log(err));
     }
    return(
        <div className="d-flex flex-column align-items-center pt-05">
            <h2>Student Registration Form</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputname" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputname" placeholder="Enter name" autoComplete="off"
                    onChange={e =>setData({...data, name:e.target.value})}/>
                </div>
                
                <div className="col-12">
                    <label htmlFor="inputemail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputemail" placeholder="Enter email" autoComplete="off"
                    onChange={e =>setData({...data, email:e.target.value})}/>
                </div>
        
                <div className="col-12">
                    <label htmlFor="inputwhatsapp" className="form-label">Whatsapp</label>
                    <input type="text" className="form-control" id="inputwhatsapp" placeholder="Enter no" autoComplete="off"
                    onChange={e =>setData({...data, whno:e.target.value})}/>
                </div>
        
                <div className="col-12">
                    <label htmlFor="inputcollege" className="form-label">College</label>
                    <input type="text" className="form-control" id="inputcollege" placeholder="Enter college" autoComplete="off"
                    onChange={e =>setData({...data, college:e.target.value})}/>
                </div>
        
                <div className="col-12">
                    <label htmlFor="inputdomain" className="form-label">Domain</label>
                    <input type="text" className="form-control" id="inputdomain" placeholder="Enter Domain" autoComplete="off"
                    onChange={e =>setData({...data, domain:e.target.value})}/>
                </div>
        
        <div className="col-12">
        <button type="submit" className="btn btn-primary">create</button>
        </div>       
        </form>
    </div>
    )
}

export default AddStudents