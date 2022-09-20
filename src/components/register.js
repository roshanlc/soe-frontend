import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import "./register.css"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Register() {
    const navigate = useNavigate();
    const { http, setToken } = AuthUser();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [symnbol_no, setSymbol] = useState();
    const [pu_regd_no, setRegistraion] = useState();
    const [contact_no, setNumber] = useState();
    const [program_id, setProgram] = useState();
    const [enrolled_at, setTime] = useState();
    const [semester, setSemester] = useState();




    const submitStudentForm = () => {
        // api call
        http.post('/register', { email: email, password: password, name: name, symnbol_no: symnbol_no, pu_regd_no: pu_regd_no, contact_no: contact_no, program_id: program_id, semester: semester }).then((res) => {
            navigate('/login')
        })
    }

    const submitTeacherForm = () => {
        // api call
        http.post('/register', { email: email, password: password, name: name, contact_no: contact_no,}).then((res) => {
            navigate('/login')
        })
    }
    return (
        <>
            <Tabs>
                <TabList className="mt--10">
                    <Tab>Register As Student</Tab>
                    <Tab>Register As Teacher</Tab>
                </TabList>
                <TabPanel>
                    <div className="row justify-content-left pt-5">
                        <div className="col-sm-6">
                            <div className="card p-4">
                                <h1 className="text-center mb-3">Register </h1>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" placeholder="Enter name"
                                        onChange={e => setName(e.target.value)}
                                        id="email" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email address:</label>
                                    <input type="email" className="form-control" placeholder="Enter email"
                                        onChange={e => setEmail(e.target.value)}
                                        id="email" />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter password"
                                        onChange={e => setPassword(e.target.value)}
                                        id="pwd" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Symbol No:</label>
                                    <input type="number" className="form-control" placeholder="Enter symbol no"
                                        onChange={e => setSymbol(e.target.value)}
                                        id="email" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>PU Registration No:</label>
                                    <input type="number" className="form-control" placeholder="Enter registration no"
                                        onChange={e => setRegistraion(e.target.value)}
                                        id="email" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Contact No:</label>
                                    <input type="number" className="form-control" placeholder="Enter contact no"
                                        onChange={e => setNumber(e.target.value)}
                                        id="email" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Program:</label>
                                    <select class="form-select mt-3">
                                        <option>BOCE</option>
                                        <option>BSE</option>
                                        <option>BEEE</option>
                                    </select>
                                </div>
                                <div className="form-group mt-3">
                                    <label>Semester:</label>
                                    <input type="number" className="form-control" placeholder="Enter semester"
                                        onChange={e => setSemester(e.target.value)}
                                        id="email" />
                                </div>
                                <button type="button" onClick={submitStudentForm} className="btn btn-primary mt-4">Register</button>
                            </div>
                        </div>
                    </div>

                </TabPanel>
                <TabPanel>
                    <div className="row justify-content-left pt-5">
                        <div className="col-sm-6">
                            <div className="card p-4">
                                <h1 className="text-center mb-3">Register </h1>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" placeholder="Enter name"
                                        onChange={e => setName(e.target.value)}
                                        id="email" />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email address:</label>
                                    <input type="email" className="form-control" placeholder="Enter email"
                                        onChange={e => setEmail(e.target.value)}
                                        id="email" />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter password"
                                        onChange={e => setPassword(e.target.value)}
                                        id="pwd" />
                                </div>


                                <div className="form-group mt-3">
                                    <label>Contact No:</label>
                                    <input type="number" className="form-control" placeholder="Enter contact no"
                                        onChange={e => setNumber(e.target.value)}
                                        id="email" />
                                </div>
                                {/* <div className="form-group mt-3">
                                    <label>Program:</label>
                                    <select class="form-select mt-3">
                                        <option>BOCE</option>
                                        <option>BSE</option>
                                        <option>BEEE</option>
                                    </select>
                                </div> */}

                                <button type="button" onClick={submitTeacherForm} className="btn btn-primary mt-4">Register</button>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </>


    )
}