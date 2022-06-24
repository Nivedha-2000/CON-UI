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

const requiredFields = ["buyCode", "buyName", "buyType", "address1", "address2","address3", "city", "pinCode","country", "emailId", "contPerson1","contPerson2", "contNo", "imageFileName"],
    initialErrorMessages = {
        buyCode: "",
        buyName: "",
        buyType: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        pinCode: "",       
        country:"",       
        emailId:"",
        contPerson1:"",   
        contPerson2: "", 
        contNo:"",
        imageFileName:"",
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,       
        buyCode: "",
        buyName: "",
        buyType: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        pinCode: "",       
        country:"",       
        emailId:"",
        contPerson1:"",   
        contPerson2: "", 
        contNo:"",
        imageFileName:"",
        active: 'Y'
    };

function BuyerMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [locationName, setLocationName] = useState([]);
    const [orginLocationList, setOrginLocationList] = useState([]);
    const [buyerdivcodelist, setbuyerdivcodelist] = useState([]);
    const [ProductTypeList, setProductTypeList] = useState([]);
    const [FitList, setFitList] = useState([]);
    const [GenderList, setGenderList] = useState([]);
    const [shipmodeList, setShipmodeList] = useState([]);
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
        getDatas();       
        getBuyerDivCode();
        getProductType();    
        getGender(); 
        getFit(); 
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

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
   
    const getFit = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FIT
        }).then(resp => {
            try {
                setFitList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getGender = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.GENDER
        }).then(resp => {
            try {
                setGenderList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
                console.log(data);
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }
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
    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_BUYER_MASTER_LIST
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
        if (name === 'inSeamIndex'){
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['inSeamIndex'] =  ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['inSeamIndex'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }  else {
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
            if (fields.transitdays==0){
                err['transitdays'] = "Should be greater than zero."
                validation = false
            }
        
        setErrors({ ...initialErrorMessages, ...err })

        if (validation) {
            setLoader(true)
            
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_BUYER_MASTER,
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
            name: 'buyDivCode',
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
            label: "buyCode",          
        },
        {
            name: "buyName",
            label: "buyName",          
        },
        {
            name: "buyType",
            label: "buyType",          
        },
        {
            name: "address1",
            label: "address1",          
        },
        {
            name: "address2",
            label: "address2",          
        },
        {
            name: "address3",
            label: "address3",          
        },
        {
            name: "city",
            label: "city",          
        },
        {
            name: "pinCode",
            label: "pinCode",          
        },
       
        {
            name: "country",
            label: "country",          
        },       
        {
            name: "emailId",
            label: "emailId",          
        },
        {
            name: "contPerson1",
            label: "contPerson1",          
        },
        {
            name: "contPerson2",
            label: "contPerson2",          
        },
        {
            name: "contNo",
            label: "contNo",          
        },
        {
            name: "imageFileName",
            label: "imageFileName",          
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
            name: "buyCode",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
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

    const getDataById = (buyCode) => {
        return ApiCall({
            path: API_URLS.GET_BUYER_MASTER_BY_ID + "/" + buyCode,
        })
    }
    const add = async () => {
        try {
            setLoader(true)
            setVisible(true);           
            clearFields();
            setLoader(false);
        } catch (err) {
            setLoader(false);
            message.error(typeof err == "string" ? err : "data not found")
        }
    };
    const edit = async (buyCode, type) => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (buyCode && await getDataById(buyCode))
            if (!data) {
                message.error("Data not found")
                return
            }
            const tableId = type === 'clone' ? 0 : 0
            setFields({
               // id: tableId,                    
               buyCode: data.buyCode,
               buyName: data.buyName,
               buyType:data.buyType,
               address1: data.address1,
               address2: data.address2,   
               address3: data.address3,
               city: data.city,
               pinCode: data.pinCode,              
               country: data.country,              
               emailId: data.emailId,
               contPerson1: data.contPerson1,
               contPerson2: data.contPerson2,   
               contNo: data.contNo,
               imageFileName: data.imageFileName,                            
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
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Buyer`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buy Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyCode === '' ? errors.buyCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buy Code'
                               value={fields.buyCode} minLength="1" maxLength="10"
                               onChange={inputOnChange("buyCode")}                            
                        />
                    </div>
                             
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buy Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyName === '' ? errors.buyName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Buy Name'
                               value={fields.buyName} minLength="1" maxLength="10"
                               onChange={inputOnChange("buyName")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>buyType <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyType === '' ? errors.buyType : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter buyType'
                               value={fields.buyType} minLength="1" maxLength="10"
                               onChange={inputOnChange("address1")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address1 <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.address1 === '' ? errors.address1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter address1'
                               value={fields.address1} minLength="1" maxLength="10"
                               onChange={inputOnChange("address1")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address2 <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.address2 === '' ? errors.address2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter address2'
                               value={fields.address2} minLength="1" maxLength="10"
                               onChange={inputOnChange("address2")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address3 </label>
                            <small className='text-danger'>{errors.address3 ? errors.address3 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter address3'
                               value={fields.address3} minLength="1" maxLength="10"
                               onChange={inputOnChange("address3")}                            
                        />
                    </div>      

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>city </label>
                            <small className='text-danger'>{errors.city ? errors.city : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter city'
                               value={fields.city} minLength="1" maxLength="15"
                               onChange={inputOnChange("city")}                            
                        />
                    </div>           
           
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>pinCode </label>
                            <small className='text-danger'>{errors.pinCode ? errors.pinCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter pinCode'
                               value={fields.pinCode} minLength="1" maxLength="5"
                               onChange={inputOnChange("pinCode")}                            
                        />
                    </div>     

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>country <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter country'
                               value={fields.country} minLength="1" maxLength="10"
                               onChange={inputOnChange("country")}                            
                        />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>emailId <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.emailId === '' ? errors.emailId : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter emailId'
                               value={fields.emailId} minLength="1" maxLength="50"
                               onChange={inputOnChange("emailId")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>contPerson1 <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.contPerson1 === '' ? errors.contPerson1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter contPerson1'
                               value={fields.contPerson1} minLength="1" maxLength="10"
                               onChange={inputOnChange("contPerson1")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>contPerson2 </label>
                            <small className='text-danger'>{errors.contPerson2 ? errors.contPerson2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter contPerson2'
                               value={fields.contPerson2} minLength="1" maxLength="10"
                               onChange={inputOnChange("contPerson2")}                            
                        />
                    </div>      

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>contNo </label>
                            <small className='text-danger'>{errors.contNo ? errors.contNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter contNo'
                               value={fields.contNo} minLength="1" maxLength="15"
                               onChange={inputOnChange("contNo")}                            
                        />
                    </div>           
           
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>imageFileName </label>
                            <small className='text-danger'>{errors.imageFileName ? errors.imageFileName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter imageFileName'
                               value={fields.imageFileName} minLength="1" maxLength="5"
                               onChange={inputOnChange("imageFileName")}                            
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

BuyerMaster.propTypes = {
    name: PropTypes.string
}

export default BuyerMaster;