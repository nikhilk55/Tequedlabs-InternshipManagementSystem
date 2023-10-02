import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link, Outlet} from 'react-router-dom'
import './style.css';

function Dashboard(){
    return(
        <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">                   
                        <span className="fs-5 d-none d-sm-inline">Admin Dashboard</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li>
                            <Link to="/home" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Students" className="nav-link px-0 align-middle text-white">
                                <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Students</span> </Link>
                        </li>
                        <li>
                        <Link to="/login" className="nav-link px-0 align-middle text-white">
                                <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col p-0 m-0 ">
                <div className='p-1 d-flex justify-content shadow size-justify'>
                <img src="Images/logo.png" alt="Logo" className="me-2 " style={{ maxHeight: '60px' }} />
                   <h4 className='align-self-center dashboard-heading' >Tequed Labs</h4> 
                </div>
                <Outlet />
            </div>
        </div>
    </div>
    )
}

export default Dashboard