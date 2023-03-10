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
import { PDM_APP_CODE } from "../../../constants";

const initialErrorMessages = {
    buyCode: "",
    buyDivcode: "",
    packType: "",
    unitperPack: ""
},
    initialFieldValues = {
        id: 0,
        buyCode: "",
        buyDivcode: "",
        packType: "",
        active: "Y",
        unitperPack: "",
    },
    requiredFields = ["buyCode", "buyDivcode", "packType", "unitperPack"]

function PackTypeMaster({ name }) {
    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setErrors({ ...initialErrorMessages });
    }

    const [visible, setVisible] = useState(false);
    const add = () => {
        try {
            setVisible(true);
            clearFields()
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    };

    const getDataById = id => {
        return ApiCall({
            path: API_URLS.GET_PACK_TYPE_MASTER_BY_ID + "/" + id,
        })
    }

    const edit = async id => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (await getDataById(id))
            data = Array.isArray(data) ? data[0] : data
            if (!data) {
                message.error("Data not found")
                return
            }
            setFields({
                id,
                buyCode: data.buyCode,
                buyDivcode: data.buyDivcode,
                packType: data.packType,
                active: data.active,
                unitperPack: data.unitperPack,
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
            name: 'packType',
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
        if (name == "unitperPack") value = validateInputOnKeyup(e)
        setFields({ ...fields, [name]: value })
    }

    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [buyerList, setBuyerList] = useState([]);
    const [buyerDivisionList, setBuyerDivisionList] = useState([]);
    const [list, setList] = useState([]);
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
        if (fields.unitperPack && /[^\d]/g.test(fields.unitperPack)) {
            err.unitperPack = "Enter numbers only"
            validation = false
        }
        if (fields.unitperPack && parseInt(fields.unitperPack) == 0) {
            err.unitperPack = "Should be greater than zero"
            validation = false
        }
        setErrors({ ...initialErrorMessages, ...err })
        if (validation) {
            setLoader(true)
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_PACK_TYPE_MASTER,
                data: {
                    ...fields,
                    packType: fields.packType.trim(),
                    maxShipPer:0,
                    hostName: getHostName()
                }
            }).then(resp => {
                setLoader(false)
                message.success(resp.message)
                onClose()
                getDatas()
            }).catch(err => {
                setLoader(false)
                message.error(err.message || err)
            })
        }
    }

    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_PACK_TYPE_MASTER
        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                setList(resp.data.map(d => {
                    d.activeText = d.active == "Y" ? "Yes" : "No"
                    return d
                }))
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })
    }

    const getBuyerList = () => {
        ApiCall({
            path: API_URLS.GET_BUYER_DROPDOWN
        }).then(resp => {
            if (Array.isArray(resp.data)) {
                setBuyerList(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getBuyerDivisionDropDown = () => {
        setFields({ ...fields, buyDivcode: fields.id == 0 ? "" : fields.buyDivcode })
        if (fields.buyCode) {
            ApiCall({ 
                path: API_URLS.GET_BUYER_DIVISION_DROPDOWN + `/${fields.buyCode}`
            }).then(resp => {
                try {
                    setBuyerDivisionList(resp.data)
                } catch(er) {
                    message.error("Response data is not as expected")
                }
            })
            .catch(err => {
                message.error(err.message || err)
            })
        } else {
            setBuyerDivisionList([])
        }
    }

    useEffect(() => {
        if (fields.buyCode) {
            getBuyerDivisionDropDown()
        }
    }, [fields.buyCode])

    useEffect(() => {
        getDatas()
        getBuyerList()
    }, []);

    const tableColumns = [
        {
            name: "buyCode",
            label: "Buyer code"
        },
        {
            name: "buyDivcode",
            label: "Buyer Division code"
        },
        {
            name: "packType",
            label: "Pack Type"
        },
        {
            name: "unitperPack",
            label: "Unit Per Pack"
        },
        {
            name: "activeText",
            label: "Active"
        },
        {
            name: "id",
            label: "Action",
            options: {
                sort: false,
                customBodyRender: (value, tm) => {
                    return (
                        <div title="Edit" onClick={() => edit(value)}>
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
                <h6 className='m-0 p-0' style={{fontWeight: "bold"}}>{name}</h6>

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
                                <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id == 0 ? "Submit" : "Update"} </button>
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
                            if (_id == 0) add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id == 0 ? "Add New" : "Edit"} Pack Type Master`}</h6 >} placement="right" onClose={onClose} visible={visible} maskClosable={false} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.buyCode}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' id="buyer-code" value={fields.buyCode} onChange={inputOnChange("buyCode")} required>
                            <option value="" hidden>Select Buyer Code</option>
                            {
                                buyerList.map((t, ind) => (
                                    <option key={ind} value={t.buyCode}>{t.buyCode}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Division Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.buyDivcode}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' id="buyer-div-code" value={fields.buyDivcode} onChange={inputOnChange("buyDivcode")} required>
                            <option value="" hidden>Select Buyer Division Code</option>
                            {
                                buyerDivisionList.map((t, ind) => (
                                    <option key={ind} value={t.buyDivCode}>{t.buyDivCode}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pack Type Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.packType}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Pack Type Name'
                            value={fields.packType} maxLength="500"
                            id="pack-type-name"
                            onChange={inputOnChange("packType")} required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Per Pack <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.unitperPack}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Unit Per Pack'
                            value={fields.unitperPack} maxLength="3"
                            id="unit-per-pack"
                            numeric="1"
                            onChange={inputOnChange("unitperPack")} required />
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

PackTypeMaster.propTypes = {
    name: PropTypes.string
}


export default PackTypeMaster;