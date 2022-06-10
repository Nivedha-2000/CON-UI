import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ checkAuth }) {

    let navigate = useNavigate();

    const goToLogin = () => {
        navigate('/dashboard/scheduler-02');
        localStorage.setItem('auth', true);
    }

    return (
        <>
            <div className="fixed-background"></div>
            <main>
                <div className="container">
                    <div className="row h-100">
                        <div className="col-12 col-md-10 mx-auto my-auto">
                            <div className="card auth-card">
                                <div className="position-relative image-side d-flex align-items-end">
                                   
                                    <p className="copy-rights">© 2022 QAPP</p>
                                </div>

                                <div className="form-side" >
                                    <div>
                                        <a>
                                            <span className="logo-single">
                                                <h2>QAPP</h2>
                                                {/* <img src={ithredLogo} width="30%" alt="ithred-logo" /> */}
                                            </span>
                                        </a>

                                        {/* login-user-form */}
                                        <form className="mt-5">
                                            <div className="mt-2">
                                                <h6 className=" fw-bold labels">Login</h6>
                                            </div>

                                            <label className="form-group has-float-label mt-2">
                                                <span className="labels">Email Address</span>
                                                <input className="form-control" type="text" id="Email" title="Enter Email Address" />
                                            </label>

                                            <label className="form-group has-float-label mb-4 mt-1">
                                                <span className="labels">Password</span>
                                                <input className="form-control" title="Enter Password" placeholder="" id="password" />
                                            </label>
                                            {/* <span class="input-group-text passwordIcon" id="basic-addon1" onClick={visiblePassword}>
                                                        {showPass ? <FontAwesomeIcon icon={faEye} size="xs" color="gray" /> : <FontAwesomeIcon icon={faEyeSlash} size="xs" color="gray" />}
                                                    </span> */}
                                            <div className="d-flex justify-content-between align-items-center action-footer">
                                                <a >Forgot Password</a>
                                                <button className="btn btn-primary btn-lg btn-shadow" type="submit"
                                                    onClick={goToLogin}
                                                // onClick={async () => {
                                                //     setCheck(true);
                                                //     await loginAuth();
                                                //     setCheck(false);
                                                // }}
                                                >Login</button>
                                            </div>

                                            <footer className="fs-6 footer-copy-rights d-flex justify-content-center align-items-center">
                                                <p className="copy-rights mb-0 mt-3">© 2021 ithred.com</p>
                                            </footer>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}