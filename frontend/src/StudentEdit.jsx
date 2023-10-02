import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function StudentEdit() {
    const { id } = useParams();
    const [data, setData] = useState({ project: '0', certification: '0' });

    useEffect(() => {
        // Fetch the student's data, including project and certification status, when the component mounts
        axios.get(`http://localhost:8081/get/${id}`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData({ ...data, project: res.data.Result[0].project, certification: res.data.Result[0].certification });
                } else {
                    alert('Something went wrong');
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    const navigate = useNavigate();

    const handleRadioChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'project' && value === '0') {
            // If "No" is selected for project, set certification to "0" as well
            setData({ project: '0', certification: '0' });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`http://localhost:8081/updateProjectAndCertificationStatus/${id}`, { project: data.project, certification: data.certification })
            .then(() => {
                navigate('/Students');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="d-flex flex-column align-items-center pt-5">
            <h2>Update Project and Certification Status</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label className="form-label">Project Finished?</label>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="project"
                            id="projectYes"
                            value="1"
                            checked={data.project === '1'}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor="projectYes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="project"
                            id="projectNo"
                            value="0"
                            checked={data.project === '0'}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor="projectNo">
                            No
                        </label>
                    </div>
                </div>
                {data.project === '1' && (
                    <div className="col-12">
                        <label className="form-label">Certificate Issued?</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="certification"
                                id="certificationYes"
                                value="1"
                                checked={data.certification === '1'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="certificationYes">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="certification"
                                id="certificationNo"
                                value="0"
                                checked={data.certification === '0'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="certificationNo">
                                No
                            </label>
                        </div>
                    </div>
                )}

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StudentEdit;
