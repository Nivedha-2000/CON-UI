import React, { useState } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Table, Space, Drawer, Switch, Avatar, Pagination, Spin, message, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { ItrApiService } from '@afiplfeed/itr-ui';

export default function PartsMasters() {

    const clearFields = () => {
        setPartsMaster({
            ...partsMaster, id: 0,
            productType: "",
            subProductType: "",
            partCode: "",
            partName: "",
            partIndex: "0",
            active: 'Y',
            hostName: ""
        });
        setErrors({ ...errors, productType: '', subProductType: '', partCode: '', partName: '' });
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
    const editDefect = (partsId) => {
        setCloseDefect(true);
        ItrApiService.GET({
            url: `GarPartsMaster/GetGarPartsbyId/${partsId}`,
            appCode: "ENAPP003",
        }).then(res => {
            console.log(res.data);
            if (res.Success == true) {
                setPartsMaster(res.data);
            }
            else {
                setLoader(false);
            }
        });
    };
    const cancel = () => {
        setCloseDefect(false);
    };

    const [partsMaster, setPartsMaster] = useState({
        id: 0,
        productType: "",
        subProductType: "",
        partCode: "",
        partName: "",
        partIndex: "0",
        active: 'Y',
        hostName: ""
    });

    console.log(partsMaster.id, 'edit')

    const [errors, setErrors] = useState({
        productType: "",
        subProductType: "",
        partCode: "",
        partName: "",
        active: ""
    });


    const [partsList, setPartsList] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [loader, setLoader] = useState(false);

    const [exist, setexists] = useState(false);

    const createPartsMaster = () => {
        let { partCode, partName } = partsMaster;
        if ((partCode == '') || (partName == '')) {
            setErrors({ ...errors, partCode: 'Part Code is required', partName: 'Part Name is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `GarPartsMaster/IsCheckOperationCode?partCode=${partsMaster.partCode}`,
                appCode: 'ENAPP003',
            }).then(res => {
                if (res.Success == true) {
                    if (res.data.alertinfo.indexOf("not") == -1 && !exist) {
                        message.warning(res.data.alertinfo);
                    }
                    else {
                        ItrApiService.POST({
                            url: 'GarPartsMaster/SaveGarParts',
                            appCode: "ENAPP003",
                            data: { ...partsMaster, id: 0 }
                        }).then(res => {
                            console.log(partsMaster)
                            if (res.Success == true) {
                                message.success("Parts Created Successfully");
                                setLoader(false);
                                onClose();
                                clearFields();
                                getData(true);
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
                        url: 'GarPartsMaster/SaveGarParts',
                        appCode: "ENAPP003",
                        data: partsMaster
                    }).then(res => {
                        if (res.Success == true) {
                            message.success("Parts Created Successfully");
                            setLoader(false);
                            onClose();
                            clearFields();
                            getData();
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

    // for All parts-master data
    const getData = (onCreate, onUpdate) => {
        setLoader(true);
        ItrApiService.GET({
            url: 'GarPartsMaster/GetAllGarPartData',
            appCode: "ENAPP003"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setPartsList(res.data);
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
                message.warning('Something went wrong');
            }
        });
    }

    const [partsProductType, setPartsProductType] = useState([]);

    // parts-master product-type
    const getProductType = async () => {
        setLoader(true);
        await ItrApiService.GET({
            url: 'ProductType/GetProductTypeDropDown',
            appCode: "ENAPP002"
        }).then(res => {
            console.log(res.data)
            if (res.Success == true) {
                setLoader(false);
                setPartsProductType(res.data.result.data);
            }
            else {
                setLoader(false);
                message.warning('Something went wrong');
            }
        });
    }


    // parts-master sub-product-type
    const [partsSubProductType, setPartsSubProductType] = useState([]);
    const getSubProductType = (subProductType) => {
        setLoader(true);
        ItrApiService.GET({
            url: `StyleHeader/GetSubProducttypeDropDown?ProductType=${subProductType}`,
            appCode: "ENAPP002"
        }).then(res => {
            if (res.Success == true) {
                setLoader(false);
                setPartsSubProductType(res.data.result.data);
            }
            else {
                setLoader(false);
                message.warning('Something went wrong');
            }
        });
    }

    const updateOperationMaster = () => {
        let { partCode, partName } = partsMaster;
        if (partName == '') {
            setErrors({ ...errors, partName: 'Part Name is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `GarPartsMaster/SaveGarParts`,
                appCode: "ENAPP003",
                data: partsMaster
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    message.success("Parts Updated Successfully");
                    cancel();
                    clearFields();
                    getData(false, true);
                }
                else {
                    setLoader(false);
                    // message.warning('Something went wrong');
                }
                // setDatas(res.data)
            })
        }
    }

    useEffect(() => {
        getData();
        getProductType();
        // getSubProductType();
    }, []);


    const myFunction = (e) => {
        let val = datas2;
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("masterSearch");
        let ss = val.filter(dd => {
            if (dd.productType.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.subProductType.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.partCode.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.partName.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        console.log("------->", ss);
        setPartsList(ss);
        setPagination({ ...pagination, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });
    }

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>Parts Master</h6>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id='partsSearch' placeholder='Search' onChange={myFunction} />
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
                    <table className="table table-hover" id='partsTable'>
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Product Type</th>
                                <th scope="col">Sub-Product Type</th>
                                <th scope="col">Part Code</th>
                                <th scope="col">Part Name</th>
                                <th scope="col">Active</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partsList.map((parts, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td> {parts?.productType ? parts?.productType : '-'} </td>
                                    <td> {parts?.subProductType ? parts?.subProductType : '-'} </td>
                                    <td> {parts?.partCode ? parts?.partCode : '-'} </td>
                                    <td> {parts?.partName ? parts?.partName : '-'} </td>
                                    <td>
                                        <Tag style={{ borderRadius: '4px', backgroundColor: parts?.active == 'Y' ? 'green' : '#FF1414', color: 'white' }}
                                        >
                                            {parts?.active == 'Y' ? 'YES' : 'NO'}
                                        </Tag>
                                        {/* {parts?.active ? parts?.active : '-'} */}
                                    </td>
                                    <td>
                                        <div className='text-center' onClick={() => { editDefect(parts?.id) }}>
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
                        total={partsList.length}
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
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createPartsMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New Parts</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose()
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Product Type
                                {/* <span className='text-danger'>*  </span> */}
                            </label>
                            {/* <small className='text-danger'>{partsMaster.productType == '' ? errors.productType : ''}</small> */}
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={partsMaster.productType}
                            onChange={(e) => {
                                setPartsMaster({ ...partsMaster, productType: e.target.value, subProductType: '' });
                                getSubProductType(e.target.value)
                            }}>
                            <option value="" selected> Select Product Type </option>
                            {partsProductType.map((product, index) => {
                                return <option key={index} value={product.productType}> {product.productType} </option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Sub-product Type
                                {/* <span className='text-danger'>*  </span> */}
                            </label>
                            {/* <small className='text-danger'>{partsMaster.subProductType == '' ? errors.subProductType : ''}</small> */}
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={partsMaster.subProductType}
                            onChange={(e) => setPartsMaster({ ...partsMaster, subProductType: e.target.value })} >
                            <option value="" selected> Select Sub-product Type </option>
                            {partsSubProductType.length == 0 && <option disabled style={{ color: 'red' }}>  No Records Found </option>}
                            {partsSubProductType.map((subProduct, index) => {
                                return <>
                                    <option key={index} value={subProduct.subProductType}> {subProduct.subProductType} </option>
                                    {/* <option> {subProduct.length == 0 ? 'No Records Found' : ''} </option> */}
                                </>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Part Code<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{partsMaster.partCode == '' ? errors.partCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Part Code'
                            value={partsMaster.partCode}
                            minLength="1" maxLength="10"
                            onChange={(e) => setPartsMaster({ ...partsMaster, partCode: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Part Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{partsMaster.partName == '' ? errors.partName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Part Name'
                            value={partsMaster.partName}
                            minLength="1" maxLength="50"
                            onChange={(e) => setPartsMaster({ ...partsMaster, partName: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Active <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{partsMaster.active == '' ? errors.active : ''}</small>
                        </div>
                        {/* <label>Active</label> */}
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={partsMaster.active == 'Y'}
                                onChange={(e) => setPartsMaster({ ...partsMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {partsMaster.active === 'Y' ? 'Active' : 'Disable'} </span>
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
                } title={< h6 className='m-0' > Edit Parts Master</h6 >} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Product Type
                                {/* <span className='text-danger'>*  </span> */}
                            </label>
                            <small className='text-danger'>{partsMaster.productType == '' ? errors.productType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={partsMaster.productType}
                            onChange={(e) => {
                                setPartsMaster({ ...partsMaster, productType: e.target.value });
                                getSubProductType(e.target.value)
                            }}
                        >
                            <option selected> Select Product Type </option>
                            {partsProductType.map((product, index) => {
                                return <option key={index} value={product.productType}> {product.productType} </option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Sub-product Type
                                {/* <span className='text-danger'>*  </span> */}
                            </label>
                            <small className='text-danger'>{partsMaster.subProductType == '' ? errors.subProductType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1'
                            value={partsMaster.subProductType}
                            onChange={(e) => setPartsMaster({ ...partsMaster, subProductType: e.target.value })}>
                            <option selected> Select Sub-product Type </option>
                            {partsSubProductType.map((subProduct, index) => {
                                return <option key={index} value={subProduct?.subProductType}> {subProduct?.subProductType} </option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Part Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{partsMaster.partCode == '' ? errors.partCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Part Code'
                            value={partsMaster.partCode}
                            readOnly
                            minLength="1" maxLength="10"
                            onChange={(e) => setPartsMaster({ ...partsMaster, subProductType: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Part Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{partsMaster.partName == '' ? errors.partName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter part Name'
                            value={partsMaster.partName}
                            minLength="1" maxLength="50"
                            onChange={(e) => setPartsMaster({ ...partsMaster, partName: e.target.value })} />
                    </div>

                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={partsMaster.active == 'Y'}
                                onChange={(e) => setPartsMaster({ ...partsMaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {partsMaster.active == 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
