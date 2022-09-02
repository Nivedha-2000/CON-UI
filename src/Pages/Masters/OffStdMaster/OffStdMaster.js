import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Table, Tag, Space, Drawer, Switch, Avatar, message, Pagination, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function OffStdMaster() {

    const clearFields = () => {
        setOffStdMaster({
            ...offStdMaster, isActive: true,
            id: 0,
            osCode: "",
            offStd: "",
        });
        setErrors({ ...errors, osCode: '', offStd: '' });
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
    const editDefect = (offStdId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `Pro/OffStdMaster/GetOffStdMasterInfoByID/${offStdId}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                setOffStdMaster(res.data);
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };


    const [offStdMaster, setOffStdMaster] = useState({
        createdDate: new Date(),
        createdBy: "",
        modifiedDate: new Date(),
        modifiedBy: "",
        isActive: true,
        id: 0,
        entityID: "ent",
        unitCode: "D15-2",
        osCode: "",
        offStd: "",
        hostName: ""
    });


    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [errors, setErrors] = useState({
        osCode: "",
        offStd: "",
    })

    const [exist, setexists] = useState(false);

    const createOperationMaster = () => {
        let { offStd, osCode } = offStdMaster;
        if (offStd == '' || osCode == '') {
            setErrors({ ...errors, osCode: 'OS Code is required', offStd: 'OFF-Standard is required', part_ID: 'Part Name is required' })
        }
        else {
            setLoader(true);
            ItrApiService.GET({
                url: `Pro/OffStdMaster/GetOffStdMasterInfoByOSCode/${offStdMaster.osCode}`,
                appCode: 'CNF'
            }).then(res => {
                if (res.Success == true) {
                    // if (res.data.alertinfo.indexOf("not") == -1 && !exist) {
                    //     message.warning("OS Code Already exists");
                    // }
                    // else {
                    //     ItrApiService.POST({
                    //         url: 'GarOperMaster/SaveGarOperation',
                    //         appCode: "CNF",
                    //         data: { ...operationMaster, active: true ? 'Y' : 'N' }
                    //     }).then(res => {
                    //         if (res.Success == true) {
                    //             setLoader(false);
                    //             message.success("OFF-Standard Created Successfully");
                    //             onClose();
                    //             clearFields();
                    //             getDatas(true);
                    //         }
                    //         else {
                    //             setLoader(false);
                    //             // message.warning(res.message);
                    //         }
                    //     })
                    // }
                    message.warning("OS Code Already Exists");
                }
                else {
                    ItrApiService.POST({
                        url: 'Pro/OffStdMaster/SaveOffStdMaster',
                        appCode: "CNF",
                        data: offStdMaster
                    }).then(res => {
                        if (res.Success == true) {
                            setLoader(false);
                            message.success("OFF-Standard Created Successfully");
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
        let { offStd, osCode } = offStdMaster;
        if (offStd == '' || osCode == '') {
            setErrors({ ...errors, osCode: 'OS Code is required', offStd: 'OFF-Standard is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `Pro/OffStdMaster/SaveOffStdMaster`,
                appCode: "CNF",
                data: offStdMaster
            }).then(res => {
                if (res.Success == true) {
                    message.success("OFF-Standard Updated Successfully");
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
            url: 'Pro/OffStdMaster/GetAllOffStdMasterInfo',
            appCode: "CNF"
        }).then(res => {
            // console.table(res.data);
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
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>OFF-Standard Master</h6>
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
                                <th scope="col">OS Code</th>
                                <th scope="col">Off-Std</th>
                                <th scope="col">Active</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((offStd, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {offStd?.osCode ? offStd?.osCode : '-'} </td>
                                    <td> {offStd?.offStd ? offStd?.offStd : '-'} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: offStd?.isActive == true ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {offStd?.isActive == true ? 'YES' : 'NO'}
                                        </Tag>
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => { console.log(offStd); editDefect(offStd?.id) }}>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createOperationMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New OFF-Standard</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>OS Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{offStdMaster.osCode == '' ? errors.osCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter OS Code'
                            minLength="1" maxLength="50"
                            value={offStdMaster.osCode}
                            onChange={(e) => {
                                setOffStdMaster({ ...offStdMaster, osCode: e.target.value })
                            }}
                            required
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>OffStd <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{offStdMaster.offStd == '' ? errors.offStd : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter OFF-Std Code'
                            minLength="1" maxLength="10"
                            value={offStdMaster.offStd}
                            onChange={(e) => {
                                setOffStdMaster({ ...offStdMaster, offStd: e.target.value })
                            }}
                            required />
                    </div>

                    <div className='mt-3'>
                        <label>OFF-Std Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={offStdMaster.isActive}
                                onChange={(e) => setOffStdMaster({ ...offStdMaster, isActive: e })} />
                            <span className='px-2'> {offStdMaster.isActive === true ? 'Active' : 'Disable'} </span>
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
                } title={<h6 className='m-0'> Edit OFF-Standard</h6>} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>OS Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{offStdMaster.osCode == '' ? errors.osCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1'
                            placeholder='Enter OS Code'
                            minLength="1" maxLength="50"
                            value={offStdMaster.osCode}
                            onChange={(e) => {
                                setOffStdMaster({ ...offStdMaster, osCode: e.target.value })
                            }}
                            required
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>OffStd <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{offStdMaster.offStd == '' ? errors.offStd : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter OFF-Std Code'
                            minLength="1" maxLength="10"
                            value={offStdMaster.offStd}
                            onChange={(e) => {
                                setOffStdMaster({ ...offStdMaster, offStd: e.target.value })
                            }}
                            required />
                    </div>

                    <div className='mt-3'>
                        <label>OFF-Std Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={offStdMaster.isActive}
                                onChange={(e) => setOffStdMaster({ ...offStdMaster, isActive: e })} />
                            <span className='px-2'> {offStdMaster.isActive === true ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
