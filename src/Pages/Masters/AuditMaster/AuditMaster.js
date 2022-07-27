import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Table, Tag, Space, Drawer, Switch, Avatar, message, Pagination, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function AuditMaster() {

    const clearFields = () => {
        setAuditMaster({
            ...auditMaster, auditCode: '', auditName: '', colorCode: '', audit_ID: 0, id: 0, active: 'Y'
        });
        setErrors({ ...errors, auditCode: '', auditName: '', colorCode: '', });
        setexists(false);
    }

    const [auditList, setAuditList] = useState([]);
    const getPartsData = () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'AuditTypeMaster/GetAllAuditType',
            appCode: "ENAPP003"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setAuditList(res.data);
            }
            else {
                setLoader(false);
                // message.warning('Something went wrong');
            }
        });
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
    const editDefect = (auditId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `AuditTypeMaster/GetAssigneeDetailByID/${auditId}`,
            appCode: "ENAPP003",
        }).then(res => {
            if (res.Success == true) {
                setAuditMaster(res.data);
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };


    const [auditMaster, setAuditMaster] = useState({
        id: 0,
        auditCode: "",
        auditName: "",
        auditMainGroup: "N",
        audit_ID: 0,
        colorCode: "",
        active: "Y",
        hostName: "",
    });


    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [errors, setErrors] = useState({
        auditCode: "",
        auditName: "",
        colorCode: "",
    })

    const [exist, setexists] = useState(false);

    const createAuditMaster = async () => {
        let { auditCode, auditName, colorCode } = auditMaster;
        if (auditCode == '' || auditName == '' || colorCode == '') {
            setErrors({ ...errors, auditCode: 'Audit Code is required', auditName: 'Audit Name is required', colorCode: 'Color Code is required' })
        }
        else {
            setLoader(true);
            await ItrApiService.POST({
                url: 'AuditTypeMaster/SaveAuditType',
                appCode: "ENAPP003",
                data: { ...auditMaster, active: true ? 'Y' : 'N' }
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    message.success("Audit Master Created Successfully");
                    onClose();
                    clearFields();
                    getDatas(true);
                }
                else {
                    setLoader(false);
                    // message.warning(res.message);
                }
            });
        }
    }

    // for-Update-Operation-master
    const updateAuditMaster = () => {
        let { auditCode, auditName, colorCode } = auditMaster;
        if (auditCode == '' || auditName == '' || colorCode == '') {
            setErrors({ ...errors, auditCode: 'Audit Code is required', auditName: 'Audit Name is required', colorCode: 'Color Code is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `AuditTypeMaster/SaveAuditType`,
                appCode: "ENAPP003",
                data: auditMaster
            }).then(res => {
                if (res.Success == true) {
                    message.success("Audit Master Updated Successfully");
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

    const getDatas = (onCreate, onUpdate) => {
        setLoader(true);
        ItrApiService.GET({
            url: 'AuditTypeMaster/GetAllAuditType',
            appCode: "ENAPP003"
        }).then(res => {
            console.table(res.data);
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
        getPartsData();
    }, []);


    const myFunction = (e) => {
        let val = datas2;
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("masterSearch");
        let ss = val.filter(dd => {
            if (dd.operCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.operName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
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
                <h6 className='m-0 p-0'>Audit Master</h6>
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
                                <th scope="col">Audit Code</th>
                                <th scope="col">Audit Name</th>
                                <th scope="col">Color</th>
                                <th scope="col">Active</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((audit, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index} hidden={audit.auditMainGroup == "N" ? true : false}>
                                    <td> {audit?.auditCode ? audit?.auditCode : '-'} </td>
                                    <td> {audit?.auditName ? audit?.auditName : '-'} </td>
                                    <td>
                                        <Tag style={{ width: '30px', height: '30px', borderRadius: '4px', backgroundColor: audit?.colorCode ? audit?.colorCode : '-' }}
                                        />
                                        {/* {audit?.colorCode ? audit?.colorCode : '-'} */}
                                    </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: audit?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {audit?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => { console.log(audit); editDefect(audit?.id) }}>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createAuditMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New Audit</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Audit Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{auditMaster.auditCode == '' ? errors.auditCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            value={auditMaster.auditCode}
                            placeholder='Enter Audit Code'
                            onChange={(e) => {
                                setAuditMaster({ ...auditMaster, auditCode: e.target.value })
                            }}
                        />
                        {/* <input className='form-control form-control-sm mt-1' placeholder='Enter Part Name'
                            value={operationMaster.operName} minLength="1" maxLength="50"
                            onChange={(e) => setOperationMaster({ ...operationMaster, operName: e.target.value })} required /> */}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Audit Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{auditMaster.auditName == '' ? errors.auditName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Audit Name'
                            value={auditMaster.auditName}
                            onChange={(e) => setAuditMaster({ ...auditMaster, auditName: e.target.value })} required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Color Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{auditMaster.colorCode == '' ? errors.colorCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Operation Name'
                            type="color"
                            value={auditMaster.colorCode}
                            onChange={(e) => setAuditMaster({ ...auditMaster, colorCode: e.target.value })} required />
                    </div>

                    <div className='mt-3'>
                        <label>Audit Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={auditMaster.active == 'Y'}
                                onChange={(e) => setAuditMaster({ ...auditMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {auditMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateAuditMaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel(); }}> Cancel </button>
                        </div>
                    </>
                } title={<h6 className='m-0'> Edit Audit</h6>} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Audit Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{auditMaster.auditCode == '' ? errors.auditCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter Audit Code'
                            value={auditMaster.auditCode}
                            onChange={(e) => {
                                setAuditMaster({ ...auditMaster, auditCode: e.target.value })
                            }} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Audit Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{auditMaster.auditName == '' ? errors.auditName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Audit Name'
                            value={auditMaster.auditName}
                            readOnly
                            minLength="1" maxLength="10"
                            onChange={(e) => setAuditMaster({ ...auditMaster, auditName: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Color Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{auditMaster.colorCode == '' ? errors.colorCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            value={auditMaster.colorCode}
                            type="color"
                            onChange={(e) => setAuditMaster({ ...auditMaster, colorCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <label>Audit Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={auditMaster.active == 'Y'}
                                onChange={(e) => { setAuditMaster({ ...auditMaster, active: e == true ? 'Y' : 'N' }) }} />
                            <span className='px-2'> {auditMaster.active == 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
