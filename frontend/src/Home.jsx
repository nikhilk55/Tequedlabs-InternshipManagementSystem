import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

function Home() {
    const [studentCount, setStudentCount] = useState(0);
    const [studentsWithFinishedProjects, setStudentsWithFinishedProjects] = useState(0);
    const [certificatesIssued, setCertificatesIssued] = useState(0);

    useEffect(() => {
        // Fetch the total number of students
        axios.get('http://localhost:8081/studentCount')
            .then((res) => {
                setStudentCount(res.data.students);
            })
            .catch((err) => console.log(err));

        // Fetch the total number of students with finished projects
        axios.get('http://localhost:8081/studentsWithFinishedProjects')
            .then((res) => {
                setStudentsWithFinishedProjects(res.data.students);
            })
            .catch((err) => console.log(err));

        axios.get('http://localhost:8081/certificatesIssued')
            .then((res) => {
                setCertificatesIssued(res.data.certificates);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        
        <div className="p-3 d-flex justify-content-around mt-3 home-pg">
            <div className="info-box">
                <div className="info-header">
                    <h4>Students</h4>
                </div>
                <hr />
                <div className="info-content">
                    <h5>Total: {studentCount}</h5>
                </div>
            </div>

            <div className="info-box">
                <div className="info-header">
                    <h4>Project Status</h4>
                </div>
                <hr />
                <div className="info-content">
                    <h5>Completed : {studentsWithFinishedProjects}</h5>
                </div>
            </div>

            <div className="info-box">
                <div className="info-header">
                    <h4>Certificates Issued</h4>
                </div>
                <hr />
                <div className="info-content">
                    <h5>Total : {certificatesIssued}</h5>
                </div>
            </div>

            {/* List of admins */}
            <div>
                <h3></h3>
            </div>
        </div>
    );
}

export default Home;
