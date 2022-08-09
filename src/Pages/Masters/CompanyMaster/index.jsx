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

// import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'

const requiredFields = ["entityID", "eCode", "eName", "address1", "address2","address3", "city", "pinCode","country", "tngstNo", "tinNo", "tanNo","cinNo", "cstNo", "cstDate", "panNo","stNo", "areaCode", "emailId", "contPerson1","contPerson2", "contNo", "gstNo"],
    initialErrorMessages = {
        entityID: "",
        eCode: "",
        eName: "", 
        address1: "",
        address2: "",
        address3: "",
        city: "",
        pinCode: "",       
        country:"",
        tngstNo:"",          
        tinNo: "",
        tanNo: "",
        cinNo: "",
        cstNo: "",
        cstDate: "",
        panNo: "",
        stNo: "",
        areaCode: "", 
        emailId:"",
        contPerson1:"",   
        contPerson2: "", 
        contNo:"",
        gstNo:"",
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,       
        entityID: "",
        eCode: "",
        eName: "", 
        address1: "",
        address2: "",
        address3: "",
        city: "",
        pinCode: "",      
        country:"",
        tngstNo:"",          
        tinNo: "",
        tanNo: "",
        cinNo: "",
        cstNo: "",
        cstDate: "",
        panNo: "",
        stNo: "",
        areaCode: "", 
        emailId:"",
        contPerson1:"",   
        contPerson2: "", 
        contNo:"",
        gstNo:"",
        active: 'Y'
    };

function CompanyMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [locationName, setLocationName] = useState([]);
    const [orginLocationList, setOrginLocationList] = useState([]);
    const [countryList, setcountryList] = useState([]);
    const [buyerdivcodelist, setbuyerdivcodelist] = useState([]);
    const [ProductTypeList, setProductTypeList] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
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
        getOrginLocationType();  
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
    const getOrginLocationType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.COUNTRY
        }).then(resp => {
            try {
                setcountryList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
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
            path: API_URLS.GET_COMPANY_MASTER_LIST
          
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

    const onClick = () =>{
        setShowResults(false)
        setShowForm(true)
      } 

      const close = () =>{
        clearFields()
        setShowResults(true)
        setShowForm(false)
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
                path: API_URLS.SAVE_COMPANY_MASTER,
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
            name: "entityID",
            label: "entityID",          
        },
        {
            name: "eCode",
            label: "eCode",          
        },
        {
            name: "eName",
            label: "eName",          
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
        
        // {
        //     name: "loccode",
        //     label: "loccode"
        // },  
        
        {
            name: "country",
            label: "country",          
        },
        {
            name: "tngstNo",
            label: "tngstNo",          
        },
        {
            name: "tinNo",
            label: "tinNo",          
        },
        {
            name: "tanNo",
            label: "tanNo",          
        },
        {
            name: "cinNo",
            label: "cinNo",          
        },
        {
            name: "cstNo",
            label: "cstNo",          
        },
        {
            name: "cstDate",
            label: "cstDate",          
        },
        
        {
            name: "panNo",
            label: "panNo"
        },

        {
            name: "stNo",
            label: "stNo",          
        },
        {
            name: "areaCode",
            label: "areaCode",          
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
            name: "gstNo",
            label: "gstNo",          
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
            name: "entityID",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div onClick={() => edit(tm.rowData[0],tm.rowData[1],tm.rowData[2], 'edit')}>
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

    const getDataById = (entityID,eCode,eName) => {
       
        return ApiCall({
            path: API_URLS.GET_COMPANY_MASTER_BY_ID + "/" + entityID+ "/" + eCode + "/" + eName,
            
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
    const edit = async (entityID,eCode,eName, type) => {       
        try {
            setLoader(true);
            setVisible(true);

            setShowResults(false);
            setShowForm(true);
            let { data } = (entityID && await getDataById(entityID,eCode,eName))
            if (!data) {
                message.error("Data not found")
                return
            }
            const tableId = type === 'clone' ? 0 : 0
            setFields({
               // id: tableId,                    
               entityID: data.entityID,
               eCode: data.eCode,
               eName: data.eName,
               address1: data.address1,
               address2: data.address2,   
               address3: data.address3,
               city: data.city,
               pinCode: data.pinCode, 
               country: data.country,
               tngstNo: data.tngstNo,
               tinNo: data.tinNo,
               tanNo: data.tanNo,   
               cinNo: data.cinNo,
               cstNo: data.cstNo,
               cstDate: data.cstDate, 
               panNo: data.panNo,
               stNo: data.stNo,  

               areaCode: data.areaCode,
               emailId: data.emailId,
               contPerson1: data.contPerson1,
               contPerson2: data.contPerson2,   
               contNo: data.contNo,
               gstNo: data.gstNo,
                            
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
<>

        {showResults &&
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0'>{name}</h6>

                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-1'>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' onClick={onClick} onClose={onClose} visible={visible} maskClosable={false}> + Add New </button>
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
            {/* <Drawer footer={
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
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Company `}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.entityID === '' ? errors.entityID : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter entityID Value'
                               value={fields.entityID} minLength="1" maxLength="10"
                               onChange={inputOnChange("entityID")}                            
                        />
                    </div>
                             
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Unit Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.eCode === '' ? errors.eCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter eCode Value'
                               value={fields.eCode} minLength="1" maxLength="10"
                               onChange={inputOnChange("eCode")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>eName </label>
                            <small className='text-danger'>{errors.eName ? errors.eName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter eName'
                               value={fields.eName} minLength="1" maxLength="10"
                               onChange={inputOnChange("eName")}                            
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
                            <label>tngstNo <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.tngstNo === '' ? errors.tngstNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter tngstNo'
                               value={fields.tngstNo} minLength="1" maxLength="10"
                               onChange={inputOnChange("tngstNo")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>tinNo <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.tinNo === '' ? errors.tinNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter tinNo'
                               value={fields.tinNo} minLength="1" maxLength="10"
                               onChange={inputOnChange("tinNo")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>tanNo <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.tanNo === '' ? errors.tanNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter tanNo'
                               value={fields.tanNo} minLength="1" maxLength="10"
                               onChange={inputOnChange("tanNo")}                            
                        />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>cinNo </label>
                            <small className='text-danger'>{errors.cinNo ? errors.cinNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter cinNo'
                               value={fields.cinNo} minLength="1" maxLength="10"
                               onChange={inputOnChange("cinNo")}                            
                        />
                    </div>      

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>cstNo </label>
                            <small className='text-danger'>{errors.cstNo ? errors.cstNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter cstNo'
                               value={fields.cstNo} minLength="1" maxLength="15"
                               onChange={inputOnChange("cstNo")}                            
                        />
                    </div>           
           
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>cstDate </label>
                            <small className='text-danger'>{errors.cstDate ? errors.cstDate : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter cstDate'
                               value={fields.cstDate} minLength="1" maxLength="5"
                               onChange={inputOnChange("cstDate")}                            
                        />
                    </div>      

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>panNo </label>
                            <small className='text-danger'>{errors.panNo ? errors.panNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter panNo'
                               value={fields.panNo} minLength="1" maxLength="10"
                               onChange={inputOnChange("panNo")}                            
                        />
                    </div>      


                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>stNo <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.stNo === '' ? errors.stNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter stNo'
                               value={fields.stNo} minLength="1" maxLength="10"
                               onChange={inputOnChange("stNo")}                            
                        />
                    </div>
                             
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>areaCode <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.areaCode === '' ? errors.areaCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter area Code'
                               value={fields.areaCode} minLength="1" maxLength="10"
                               onChange={inputOnChange("areaCode")}                            
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
                            <label>gstNo </label>
                            <small className='text-danger'>{errors.gstNo ? errors.gstNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter gstNo'
                               value={fields.gstNo} minLength="1" maxLength="5"
                               onChange={inputOnChange("gstNo")}                            
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
            </Drawer> */}
        </div >
            }
         { showForm &&   
        <div class="container-fluid">
        {/* <!-- breadcrumb --> */}
        <div class="breadcrumb-header justify-content-between bread-list">
            <div class="w-100">
                <div class="d-flex border-bottom pb-15">
                    <div class="me-auto ">
                        <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                            <h4 class="content-title float-start pr-20 border-0"><span class="pr-10"><img
                                        src={breadcrumbIcon} alt=""/></span> Company Master</h4>
                        </a>
                        <div id="myCollapse" class="collapse w-100 float-start pl-35 ">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Breadcrumb One</a></li>
                                    <li class="breadcrumb-item"><a href="#">Breadcrumb Two</a></li>
                                    <li class="breadcrumb-item active text-primary" aria-current="page">Item
                                        Creations</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div class="pt-15">

                    </div>
                </div>



                <div class="col-lg">

                </div>


            </div>
        </div>
        {/* <!-- breadcrumb -->
        <!-- row opened--> */}
        <div class="clear"></div>


        <div class="row mt-15 dis-sel mt-20">
            {/* <div class="col-lg-4">
                <label>Buyer Code</label>
                <small className='text-danger'>{fields.supCategory === '' ? errors.supCategory : ''}</small>
                <div class="main-select">
                    <select name="somename" class="form-control SlectBox main-select"
                        required
                        value={fields.supCategory}
                        onChange={inputOnChange("supCategory")}      
                        >
                        <option value=""> Buyer Code </option>
                        {supCategoryList.map((v, index) => {
                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                        })}

                    </select>
                </div>
            </div> */}
            <div class="col-lg-4">
            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                    <label>Entity ID<span className='text-danger'>*  </span> </label>
                    <small className='text-danger'>{fields.entityID === '' ? errors.entityID : ''}</small>
                </div>
                <input className='form-control form-control-sm mt-1' placeholder='Enter Entity ID'
                    value={fields.entityID} minLength="1" maxLength="100"
                    onChange={inputOnChange("entityID")}                            
                />                            
            </div>
            <div class="col-lg-4">
            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                    <label>Entity Code<span className='text-danger'>*  </span> </label>
                    <small className='text-danger'>{fields.eCode === '' ? errors.eCode : ''}</small>
                </div>
                <input className='form-control form-control-sm mt-1' placeholder='Enter Entity Type'
                    value={fields.eCode} minLength="1" maxLength="25"
                    onChange={inputOnChange("eCode")}                            
                /> 
            </div>

            <div class="col-lg-4">
                <div className='d-flex flex-wrap align-items-center justify-content-between'>
                    <label>Entity Name<span className='text-danger'>*  </span> </label>
                    <small className='text-danger'>{fields.eName === '' ? errors.eName : ''}</small>
                </div>
                <input className='form-control form-control-sm mt-1' placeholder='Enter Entity Code'
                    value={fields.eName} minLength="1" maxLength="10"
                    onChange={inputOnChange("eName")}                            
                />                       
            </div>
            {/* <div className='mt-3'>
                <div className='d-flex flex-wrap align-items-center justify-content-between'>
                    <label>buyType <span className='text-danger'>*  </span> </label>
                    <small className='text-danger'>{fields.buyType === '' ? errors.buyType : ''}</small>
                </div>
                <input className='form-control form-control-sm mt-1' placeholder='Enter buyType'
                    value={fields.buyType} minLength="1" maxLength="10"
                    onChange={inputOnChange("address1")}                            
                />
            </div> */}
        
        
            {/* <div class="d-flex align-content-center pt-40 justify-content-center">
                <div class=" ">
                    <button class="btn btn-primary search-btn btn-block  ">Clear All</button>
                </div>
                <div class="">
                    <button class="btn btn-success search-btn btn-block ml-10">Show Result</button>
                </div>
            </div> */}
        </div>

        <div class="row mt-25 main-tab pl-15 pr-15">
            <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                        type="button" role="tab" aria-controls="home" aria-selected="true">Address Info</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Tax Info</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Contact Info </button>
                </li>
                {/* <li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                        type="button" role="tab" aria-controls="contact" aria-selected="false">Purchase
                        Info</button>
                </li> */}
            </ul>
            <div class="tab-content p-15 mb-80" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="row mt-15">
                        <div class="col-lg-3">
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Address 1<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.address1 === '' ? errors.address1 : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Address 1'
                            value={fields.address1} minLength="1" maxLength="100"
                            onChange={inputOnChange("address1")}                            
                            />                                    
                        </div>
                        <div class="col-lg-3">
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Address 2<span className='text-danger'>  </span> </label>
                            <small className='text-danger'>{fields.address2 === '' ? errors.address2 : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Address 2'
                            value={fields.address2} minLength="1" maxLength="100"
                            onChange={inputOnChange("address2")}                            
                            />                                    
                        </div>
                        <div class="col-lg-3">
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Address 3<span className='text-danger'>  </span> </label>
                            <small className='text-danger'>{fields.address3 === '' ? errors.address3 : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Address 3'
                            value={fields.address3} minLength="1" maxLength="100"
                            onChange={inputOnChange("address3")}                            
                            />                                    
                        </div>                                
                        <div class="col-lg-3">
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>City<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.city === '' ? errors.city : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter City'
                            value={fields.city} minLength="1" maxLength="50"
                            onChange={inputOnChange("city")}                            
                            />                                     
                        </div>
                        <div class="col-lg-3">
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>PinCode<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.pinCode === '' ? errors.pinCode : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Pincode'
                            value={fields.pinCode} minLength="1" maxLength="15"
                            onChange={inputOnChange("pinCode")}                            
                            />                                     
                        </div>
                    
                        {/* <div class="col-lg-3">
                            <label>Country</label>
                            <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                            <input type="text" class="form-control" placeholder="Country"/>
                        </div> */}

                        <div class="col-lg-3">
                        <label>Country</label>
                        <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                            <div class="main-select">
                                <select name="somename" class="form-control SlectBox main-select"
                                required
                                value={fields.country}
                                onChange={inputOnChange("country")}          
                                >
                            <option value=""> Select country</option>
                                {countryList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                        })}

                    </select>
                </div>
            </div>                              
                    
                    </div>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="home-tab">
                    <div class="row mt-15">
                        <div class="col-lg-3">
                            <label>Email Id</label>
                            <small className='text-danger'>{errors.emailId ? errors.emailId : ''}</small>
                            <input type="text" class="form-control" placeholder="Enter Email Id"
                            value={fields.emailId} 
                            onChange={inputOnChange("emailId")}   
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>Contact Person1</label>
                            <small className='text-danger'>{errors.contPerson1 ? errors.contPerson1 : ''}</small>
                            <input type="text" class="form-control" placeholder="Enter Contact Person1"
                            value={fields.contPerson1} 
                            onChange={inputOnChange("contPerson1")}    
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>Contact Person2</label>
                            <small className='text-danger'>{errors.contPerson2 ? errors.contPerson2 : ''}</small>
                            <input type="text" class="form-control" placeholder="Enter Contact Person2"
                            value={fields.contPerson2} 
                            onChange={inputOnChange("contPerson2")}   
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>Contact No</label>
                            <small className='text-danger'>{errors.contNo ? errors.contNo : ''}</small>
                            <input type="text" class="form-control" placeholder="Enter Contact No"
                            value={fields.contNo} 
                            onChange={inputOnChange("contNo")}    
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>GST No</label>
                            <small className='text-danger'>{errors.gstNo ? errors.gstNo : ''}</small>
                            <input type="text" class="form-control" placeholder="GST No"
                            value={fields.gstNo} 
                            onChange={inputOnChange("gstNo")}  
                            />
                        </div>
                        {/* <div class="col-lg-3">
                            <label>TDS Type</label>
                            <small className='text-danger'>{errors.tdsType ? errors.tdsType : ''}</small>
                            <Radio.Group onChange={inputOnChange("tdsType")} value={fields.tdsType}>
                            <Radio value={1}>Company</Radio>
                            <Radio value={2}>Otherthan Company</Radio>
                            </Radio.Group>
                        </div> */}
                        {/* <div class="col-lg-3">
                            <label>TDS Category</label>
                            <small className='text-danger'>{errors.tdsCategory ? errors.tdsCategory : ''}</small>
                            <Radio.Group onChange={inputOnChange("tdsCategory")} value={fields.tdsCategory}>
                            <Radio value={1}>Firms Firms</Radio>
                            <Radio value={2}>Individual</Radio>
                            </Radio.Group>
                        </div> */}
                    
                        {/* <div class="col-lg-3">
                            <label>TDS Category</label>
                            <small className='text-danger'>{errors.tdsCategory ? errors.tdsCategory : ''}</small>
                            <Radio.Group onChange={inputOnChange("tdsCategory")} value={fields.tdsCategory}>
                            <Radio value={1}>Firms</Radio>
                            <Radio value={2}>Individual</Radio>
                            </Radio.Group>
                        </div> */}
                    </div>
                </div>
                <div class="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab">
                <div class="row mt-15">
                        <div class="col-lg-3">
                            <label>TNGST No</label>
                            <small className='text-danger'>{errors.tngstNo ? errors.tngstNo : ''}</small>
                            <input type="text" class="form-control" placeholder="tngst No"
                            value={fields.tngstNo} 
                            onChange={inputOnChange("tngstNo")}   
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>TAN No</label>
                            <small className='text-danger'>{errors.tanNo ? errors.tanNo : ''}</small>
                            <input type="text" class="form-control" placeholder="TAN No"
                            value={fields.tanNo} 
                            onChange={inputOnChange("tanNo")}   
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>CIN No</label>
                            <small className='text-danger'>{errors.cinNo ? errors.cinNo : ''}</small>
                            <input type="text" class="form-control" placeholder="CIN No"
                            value={fields.cinNo} 
                            onChange={inputOnChange("cinNo")}    
                            />
                        </div>
                    
                        <div class="col-lg-3">
                            <label>ARN No</label>
                            <small className='text-danger'>{errors.arnNo ? errors.arnNo : ''}</small>
                            <input type="text" class="form-control" placeholder="ARN No"
                            value={fields.arnNo} 
                            onChange={inputOnChange("arnNo")}    
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>CST No</label>
                            <small className='text-danger'>{errors.cstNo ? errors.cstNo : ''}</small>
                            <input type="text" class="form-control" placeholder="CST No"
                            value={fields.cstNo} 
                            onChange={inputOnChange("cstNo")}  
                            />
                        </div>

                        <div class="col-lg-3">
                            <label>CST Date</label>
                            <small className='text-danger'>{errors.cstDate ? errors.cstDate : ''}</small>
                            <input type="text" class="form-control" placeholder="CST Date"
                            value={fields.cstDate} 
                            onChange={inputOnChange("cstDate")}  
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>PAN No</label>
                            <small className='text-danger'>{errors.panNo ? errors.panNo : ''}</small>
                            <input type="text" class="form-control" placeholder="PAN No"
                            value={fields.panNo} 
                            onChange={inputOnChange("panNo")}  
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>ST No</label>
                            <small className='text-danger'>{errors.stNo ? errors.stNo : ''}</small>
                            <input type="text" class="form-control" placeholder="ST No"
                            value={fields.stNo} 
                            onChange={inputOnChange("stNo")}  
                            />
                        </div>

                        <div class="col-lg-3">
                            <label>Area Code</label>
                            <small className='text-danger'>{errors.areaCode ? errors.areaCode : ''}</small>
                            <input type="text" class="form-control" placeholder="ST No"
                            value={fields.areaCode} 
                            onChange={inputOnChange("areaCode")}  
                            />
                        </div>
                        {/* <div class="col-lg-3">
                            <label>TDS Category</label>
                            <small className='text-danger'>{errors.tdsCategory ? errors.tdsCategory : ''}</small>
                            <Radio.Group onChange={inputOnChange("tdsCategory")} value={fields.tdsCategory}>
                            <Radio value={1}>Firms Firms</Radio>
                            <Radio value={2}>Individual</Radio>
                            </Radio.Group>
                        </div>
                        */}
                        {/* <div class="col-lg-3">
                            <label>TDS Category</label>
                            <small className='text-danger'>{errors.tdsCategory ? errors.tdsCategory : ''}</small>
                            <Radio.Group onChange={inputOnChange("tdsCategory")} value={fields.tdsCategory}>
                            <Radio value={1}>Firms</Radio>
                            <Radio value={2}>Individual</Radio>
                            </Radio.Group>
                        </div> */}
                    </div>
                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <div class="row mt-10">
                        {/* <div class="col-lg-2">

                            <div class="main-select">
                                <select name="somename" class="form-control SlectBox main-select"
                                    onclick="console.log($(this).val())"
                                    onchange="console.log('change is firing')">
                                
                                    <option title="Volvo is a car" value="volvo">Material Code</option>
                                    <option value="saab">option</option>
                                    <option value="mercedes">option</option>
                                    <option value="audi">option</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-3">

                            <div class="main-select">
                                <select name="somename" class="form-control SlectBox main-select"
                                    onclick="console.log($(this).val())"
                                    onchange="console.log('change is firing')">
                                
                                    <option title="Volvo is a car" value="volvo">Supplier</option>
                                    <option value="saab">option</option>
                                    <option value="mercedes">option</option>
                                    <option value="audi">option</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-3">

                            <input type="text" class="form-control" placeholder="Buyer Reference No"/>
                        </div>
                        <div class="col-lg-2">

                            <input type="text" class="form-control" placeholder="Supplier Reference"/>

                        </div>
                        <div class="col-lg-2">
                            <input type="text" class="form-control" placeholder="Multiples"/>

                        </div>
                    </div>
                    <div class="row mt-10">
                        <div class="col-lg-5">

                            <input type="text" class="form-control" placeholder="Descriptions"/>
                        </div>
                        <div class="col-lg">

                            <input type="text" class="form-control" placeholder="Remarks"/>
                        </div>
                        <div class="col-lg-auto"> <button class="icons-list-item org-plus m-0">
                                <i class="fe fe-plus fs-5 pe-auto"></i>
                            </button>
                        </div> */}
                    </div>
                    {/* <div class="table-responsive pb-10 bg-white mt-20">
                        <table id="example-1" class="table table-striped tbl-wht   text-md-nowrap ">
                            <thead>
                                <tr>
                                    <th> Material Code</th>
                                    <th>Supplier</th>
                                    <th>Brand </th>
                                    <th>Supplier Reference </th>
                                    <th>Description </th>
                                    <th>Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>6739YU8</td>
                                    <td>San Marino</td>
                                    <td>Levis</td>
                                    <td>Ultrices Neque</td>
                                    <td>Lacus vestibulum sed arcu non odio euismod</td>
                                    <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>
                                </tr>
                                <tr>
                                    <td>6739YU8</td>
                                    <td>San Marino</td>
                                    <td>Levis</td>
                                    <td>Ultrices Neque</td>
                                    <td>Lacus vestibulum sed arcu non odio euismod</td>
                                    <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg"
                                                class="w-auto"/></a></td>

                                </tr>
                                <tr>
                                    <td>6739YU8</td>
                                    <td>San Marino</td>
                                    <td>Levis</td>
                                    <td>Ultrices Neque</td>
                                    <td>Lacus vestibulum sed arcu non odio euismod</td>
                                    <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg"
                                                class="w-auto"/></a></td>

                                </tr>
                                <tr>
                                    <td>6739YU8</td>
                                    <td>San Marino</td>
                                    <td>Levis</td>
                                    <td>Ultrices Neque</td>
                                    <td>Lacus vestibulum sed arcu non odio euismod</td>
                                    <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                </tr>
                            
                            </tbody>


                        </table>

                    </div>  */}
                </div>
            </div>
            <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">

                 <div class=" ">
                    <button class="btn btn-primary search-btn btn-block ml-10" onClick={close}>Back</button>
                </div>
                {/* <div class=" ">
                    <button class="btn btn-primary search-btn btn-block ml-10">Cancel</button>
                </div> */}
                    <div>
                        <button className='btn btn-primary search-btn btn-block ml-10' onClick={(e) => {
                            let _id = Number(fields.id)
                            if(_id === 0)add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                <div class="">
                    <button class="btn btn-success search-btn btn-block ml-10" onClick={save}>Save</button>
                </div>
                {/* <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id === 0 ? "Save" : "Update"} </button> */}

            </div>
        </div>


        {/* <!--row closed--> */}
        </div>
        }

</>
    )
}

CompanyMaster.propTypes = {
    name: PropTypes.string
}

export default CompanyMaster;