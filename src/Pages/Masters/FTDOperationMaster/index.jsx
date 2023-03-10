import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, message, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import ApiCall from "../../../services"
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";

const initialErrorMessages = {
    indexCode: "",
    ftdOprCode: "",
    ftdOprName: "",
    operType: ""
},
    initialFieldValues = {
        id: 0,
        indexCode: "",
        ftdOprCode: "",
        ftdOprName: "",
        active: "Y",
        operType: "",
    },
    requiredFields = ["indexCode", "ftdOprCode", "ftdOprName", "operType"]

function FTDOperationMaster({ name }) {
    const clearFields = (indexCode = null) => {
        setFields({
            ...initialFieldValues,
            ...(indexCode ? { indexCode } : {})
        });
        setErrors({ ...initialErrorMessages });
    }

    const [visible, setVisible] = useState(false);
    const add = async () => {
        try {
            setLoader(true)
            setVisible(true);
            let { data: { indexCode } } = await getLatestIndexCode()
            if (typeof indexCode != "number") {
                throw new Error("index code not available")
            }
            clearFields(indexCode)
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    };

    const getLatestIndexCode = () => {
        return ApiCall({
            path: API_URLS.GET_FTD_OPERATION_INDEX_CODE
        })
    }

    const getDataById = id => {
        return ApiCall({
            path: API_URLS.GET_FTD_OPERATION_BY_ID + "/" + id,
        })
    }

    const edit = async id => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (await getDataById(id))
            if (!data) {
                message.error("Data not found")
                return
            }
            setFields({
                id,
                indexCode: data.indexCode,
                ftdOprCode: data.ftdOprCode,
                ftdOprName: data.ftdOprName,
                active: data.active,
                operType: data.operType,
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }
    const onClose = () => {
        clearFields()
        setVisible(false);
    };


    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'ftdOprName',
            direction: 'asc'
        }
    })

    const updateTableProps = props => {
        setTableProps({
            ...tableProps,
            ...props
        })
    }

    const inputOnChange = name => e => {
        let value = e.target.value
        if (name == "indexCode") value = validateInputOnKeyup(e)
        if (name == "ftdOprCode") value = validateInputOnKeyup(e)
        setFields({ ...fields, [name]: value })
    }

    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const save = () => {
        if (loader) return
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        if (/[^\d]/g.test(fields.indexCode)) {
            err.indexCode = "Enter numbers only"
            validation = false
        }
        // if (fields.ftdOprName && !/^\d{0,3}(\.\d{1,2})?$/.test(fields.ftdOprName)) {
        //     err.ftdOprName = "it accepts 3d & 2f"
        //     validation = false
        // }
        setErrors({ ...initialErrorMessages, ...err })
        if (validation) {
            setLoader(true)
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_FTD_OPERATION_MASTER,
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
                if (err.data && err.data.isExistShortName && err.data.isExistShortName == "Y") {
                    setErrors({ ...initialErrorMessages, indexCode: err.message })
                }
                message.error(err.message || err)
            })
        }
    }

    const getOprType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FTD_OPERATION_TYPE
        }).then(resp => {
            try {
                setTypeList(resp.data.map(d => ({ code: d.code, codeDesc: d.code })))
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
            path: API_URLS.GET_FTD_OPERATION_MASTER_LIST
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

    useEffect(() => {
        getDatas()
        getOprType()
    }, []);

    const tableColumns = [
        {
            name: "indexCode",
            label: "Index code"
        },
        {
            name: "ftdOprName",
            label: "FTPOP name"
        },
        {
            name: "operType",
            label: "Type"
        },
        {
            name: "active",
            label: "Active",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>
                        {value == "Y" ? "Yes" : "No"}
                    </div>
                }
            }
        },
        {
            name: "id",
            label: "Action",
            options: {
                sort: false,
                customBodyRender: (value, tm) => {
                    return (
                        <div onClick={() => edit(value)}>
                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                        </div>
                    )
                }
            }
        }
    ]

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>{name}</h6>

                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-1'>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' id="frd-opr-add" onClick={add}> + Add New </button>
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
            <Drawer footer={
                <>
                    <div>
                        {
                            !loader ?
                                <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id == 0 ? "Save" : "Update"} </button>
                                : (
                                    <div className="text-center">
                                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                    </div>
                                )
                        }
                    </div>
                    <div>
                        <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={e => {
                            let _id = new Number(fields.id)
                            if(_id == 0)add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id == 0 ? "Add New" : "Edit"} FTD Operation`}</h6 >} placement="right" onClose={onClose} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Operation Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.ftdOprName}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Operation Name'
                            value={fields.ftdOprName} maxLength="500"
                            id="opr-name"
                            onChange={inputOnChange("ftdOprName")} required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Operation Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.ftdOprCode}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Operation Code'
                            value={fields.ftdOprCode} maxLength="500"
                            id="opr-code"
                            alphaNumeric="1"
                            disabled={fields.id != 0}// As per brd & confirmation, this field should be disabled when edit function //apr19_2022_5:30pm
                            onChange={inputOnChange("ftdOprCode")} required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Index Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.indexCode}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Index Code'
                            value={fields.indexCode} maxLength="11"
                            numeric="1"
                            id="opr-index-code"
                            onChange={inputOnChange("indexCode")} required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.operType}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' id="opr-type" value={fields.operType} onChange={inputOnChange("operType")} required>
                            <option value="" hidden>Select Type</option>
                            {
                                typeList.map((t, ind) => (
                                    <option key={ind} value={t.code}>{t.codeDesc}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mt-3'>
                        <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={fields.active == 'Y'}
                                id="opr-active"
                                onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div >
    )
}

FTDOperationMaster.propTypes = {
    name: PropTypes.string
}

export default FTDOperationMaster;