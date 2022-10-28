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

const requiredFields = ["parntslno", "purpose", "type", , "matchingSNo"],
    initialErrorMessages = {
        parntslno: 0,
        purpose: "",
        type: "",
        matchingSNo: 0,
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        parntslno: 0,
        purpose: "",
        type: "",
        matchingSNo: 0,
        active: 'Y'
    };

function PurposeMaster({ name }) {
    const [visible, setVisible] = useState(false);
    // const [locationName, setLocationName] = useState([]);
    // const [buyercodelist, setbuyercodelist] = useState([]);
    // const [buyerdivcodelist, setbuyerdivcodelist] = useState([]);
    const [ProductTypeList, setProductTypeList] = useState([]);
    const [buyerList, setBuyerList] = useState([]);
    const [pprList, setpprList] = useState([]);
    const [PSnovisible, setPSnovisible] = React.useState(true);
    const [buyerDivisionList, setBuyerDivisionList] = useState([]);
    // const [shipmodeList, setShipmodeList] = useState([]);
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
        if (fields.parntslno) {
            getBuyerDivisionDropDown()
        }
    }, [fields.parntslno])

    useEffect(() => {
        getDatas()
        getProductType();
        getBuyerList();
        getPPRType();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };


    // const getBuyerCode = () => {
    //     ApiCall({
    //         path: API_URLS.GET_BUYCODE_DROPDOWN 
    //     }).then(resp => {
    //         try {
    //             setbuyercodelist(resp.data.map(d => ({ code: d.buyCode, codeDesc: d.buyCode })))
    //         } catch (e) {
    //             message.error("response is not as expected")
    //         }
    //     }).catch(err => {
    //         message.error(err.message || err)
    //     })
    // }
    // const getBuyerDivCode = () => {
    //     ApiCall({
    //         path: API_URLS.GET_BUYDIVCODE_DROPDOWN + `/${fields.buyCode}`
    //     }).then(resp => {
    //         try {
    //             setbuyerdivcodelist(resp.data.map(d => ({ code: d.buyDivCode, codeDesc: d.buyDivCode })))
    //         } catch (e) {
    //             message.error("response is not as expected")
    //         }
    //     }).catch(err => {
    //         message.error(err.message || err)
    //     })
    // }
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
        setFields({ ...fields, buyDivCode: fields.id == 0 ? "" : fields.buyDivCode })
        if (fields.buyCode) {
            ApiCall({
                path: API_URLS.GET_BUYER_DIVISION_DROPDOWN + `/${fields.buyCode}`
            }).then(resp => {
                try {
                    setBuyerDivisionList(resp.data)
                } catch (er) {
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

    const getPPRType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.PPRTYPE
        }).then(resp => {
            try {
                setpprList(resp.data)
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }


    const getProductType = () => {
        ApiCall({
            path: API_URLS.GET_PRODUCT_TYPE_DROPDOWN
        }).then(resp => {
            try {
                setProductTypeList(resp.data.map(d => ({ code: d.productType, codeDesc: d.productType })))
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
            path: API_URLS.GET_PURPOSE_MASTER_LIST
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
            // setFields({ ...AddTnamodels, [name]: "" })
            setFields({ ...fields, [name]: '' });
        }
    }
    const NUMBER_IS_FOCUS_OUT_ZERO = name => (e) => {
        if (e.target.value == "" || e.target.value == undefined) {
            // setFields({ ...AddTnamodels, [name]: 0 })
            setFields({ ...fields, [name]: 0 });
        }
    }

    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'parntslno') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['parntslno'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['parntslno'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        } else if (name === 'matchingSNo') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['matchingSNo'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['matchingSNo'] = "Please enter numbers only"
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
        debugger;
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        if (fields.transitdays == 0) {
            err['transitdays'] = "Should be greater than zero."
            validation = false
        }

        setErrors({ ...initialErrorMessages, ...err })

        if (validation) {
            setLoader(true)

            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_PURPOSE_MASTER_LIST_MASTER,
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
            name: "parntslno",
            label: "Parent SlNo",

        },
        {
            name: "purpose",
            label: "Purpose",
        },
        {
            name: "type",
            label: "Type",
        },
        {
            name: "matchingSNo",
            label: "Matching SlNo"
        },
        {
            name: "actCode",
            label: "actCode"
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
            name: "parntslno",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div title="Edit" onClick={() => edit(value)}>
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

    const getDataById = parntslno => {
        return ApiCall({
            path: API_URLS.GET_PURPOSE_MASTER_EDIT_BY_ID + "/" + parntslno,
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
    // const edit = async (parntslno, type) => {
    //     try {
    //        // alert();
    //         setLoader(true)
    //         setVisible(true);

    //         let { data } = (parntslno && await getDataById(parntslno))
    //         alert(data);
    //         if (!data) {
    //             alert("data");
    //             message.error("Data not found")
    //             return
    //         }
    //         const tableId = type === 'clone' ? 0 : 0
    //         setFields({                                 
    //             parntslno: data.parntslno,
    //             purpose: data.purpose,
    //             type: data.type,
    //             matchingSNo: data.matchingSNo,  
    //             actCode: data.actCode,  
    //             active: data.active
    //         })
    //         setLoader(false)
    //     } catch (err) {
    //         alert("data1");
    //         setLoader(false)
    //         message.error(typeof err == "string" ? err : "data not found")
    //     }
    // }



    const edit = async parntslno => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (await getDataById(parntslno))
            data = Array.isArray(data) ? data[0] : data
            if (!data) {
                message.error("Data not found")
                return
            }
            setFields({
                parntslno: data.parntslno,
                purpose: data.purpose,
                type: data.type,
                matchingSNo: data.matchingSNo,
                actCode: data.actCode,
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
                            if (_id === 0) add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Purpose Master`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.parntslno}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' id="buyer-code" value={fields.parntslno} onChange={inputOnChange("parntslno")} required>
                            <option value="" hidden>Select Buyer Code</option>
                            {
                                buyerList.map((t, ind) => (
                                    <option key={ind} value={t.parntslno}>{t.parntslno}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Division Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.buyDivCode}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' id="buyer-div-code" value={fields.buyDivCode} onChange={inputOnChange("buyDivCode")} required>
                            <option value="" hidden>Select Buyer Division Code</option>
                            {
                                buyerDivisionList.map((t, ind) => (
                                    <option key={ind} value={t.buyDivCode}>{t.buyDivCode}</option>
                                ))
                            }
                        </select>
                    </div> */}
                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Transit days </label>
                            <small className='text-danger'>{errors.parntslno ? errors.parntslno : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter parntslno'
                            value={fields.parntslno == 0 ? '' : fields.parntslno} minLength="1" maxLength="2"
                            onChange={inputOnChange("parntslno")}
                        />
                    </div> */}
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Parent SLNo</label>
                            <small className='text-danger'>{errors.parntslno ? errors.parntslno : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Stitch Length'
                            value={fields.parntslno} minLength="3" maxLength="11"
                            numeric={true} disabled={PSnovisible}
                            onChange={inputOnChange("parntslno")} />
                        {/*onChange={(e) => setfields({ ...fields, parntslno: e.target.value })}*/}
                    </div>
                    <div class="mt-3">
                        <label>Purpose </label>
                        <small className='text-danger'>{errors.purpose ? errors.purpose : ''}</small>
                        <input type="text" class="form-control" placeholder='Enter purpose'
                            value={fields.purpose} minLength="1" maxLength="10"
                            onChange={inputOnChange("purpose")}
                        />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.type === '' ? errors.type : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.type}
                            onChange={inputOnChange("type")}
                        >
                            <option value=""> Select Type</option>
                            {pprList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Matching SLNo</label>
                            <small className='text-danger'>{errors.matchingSNo ? errors.matchingSNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Stitch Length'
                            value={fields.matchingSNo} minLength="3" maxLength="11"
                            numeric={true}
                            onFocus={NUMBER_IS_FOCUS_IN_ZERO("matchingSNo")}
                            onBlur={NUMBER_IS_FOCUS_OUT_ZERO("matchingSNo")}
                            onChange={inputOnChange("matchingSNo")} />
                        {/*onChange={(e) => setfields({ ...fields, parntslno: e.target.value })}*/}
                    </div>
                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Transit days </label>
                            <small className='text-danger'>{errors.matchingSNo ? errors.matchingSNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter matching SlNo'
                            value={fields.matchingSNo == 0 ? '' : fields.matchingSNo} minLength="1" maxLength="2"
                            onChange={inputOnChange("matchingSNo")}
                        />
                    </div> */}
                    <div class="mt-3">
                        <label>ActCode </label>
                        <small className='text-danger'>{errors.actCode ? errors.actCode : ''}</small>
                        <input type="text" class="form-control" placeholder='Enter actCode'
                            value={fields.actCode} minLength="1" maxLength="10"
                            onChange={inputOnChange("actCode")}
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

PurposeMaster.propTypes = {
    name: PropTypes.string
}

export default PurposeMaster;