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

const requiredFields = ["handoverType", "buyDivCode", "taskName", "taskType", "guideType", "taskSource", "menuName", "taskIndex"],
    initialErrorMessages = {
        handoverType: "",
        buyDivCode: "",
        taskName: "",
        taskType: "",
        guideType: "",
        taskSource: "",
        menuName: "",
        taskIndex: 0,
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        handoverType: "",
        buyDivCode: "",
        taskName: "",
        taskType: "",
        guideType: "",
        taskSource: "",
        menuName: "",
        taskIndex: 0,
        active: 'Y'
    };

function HandOverTaskMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [locationName, setLocationName] = useState([]);
    // const [orginLocationList, setOrginLocationList] = useState([]);
    const [buyerdivcodelist, setbuyerdivcodelist] = useState([]);
    const [handOverTypeList, setHandOverTypeList] = useState([]);
    const [handOverTaskList, setHandOverTaskList] = useState([]);
    const [guideTypeList, setGuideTypeList] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const [Savevisible, setSavevisible] = React.useState(true);
    const [entityVisible, setEntityVisible] = useState(false);
    const [updatevisible, setUpdatevisible] = React.useState(false);
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setErrors({ ...initialErrorMessages });
    }

    const onClose = () => {
        clearFields();
        setVisible(false);
        setSavevisible(true);
        setUpdatevisible(false);
        setEntityVisible(false);
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
        getDatas();
        getBuyerDivCode();
        getHandOverType();
        getHandOverTask();
        getGuideType();
        getSource();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const getBuyerDivCode = () => {
        ApiCall({
            path: API_URLS.GET_BUYDIVCODE_DROPDOWN
        }).then(resp => {
            try {
                setbuyerdivcodelist(resp.data.map(d => ({ code: d.buyDivCode, codeDesc: d.buyDivCode })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getHandOverType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.HANDOVERTYPE
        }).then(resp => {
            try {
                setHandOverTypeList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getHandOverTask = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.HANDOVERTASK
        }).then(resp => {
            try {
                setHandOverTaskList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getGuideType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.GUIDETYPE
        }).then(resp => {
            try {
                setGuideTypeList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
    const getSource = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.SOURCEFROM
        }).then(resp => {
            try {
                setSourceList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
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
            path: API_URLS.GET_HO_MASTER_LIST
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
        if (name === 'taskIndex') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['taskIndex'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['taskIndex'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        } else {
            setFields({ ...fields, [name]: value })
        }

    }

    const Save = async (handoverType, buyDivCode, taskName, taskIndex, type) => {
        debugger;
        //  alert(buyCode, buyDivCode, productType, type);
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
            if (type === "update") {
                if (validation) {
                    setLoader(true)

                    ApiCall({
                        method: "POST",
                        path: API_URLS.SAVE_HO_MASTER,
                        data: {
                            ...fields,
                            hostName: getHostName()
                        }
                    }).then(resp => {
                        setLoader(false)
                        message.success(resp.message)
                        onClose()
                        getDatas()
                        setSavevisible(true)
                        setUpdatevisible(false)
                        setEntityVisible(false);
                        setShowResults(true)
                        setShowForm(false)
                    }).catch(err => {
                        setLoader(false)

                        //  fields['ftdOprName'] = tempOprName
                        setFields({ ...fields })
                        setErrors({ ...initialErrorMessages })
                        message.error(err.message || err)
                    })
                }
            }
            else {
                ItrApiService.GET({
                    // url: API_URLS.GET_COMPANY_MASTER_BY_ID + "/" + entityID + "/" + eCode + "/" + eName,
                    url: API_URLS.GET_HO_MASTER_TASKNAME_CHECK + "?HandoverType=" + handoverType + "&BuyDivCode=" + buyDivCode + "&TaskName=" + taskName,
                    appCode: "CNF"
                }).then(res => {
                    //  alert(res.Success);
                    if (res.Success == false) {
                        ItrApiService.GET({
                            url: API_URLS.GET_HO_MASTER_TASKINDEX_CHECK + "?HandoverType=" + handoverType + "&BuyDivCode=" + buyDivCode + "&TaskIndex=" + taskIndex,
                            appCode: "CNF"
                        }).then(res1 => {
                            if (res1.Success == false) {
                                if (validation) {
                                    setLoader(true)

                                    ApiCall({
                                        method: "POST",
                                        path: API_URLS.SAVE_HO_MASTER,
                                        data: {
                                            ...fields,
                                            hostName: getHostName()
                                        }
                                    }).then(resp => {
                                        setLoader(false)
                                        message.success(resp.message)
                                        onClose()
                                        getDatas()
                                        setSavevisible(true)
                                        setUpdatevisible(false)
                                        setEntityVisible(false);
                                        setShowResults(true)
                                        setShowForm(false)
                                    }).catch(err => {
                                        setLoader(false)
                                        setFields({ ...fields })
                                        setErrors({ ...initialErrorMessages })
                                        message.error(err.message || err)
                                    })
                                }
                            }
                            else {

                                setLoader(false);
                                // if (buyCode.toUpperCase() === res.data.buyCode.toUpperCase()) {
                                err = "Task Index Already Available"
                                message.error(err)
                                // }
                            }
                        });
                    }
                    else {

                        setLoader(false);
                        // if (buyCode.toUpperCase() === res.data.buyCode.toUpperCase()) {
                        err = "Task Name Already Available"
                        message.error(err)
                        // }
                    }
                });


            }

        }
    }
    const save = () => {
        if (loader) return
        let err = {}, validation = true
        debugger;
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        if (fields.taskIndex == 0) {
            err['taskIndex'] = "Should be greater than zero."
            validation = false
        }

        setErrors({ ...initialErrorMessages, ...err })

        if (validation) {
            setLoader(true)

            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_HO_MASTER,
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

                //  fields['ftdOprName'] = tempOprName
                setFields({ ...fields })
                setErrors({ ...initialErrorMessages })
                message.error(err.message || err)
            })
        }
    }

    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'handoverType',
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
            name: "handoverType",
            label: "handover Type",
        },
        {
            name: "buyDivCode",
            label: "buyDivCode",
        },
        {
            name: "taskName",
            label: "task Name",

        },
        {
            name: "taskType",
            label: "task Type"
        },

        {
            name: "guideType",
            label: "guide Type",
        },
        {
            name: "taskSource",
            label: "task Source",
        },
        {
            name: "menuName",
            label: "menu Name",

        },
        {
            name: "taskIndex",
            label: "task Index"
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

    const getDataById = id => {
        return ApiCall({
            path: API_URLS.GET_HO_MASTER_BY_ID + "/" + id,
        })
    }

    // const getDataByTaskName = (entityID, eCode, eName) => {

    //     return ApiCall({
    //         path: API_URLS.GET_HO_MASTER_TASKNAME_CHECK + "?HandoverType=" + entityID + "&BuyDivCode=" + eCode + "&TaskName=" + eName,

    //     })
    // }
    // const getDataByTaskIndex = (entityID, eCode, eName) => {

    //     return ApiCall({
    //         path: API_URLS.GET_HO_MASTER_TASKINDEX_CHECK + "?HandoverType=" + entityID + "&BuyDivCode=" + eCode + "&TaskIndex=" + eName,

    //     })
    // }

    const add = async () => {
        try {
            setLoader(true);
            setVisible(true);
            clearFields();
            setLoader(false);
        } catch (err) {
            setLoader(false);
            message.error(typeof err == "string" ? err : "data not found")
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
                handoverType: data.handoverType,
                buyDivCode: data.buyDivCode,
                taskName: data.taskName,
                taskType: data.taskType,
                guideType: data.guideType,
                taskSource: data.taskSource,
                menuName: data.menuName,
                taskIndex: data.taskIndex,
                active: data.active
            })
            setEntityVisible(true);
            setSavevisible(false);
            setUpdatevisible(true);            
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
                        {Savevisible && <button class="btn-sm btn defect-master-save mt-1 w-100" disabled={loader} onClick={() => Save(fields.handoverType, fields.buyDivCode, fields.taskName, fields.taskIndex, 'save')}>Save</button>}
                        {updatevisible && <button class="btn-sm btn defect-master-save mt-1 w-100" disabled={loader} onClick={() => Save(fields.handoverType, fields.buyDivCode, fields.taskName, fields.taskIndex, 'update')}>Update</button>}
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
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Hand Over`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>HandOver Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.handoverType === '' ? errors.handoverType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.handoverType}
                            onChange={inputOnChange("handoverType")} disabled={entityVisible}
                        >
                            <option value=""> Select HandOver Type</option>
                            {handOverTypeList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>BuyDivCode <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyDivCode === '' ? errors.buyDivCode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.buyDivCode}
                            onChange={inputOnChange("buyDivCode")} disabled={entityVisible}
                        >
                            <option value=""> Select BuyDivCode</option>
                            {buyerdivcodelist.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Task Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.taskName === '' ? errors.taskName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Task Name'
                            value={fields.taskName} minLength="1" maxLength="50"
                            onChange={inputOnChange("taskName")} disabled={entityVisible}
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Task Type<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.taskType === '' ? errors.taskType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.taskType}
                            onChange={inputOnChange("taskType")}
                        >
                            <option value=""> Select Task Type</option>
                            {handOverTaskList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Guide Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.guideType === '' ? errors.guideType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.guideType}
                            onChange={inputOnChange("guideType")}
                        >
                            <option value=""> Select Guide Type</option>
                            {guideTypeList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Task Source <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.taskSource === '' ? errors.taskSource : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.taskSource}
                            onChange={inputOnChange("taskSource")}
                        >
                            <option value=""> Select Task Source</option>
                            {sourceList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Menu Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.menuName === '' ? errors.menuName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Menu Name '
                            value={fields.menuName} minLength="1" maxLength="50"
                            onChange={inputOnChange("menuName")}
                        />
                        {/* <select className='form-select form-select-sm mt-1' required
                                value={fields.menuName}
                                onChange={inputOnChange("menuName")}                            
                        >
                            <option value=""> Select Menu Name</option>
                            {locationName.map((v, index) => {
                                return <option key={index} value={v.locCode}>{v.locName}</option>
                            })}
                        </select> */}
                    </div>


                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Task Index </label>
                            <small className='text-danger'>{errors.taskIndex ? errors.taskIndex : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Task Index Value'
                            value={fields.taskIndex} minLength="1" maxLength="2"
                            onChange={inputOnChange("taskIndex")} disabled={entityVisible}
                        />
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

HandOverTaskMaster.propTypes = {
    name: PropTypes.string
}

export default HandOverTaskMaster;