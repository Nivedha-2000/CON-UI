import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Spin, Pagination, Drawer, Tag, Switch, message } from 'antd';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
export default function SessionMaster() {
    const clearFields = () => {
        setSessionMaster({
            ...sessionMaster, isActive: true,   
            id: 0,
            unitcode: "",
            sessionCode: "",
            fromTime: "00:00",
            toTime: "00:59",
            sessionName: "",
            active: "Y",
            hostname: "",
        });
        setErrors({ ...errors, unitcode: "", sessionCode: "", fromTime: "", toTime: "", sessionName: "", });
        setexists(false);
    }
    const pageSize = 10;
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0

    })
    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [loader, setLoader] = useState(false);
    const [exist, setexists] = useState(false);
    const [sessionMaster, setSessionMaster] = useState({
        id: 0,
        unitcode: "",
        sessionCode: "",
        fromTime: "00:00",
        toTime: "00:59",
        sessionName: "",
        preSSCode: "S00",
        active: "Y",
        hostname: "",
        createdDate: new Date(),
        createdBy: "string",
        modifiedDate: new Date(),
        modifiedBy: "string",
        isActive: true
    })
    const [visible, setVisible] = useState(false)
    const showDrawer = () => {
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }
    const [errors, setErrors] = useState({
        unitcode: "",
        sessionCode: "",
        fromTime: "",
        toTime: "",
        sessionName: "",
    })
    const getDatas = (onCreate, onUpdate) => {
        setLoader(true);
        ItrApiService.GET({
            url: 'SessionMaster/GetAllSessionMaster',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setDatas(res.data);
                setDatas2(res.data);
                if (onCreate && onCreate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: (Math.ceil(res.data.length / pageSize) - 1) * pageSize, maxIndex: Math.ceil(res.data.length / pageSize) * pageSize, current: Math.ceil(res.data.length / pageSize) });
                } else if (onUpdate && onUpdate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize });
                } else {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: 0, maxIndex: pageSize });
                }
            }
            else {
                setLoader(false);
            }
        })
    }

    useEffect(() => {
        getDatas();
        getUnitCode();
    }, []);
    const createSessionMaster = () => {
        let { unitcode, sessionCode, fromTime, toTime, sessionName } = sessionMaster;
        if (unitcode == '' || sessionCode == '' || fromTime == '' || toTime == '' || sessionName == '') {
            setErrors({ ...errors, unitcode: 'This field is required', sessionCode: 'This field is required', fromTime: "This field is required", toTime: "This field is required", sessionName: "This field is required" })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `SessionMaster/IsCheckSessionCode?SessionCode=${sessionMaster.sessionCode}`,
                appCode: 'ENAPP003',
            }).then(res => {
                if (res.Success == true) {
                    if (res.data.alertinfo.indexOf("not") == -1 && !exist) {
                        message.warning(res.data.alertinfo);
                    }
                    else {
                        ItrApiService.POST({
                            url: 'SessionMaster/SaveSessionMaster',
                            appCode: "CNF",
                            data: { ...sessionMaster, id: 0 }
                        }).then(res => {

                            if (res.Success == true) {
                                message.success("Session Master Created Successfully");
                                setLoader(false);
                                onClose();
                                clearFields();
                                getDatas(true);
                            }
                            else {
                                // message.warning(res.message);
                                setLoader(false);
                            }
                        })
                    }
                }
                else {
                    ItrApiService.POST({
                        url: 'SessionMaster/SaveSessionMaster',
                        appCode: "CNF",
                        data: sessionMaster
                    }).then(res => {
                        if (res.Success == true) {
                            message.success("Session Master  Created Successfully");
                            setLoader(false);
                            onClose();
                            clearFields();
                            getDatas();
                        }
                        else {
                            // message.warning(res.message);
                            setLoader(false);
                        }
                    })
                }
            });
            setLoader(false);
        }
    }
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (sessid) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: 'SessionMaster/GetSessionbyId/' + sessid,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                setSessionMaster(res.data);
                console.log(res.data);
            }
            else {
                setLoader(false);
            }
        })
    }
    const cancel = () => {
        setCloseDefect(false);
    }
    const updatesessionmaster = () => {
        let { unitcode, sessionCode, fromTime, toTime, sessionName } = sessionMaster;
        if (unitcode == '' || sessionCode == '' || fromTime == '' || toTime == '' || sessionName == '') {
            setErrors({ ...errors, unitcode: 'This field is required', sessionCode: 'This field is required', fromTime: "This field is required", toTime: "This field is required", sessionName: "This field is required" })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `SessionMaster/SaveSessionMaster`,
                appCode: "CNF",
                data: sessionMaster
            }).then(res => {
                if (res.Success == true) {
                    message.success("Session Master Updated Successfully");
                    cancel();
                    clearFields();
                    getDatas(false, true);
                }
                else {
                    setLoader(false);
                }
            })
        }
    };
    const myFunction = (e) => {
        let val = datas2;
        let ss = val.filter(dd => {
            if (dd.unitcode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.sessionCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.sessionName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });

    };
    const [unitList, setunitList] = useState([]);
    const getUnitCode = () => {
        ItrApiService.GET({
            url: 'UnitMaster/GetAllUCode',
            appCode: 'CNF'
        }).then(res => {
            if (res.Success == true) {
                setunitList(res.data.filter(d => d.active == "Y").map(d => ({ uCode: d.uCode })));
            }
        })

    };
    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Session Master</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='operationSearch' placeholder='Search' onChange={myFunction} />
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        {/* <select className='form-select form-select-sm border-0'>
                            <option> All Locations </option>
                        </select> */}
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>

                        <button className='btn-sm btn defect-master-add' onClick={showDrawer}> + Add New </button>
                    </div>
                </div>


                <div className='table-responsive mt-2 defect-master-table'>
                    <table className="table table-hover" id='operationTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Unit Code</th>
                                <th scope="col">Session Code</th>
                                <th scope="col">Session Name</th>
                                <th scope="col">From Time</th>
                                <th scope='col'>To Time</th>

                                <th scope='col'>Active</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((sess, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {sess?.unitcode ? sess?.unitcode : '-'} </td>
                                    <td> {sess?.sessionCode ? sess?.sessionCode : '-'} </td>
                                    <td> {sess?.sessionName ? sess?.sessionName : ''} </td>
                                    <td> {sess?.fromTime ? sess?.fromTime : ''} </td>
                                    <td> {sess?.toTime ? sess?.toTime : ''} </td>

                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: sess?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {sess?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => editDefect(sess?.id)}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                        </div>
                                    </td>
                                </tr>


                            ))}
                        </tbody>
                    </table>
                    {loader && <div className='text-center mt-3'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>}
                </div>
                <div className='text-end mt-3'>
                    <Pagination
                        current={pagination.current}
                        pageSize={pageSize}
                        total={datas.length}
                        onChange={handleChange}
                        responsive={true}
                        showSizeChanger={false}

                    />
                </div>
            </div>
            {/* Add */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createSessionMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h4 className='m-0' > Add Session Master</h4 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Code<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.unitcode == '' ? errors.unitcode : ''}</small>
                        </div>

                        <select className='form-select form-select-sm' name='Factory'
                            value={sessionMaster.unitcode}
                            onChange={(e) => {
                                setSessionMaster({ ...sessionMaster, unitcode: e.target.value })
                            }
                            }>

                            <option value="" selected disabled >Select Unit Code</option>
                            {unitList.map((datas, index) => {
                                return <option key={index} value={datas.uCode}> {datas.uCode} </option>
                            })}
                        </select>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Session Code<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.sessionCode == '' ? errors.sessionCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Session Code' maxLength="3"
                            value={sessionMaster.sessionCode}
                            onChange={(e) => {
                                setSessionMaster({ ...sessionMaster, sessionCode: e.target.value })
                            }
                            } />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Session Name<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.sessionName == '' ? errors.sessionName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Session Name' maxLength="50"
                            value={sessionMaster.sessionName}
                            onChange={(e) => {
                                setSessionMaster({ ...sessionMaster, sessionName: e.target.value })
                            }
                            } />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>From Time<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.fromTime == '' ? errors.fromTime : ''}</small>
                        </div>
                        <input className='form-control'
                            type="time"
                            value={sessionMaster.fromTime}
                            onChange={(e) => {
                                if (moment(e.target.value, 'hh:mm').format() >= moment(sessionMaster.toTime, 'hh:mm').format()) {
                                    setSessionMaster({ ...sessionMaster, fromTime: e.target.value, toTime: "" });
                                } else {
                                    setSessionMaster({ ...sessionMaster, fromTime: e.target.value })
                                }
                                // setAuditForm({ ...auditForm, schFmTime: e.target.value })
                            }} />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>To Time<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.toTime == '' ? errors.toTime : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            type="time"
                            value={sessionMaster.toTime}
                            onChange={(e) => {
                                if (moment(sessionMaster.fromTime, 'hh:mm').format() < moment(e.target.value, 'hh:mm').format()) {
                                    setSessionMaster({ ...sessionMaster, toTime: e.target.value })
                                } else {
                                    message.error(`To Time can't be less than From Time`)
                                }
                            }} />

                    </div>

                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={sessionMaster.active == 'Y'}
                                onChange={(e) => setSessionMaster({ ...sessionMaster, active: e === true ? 'Y' : 'N' })} />
                            <span className='px-2'> {sessionMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
            {/* Edit */}
            < Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updatesessionmaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel(); }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Edit Session</h6 >} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Code<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.unitcode == '' ? errors.unitcode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm' name='Factory'
                            value={sessionMaster.unitcode}
                            onChange={(e) => {
                                setSessionMaster({ ...sessionMaster, unitcode: e.target.value })
                            }
                            }>

                            <option value="" selected disabled >Select Unit Code</option>
                            {unitList.map((datas, index) => {
                                return <option key={index} value={datas.uCode}> {datas.uCode} </option>
                            })}
                        </select>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Session Code<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.sessionCode == '' ? errors.sessionCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Session Code' maxLength="3"
                            value={sessionMaster.sessionCode}
                            onChange={(e) => {
                                setSessionMaster({ ...sessionMaster, sessionCode: e.target.value })
                            }
                            } />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Session Name<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.sessionName == '' ? errors.sessionName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Session Name' maxLength="50"
                            value={sessionMaster.sessionName}
                            onChange={(e) => {
                                setSessionMaster({ ...sessionMaster, sessionName: e.target.value })
                            }
                            } />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>From Time<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.fromTime == '' ? errors.fromTime : ''}</small>
                        </div>
                        <input className='form-control'
                            type="time"
                            step="2"
                            value={sessionMaster.fromTime}
                            onChange={(e) => {
                                if (moment(e.target.value, 'hh:mm:ss').format() >= moment(sessionMaster.toTime, 'hh:mm:ss').format()) {
                                    setSessionMaster({ ...sessionMaster, fromTime: e.target.value, toTime: "" });
                                } else {
                                    setSessionMaster({ ...sessionMaster, fromTime: e.target.value })
                                }
                                // setAuditForm({ ...auditForm, schFmTime: e.target.value })
                            }} />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>To Time<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sessionMaster.toTime == '' ? errors.toTime : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            type="time"
                            step="2"
                            value={sessionMaster.toTime}
                            onChange={(e) => {
                                if (moment(sessionMaster.fromTime, 'hh:mm:ss').format() < moment(e.target.value, 'hh:mm:ss').format()) {
                                    setSessionMaster({ ...sessionMaster, toTime: e.target.value })
                                } else {
                                    message.error(`To Time can't be less than From Time`)
                                }
                            }} />

                    </div>

                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={sessionMaster.active == 'Y'}
                                onChange={(e) => setSessionMaster({ ...sessionMaster, active: e === true ? 'Y' : 'N' })} />
                            <span className='px-2'> {sessionMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
        </div >
    )



}