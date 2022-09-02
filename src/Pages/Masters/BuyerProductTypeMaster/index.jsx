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

const requiredFields = ["buyCode", "buyDivCode", "productType"],
    initialErrorMessages = {
        buyCode: "",
        buyDivCode: "",
        productType: "",
        // transitdays: 0,     
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,
        buyCode: "",
        buyDivCode: "",
        productType: "",
        // transitdays: 0,       
        active: 'Y'
    };

function BuyerProductTypeMaster({ name }) {
    const [visible, setVisible] = useState(false);   
    const [ProductTypeList, setProductTypeList] = useState([]);
    const [buyerList, setBuyerList] = useState([]);
    const [buyerDivisionList, setBuyerDivisionList] = useState([]);   
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [buyerCodeVisible, setBuyerCodeVisible] = useState(false);
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

    // useEffect(() => {
    //     getBuyerCode();
    //     getBuyerDivCode();
    //     getProductType();

    //     getDatas()
    //     // getLocationMaster()

    //     // getShipModeType();
    // }, []);
    useEffect(() => {
        if (fields.buyCode) {
            getBuyerDivisionDropDown()
        }
    }, [fields.buyCode])

    useEffect(() => {
        getDatas()
        getProductType();
        getBuyerList()
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

  
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
            path: API_URLS.GET_BUYPRODTYPE_MASTER_LIST
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
        if (name === 'transitdays') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['transitdays'] = ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['transitdays'] = "Please enter numbers only"
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

        setErrors({ ...initialErrorMessages, ...err })

        //getDataById(fields.buyCode, fields.buyDivCode, fields.productType)

        if (validation) {
            setLoader(true)

            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_BUYPRODTYPE_MASTER,
                data: {
                    ...fields,
                    hostName: getHostName()
                }
            }).then(resp => {
                setLoader(false)
                message.success(resp.message)
                onClose()
                getDatas()
                setBuyerCodeVisible(false)
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
            name: "buyCode",
            label: "buyerCode",

        },
        {
            name: "buyDivCode",
            label: "buyDivCode",
        },
        {
            name: "productType",
            label: "productType",
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
                            <div onClick={() => edit(tm.rowData[0], tm.rowData[1], tm.rowData[2], 'edit')}>
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

    const getDataById = (buyCode, buyDivCode, productType) => {
        return ApiCall({
            path: API_URLS.GET_BUYPRODTYPE_MASTER_BY_ID + "/" + buyCode + "/" + buyDivCode + "/" + productType,
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
    const edit = async (buyCode, buyDivCode, productType, type) => {
        try {
            setLoader(true)
            setVisible(true);
            setBuyerCodeVisible(true);
            let { data } = (buyCode && await getDataById(buyCode, buyDivCode, productType))
            if (!data) {
                message.error("Data not found")
                return
            }
            const tableId = type === 'clone' ? 0 : 0
            setFields({                             
                buyCode: data.buyCode,
                buyDivCode: data.buyDivCode,
                productType: data.productType,                    
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
                            if (_id === 0) add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Buyer Product Type`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{errors.buyCode}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' disabled={buyerCodeVisible}  id="buyer-code" value={fields.buyCode} onChange={inputOnChange("buyCode")} required>
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
                            <small className='text-danger'>{errors.buyDivCode}</small>
                        </div>
                        <select className='form-control form-control-sm mt-1' disabled={buyerCodeVisible} id="buyer-div-code" value={fields.buyDivCode} onChange={inputOnChange("buyDivCode")} required>
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
                            <label>Product Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.productType === '' ? errors.productType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={fields.productType} disabled={buyerCodeVisible}
                            onChange={inputOnChange("productType")}
                        >
                            <option value=""> Select Product Type</option>
                            {ProductTypeList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
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

BuyerProductTypeMaster.propTypes = {
    name: PropTypes.string
}

export default BuyerProductTypeMaster;