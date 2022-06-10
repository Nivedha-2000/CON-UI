import React, {useEffect, useRef, useState} from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import '../DefectMasters/DefectMasters.css';
import {Drawer, message, Spin, Switch, Button} from 'antd';
import ApiCall from "../../../services";
import {API_URLS, MISCELLANEOUS_TYPES} from "../../../constants/api_url_constants";
import {getHostName} from "../../../helpers";
import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import {PDM_APP_CODE} from "../../../constants";
import {shipmentTableColumns} from "../StitchTypeMaster/tableColumns";
import {ShipmentToleranceColumn} from "./validation";

function ShipmentTolerance({ name }) {
    const [initialValues, setInitialValues] = useState({
        id: 0,
        buyCode: "",
        buyDivcode: "",
        minGarQty: '',
        maxGarQty: '',
        market: "",
        minShipPer: 100,
        maxShipPer: 100,
        wash: "",
        active: "Y",
        cancel: "",
    });
    const [visible, setVisible] = useState(false);
    const hiddenButtonRef = useRef(null)
    const cancelButtonRef = useRef(null)
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [buyerList, setBuyerList] = useState([])
    const [buyerDivisionList, setBuyerDivisionList] = useState([])
    const [marketList, setMarketList] = useState([])
    const [washList, setWashList] = useState([])
    const [localError, setLocalError] = useState('')

    const clearFields = (indexCode = null) => {
        setInitialValues({
            id: 0,
            buyCode: "",
            buyDivcode: "",
            minGarQty: '',
            maxGarQty: '',
            market: "",
            minShipPer: 100,
            maxShipPer: 100,
            wash: "",
            active: "Y",
            cancel: "",
        });
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
        getMarket()
        getWash()
        getBuyerList();
    }, []);

    const getMarket = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.MARKET
        }).then(resp => {
            try {
                setMarketList(resp.data.map(d => ({ code: d.code, codeDesc: d.code })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getWash = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.WASH
        }).then(resp => {
            try {
                setWashList(resp.data.map(d => ({ code: d.code, codeDesc: d.code })))
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
            path: API_URLS.GET_SHIP_TOLERANCE_MASTER
        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                setList(resp.data.map(d => {
                    d.activeText = d.active === "Y" ? "Yes" : "No"
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

    const getBuyerDivisionDropDown = (value) => {
        if (value) {
            ApiCall({
                path: API_URLS.GET_BUYER_DIVISION_DROPDOWN + `/${value}`
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

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

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

    const getDataById = id => {
        return ApiCall({
            path: API_URLS.GET_SHIP_TOLERANCE_MASTER_BY_ID + "/" + id,
        })
    }

    const edit = async (id, type) => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (id && await getDataById(id))
            if (!data) {
                message.error("Data not found")
                return
            }
            getBuyerDivisionDropDown(data.buyCode)
            setInitialValues({
                id: id,
                buyCode: data.buyCode,
                buyDivcode: data.buyDivcode,
                minGarQty: data.minGarQty,
                maxGarQty: data.maxGarQty,
                market: data.market,
                minShipPer: data.minShipPer,
                maxShipPer: data.maxShipPer,
                wash: data.wash,
                active: data.active,
                cancel: data.cancel,
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }

    const onFormSubmit = (values) => {
        if (parseInt(values.minGarQty) > parseInt(values.maxGarQty)) {
            setLocalError('Maximum garment qty should be greater than min garment qty')
        } else {
            setLocalError('')
            const payload = Object.assign(values, {hostName: getHostName(), cancel: ''})
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_SHIP_TOLERANCE_MASTER,
                data: {
                    ...payload
                }
            }).then(resp => {
                setLoader(false)
                message.success(resp.message)
                getDatas();
                onClose()
            }).catch(err => {
                setLoader(false)
                message.error(err.message || err)
            })
        }

    }

    let tableColumns = null
    tableColumns = shipmentTableColumns({edit});

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


            <Drawer footer={
                <>
                    <div>
                        {
                            !loader ?
                                <button type='submit' disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={() => hiddenButtonRef.current.click()} > {initialValues.id === 0 ? "Submit" : "Update"} </button>
                                : (
                                    <div className="text-center">
                                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                    </div>
                                )
                        }
                    </div>
                    <div>
                        <button type='submit' className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={(e) => {
                            cancelButtonRef.current.click()
                            let _id = Number(initialValues.id)
                            if(_id === 0)add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${initialValues.id === 0 ? "Add New" : "Edit"} Shipment Tolerance`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible}
                    maskClosable={false}
            >

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        onFormSubmit(values, actions.resetForm);
                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 500);
                    }}
                    // validator={() => ({})}
                    validationSchema={Yup.object().shape(ShipmentToleranceColumn)}
                    enableReinitialize
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleBlur,
                            handleChange,
                            isValid,
                            dirty,
                            resetForm,
                            setFieldValue,
                            handleSubmit
                        } = props;
                        return (
                            <>
                                <Form>

                                    <div className='defect-master-add-new'>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Buyer Code <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{errors.buyCode && touched.buyCode ? errors.buyCode : ''}</small>
                                            </div>
                                            <select
                                                className='form-select form-select-sm mt-1'
                                                name="buyCode"
                                                onChange={(e) => {
                                                    setFieldValue('buyCode', e.target.value);
                                                    getBuyerDivisionDropDown(e.target.value)
                                                }}
                                                onBlur={handleBlur}
                                                value={values.buyCode}
                                            >
                                                <option value=""> Select Buyer Name</option>
                                                {buyerList.map((t, index) => {
                                                    return <option key={index} value={t.buyCode}>{t.buyCode}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Buyer Division Code <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{errors.buyDivcode && touched.buyDivcode ? errors.buyDivcode : ''}</small>
                                            </div>
                                            <select
                                                className='form-select form-select-sm mt-1'
                                                name="buyDivcode"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.buyDivcode}
                                            >
                                                <option value=""> Select Buyer Division</option>
                                                {
                                                    buyerDivisionList.map((t, ind) => (
                                                        <option key={ind} value={t.buyDivCode}>{t.divName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Minimum Garment Quantity<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{errors.minGarQty && touched.minGarQty ? errors.minGarQty : ''}</small>
                                            </div>
                                            <input
                                                className='form-control form-control-sm mt-1'
                                                placeholder='Enter Minimum Garment'
                                                minLength="1"
                                                maxLength="50"
                                                name="minGarQty"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.minGarQty}
                                                 />
                                        </div>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Maximum Garment Quantity<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{errors.maxGarQty && touched.maxGarQty ? errors.maxGarQty : localError ? localError : ''}</small>
                                            </div>
                                            <input
                                                className='form-control form-control-sm mt-1'
                                                placeholder='Enter Maximum Garment'
                                                minLength="1"
                                                maxLength="50"
                                                name="maxGarQty"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.maxGarQty}
                                                 />
                                        </div>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Market</label>
                                                {/*<small className='text-danger'>{errors.market ? errors.market : ''}</small>*/}
                                            </div>
                                            <select
                                                className='form-select form-select-sm mt-1'
                                                name="market"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.market}
                                            >
                                                <option value=""> Select market</option>
                                                {
                                                    marketList.map((t, ind) => (
                                                        <option key={ind} value={t.code}>{t.codeDesc}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Minimum Shipment Percentage<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{errors.minShipPer && touched.minShipPer ? errors.minShipPer : ''}</small>
                                            </div>
                                            <input
                                                className='form-control form-control-sm mt-1'
                                                placeholder='Enter Minimum Shipment %'
                                                min={1}
                                                max={1}
                                                name="minShipPer"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.minShipPer}
                                                 />
                                        </div>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Maximum Shipment Percentage<span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{errors.maxShipPer && touched.maxShipPer ? errors.maxShipPer : ''}</small>
                                            </div>
                                            <input
                                                className='form-control form-control-sm mt-1'
                                                placeholder='Enter Maximum Shipment %'
                                                min={1}
                                                max={1}
                                                name="maxShipPer"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.maxShipPer}
                                                 />
                                        </div>

                                        <div className='mt-3'>
                                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                                <label>Wash <span className='text-danger'>*  </span> </label>
                                                <small className='text-danger'>{errors.wash && touched.wash ? errors.wash : ''}</small>
                                            </div>
                                            <select
                                                className='form-select form-select-sm mt-1'
                                                name="wash"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.wash}
                                            >
                                                <option value=""> Select wash</option>
                                                {
                                                    washList.map((t, ind) => (
                                                        <option key={ind} value={t.code}>{t.codeDesc}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className='mt-3'>
                                            <label>{values.active === 'Y' ? 'Active' : 'In Active'}</label>
                                            <div className='mt-1'>
                                                <Switch size='default'
                                                        checked={values.active === 'Y'}
                                                        onChange={(e) => setFieldValue("active", e ? 'Y' : 'N')} />
                                            </div>
                                        </div>

                                    </div>
                                    <button type={'submit'} ref={hiddenButtonRef} style={{visibility: 'hidden'}}>Submit</button>
                                    <button type={'button'} ref={cancelButtonRef}  onClick={() => resetForm()} style={{visibility: 'hidden'}}>Cancel</button>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </Drawer>

        </div >
    )
}

export default ShipmentTolerance;