import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, message, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { ItrApiService } from '@afiplfeed/itr-ui';
import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import ApiCall from "../../../services"
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";
import { PDM_APP_CODE } from "../../../constants";

const initialErrorMessages = {
    seasonCode: "",
    seasonGroup: "",
    seasonName: "",
},
    initialFieldValues = {
        id: 0,
        seasonCode: "",
        seasonGroup: "",
        seasonName: "",
        active: "Y",
    },
    requiredFields = ["seasonCode", "seasonGroup", "seasonName"]

function SeasonMaster({ name }) {
    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setErrors({ ...initialErrorMessages });
    }

    const [visible, setVisible] = useState(false);
    const [saveVisible, setSaveVisible] = useState(true);
    const [updateVisible, setUpdateVisible] = useState(false);
    const add = () => {
        try {
            setVisible(true);
            clearFields()
            setSaveVisible(true)
            setUpdateVisible(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    };

    const getDataById = seasonCode => {
        return ApiCall({
            path: API_URLS.GET_SEASON_MASTER_BY_ID + "/" + seasonCode,
        })
    }

    const edit = async seasonCode => {
        try {
            setLoader(true)
            setVisible(true);
            setSaveVisible(false)
            setUpdateVisible(true)
            let { data } = (seasonCode && await getDataById(seasonCode))
            data = Array.isArray(data) ? data[0] : data
            if (!data) {
                message.error("Data not found")
                return
            }
            setFields({
                //  id,
                seasonCode: data.seasonCode,
                seasonGroup: data.seasonGroup,
                seasonName: data.seasonName,
                active: data.active,
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
            name: 'seasonCode',
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

    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [seasonCode, setseasonCodeList] = useState([]);
    const [seasonGroup, setseasonGroupList] = useState([]);
    const [seasonName, setseasonNameList] = useState([]);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const save = async (seasonCode, Type) => {
        if (loader) return
        let err = {}, validation = true
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
                    path: API_URLS.SAVE_SEASON_MASTER,
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
                    message.error(err.message || err)
                })
            } else {
                ItrApiService.GET({
                    url: API_URLS.GET_SEASON_MASTER_BY_ID + "/" + seasonCode,
                    appCode: "CNF"
                }).then(res => {
                    if (res.Success == false) {
                        ApiCall({
                            method: "POST",
                            path: API_URLS.SAVE_SEASON_MASTER,
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
                            message.error(err.message || err)
                        })
                    }
                    else {
                        setLoader(false);
                        if (seasonCode.toUpperCase() === res.data.seasonCode.toUpperCase()) {
                            err = "Season Code Already Available"
                            message.error(err)

                        }
                    }
                });

            }

        }
    }

    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_SEASON_MASTER_LIST
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




    useEffect(() => {
        getDatas()
        // getBuyerList()
    }, []);

    const tableColumns = [
        {
            name: "seasonCode",
            label: "Season code"
        },
        {
            name: "seasonGroup",
            label: "Season Group"
        },
        {
            name: "seasonName",
            label: "Season Name"
        },
        {
            name: "active",
            label: "Active"
        },
        {
            name: "seasonCode",
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
                <h6 className='m-0 p-0' style={{ fontWeight: "bold" }}>{name}</h6>

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
                            saveVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.seasonCode, 'save')}> Save </button>
                        }
                        {
                            updateVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.seasonCode, 'update')}> Update </button>
                        }

                        {/* {
                            !loader ?
                                <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id == 0 ? "Save" : "Update"} </button>
                                : (
                                    <div className="text-center">
                                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                    </div>
                                )
                        } */}
                    </div>
                    <div>
                        <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={e => {
                            let _id = new Number(fields.id)
                            if (_id == 0) add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id == 0 ? "Add New" : "Edit"} Season Master`}</h6 >} placement="right" onClose={onClose} visible={visible} maskClosable={false} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Season code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.seasonCode === '' ? errors.seasonCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter season Code'
                            value={fields.seasonCode} maxLength="3"
                            disabled={fields.id != 0}
                            id="seasonCode"
                            onChange={inputOnChange("seasonCode")}
                            required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Season Group <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.seasonGroup === '' ? errors.seasonGroup : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter season Group'
                            value={fields.seasonGroup} maxLength="20"
                            id="seasonGroup"
                            onChange={inputOnChange("seasonGroup")}
                            required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Season Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.seasonName === '' ? errors.seasonName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter season Name'
                            value={fields.seasonName} maxLength="25"
                            id="seasonName"
                            onChange={inputOnChange("seasonName")}
                            required />
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

SeasonMaster.propTypes = {
    name: PropTypes.string
}


export default SeasonMaster;