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

const requiredFields = ["buyDivCode", "buyCode", "divName", "profitPercent"],
    initialErrorMessages = {
        buyDivCode: "",
        buyCode: "",
        divName: "",
        profitPercent: 0,
        Active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        buyDivCode: "",
        buyCode: "",
        divName: "",
        profitPercent: 0,
        Active: 'Y'
    },
    test = {
        id: 0,
        buyDivCode: "",
        buyCode: "",
        divName: "",
        profitPercent: 0,
        Active: 'Y'
    };

function BuyerDivisionMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [buyDivCodeList, setbuyDivCodeList] = useState([]);
    const [buyCodeList, setbuyCodeList] = useState([]);
    const [divNameList, setdivNameList] = useState([]);
    const [profitPercentList, setprofitPercentList] = useState([]);
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const [fieldsTemp, setFieldsTemp] = useState({
        ...test
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
        getBuyerList()
        // getLocationMaster()
        //  getShipModeType();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    const getBuyerList = () => {
        ApiCall({
            path: API_URLS.GET_BUYER_DROPDOWN
        }).then(resp => {
            if (Array.isArray(resp.data)) {
                setbuyCodeList(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }



    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_BUYERDIVISION_MASTER_LIST
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




    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'profitPercent') {
            const re = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['profitPercent'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['profitPercent'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }
        else if (name === 'buyDivCode') {
            setFields({ ...fields, [name]: value.toUpperCase() })
        }
        else {
            setFields({ ...fields, [name]: value })
        }

    }
    const save = async (buyDivCode, Type) => {
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
            debugger;

            // ApiCall({
            //     path: API_URLS.GET_BUYERDIVISIONEMASTER_BY_BUYDIVCODE + "/" + fields.buyDivCode,
            // }).then(resp => {
            //     if (!resp.data) {
            //         alert("Not Avaliable")
            //     } else {
            //         alert("Already Extits")
            //     }
            // }).catch(err => {
            //     setListLoading(false)
            //     message.error(err.message || err)
            // })

            if (Type == "update") {
                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_BUYERDIVISION_MASTER,
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
            } else {
                debugger;
                let { data } = (buyDivCode && await getDataById(buyDivCode))
                console.log(data);
                if (!data) {
                    message.error("Data not found")
                    return
                }
                if (!data) {
                    ApiCall({
                        method: "POST",
                        path: API_URLS.SAVE_BUYERDIVISION_MASTER,
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
                } else {
                    debugger;
                    if (data.buyDivCode.toUpperCase() === buyDivCode.toUpperCase()) {
                        message.error("Buyer Div Code Already Exits...!")
                        setLoader(false)
                        setFields({ ...fields })
                        setErrors({ ...initialErrorMessages })

                    } else {
                        message.error("Buyer Div Code Already Exits...!")
                    }
                }
            }



        }
    }

    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'buyCode',
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
            name: "buyCode",
            label: "Buyer Code"
        },
        {
            name: "buyDivCode",
            label: "Buyer Division Code"
        },
        {
            name: "divName",
            label: "Division Name"
        },
        {
            name: "profitPercent",
            label: "Profit Percent"
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
            name: "buyDivCode",
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

    const getDataById = buyDivCode => {

        return ApiCall({
            path: API_URLS.GET_BUYERDIVISIONEMASTER_BY_ID + "/" + buyDivCode,
        })
    }

    const getDataByDivCode = BuyDivCode => {
        return ApiCall({
            path: API_URLS.GET_BUYERDIVISIONEMASTER_BY_BUYDIVCODE + "/" + BuyDivCode,
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
    const edit = async (buyDivCode, type) => {
        debugger;
        try {

            setLoader(true)
            setVisible(true);
            setSaveVisible(false)
            setUpdateVisible(true)
            console.log(buyDivCode);
            let { data } = (buyDivCode && await getDataById(buyDivCode))
            console.log(data);
            if (!data) {
                message.error("Data not found")
                return
            }

            const tableId = type === 'clone' ? "" : buyDivCode
            console.log(data.active);
            setFields({
                id: tableId,
                buyDivCode: data.buyDivCode,
                buyCode: data.buyCode,
                divName: data.divName,
                profitPercent: data.profitPercent,
                Active: data.active
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
                
                keyboard={false}
                footer={
                    <>
                        <div>
                            {
                                saveVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.buyDivCode, 'save')}> Save </button>

                            }{
                                updateVisible && <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => save(fields.buyDivCode, 'update')}> Update </button>
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
                // } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Buyer Division Master`}</h6 >} placement="right" onClose={onClose} visible={visible} maskClosable={false} >
                    } title={< h6 className='m-0' > {`${fields.id == 0 ? "Add New" : "Edit"} Buyer Division Master`}</h6 >} placement="right" onClose={onClose} visible={visible} maskClosable={false} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyCode === '' ? errors.buyCode : ''}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' id="buyer-code" disabled={fields.id != 0}
                            value={fields.buyCode} onChange={inputOnChange("buyCode")} required>
                            <option value="" hidden>Select Buyer Code</option>
                            {
                                buyCodeList.map((t, ind) => (
                                    <option key={ind} value={t.buyCode}>{t.buyCode}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Div Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyDivCode === '' ? errors.buyDivCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buyer Div Code' disabled={fields.id != 0}
                            value={fields.buyDivCode} maxLength="10"
                            id="Buyer-Div-Code"
                            onChange={inputOnChange("buyDivCode")}
                            autoComplete="off"
                            required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Division Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.divName === '' ? errors.divName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buyer Division Name'
                            value={fields.divName} maxLength="50"
                            id="Material-Desc"
                            onChange={inputOnChange("divName")}
                            autoComplete="off"
                            required />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Profit Percent </label>
                            <small className='text-danger'>{errors.profitPercent ? errors.profitPercent : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter profit Percent'
                            value={fields.profitPercent}
                            onChange={inputOnChange("profitPercent")}
                            maxLength="10"
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("profitPercent")}
                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("profitPercent")}
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

BuyerDivisionMaster.propTypes = {
    name: PropTypes.string
}

export default BuyerDivisionMaster;