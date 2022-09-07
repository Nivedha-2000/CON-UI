import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import { Drawer, message, Spin, Switch } from 'antd';
import { ItrApiService } from '@afiplfeed/itr-ui';
import ApiCall from "../../../services";
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const requiredFields = ["productType"],
    initialErrorMessages = {
        productType: "",
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        productType: "",
        active: 'Y'
    };

function ProductTypeMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [productTypeList, setproductTypeList] = useState([]);
    // const [Mattype, setMattypeList] = useState([]);
    // const [MatDesc, setMatDescList] = useState([]);
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    });
    const [saveVisible, setSaveVisible] = useState(true);
    const [updateVisible, setUpdateVisible] = useState(false);

    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setErrors({ ...initialErrorMessages });
    }

    const onClose = () => {
        clearFields()
        setVisible(false);
    };

    const showDrawer = () => {
        setVisible(true);
        setSaveVisible(true)
        setUpdateVisible(false)
    };


    const pageSize = 10;

    // for-list-pagination
    const [pagination, setPagination] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    });

    useEffect(() => {
        getDatas()
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_PRODUCTTYPE_MASTER_LIST
        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                setList(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })
    }


    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'MatTypeIndex') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['MatTypeIndex'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['MatTypeIndex'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'productType') {
            setFields({ ...fields, [name]: value.toUpperCase() })
        }
        else {
            setFields({ ...fields, [name]: value })
        }

    }
    const save = async (productType, Type) => {
        if (loader) return
        let err = {}, validation = true
        debugger;
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        if (validation) {
            setLoader(true)
            if (Type == "update") {
                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_PRODUCTTYPE_MASTER_LIST,
                    data: {
                        ...fields,
                        hostName: getHostName()
                    }
                }).then(resp => {
                    setLoader(false)
                    message.success(resp.message)
                    onClose()
                    getDatas()
                }).catch(err => {
                    setLoader(false)
                    setFields({ ...fields })
                    setErrors({ ...initialErrorMessages })
                    message.error(err.message || err)
                })
            } else {

                ItrApiService.GET({
                    url: API_URLS.GET_PRODUCTTYPE_BY_ID + "/" + productType,
                    appCode: "CNF"
                }).then(res => {
                    if (res.Success == false) {
                        ApiCall({
                            method: "POST",
                            path: API_URLS.SAVE_PRODUCTTYPE_MASTER_LIST,
                            data: {
                                ...fields,
                                hostName: getHostName()
                            }
                        }).then(resp => {
                            setLoader(false)
                            message.success(resp.message)
                            onClose()
                            getDatas()
                        }).catch(err => {
                            setLoader(false)
                            setFields({ ...fields })
                            setErrors({ ...initialErrorMessages })
                            message.error(err.message || err)
                        })
                    }
                    else {
                        setLoader(false);
                        if (productType.toUpperCase() === res.data.productType.toUpperCase()) {
                            err = "Product Type Already Available"
                            message.error(err)

                        }
                    }
                });

            }

        }
    }

    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'productType',
            direction: 'asc'
        }
    })

    const updateTableProps = props => {
        setTableProps({
            ...tableProps,
            ...props
        })
    }

    const tableColumns = [
        {
            name: "productType",
            label: "Product Type"
        },
        {
            name: "active",
            label: "Active",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>
                        {value === "Y" ? "Yes" : "No"}
                    </div>
                }
            }
        },
        {
            name: "productType",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => edit(value, 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                            {/* <div onClick={() => edit(value, 'clone')}>
                                <FontAwesomeIcon icon={faCopy} color="#919191" />
                            </div> */}
                        </div>

                    )
                }
            }
        }
    ]

    const getDataById = productType => {
        return ApiCall({
            path: API_URLS.GET_PRODUCTTYPE_BY_ID + "/" + productType,
        })
    }
    const add = async () => {
        try {
            setLoader(true)
            setVisible(true);
            clearFields()
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    };
    const edit = async (productType, type) => {
        try {
            setLoader(true)
            setVisible(true);
            setSaveVisible(false)
            setUpdateVisible(true)
            let { data } = (productType && await getDataById(productType))
            console.log(data);
            if (!data) {
                message.error("Data not found")
                return
            }
            const tableId = type === 'clone' ? 0 : productType
            setFields({
                id: tableId,
                productType: data.productType,
                active: data.active
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }

    //console.log(fields)

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>{name}</h6>

                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-1'>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' onClick={showDrawer}> + Add New </button>
                    </div>
                </div>
            </div>

            <div>
                <CustomTableContainer
                    columns={tableColumns}
                    data={list}
                    options={{
                        download: !1,
                        print: !1,
                        filter: !1,
                        viewColumns: !1,
                        jumpToPage: !0,
                        selectableRows: "none",
                        rowsPerPageOptions: [10, 25, 50, 100],
                        rowsPerPage: tableProps.rowsPerPage,
                        page: tableProps.page,
                        count: list.length,
                        sortOrder: tableProps.sortOrder,
                        onTableChange: (action, tableState) => {
                            if (!["changePage", "search", "changeRowsPerPage", "sort"].includes(action)) return
                            const { page, rowsPerPage, sortOrder } = tableState
                            updateTableProps({
                                page, rowsPerPage, sortOrder
                            })
                        }
                    }}
                />
            </div>
            {listLoading && <div className='text-center'>
                <Spin style={{ color: '#F57234' }} tip="Loading..." />
            </div>}

            {/* Add */}
            <Drawer
                maskClosable={false}
                keyboard={false}
                footer={
                    <>
                        <div>
                            {
                                saveVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.productType, 'save')}> Save </button>

                            }{
                                updateVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.productType, 'update')}> Update </button>
                            }
                            {/* {
                            !loader ?
                                <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button>
                                : (
                                    <div className="text-center">
                                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                    </div>
                                )
                        } */}
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={(e) => {
                                let _id = Number(fields.id)
                                if (_id === 0) add()
                                else edit(_id)
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Product Type Master`}</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Product Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.productType === '' ? errors.productType : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Product Type' disabled={fields.id != 0}
                            value={fields.productType} maxLength="20"
                            id="Product-Type"
                            onChange={inputOnChange("productType")}
                            required />
                    </div>

                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type Description <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.MatDesc === '' ? errors.MatDesc : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter location name'
                            value={fields.MatDesc} maxLength="50"
                            id="Material-Desc"
                            onChange={inputOnChange("MatDesc")} 
                            required />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type Index </label>
                            <small className='text-danger'>{errors.MatTypeIndex ? errors.MatTypeIndex : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Transit days Value'
                               value={fields.MatTypeIndex} minLength="1" maxLength="2"
                               onChange={inputOnChange("MatTypeIndex")}                         
                        />
                    </div>  */}

                    <div className='mt-3'>
                        <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={fields.active === 'Y'}
                                onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div >
    )
}

ProductTypeMaster.propTypes = {
    name: PropTypes.string
}

export default ProductTypeMaster;