import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Tag, Space, Drawer, Switch, Avatar, message, Pagination, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService, ItrAuthService } from '@afiplfeed/itr-ui';

export default function AssignmentMaster() {

    const clearFields = () => {
        setAssignmentMaster({
            ...assignmentMaster, usercode: '', username: '', audit_Id: '', id: 0, active: 'Y', emaild: "", languageCode: "", userNameValue: ""
        });
        setErrors({ ...errors, usercode: '', username: '', emaild: '', languageCode: "" });
        setexists(false);
    }

    // for-Add-new-defect-master
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    // for-Edit-new-Operation-master
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (operationId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `AssignmentAudits/GetAssignmentAuditsByID/${operationId}`,
            appCode: "CNF",
        }).then(res => {
            console.log(res)
            if (res.Success == true) {
                let userN = res.data.usercode;
                let userValue = ""
                for (let value of users) {
                    if (value.userCode == userN) {
                        userValue = JSON.stringify(value);
                    }
                }
                // if (res.data.usercode)
                setAssignmentMaster({ ...res.data, userNameValue: userValue });
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };


    const [assignmentMaster, setAssignmentMaster] = useState({
        isActive: true,
        id: 0,
        audit_Id: "",
        usercode: "",
        username: "",
        emaild: "",
        unitCode: "D15-2",
        languageCode: "",
        active: true,
        hostName: "",
        userNameValue: ''
    });


    const [partsList, setPartsList] = useState([]);
    const getPartsData = () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'GarPartsMaster/GetAllGarPartData',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setPartsList(res.data);
            }
            else {
                setLoader(false);
            }
        });
    }

    // languageCode
    const [langList, setLangList] = useState([]);
    const getLangData = () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'Lang/GetAllLanguageInfo',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setLangList(res.data);
            }
            else {
                setLoader(false);
            }
        });
    }


    // AuditType
    const [auditList, setAuditList] = useState([]);
    const getAuditData = () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'AuditTypeMaster/GetAllAuditType',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setAuditList(res.data);
            }
            else {
                setLoader(false);
            }
        });
    }

    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [errors, setErrors] = useState({
        usercode: "",
        username: "",
        audit_Id: "",
        emaild: "",
        languageCode: "",
    })

    const [exist, setexists] = useState(false);

    const createAssignmentMaster = () => {
        let { audit_Id, username, languageCode } = assignmentMaster;
        if (audit_Id == '' || username == '' || languageCode == "") {
            setErrors({ ...errors, audit_Id: 'Audit Type is required', username: 'User Name is required', languageCode: "Language is required" })
        }
        else {
            setLoader(true);
            let deletedValue = assignmentMaster
            delete deletedValue.userNameValue;
            ItrApiService.POST({
                url: 'AssignmentAudits/SaveAssignmentAudits',
                appCode: "CNF",
                data: {
                    ...deletedValue, active: deletedValue.active == true ? 'Y' : 'N',
                    createdDate: new Date(),
                    createdBy: "",
                    modifiedDate: new Date(),
                    modifiedBy: "",
                    audit_Id: parseInt(deletedValue.audit_Id)
                }
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    message.success("Assignment Master Created Successfully");
                    onClose();
                    clearFields();
                    getDatas(true);
                }
                else {
                    setLoader(false);
                }
            })
        }
    }

    // for-Update-Operation-master
    const updateAssignmentMaster = () => {
        let { audit_Id, username, languageCode } = assignmentMaster;
        if (audit_Id == '' || username == '' || languageCode == "") {
            setErrors({ ...errors, audit_Id: 'Audit Type is required', username: 'User Name is required', languageCode: "Language is required" })
        }
        // let { usercode, username, emaild } = assignmentMaster;
        // if (usercode == '' || username == '' || emaild == '') {
        //     setErrors({ ...errors, opeCode: 'User Code is required', opeName: 'User Name is required', emaild: 'Email ID is required' });
        // }
        else {
            setLoader(true);
            let deletedValue = assignmentMaster
            delete deletedValue.userNameValue;
            ItrApiService.POST({
                url: `AssignmentAudits/SaveAssignmentAudits`,
                appCode: "CNF",
                data: {
                    ...deletedValue,
                    createdDate: new Date(),
                    createdBy: "",
                    modifiedDate: new Date(),
                    modifiedBy: "",
                }
            }).then(res => {
                if (res.Success == true) {
                    message.success("Assignment Master Updated Successfully");
                    cancel();
                    clearFields();
                    getDatas(false, true);
                }
                else {
                    message.warning(res.message);
                    setLoader(false);
                }
            })
        }
    }

    const pageSize = 10;

    // for-list-pagination
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    });

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const [users, setUsers] = useState([]);

    const getUsers = () => {
        ItrApiService.GET({
            url: 'User/GetAll', data: {}, appCode: 'Catalog'
        }).then(res => { setUsers(res.data.activeUsers); });
    }


    const getDatas = (onCreate, onUpdate) => {
        setLoader(true);
        ItrApiService.GET({
            url: 'AssignmentAudits/GetAllAssignmentAudits',
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
                // setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: 0, maxIndex: pageSize });
            }
            else {
                setLoader(false);
                // message.warning('Something went wrong');
            }
        })
    }

    useEffect(() => {
        getDatas();
        getAuditData()
        getPartsData();
        getLangData();
        getUsers()
    }, []);


    const myFunction = (e) => {
        let val = datas2;
        let ss = val.filter(dd => {
            if (dd.audit_Name.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.username.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.languageCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        console.log("------->", ss);
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Assignment Master</h6>
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
                                <th scope="col">Audit Type</th>
                                <th scope="col">Username</th>
                                <th scope="col">Language</th>
                                <th scope="col">Active</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((assign, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {assign?.audit_Name ? assign?.audit_Name : '-'} </td>
                                    <td> {assign?.username ? assign?.username : '-'} </td>
                                    {/* <td> {assign?.emaild ? assign?.emaild : '-'} </td> */}
                                    <td> {assign?.languageCode ? assign?.languageCode : ''} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: assign?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {assign?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => {
                                            for (let value of datas) {
                                                if (value.userCode == assign.usercode) {
                                                    setAssignmentMaster({ ...assignmentMaster, userNameValue: JSON.stringify(value) })
                                                }
                                            }
                                            editDefect(assign?.id)
                                        }}>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createAssignmentMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New Assignment</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>

                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>User Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.usercode == '' ? errors.usercode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter User Code'
                            value={assignmentMaster.usercode}
                            onChange={(e) => {
                                setAssignmentMaster({ ...assignmentMaster, usercode: e.target.value })
                            }} />
                    </div> */}

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label> Audit Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.audit_Id == '' ? errors.audit_Id : ''}</small>
                        </div>
                        <select className='form-select form-select-sm'
                            value={assignmentMaster.audit_Id}
                            onChange={(e) => { setAssignmentMaster({ ...assignmentMaster, audit_Id: e.target.value }); console.log(e.target.value) }} required
                        >
                            <option value="" selected disabled> -- Please Select-- </option>
                            {auditList.map((data, index) => {
                                // console.log(data)
                                return <option key={index} hidden={data.auditMainGroup == "N" ? true : false} value={data.id}> {data.auditName} </option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label> Username <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.username == '' ? errors.username : ''}</small>
                        </div>
                        <select className='form-select form-select-sm'
                            value={assignmentMaster.userNameValue}
                            onChange={(e) => {
                                let vs = JSON.parse(e.target.value);
                                setAssignmentMaster({ ...assignmentMaster, username: vs.displayName, usercode: vs.userCode, emaild: vs.emailID, userNameValue: e.target.value })
                            }} required
                        >
                            <option value="" selected disabled> -- Please Select-- </option>
                            {users && users.map((data, index) => {
                                return <option hidden={data.department != 'QA'} key={index} value={JSON.stringify(data)}> {data.displayName} </option>
                            })}
                        </select>
                    </div>

                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Email ID <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.emaild == '' ? errors.emaild : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Email ID'
                            value={assignmentMaster.emaild}
                            onChange={(e) => setAssignmentMaster({ ...assignmentMaster, emaild: e.target.value })} required />
                    </div> */}

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Language Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.languageCode == '' ? errors.languageCode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm'
                            value={assignmentMaster.languageCode}
                            onChange={(e) => setAssignmentMaster({ ...assignmentMaster, languageCode: e.target.value })} required
                        >
                            <option value="" selected disabled> -- Please Select-- </option>
                            {langList.map((data, index) => {
                                return <option key={index} value={data.languageCode}> {data.languageName} </option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <label>Assignment Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={assignmentMaster.active}
                                onChange={(e) => setAssignmentMaster({ ...assignmentMaster, active: e })} />
                            <span className='px-2'> {assignmentMaster.active ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer>


            {/* Edit */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateAssignmentMaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel(); }}> Cancel </button>
                        </div>
                    </>
                } title={<h6 className='m-0'> Edit Assignment</h6>} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>

                    {/* <div className='mt-3'>
    <div className='d-flex flex-wrap align-items-center justify-content-between'>
        <label>User Code <span className='text-danger'>*  </span> </label>
        <small className='text-danger'>{assignmentMaster.usercode == '' ? errors.usercode : ''}</small>
    </div>
    <input className='form-control form-control-sm mt-1'
        placeholder='Enter User Code'
        value={assignmentMaster.usercode}
        onChange={(e) => {
            setAssignmentMaster({ ...assignmentMaster, usercode: e.target.value })
        }} />
</div> */}

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label> Audit Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.audit_Id == '' ? errors.audit_Id : ''}</small>
                        </div>
                        <select className='form-select form-select-sm'
                            value={assignmentMaster.audit_Id}
                            onChange={(e) => { setAssignmentMaster({ ...assignmentMaster, audit_Id: e.target.value }); console.log(e.target.value) }} required
                        >
                            <option value="" selected disabled> -- Please Select-- </option>
                            {auditList.map((data, index) => {
                                // console.log(data)
                                return <option key={index} hidden={data.auditMainGroup == "N" ? true : false} value={data.id}> {data.auditName} </option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label> Username <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.username == '' ? errors.username : ''}</small>
                        </div>
                        <select className='form-select form-select-sm'
                            value={assignmentMaster.userNameValue}
                            onChange={(e) => {
                                let vs = JSON.parse(e.target.value);
                                setAssignmentMaster({ ...assignmentMaster, username: vs.displayName, usercode: vs.userCode, emaild: vs.emailID, userNameValue: e.target.value })
                            }} required
                        >
                            <option value="" selected disabled> -- Please Select-- </option>
                            {users.map((data, index) => {
                                return <option hidden={data.department != 'QA'} key={index} value={JSON.stringify(data)}> {data.displayName} </option>
                            })}
                        </select>
                        {/* <input className='form-control form-control-sm mt-1'
        placeholder='Enter Username'
        value={assignmentMaster.username}
        onChange={(e) => {
            setAssignmentMaster({ ...assignmentMaster, username: e.target.value })
        }} /> */}
                    </div>

                    {/* <div className='mt-3'>
    <div className='d-flex flex-wrap align-items-center justify-content-between'>
        <label>Email ID <span className='text-danger'>*  </span> </label>
        <small className='text-danger'>{assignmentMaster.emaild == '' ? errors.emaild : ''}</small>
    </div>
    <input className='form-control form-control-sm mt-1' placeholder='Enter Email ID'
        value={assignmentMaster.emaild}
        onChange={(e) => setAssignmentMaster({ ...assignmentMaster, emaild: e.target.value })} required />
</div> */}

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Language Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{assignmentMaster.languageCode == '' ? errors.languageCode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm'
                            value={assignmentMaster.languageCode}
                            onChange={(e) => setAssignmentMaster({ ...assignmentMaster, languageCode: e.target.value })} required
                        >
                            <option value="" selected disabled> -- Please Select-- </option>
                            {langList.map((data, index) => {
                                return <option key={index} value={data.languageCode}> {data.languageName} </option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <label>Assignment Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={assignmentMaster.active == 'Y'}
                                onChange={(e) => setAssignmentMaster({ ...assignmentMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {assignmentMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
