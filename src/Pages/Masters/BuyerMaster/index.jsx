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




import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'

const requiredFields = ["buyCode", "buyName", "buyType", "address1", "city", "pinCode","country","active"],
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
    const [countryList, setcountryList] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
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
    const onClick = () =>{
        setShowResults(false)
        setShowForm(true)
      } 

      const close = () =>{
        clearFields()
        setShowResults(true)
        setShowForm(false)
      } 
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
        if (name === 'contNo'){
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['contNo'] =  ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['contNo'] = "Please enter numbers only"
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
            setShowResults(false)
            setShowForm(true)
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
        <>
      

       { showResults && 
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
            </Drawer> */}
        </div >
        }
        {showForm &&
        <div class="container-fluid">
        {/* <!-- breadcrumb --> */}
        <div class="breadcrumb-header justify-content-between bread-list">
            <div class="w-100">
                <div class="d-flex border-bottom pb-15">
                    <div class="me-auto ">
                        <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                            <h4 class="content-title float-start pr-20 border-0"><span class="pr-10"><img
                                        src={breadcrumbIcon} alt=""/></span> Buyer Master</h4>
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
                    <label>Buyer Code<span className='text-danger'>*  </span> </label>
                    <small className='text-danger'>{fields.buyCode === '' ? errors.buyCode : ''}</small>
                </div>
                <input className='form-control form-control-sm mt-1' placeholder='Enter Buyer Code'
                    value={fields.buyCode} minLength="1" maxLength="10"
                    onChange={inputOnChange("buyCode")}                            
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
            <div class="col-lg-4">
            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                    <label>Buyer Name<span className='text-danger'>*  </span> </label>
                    <small className='text-danger'>{fields.buyName === '' ? errors.buyName : ''}</small>
                </div>
                <input className='form-control form-control-sm mt-1' placeholder='Enter Buyer Name'
                    value={fields.buyName} minLength="1" maxLength="100"
                    onChange={inputOnChange("buyName")}                            
                />                            
            </div>
            <div class="col-lg-4">
            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Buyer Type<span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.buyType === '' ? errors.buyType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.buyType}
                                onChange={inputOnChange("buyType")}                            
                        >
                            <option value=""> Select Buyer Type</option>
                            {/* {MaterialTypeList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })} */}
                             <option value="INTERNATIONAL"> INTERNATIONAL </option>
                             <option value="DOMESTIC"> DOMESTIC </option>                             
                        </select>
            </div>
        
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
                        type="button" role="tab" aria-controls="home" aria-selected="true">Current Address </button>
                </li>
                {/* <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1"
                        type="button" role="tab" aria-controls="profile" aria-selected="false">Billing Address</button>
                </li> */}
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


                        {/* <div class="col-lg-3">
                            <label>Enterprise</label>
                            <small className='text-danger'>{fields.enterprise === '' ? errors.enterprise : ''}</small>
                            <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                            required
                            value={fields.enterprise}
                            onChange={inputOnChange("enterprise")}                
                            >
                            <option value=""> Select Enter prise</option>
                            <option data-group="M" value="NA">NA</option>
                            <option data-group="M" value="A-MICRO">A-MICRO</option>
                            <option data-group="M" value="B-SMALL">B-SMALL</option>
                            <option data-group="M" value="C-MEDIUM">C-MEDIUM</option>
                            <option data-group="S" value="NA">NA</option>
                            <option data-group="S" value="D-MICRO">D-MICRO</option>
                            <option data-group="S" value="E-SMALL">E-SMALL</option>
                            <option data-group="S" value="F-MEDIUM">F-MEDIUM</option>
                        </select>
                        </div>
                        </div> */}
                    
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
                            <label>Image FileName</label>
                            <small className='text-danger'>{errors.imageFileName ? errors.imageFileName : ''}</small>
                            <input type="text" class="form-control" placeholder="imageFileName"
                            value={fields.imageFileName} 
                            onChange={inputOnChange("imageFileName")}  
                            />
                        </div>

                        <div className='col-lg-3'>
                        <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                    checked={fields.active === 'Y'}
                                    onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                        </div>
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
                        {/* <div class="col-lg-3">
                            <label>PAN No</label>
                            <small className='text-danger'>{errors.panNo ? errors.panNo : ''}</small>
                            <input type="text" class="form-control" placeholder="PAN No"
                            value={fields.panNo} 
                            onChange={inputOnChange("panNo")}   
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
                            <label>TIN No</label>
                            <small className='text-danger'>{errors.tinNo ? errors.tinNo : ''}</small>
                            <input type="text" class="form-control" placeholder="TIN  No"
                            value={fields.tinNo} 
                            onChange={inputOnChange("tinNo")}   
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
                            <label>GST No</label>
                            <small className='text-danger'>{errors.gstNo ? errors.gstNo : ''}</small>
                            <input type="text" class="form-control" placeholder="GST No"
                            value={fields.gstNo} 
                            onChange={inputOnChange("gstNo")}  
                            />
                        </div>
                        <div class="col-lg-3">
                            <label>TDS Type</label>
                            <small className='text-danger'>{errors.tdsType ? errors.tdsType : ''}</small>
                            <Radio.Group onChange={inputOnChange("tdsType")} value={fields.tdsType}>
                            <Radio value={1}>Company</Radio>
                            <Radio value={2}>Otherthan Company</Radio>
                            </Radio.Group>
                        </div>
                        <div class="col-lg-3">
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

BuyerMaster.propTypes = {
    name: PropTypes.string
}

export default BuyerMaster;