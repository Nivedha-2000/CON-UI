import React, { useState, useEffect } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Tag, Drawer, Switch, Pagination, Spin, message, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faStar } from '@fortawesome/free-regular-svg-icons';
import { ItrApiService } from '@afiplfeed/itr-ui';


export default function MeasurementDefects() {


    const clearFields = () => {
        SetMesmentMaster({
            ...mesmentmaster,
            isActive: true,
            id: 0,
            isFav: 'Y',
            uom: "",
            deviation: "",
            active: 'Y',
            createdDate: new Date(),
            createdBy: "",
            modifiedDate: new Date(),
            modifiedBy: "",


        });
        setErrors({ ...errors, uom: '', deviation: '' });
    }

    const [mesmentmaster, SetMesmentMaster] = useState({
        id: 0,
        uom: "",
        deviation: "",
        isFav: "Y",
        active: "Y",
        hostName: "",
        createdDate: new Date(),
        createdBy: "",
        modifiedDate: new Date(),
        modifiedBy: "",
        isActive: true
    });
    const [errors, setErrors] = useState({
        uom: "",
        deviation: "",
    });
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
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

    const createAssignmentMaster = () => {
        let { uom, deviation } = mesmentmaster;
        if (uom == '' || deviation == '') {
            setErrors({ ...errors, uom: "UOM is required", deviation: "Deviation is required" })
        }
        else {
            setLoader(true);
            ItrApiService.GET({
                url: `MesurementDefects/GetMesurementDefects/${mesmentmaster.uom}/${mesmentmaster.deviation}`,
                appCode: 'CNF'
            }).then(res => {
                if (res.Success == true) {
                    message.warning(" Already Exists");
                }
                else {
                    ItrApiService.POST({
                        url: 'MesurementDefects/SaveMesurementDefects',
                        appCode: "CNF",
                        data: mesmentmaster
                    }).then(res => {
                        if (res.Success == true) {
                            setLoader(false);
                            message.success(res.message);
                            onClose();
                            clearFields();
                            getDatas(true);
                        }
                        else {
                            setLoader(false);
                            message.warning(res.message);
                        }
                    })
                }
            });
        }
    };
    const updateAssignmentMaster = () => {
        let { uom, deviation } = mesmentmaster;
        if (uom == '' || deviation == '') {
            setErrors({ ...errors, uom: "UOM is required", deviation: "Deviation is required" })
        }

        else {
            setLoader(true);
            ItrApiService.POST({
                url: `MesurementDefects/SaveMesurementDefects`,
                appCode: "CNF",
                data: mesmentmaster
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    message.success("Updated Successfully");
                    cancel();
                    clearFields();
                    getDatas(true);
                }
                else {
                    setLoader(false);
                    message.warning(res.message);
                }
            })
        }
    };
    // for-Edit-new-defect-master
    const [closeDefect, setCloseDefect] = useState(false);
    const editDefect = (mesid) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `MesurementDefects/GetMesurementDefectsByID/${mesid}`,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                SetMesmentMaster(res.data);
            }
            else {
                setLoader(false);
            }
        });
    };


    const cancel = () => {
        setCloseDefect(false);
    };
    const [uom, setUom] = useState([]);
    const getDatas = (onCreate, onUpdate) => {
        ItrApiService.GET({
            url: 'MesurementDefects/GetAllMesurementDefects',
            appCode: "CNF"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setDatas(res.data);
                setDatas2(res.data);
                // let name = [];
                // for (let datas of res.data) {
                //     name.push(datas.uom);
                //     setUom(name);
                //     let uniqueChars = [];
                //     name.forEach((element) => {
                //         if (!uniqueChars.includes(element)) {
                //             uniqueChars.push(element);
                //             setUom(uniqueChars);
                //         }
                //     });
                //     console.log(uniqueChars);
                //}
                let loopData = res.data;
                if (onCreate && onCreate == true) {
                    setPagination({ ...pagination, totalPage: loopData.length / pageSize, minIndex: (Math.ceil(loopData.length / pageSize) - 1) * pageSize, maxIndex: Math.ceil(loopData.length / pageSize) * pageSize, current: Math.ceil(loopData.length / pageSize) });
                } else if (onUpdate && onUpdate == true) {
                    setPagination({ ...pagination, totalPage: loopData.length / pageSize });
                } else {
                    setPagination({ ...pagination, totalPage: loopData.length / pageSize, minIndex: 0, maxIndex: pageSize });
                }

            }
            else {
                setLoader(false);
            }
        })
    }

    useEffect(() => {
        getDatas();
    }, []);

    const [loader, setLoader] = useState(false);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const myFunction = (e) => {
        let val = datas2;
        let ss = val.filter(dd => {
            if (dd.uom.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.deviation.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        setDatas(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
    }


    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Measurement Defects</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='masterSearch' placeholder='Search' onChange={myFunction} />
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
                    <table className="table table-hover" id='masterTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope='col'>Favourite</th>
                                <th scope='col'>UOM</th>
                                <th scope='col' className='text-center'>Deviation</th>
                                <th scope='col' className='text-center'> Status </th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {datas.map((mes, index) => index >= pagination.minIndex && index < pagination.maxIndex && (

                                <tr key={index}>
                                    <td > {mes?.isFav == "Y" ? <FontAwesomeIcon icon={faStar} color="#F7931D" /> : <FontAwesomeIcon icon={faStar} color="grey" />} </td>
                                    <td >{mes?.uom ? mes?.uom : '-'}  </td>
                                    <td className='text-center'>{mes?.deviation ? mes?.deviation : '-'} </td>
                                    <td className='text-center'>   <Tag style={{ borderRadius: '4px', backgroundColor: mes?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                    >
                                        {mes?.active == 'Y' ? 'YES' : 'NO'}
                                    </Tag>  </td>
                                    <td className='text-center'>
                                        <div onClick={() => { editDefect(mes?.id) }}>
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
                    <div>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createAssignmentMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </div>
                } title={< h6 className='m-0' > Add New Defect</h6 >} placement="right" onClose={() => { clearFields(); onClose(); }} visible={visible} >
                <div className='defect-master-add-new'>
                    <form>
                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>UOM <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{mesmentmaster.uom == '' ? errors.uom : ''}</small>
                            </div>
                            <select className='form-select form-select-sm mt-1' required
                                value={mesmentmaster.uom}
                                onChange={(e) => {
                                    SetMesmentMaster({ ...mesmentmaster, uom: e.target.value })
                                }
                                }
                            >
                                <option value=""> Select UOM </option>
                                <option value="INCH">INCH</option>
                                <option value="CM">CM</option>

                                {/* {uom.map((mat, index) => {
                                    return <option key={index} value={mat}>{mat}</option>
                                })} */}
                            </select>
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Deviation <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{mesmentmaster.deviation == '' ? errors.deviation : ''}</small>
                            </div>
                            <input
                                className='form-control form-control-sm mt-1'
                                placeholder={mesmentmaster?.uom == 'INCH' ? '00/00' : mesmentmaster?.uom == 'CM' ? '0.00' : 'Enter Deviation'}
                                value={mesmentmaster.deviation}
                                onChange={(e) => {
                                    if (mesmentmaster.uom == "INCH") {
                                        let re = /^(?=.*\d)[1-9]\d{0,2}(?:\/\d{0,2})?$/;

                                        if (e.target.value === '' || re.test(e.target.value))
                                            SetMesmentMaster({ ...mesmentmaster, deviation: e.target.value })
                                    }
                                    if (mesmentmaster.uom == "CM") {
                                        let re = /^(?=.*\d)\d{0,2}(?:\.\d{0,2})?$/;

                                        if (e.target.value === '' || re.test(e.target.value))
                                            SetMesmentMaster({ ...mesmentmaster, deviation: e.target.value })
                                    }
                                    else {

                                    }
                                }
                                }
                                required />
                        </div>
                        <div className='mt-3'>
                            <label>Favourite </label>
                            <div className='mt-1'>
                                <Switch size='default' checked={mesmentmaster.isFav == 'Y'}
                                    onChange={(e) => SetMesmentMaster({ ...mesmentmaster, isFav: e == true ? 'Y' : 'N' })}
                                />
                                <span className='px-2'> {mesmentmaster.isFav === 'Y' ? 'Active' : 'Disable'} </span>
                            </div>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>


                        <div className='mt-3'>
                            <label>Status  </label>
                            <div className='mt-1'>
                                <Switch size='default' checked={mesmentmaster.active == 'Y'}
                                    onChange={(e) => SetMesmentMaster({ ...mesmentmaster, active: e == true ? 'Y' : 'N' })}
                                />
                                <span className='px-2'> {mesmentmaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                            </div>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>
                    </form>
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
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                cancel();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Edit Defect</h6 >} placement="right" onClose={() => {
                    clearFields();
                    cancel();
                }
                } visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <form>
                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>UOM <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{mesmentmaster.uom == '' ? errors.uom : ''}</small>
                            </div>
                            <select className='form-select form-select-sm mt-1' disabled
                                value={mesmentmaster.uom}
                                onChange={(e) => {
                                    SetMesmentMaster({ ...mesmentmaster, uom: e.target.value })
                                }
                                }
                            >
                                <option value=""> Select UOM </option>
                                <option value="INCH">INCH</option>
                                <option value="CM">CM</option>
                                {/* {uom.map((mat, index) => {
                                    return <option key={index} value={mat}>{mat}</option>
                                })} */}
                            </select>
                        </div>

                        <div className='mt-3'>
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Deviation <span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{mesmentmaster.deviation == '' ? errors.deviation : ''}</small>
                            </div>
                            <input
                                readOnly
                                className='form-control form-control-sm mt-1'
                                placeholder="Enter Deviation"
                                value={mesmentmaster.deviation}

                                onChange={(e) => {
                                    if (mesmentmaster.uom == "INCH") {
                                        let re = /^(?=.*\d)\d{0,3}(?:\/\d{0,2})?$/;

                                        if (e.target.value === '' || re.test(e.target.value))
                                            SetMesmentMaster({ ...mesmentmaster, deviation: e.target.value })
                                    }
                                    if (mesmentmaster.uom == "CM") {
                                        let re = /^(?=.*\d)\d{0,1}(?:\.\d{0,2})?$/;

                                        if (e.target.value === '' || re.test(e.target.value))
                                            SetMesmentMaster({ ...mesmentmaster, deviation: e.target.value })
                                    }
                                    else {

                                    }
                                }
                                }
                                required />

                        </div>
                        <div className='mt-3'>
                            <label>Favourite </label>
                            <div className='mt-1'>
                                <Switch size='default' checked={mesmentmaster.isFav == 'Y'}
                                    onChange={(e) => SetMesmentMaster({ ...mesmentmaster, isFav: e == true ? 'Y' : 'N' })}
                                />
                                <span className='px-2'> {mesmentmaster.isFav === 'Y' ? 'Active' : 'Disable'} </span>
                            </div>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>


                        <div className='mt-3'>
                            <label>Status </label>
                            <div className='mt-1'>
                                <Switch size='default' checked={mesmentmaster.active == 'Y'}
                                    onChange={(e) => SetMesmentMaster({ ...mesmentmaster, active: e == true ? 'Y' : 'N' })}
                                />
                                <span className='px-2'> {mesmentmaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                            </div>
                            {/* <p className='text-danger'> {errors} </p> */}
                        </div>
                    </form>
                </div>
            </Drawer>
        </div >
    )
};
