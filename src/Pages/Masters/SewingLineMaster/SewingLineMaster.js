import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Table, Tag, Space, Drawer, Switch, Avatar, Pagination, Spin, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function SewingLineMaster() {

    const clearFields = () => {
        setSewingMaster({
            ...sewingMaster, unitcode: '', lineCode: '', lineName: '', lineIndex: '', shiftCode: '', id: 0, active: 'Y'
        });
        setErrors({ ...errors, unitcode: '', lineCode: '', lineName: '', lineIndex: '', shiftCode: '' });
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

    // for-Edit-new-defect-master
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (sewingId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `SewLineMaster/GetSewLinebyId/${sewingId}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                console.log(res.data.active);
                setSewingMaster(res.data);
            }
            else {
                setLoader(false);
            }
        })
    };
    const cancel = () => {
        setCloseDefect(false);
    };


    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const [sewingMaster, setSewingMaster] = useState({
        id: 0,
        unitcode: "",
        lineCode: "",
        lineName: "",
        lineIndex: "",
        shiftCode: "",
        floorName: "NA",
        active: 'Y',
        hostName: "",
    });


    const [errors, setErrors] = useState({
        unitcode: "",
        lineCode: "",
        lineName: "",
        lineIndex: "",
        shiftCode: "",
    });

    const [exist, setexists] = useState(false);

    const createSewingMaster = () => {
        let { unitcode, lineCode, lineName, lineIndex, shiftCode } = sewingMaster;
        if (unitcode == '' || lineCode == '' || lineName == '' || lineIndex == '' || shiftCode == '') {
            setErrors({ ...errors, unitcode: 'Unit Code is required', lineCode: 'Line Code is required', lineName: 'Line Name is required', lineIndex: 'Line Index is required', shiftCode: 'Shift Code is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `SewLineMaster/IsCheckSewlineCode?LineCode=${sewingMaster.lineCode}`,
                appCode: 'ENAPP003'
            }).then(res => {
                if (res.Success == true) {
                    if (res.data.alertinfo.indexOf("not") == -1 && !exist) {
                        message.warning(res.data.alertinfo);
                    }
                    else {
                        ItrApiService.POST({
                            url: 'SewLineMaster/SaveSewLine',
                            appCode: "CNF",
                            data: sewingMaster
                        }).then(res => {
                            if (res.Success == true) {
                                // setDatas(res.data)
                                message.success("Sewing Line created Successfully");
                                setLoader(false);
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
                        url: 'SewLineMaster/SaveSewLine',
                        appCode: "CNF",
                        data: sewingMaster
                    }).then(res => {
                        if (res.Success == true) {
                            // setDatas(res.data)
                            setLoader(false);
                            onClose();
                            clearFields();
                            getDatas();
                            message.success("Sewing Line created Successfully");
                        }
                        else {
                            setLoader(false);
                            // message.warning(res.message);
                        }
                    })
                }
            })
        }
    }

    // for-Update-Operation-master
    const updateSewingLingMaster = () => {

        let { unitcode, lineCode, lineName, lineIndex, shiftCode } = sewingMaster;
        if (unitcode == '' || lineCode == '' || lineName == '' || lineIndex == '' || shiftCode == '') {
            setErrors({ ...errors, unitcode: 'Unit Code is required', lineCode: 'Line Code is required', lineName: 'Line Name is required', lineIndex: 'Line Index is required', shiftCode: 'Shift Code is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `SewLineMaster/SaveSewLine`,
                appCode: "CNF",
                data: sewingMaster
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    // setDatas(res.data)
                    cancel();
                    getDatas(false, true);
                    clearFields();
                    message.success("Sewing Line Updated Successfully");
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
            url: 'SewLineMaster/GetAllSewingLine',
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
                // message.warning('Something went wrong');
            }
        });
    }

    useEffect(() => {
        getDatas();
    }, []);


    const myFunction = (e) => {
        let val = datas2;
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("masterSearch");
        let ss = val.filter(dd => {
            if (dd.unitcode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.lineCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.lineName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.lineIndex.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.shiftCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            // if (dd.defectProfile.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
            //     return dd;
            // }
        });
        console.log("------->", ss);
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("sewingSearch");
        // filter = input.value.toUpperCase();
        // table = document.getElementById("sewingTable");
        // tr = table.getElementsByTagName("tr");
        // for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[1];
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
                <h6 className='m-0 p-0'>Sewing Line Master</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='sewingSearch' placeholder='Search' onChange={myFunction} />
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
                    <table className="table table-hover" id='sewingTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Unit Code</th>
                                <th scope="col">Line Code</th>
                                <th scope="col">Line Name</th>
                                <th scope="col">Index</th>
                                <th scope="col">Shift</th>
                                <th scope="col">Active</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((sewing, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {sewing?.unitcode ? sewing?.unitcode : '-'} </td>
                                    <td> {sewing?.lineCode ? sewing?.lineCode : '-'} </td>
                                    <td> {sewing?.lineName ? sewing?.lineName : '-'} </td>
                                    <td> {sewing?.lineIndex ? sewing?.lineIndex : '-'} </td>
                                    <td> {sewing?.shiftCode ? sewing?.shiftCode : '-'} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: sewing?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {sewing?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                        {/* {sewing?.active ? sewing?.active : '-'} */}
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => { editDefect(sewing?.id); console.log(sewing) }}>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createSewingMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }
                            }> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New Sewing Line</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose()
                }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.unitcode == '' ? errors.unitcode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Unit Code'
                            value={sewingMaster.unitcode}
                            minLength="1" maxLength="10"
                            onChange={(e) => setSewingMaster({ ...sewingMaster, unitcode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Line Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.lineCode == '' ? errors.lineCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Line Code'
                            value={sewingMaster.lineCode}
                            minLength="1" maxLength="10"
                            onChange={(e) => setSewingMaster({ ...sewingMaster, lineCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Line Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.lineName == '' ? errors.lineName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Line Name'
                            value={sewingMaster.lineName}
                            minLength="1" maxLength="20"
                            onChange={(e) => setSewingMaster({ ...sewingMaster, lineName: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Line Index <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.lineIndex == '' ? errors.lineIndex : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Line Index'
                            value={sewingMaster.lineIndex}
                            minLength="1" maxLength="5"
                            onChange={(e) => setSewingMaster({ ...sewingMaster, lineIndex: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Shift Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.shiftCode == '' ? errors.shiftCode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={sewingMaster.shiftCode}
                            onChange={(e) => setSewingMaster({ ...sewingMaster, shiftCode: e.target.value })}
                            required>
                            <option value="" selected> Select Shift </option>
                            <option value="G"> Gen </option>
                            <option value="N"> Nit </option>
                        </select>
                    </div>


                    <div className='mt-3'>
                        <label>Sewing Line Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={sewingMaster.active == 'Y'}
                                onChange={(e) => setSewingMaster({ ...sewingMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {sewingMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateSewingLingMaster}> Update </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel(); }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Edit Sewing Line</h6 >} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.unitcode == '' ? errors.unitcode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Unit Code'
                            value={sewingMaster.unitcode}
                            minLength="1" maxLength="10"
                            onChange={(e) => setSewingMaster({ ...sewingMaster, unitcode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Line Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.lineCode == '' ? errors.lineCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Line Code'
                            value={sewingMaster.lineCode}
                            minLength="1" maxLength="10"
                            disabled
                            onChange={(e) => setSewingMaster({ ...sewingMaster, lineCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Line Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.lineName == '' ? errors.lineName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Line Name'
                            value={sewingMaster.lineName}
                            minLength="1" maxLength="20"
                            onChange={(e) => setSewingMaster({ ...sewingMaster, lineName: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Line Index <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.lineIndex == '' ? errors.lineIndex : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter line Index'
                            value={sewingMaster.lineIndex}
                            minLength="1" maxLength="5"
                            onChange={(e) => setSewingMaster({ ...sewingMaster, lineIndex: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Shift Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{sewingMaster.shiftCode == '' ? errors.shiftCode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={sewingMaster.shiftCode}
                            onChange={(e) => setSewingMaster({ ...sewingMaster, shiftCode: e.target.value })}
                            required>
                            <option value="" selected> Select Shift </option>
                            <option value="G"> Gen </option>
                            <option value="N"> Nit </option>
                        </select>

                    </div>


                    <div className='mt-3'>
                        <label>Sewing Line Status</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={sewingMaster.active == 'Y'}
                                onChange={(e) => setSewingMaster({ ...sewingMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {sewingMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
