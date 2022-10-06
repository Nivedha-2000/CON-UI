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

const requiredFields = ["Type", "Mattype", "MatTypeIndex", "MatDesc"],
    initialErrorMessages = {
        Type: "",
        Mattype: "",
        MatDesc: "",
        MatTypeIndex: 0,
        Allow: 0,
        Active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        Type: "",
        Mattype: "",
        MatDesc: "",
        MatTypeIndex: 0,
        Allow: 0,
        Active: 'Y'
    };

function MaterialTypeMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [MaterialTypeList, setMaterialTypeList] = useState([]);
    const [Mattype, setMattypeList] = useState([]);
    const [MatDesc, setMatDescList] = useState([]);
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
        getMaterialType();
        getDatas()
        // getLocationMaster()
        //  getShipModeType();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const getLocationMaster = async () => {
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(res => {
            if (res.Success === true) {
                setLocationName(res.data.filter(d => d.active == "Y"))
            }
            else {
                setLoader(false);
            }
        });
    }
    const getMaterialType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.MatType
        }).then(resp => {
            try {
                setMaterialTypeList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getShipModeType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.SHIPMODE
        }).then(resp => {
            try {
                setShipmodeList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_MATERIALTYPE_MASTER_LIST
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
        debugger;
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
        else if (name === 'Mattype') {
            debugger;
            setFields({ ...fields, [name]: value.toUpperCase() })
        }
        else {
            setFields({ ...fields, [name]: value })

        }

    }
    const save = async (Mattype, Type) => {
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
                    path: API_URLS.SAVE_MATERIALTYPE_MASTER,
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
                    url: API_URLS.GET_MATERIALTYPE_BY_ID + "/" + Mattype,
                    appCode: "CNF"
                }).then(res => {
                    if (res.Success == false) {
                        ApiCall({
                            method: "POST",
                            path: API_URLS.SAVE_MATERIALTYPE_MASTER,
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
                        if (Mattype.toUpperCase() === res.data.mattype.toUpperCase()) {
                            err = "Mat type Already Available"
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
            name: 'mattype',
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
            name: "type",
            label: "Type"
        },
        {
            name: "mattype",
            label: "mattype"
        },
        {
            name: "matDesc",
            label: "matDesc"
        },
        {
            name: "matTypeIndex",
            label: "matTypeIndex"
        },
        // {
        //     name: "allow",
        //     label: "Allow"
        // },

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
            name: "mattype",
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

    const getDataById = mattype => {
        return ApiCall({
            path: API_URLS.GET_MATERIALTYPE_BY_ID + "/" + mattype,
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
    const edit = async (mattype, type) => {
        try {
            setLoader(true)
            setVisible(true);
            setSaveVisible(false)
            setUpdateVisible(true)
            console.log(mattype);
            let { data } = (mattype && await getDataById(mattype))
            console.log(data);
            if (!data) {
                message.error("Data not found")
                return
            }

            const tableId = type === 'clone' ? 0 : mattype
            console.log(data.active);
            setFields({
                id: tableId,
                Type: data.type,
                Mattype: data.mattype,
                MatDesc: data.matDesc,
                MatTypeIndex: data.matTypeIndex,
                Allow: data.allow,
                Active: data.active
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }

    //console.log(fields)
    const NUMBER_IS_FOCUS_IN_ZERO = name => (e) => {
        if (e.target.value == "0" || e.target.value == "" || e.target.value == undefined) {
            //    setprofitPercentList({ ...profitPercentList, [name]: "" });
            setFields({ ...fields, [name]: "" })
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            setFields({ ...fields, [name]: 0 })
        }
    }
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
                                saveVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.Mattype, 'save')}> Save </button>
                            }
                            {
                                updateVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.Mattype, 'update')}> Update </button>
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
                } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Material Type Master`}</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Type Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.Type === '' ? errors.Type : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required disabled={fields.id != 0}
                            value={fields.Type}
                            onChange={inputOnChange("Type")}
                            maxLength="1"
                        >
                            <option value=""> Select Material Type</option>
                            {/* {MaterialTypeList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })} */}
                            <option value="F"> F </option>
                            <option value="T"> T </option>
                            <option value="O"> O </option>
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.Mattype === '' ? errors.Mattype : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Material Type' disabled={fields.id != 0}
                            value={fields.Mattype} maxLength="20"
                            id="Material-Type"
                            onChange={inputOnChange("Mattype")}
                            autoComplete="off"
                            required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type Description <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.MatDesc === '' ? errors.MatDesc : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Material Type Description'
                            value={fields.MatDesc} maxLength="40"
                            id="Material-Desc"
                            onChange={inputOnChange("MatDesc")}
                            autoComplete="off"
                            required />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type Index </label>
                            <small className='text-danger'>{errors.MatTypeIndex ? errors.MatTypeIndex : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Material Type Index'
                            value={fields.MatTypeIndex} minLength="1" maxLength="8"
                            onChange={inputOnChange("MatTypeIndex")}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("MatTypeIndex")}
                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("MatTypeIndex")}
                        />
                    </div>

                    <div className='mt-3'>
                        <label>{fields.Active === 'Y' ? 'Active' : 'In Active'}</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={fields.Active === 'Y'}
                                onChange={(e) => setFields({ ...fields, Active: e ? 'Y' : 'N' })} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div >
    )
}

MaterialTypeMaster.propTypes = {
    name: PropTypes.string
}

export default MaterialTypeMaster;