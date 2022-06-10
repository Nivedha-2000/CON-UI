import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import {Drawer, message, Spin, Switch} from 'antd';
import { ItrApiService } from '@afiplfeed/itr-ui';
import ApiCall from "../../../services";
import {API_URLS, MISCELLANEOUS_TYPES} from "../../../constants/api_url_constants";
import {getHostName, validateInputOnKeyup} from "../../../helpers";
import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {faCopy} from "@fortawesome/free-solid-svg-icons";

const requiredFields = ["ftdOprName", "stitchType", "uom", "marker", "thickness"],
    initialErrorMessages = {
        ftdOprCode: "",
        ftdOprName: "",
        stitchType: "",
        stLength: 0,
        uom: "",
        bite: 0,
        spi: 0,
        fO_Id: 1,
        thickness: "",
        marker: '',
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        fO_Id: 1,
        ftdOprCode: "",
        ftdOprName: "",
        stitchType: "",
        stLength: 0,
        uom: "",
        bite: 0,
        spi: 0,
        thickness: "",
        marker: 0,
        active: 'Y'
    };

function StitchTypeMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [operationName, setOperationName] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [thicknessList, setThicknessList] = useState([]);
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const clearFields = (indexCode = null) => {
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
        getStitchTypeMaster()
        getOprType();
        getThicknessType();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const getStitchTypeMaster = async () => {
        ApiCall({
            path: API_URLS.FTD_MASTER
        }).then(res => {
            if (res.Success === true) {
                setOperationName(res.data);
            }
            else {
                setLoader(false);
            }
        });
    }
    const getThicknessType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.THICKNESS
        }).then(resp => {
            try {
                setThicknessList(resp.data.map(d => ({ code: d.code, codeDesc: d.code })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getOprType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.UOM
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
            path: API_URLS.GET_STITCH_MASTER
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
        if (name === 'bite'){
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['bite'] =  ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['bite'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        } else if (name === 'spi'){
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['spi'] =  ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['spi'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        } else {
            setFields({ ...fields, [name]: value })
        }

    }
    const save = () => {
        if (loader) return
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        if (fields['stitchType']) {
            const regex = new RegExp(/^[0-9a-zA-Z ]*$/);
            if (!regex.test(fields['stitchType'])){
                err['stitchType'] = "Alphabets only allowed"
                validation = false
            }
        }
        if (fields['marker'] === 0 || fields['marker'] === '0') {
            err['marker'] = "Please enter the marker field"
            validation = false
        } else if (fields['marker']) {
            const regex = new RegExp(/^\d{0,3}(\.\d{0,2})?$/);
            if (!regex.test(fields['marker'])){
                err['marker'] = "Invalid decimal number"
                validation = false
            }
        }
        if (fields['stLength']) {
            let num = fields['stLength'];
            let digits = num.toString().split('.');
            if (digits[0].length <= 6) {
                const regex = new RegExp(/^\d{0,6}(\.\d{0,4})?$/);
                if (!regex.test(fields['stLength'])){
                    err['stLength'] = "Invalid decimal number"
                    validation = false
                }
            } else {
                err['stLength'] = "Invalid decimal number"
                validation = false
            }
        }
        setErrors({ ...initialErrorMessages, ...err })

        if (validation) {
            setLoader(true)
            const tempOprName = fields.ftdOprName
            const fName = operationName.length > 0 && operationName.find(v => v.id === parseInt(fields.ftdOprName))
            fields['ftdOprName'] = fName.ftdOprName
            fields['fO_Id'] = parseInt(fName.id)
            ApiCall({
                method: "POST",
                path: API_URLS.STITCH_SAVE_MASTER,
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
                // if (err.data && err.data.isExistShortName && err.data.isExistShortName == "Y") {
                //     setErrors({ ...initialErrorMessages, indexCode: err.message })
                // }
                fields['ftdOprName'] = tempOprName
                setFields({...fields})
                setErrors({ ...initialErrorMessages })
                message.error(err.message || err)
            })
        }
    }

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

    const tableColumns = [
        {
            name: "ftdOprName",
            label: "Operation Name"
        },
        {
            name: "stitchType",
            label: "Stitch Type"
        },
        {
            name: "stLength",
            label: "Stitch Length"
        },
        {
            name: "uom",
            label: "Length UOM"
        },
        {
            name: "bite",
            label: "Bite"
        },
        {
            name: "spi",
            label: "SPI"
        },
        {
            name: "marker",
            label: "Marker"
        },
        {
            name: "thickness",
            label: "Thickness"
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
            name: "id",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div onClick={() => edit(value, 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                            <div onClick={() => edit(value, 'clone')}>
                                <FontAwesomeIcon icon={faCopy} color="#919191" />
                            </div>
                        </div>

                    )
                }
            }
        }
    ]

    const getDataById = id => {
        return ApiCall({
            path: API_URLS.GET_STITCH_MASTER_BY_ID + "/" + id,
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
        }
    };

    const edit = async (id, type) => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (id && await getDataById(id))
            if (!data) {
                message.error("Data not found")
                return
            }
            const tableId = type === 'clone' ? 0 : id
            setFields({
                id: tableId,
                fO_Id: data.fO_Id,
                ftdOprCode: data.ftdOprCode,
                ftdOprName: data.fO_Id,
                stitchType: data.stitchType,
                stLength: data.stLength,
                uom: data.uom,
                bite: data.bite,
                spi: data.spi,
                thickness: data.thickness,
                marker: data.marker,
                active: data.active
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }

    console.log(fields)

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
            <Drawer footer={
                <>
                    <div>
                        {
                            !loader ?
                                <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button>
                                : (
                                    <div className="text-center">
                                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                    </div>
                                )
                        }
                    </div>
                    <div>
                        <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={(e) => {
                            let _id = Number(fields.id)
                            if(_id === 0)add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Stitch`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Operation Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.ftdOprName === '' ? errors.ftdOprName : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.ftdOprName}
                                onChange={inputOnChange("ftdOprName")}
                            // onChange={(e) => setfields({ ...fields, ftdOprName: e.target.value })}
                        >
                            <option value=""> Select Operation Name</option>
                            {operationName.map((v, index) => {
                                return <option key={index} value={v.id}>{v.ftdOprName}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Stitch Type<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.stitchType ? errors.stitchType : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Stitch Type'
                               value={fields.stitchType} minLength="1" maxLength="50"
                               onChange={inputOnChange("stitchType")}
                            // onChange={(e) => setfields({ ...fields, stitchType: e.target.value })} required />
                               required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Stitch Length</label>
                            <small className='text-danger'>{errors.stLength ? errors.stLength : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Stitch Length'
                               value={fields.stLength} minLength="3" maxLength="11"
                               numeric={true}
                               onChange={inputOnChange("stLength")} />
                        {/*onChange={(e) => setfields({ ...fields, stLength: e.target.value })}*/}
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Length UOM <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.uom === '' ? errors.uom : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.uom}
                                onChange={inputOnChange("uom")}
                            // onChange={(e) => setfields({ ...fields, uom: e.target.value })}
                        >
                            <option value="" hidden>Select Type</option>
                            {
                                typeList.map((t, ind) => (
                                    <option key={ind} value={t.code}>{t.codeDesc}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Bite </label>
                            <small className='text-danger'>{errors.bite ? errors.bite : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Bite Value'
                               value={fields.bite} minLength="1" maxLength="3"
                               onChange={inputOnChange("bite")}
                            // onChange={(e) => setfields({ ...fields, bite: e.target.value })}
                        />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>SPI </label>
                            <small className='text-danger'>{errors.spi ? errors.spi : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter SPI'
                               value={fields.spi} minLength="1" maxLength="3"
                               onChange={inputOnChange("spi")}
                               numeric={true}
                            // onChange={(e) => setfields({ ...fields, spi: e.target.value })} />
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Marker<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{ errors.marker && errors.marker}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Marker'
                               value={fields.marker} minLength="3" maxLength="11"
                               onChange={inputOnChange("marker")}
                               required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Thickness <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.thickness === '' ? errors.thickness : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.thickness}
                                onChange={inputOnChange("thickness")}
                            // onChange={(e) => setfields({ ...fields, thickness: e.target.value })}
                        >
                            <option value="" hidden>Select Thickness</option>
                            {
                                thicknessList.map((t, ind) => (
                                    <option key={ind} value={t.code}>{t.codeDesc}</option>
                                ))
                            }
                        </select>
                    </div>

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

StitchTypeMaster.propTypes = {
    name: PropTypes.string
}

export default StitchTypeMaster;