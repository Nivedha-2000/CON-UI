import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Table, Tag, Space, Drawer, Switch, Avatar, message, Pagination, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function OperationMaster() {

    const clearFields = () => {
        setOperationMaster({
            ...operationMaster, operCode: '', operName: '', id: 0, active: 'Y'
        });
        setErrors({ ...errors, opeCode: '', opeName: '' });
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
            url: `GarOperMaster/GetGarOprbyId/${operationId}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                setOperationMaster(res.data);
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };


    const [operationMaster, setOperationMaster] = useState({
        id: 0,
        operCode: "",
        operName: "",
        active: 'Y',
        hostName: "",
    });

    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [errors, setErrors] = useState({
        opeCode: '',
        opeName: ''
    })

    const [exist, setexists] = useState(false);

    const createOperationMaster = () => {
        let { operCode, operName } = operationMaster;
        if (operCode == '' || operName == '') {
            setErrors({ ...errors, opeCode: 'Operation Code is required', opeName: 'Operation Name is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `GarOperMaster/IsCheckOperationCode?OperCode=${operationMaster.operCode}`,
                appCode: 'ENAPP003'
            }).then(res => {
                if (res.Success == true) {
                    if (res.data.alertinfo.indexOf("not") == -1 && !exist) {
                        message.warning(res.data.alertinfo);
                    }
                    else {
                        ItrApiService.POST({
                            url: 'GarOperMaster/SaveGarOperation',
                            appCode: "CNF",
                            data: { ...operationMaster, active: true ? 'Y' : 'N' }
                        }).then(res => {
                            if (res.Success == true) {
                                setLoader(false);
                                message.success("Operations Created Successfully");
                                onClose();
                                clearFields();
                                getDatas(true);
                            }
                            else {
                                setLoader(false);
                                // message.warning(res.message);
                            }
                        })
                    }
                }
                else {
                    ItrApiService.POST({
                        url: 'GarOperMaster/SaveGarOperation',
                        appCode: "CNF",
                        data: { ...operationMaster, active: true ? 'Y' : 'N' }
                    }).then(res => {
                        if (res.Success == true) {
                            setLoader(false);
                            message.success("Operations Created Successfully");
                            onClose();
                            clearFields();
                            getDatas();
                        }
                        else {
                            setLoader(false);
                            message.warning(res.message);
                        }
                    })
                }
            })


        }
    }

    // for-Update-Operation-master
    const updateOperationMaster = () => {

        let { operCode, operName } = operationMaster;
        if (operCode == '' || operName == '') {
            setErrors({ ...errors, opeCode: 'Operation Code is required', opeName: 'Operation Name is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `GarOperMaster/SaveGarOperation`,
                appCode: "CNF",
                data: operationMaster
            }).then(res => {
                if (res.Success == true) {
                    message.success("Operations Updated Successfully");
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
            url: 'GarOperMaster/GetAllGarOperationMaster',
            appCode: "CNF"
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
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("operationSearch");
        // filter = input.value.toUpperCase();
        // table = document.getElementById("operationTable");
        // tr = table.getElementsByTagName("tr");
        // for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[0];
        //     if (td) {
        //         txtValue = td.textContent || td.innerText;
        //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //             tr[i].style.display = "";
        //         } else {
        //             tr[i].style.display = "none";
        //         }
        //     }
        // }
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Operation Master</h6>
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
                                <th scope="col">Operation Code</th>
                                <th scope="col">Operation Name</th>
                                <th scope="col">Active</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((operation, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {operation?.operCode ? operation?.operCode : '-'} </td>
                                    <td> {operation?.operName ? operation?.operName : '-'} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: operation?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {operation?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => editDefect(operation?.id)}>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createOperationMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New Operation</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Operation Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{operationMaster.operCode == '' ? errors.opeCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Operation Code'
                            value={operationMaster.operCode} minLength="1" maxLength="10"
                            onChange={(e) => setOperationMaster({ ...operationMaster, operCode: e.target.value })} required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Operation Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{operationMaster.operName == '' ? errors.opeName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Operation Name'
                            value={operationMaster.operName} minLength="1" maxLength="50"
                            onChange={(e) => setOperationMaster({ ...operationMaster, operName: e.target.value })} required />
                    </div>

                    <div className='mt-3'>
                        <label>Operation Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={operationMaster.active == 'Y'}
                                onChange={(e) => setOperationMaster({ ...operationMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {operationMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateOperationMaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel(); }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Edit Operation</h6 >} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Operation Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{operationMaster.operCode == '' ? errors.opeCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Operation Name'
                            value={operationMaster.operCode}
                            readOnly
                            minLength="1" maxLength="10"
                            onChange={(e) => setOperationMaster({ ...operationMaster, operCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Operation Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{operationMaster.operName == '' ? errors.opeName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Operation Name'
                            value={operationMaster.operName}
                            minLength="1" maxLength="50"
                            onChange={(e) => setOperationMaster({ ...operationMaster, operName: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <label>Operation Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={operationMaster.active == 'Y'}
                                onChange={(e) => { setOperationMaster({ ...operationMaster, active: e == true ? 'Y' : 'N' }) }} />
                            <span className='px-2'> {operationMaster.active == 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                        {/* <p className='text-danger'> {errors} </p> */}
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
