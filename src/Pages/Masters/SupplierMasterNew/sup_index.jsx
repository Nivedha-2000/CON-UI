import React, { useEffect, useState } from 'react'
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
import { Radio } from 'antd';


// import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'
// import jquerySumoselect from '../../../Assets/js/jquerysumoselect' 
// import customjs from '../../../Assets/js/custom'
// export default function TabTest() {



    const requiredFields = [ "supCategory","supCode","supName","city","country","acctCode","pinCode","address1","requestBy"],
    initialErrorMessages = {
       // supplierId: 0,
        supCategory: "",
        supCode: "",
        supName: "",  
        address1: "",
        address2:"",
        address3:"",
        city:"",
        pinCode:"",
        country:"",
        tngstNo:"",
        tinNo:"",
        cstNo:"",
        panNo:"",
        cinNo:"",
        emailId1:"",
        emailId2:"",
        contPerson1:"",
        contPerson2:"",
        contNo1:"",
        contNo2:"",
        faxNo:"",
        acctCode:"",
        tdsType:"",
        tdsCategory:"",
        strRegNo:"",
        requestBy:"",
        arnNo:"",
        gstNo:"",
        supplierNo:"",
        supplierGroup:"",
        paymentType:"",
        enterprise:"",
        epType:"",
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,       
        supCategory: "",
        supCode: "",
        supName: "",  
        address1: "",
        address2:"",
        address3:"",
        city:"",
        pinCode:"",
        country:"",
        tngstNo:"",
        tinNo:"",
        cstNo:"",
        panNo:"",
        cinNo:"",
        emailId1:"",
        emailId2:"",
        contPerson1:"",
        contPerson2:"",
        contNo1:"",
        contNo2:"",
        faxNo:"",
        acctCode:"",
        tdsType:"",
        tdsCategory:"",
        strRegNo:"",
        requestBy:"",
        arnNo:"",
        gstNo:"",
        supplierNo:"",
        supplierGroup:"",
        paymentType:"",
        enterprise:"",
        epType:"",
        toLocation: "",
        active: 'Y'
    };

function SupplierMasterNew({ name }) {

    const [visible, setVisible] = useState(false);
    const [supCategoryList, setsupCategoryList] = useState([]);
    const [countryList, setcountryList] = useState([]);
    const [orginLocationList, setOrginLocationList] = useState([]);
    const [locationName, setLocationName] = useState([]);
    const [Mattype, setMattypeList] = useState([]);
    const [MatDesc, setMatDescList] = useState([]);
    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
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

    useEffect(() => {
        getSupCategory();
        getDatas();
     //   getFashionGroup();
        getOrginLocationType();
        getLocationMaster();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    
    const getSupCategory = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN  + MISCELLANEOUS_TYPES.SUPPLIERCATE
        }).then(resp => {
            try {
               
                setsupCategoryList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
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

    const getLocationMaster = async () => {
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(res => {
            if (res.Success === true) {
                setLocationName(res.data.filter(d=>d.active=="Y"))
            }
            else {
                setLoader(false);
            }
        });
    }
    const getShipModeType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.SHIPMODE
        }).then(resp => {
            try {
                setShipmodeList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
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
            path: API_URLS.GET_SUPPLIER_MASTER_LIST
        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                debugger;
                setList(resp.data)
                console.log(resp.data)
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
        if (name === 'MatTypeIndex'){
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['MatTypeIndex'] =  ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['MatTypeIndex'] = "Please enter numbers only"
                validation = false
                setErrors({ ...errors, ...err })
            }
        }  else {
            setFields({ ...fields, [name]: value })
        }

    }

    const inputOnChange1 = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'contNo1' || name === 'contNo2' || 'faxNo'){
            const re = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;
            // if (e.target.value === '' || re.test(e.target.value)) {
            //     setFields({ ...fields, [name]: value });
            //     err[name] =  ''
            //     setErrors({ ...errors, ...err })
            // }
            // else {
            //     err[name] = "Please enter numbers only"
            //     validation = false
            //     setErrors({ ...errors, ...err })
            // }
        }
        else if(name === 'contPerson1'){
            const re = /[^0-9a-zA-Z]/;
            // if (e.target.value === '' || re.test(e.target.value)) {
            //     setFields({ ...fields, [name]: value });
            //     err[name] =  ''
            //     setErrors({ ...errors, ...err })
            // }
            // else {
            //     err[name] = "Please enter Alpha Numeric only"
            //     validation = false
            //     setErrors({ ...errors, ...err })
            // }
        }
        else {
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
        if (validation) {
            setLoader(true)
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_SUPPLIER_MASTER,
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
            name: 'supCategory',
            direction: 'asc'
        }
    })

    const updateTableProps = props => {
        setTableProps({
            ...tableProps,
            ...props
        })
    }

      const onClick = () =>{
        setShowResults(false)
        setShowForm(true)
      } 

      const close = () =>{
        clearFields()
      } 

      const back = () =>{
        setShowResults(true)
        setShowForm(false)
        onClose()
      } 

      
     

    const tableColumns = [
        {
            name: "supCategory",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                           {/* </div> 
                           <div onClick={() => edit(tm.rowData[0],tm.rowData[1],tm.rowData[2], 'edit')}> 
                           */}
                            <div onClick={() => edit(tm.rowData[1],tm.rowData[2],tm.rowData[3], 'edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                            {/* <div onClick={() => edit(value, 'clone')}>
                                <FontAwesomeIcon icon={faCopy} color="#919191" />
                            </div> */}
                        </div>

                    )
                }
            }
        },
        {
            name: "supplierId",
            label: "supplier Id"
        },   
        {
            name: "supCategory",
            label: "sup Category"
        },   
        {
            name: "supCode",
            label: "supCode"
        },  
        {
            name: "supName",
            label: "supName"
        },  
        {
            name: "address1",
            label: "address1"
        },     
        {
            name: "address2",
            label: "address2"
        },   
        {
            name: "address3",
            label: "address3"
        },   
        {
            name: "city",
            label: "city"
        },   
        {
            name: "pinCode",
            label: "pinCode"
        },   
        {
            name: "country",
            label: "country"
        },   
        {
            name: "tngstNo",
            label: "tngstNo"
        },   
        {
            name: "tinNo",
            label: "tinNo"
        },   
        {
            name: "cstNo",
            label: "cstNo"
        },   
        {
            name: "panNo",
            label: "panNo"
        },   
        {
            name: "cinNo",
            label: "cinNo"
        },   
        {
            name: "emailId1",
            label: "emailId1"
        },   
        {
            name: "emailId2",
            label: "emailId2"
        },   
        {
            name: "contPerson1",
            label: "contPerson1"
        },  
        {
            name: "contPerson2",
            label: "contPerson2"
        },  
        {
            name: "contNo1",
            label: "contNo1"
        },  
        {
            name: "contNo2",
            label: "contNo2"
        },  
        {
            name: "faxNo",
            label: "faxNo"
        },  
        {
            name: "acctCode",
            label: "acctCode"
        },  
        {
            name: "tdsType",
            label: "tdsType"
        },  
        {
            name: "tdsCategory",
            label: "tdsCategory"
        },  
        {
            name: "strRegNo",
            label: "strRegNo"
        },  
        {
            name: "requestBy",
            label: "requestBy"
        },  
        {
            name: "arnNo",
            label: "arnNo"
        },  
        {
            name: "gstNo",
            label: "gstNo"
        },  
        {
            name: "supplierNo",
            label: "supplierNo"
        },  
        {
            name: "supplierGroup",
            label: "supplierGroup"
        },  
        {
            name: "paymentType",
            label: "paymentType"
        },  
        {
            name: "enterprise",
            label: "enterprise"
        },  
        {
            name: "epType",
            label: "epType"
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
        }
       
    ]

    const getDataById = (supplierId,supCategory,supCode) => {
        console.log(API_URLS.GET_SUPPLIER_MASTER_BY_ID)
        console.log( supplierId + "/"+supCategory + "/" +supCode)
        return ApiCall({
            path: API_URLS.GET_SUPPLIER_MASTER_BY_ID + "/" + supplierId + "/"+supCategory + "/" +supCode,
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
    const edit = async (supplierId,supCategory,supCode, type) => {
        try {
            setShowResults(false)
            setShowForm(true)
            setLoader(true)
            setVisible(true);
            let { data } = (supCategory && await getDataById(supplierId,supCategory,supCode))
            //let { data } = (await getDataById(id))
            if (!data) {
                message.error("Data not found")
                return
            }
            setFields({
              //  id: tableId,         
                supCategory: data.supCategory,
                supCode: data.supCode,
                supName: data.supName,
                address1: data.address1,
                address2:data.address2,
                address3:data.address3,
                city:data.city,
                pinCode:data.pinCode,
                country:data.country,
                tngstNo:data.tngstNo,
                tinNo:data.tinNo,
                cstNo:data.cstNo,
                panNo:data.panNo,
                cinNo:data.cinNo,
                emailId1:data.emailId1,
                emailId2:data.emailId2,
                contPerson1:data.contPerson1,
                contPerson2:data.contPerson2,
                contNo1:data.contNo1,
                contNo2:data.contNo2,
                faxNo:data.faxNo,
                acctCode:data.acctCode,
                tdsType:data.tdsType,
                tdsCategory:data.tdsCategory,
                strRegNo:data.strRegNo,
                requestBy:data.requestBy,
                arnNo:data.arnNo,
                gstNo:data.gstNo,
                supplierNo:data.supplierNo,
                supplierGroup:data.supplierGroup,
                paymentType:data.paymentType,
                enterprise:data.enterprise,
                epType:data.epType,
                active: data.active
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }



  return (
      <>
    
    

        {showResults &&
            <div   className='defect-master-main'>   
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
            </div> 
        }
          
        { showForm && 
            <div class="container-fluid" > 
                {/* <!-- breadcrumb --> */}
                <div class="breadcrumb-header justify-content-between bread-list">
                    <div class="w-100">
                        <div class="d-flex border-bottom pb-15">
                            <div class="me-auto ">
                                <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                    <h4 class="content-title float-start pr-20 border-0"><span class="pr-10"><img
                                                src={breadcrumbIcon} alt=""/></span> Supplier Master</h4>
                                </a>
                                

                                <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                    <h4 class="content-title float-end pr-20 border-0 ml-4"><span class="pr-10"  ><img
                                                src={breadcrumbIcon} alt="" onClick={back} /></span> Back</h4>
                                </a>

                                {/* style = {{marginLeft:905}} */}
                                {/* <div id="myCollapse" class="collapse w-100 float-start pl-35 ">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">Breadcrumb One</a></li>
                                            <li class="breadcrumb-item"><a href="#">Breadcrumb Two</a></li>
                                            <li class="breadcrumb-item active text-primary" aria-current="page">Item
                                                Creations</li>
                                        </ol>
                                    </nav>
                                </div> */}
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
                    <div class="col-lg-4">
                        <label>Supplier Category</label>
                        <small className='text-danger'>{fields.supCategory === '' ? errors.supCategory : ''}</small>
                        <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                                required
                                value={fields.supCategory}
                                onChange={inputOnChange("supCategory")}     
                                disabled={fields.id != 0}     
                                >
                                <option value=""> Supplier Category </option>
                                 {supCategoryList.map((v, index) => {
                                 return <option key={index} value={v.code}>{v.codeDesc}</option>
                                 })}
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-4">
                            <label>Supplier Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.supCode === '' ? errors.supCode : ''}</small>
                        <input type="text" class="form-control" placeholder='Enter Supplier Code'
                            value={fields.supCode} maxLength="10"
                            id="supCode"
                            onChange={inputOnChange("supCode")} 
                            disabled={fields.id != 0}    
                            required 
                        />
                    </div>
                    <div class="col-lg-4">
                            <label>Supplier Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.supName === '' ? errors.supName : ''}</small>
                        <input type="text" class="form-control" placeholder='Enter Supplier name'
                            value={fields.supName} maxLength="100"
                            id="supName"
                            onChange={inputOnChange("supName")} 
                            required
                        
                        />
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
                                type="button" role="tab" aria-controls="home" aria-selected="true">Address Info </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Tax Info </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Contact Info </button>
                        </li>
                    </ul>
                    <div class="tab-content p-15 mb-80" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="row mt-15">
                                <div class="col-lg-3">
                                    <label>address1 </label>
                                    <small className='text-danger'>{errors.address1 ? errors.address1 : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter Address 1'
                                    value={fields.address1} 
                                    maxLength="100"
                                    onChange={inputOnChange("address1")}           
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>address2 </label>
                                    <small className='text-danger'>{errors.address2 ? errors.address2 : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter Address 2'
                                    value={fields.address2} 
                                    maxLength="100"
                                    onChange={inputOnChange("address2")}           
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>Address 3</label>
                                    <small className='text-danger'>{errors.address3 ? errors.address3 : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter Address 3'
                                    value={fields.address3} 
                                    maxLength="100"
                                    onChange={inputOnChange("address3")}           
                                    
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>City</label>
                                    <small className='text-danger'>{errors.city ? errors.city : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter city'
                                    value={fields.city} 
                                    maxLength="50"
                                    onChange={inputOnChange("city")}                 
                                    
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>Ep Type</label>
                                    <small className='text-danger'>{fields.supCategory === '' ? errors.supCategory : ''}</small>
                                    <div class="main-select">
                                <select name="somename" class="form-control SlectBox main-select"
                                    required
                                    value={fields.epType}
                                    maxLength="10"
                                    onChange={inputOnChange("epType")}                
                                    >
                                    <option value=""> Select EP Type</option>
                                    <option value="M">Manufacture</option>
                                    <option value="S">Services</option>
                                </select>
                                </div>
                                </div>
                                <div class="col-lg-3">
                                    <label>Pin code</label>
                                    <small className='text-danger'>{errors.pinCode ? errors.pinCode : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter pinCode'
                                    value={fields.pinCode} 
                                    maxLength="15"
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
                                        maxLength="50"
                                        onChange={inputOnChange("country")}          
                                        >
                                       <option value=""> Select country</option>
                                        {countryList.map((v, index) => {
                                        return <option key={index} value={v.code}>{v.codeDesc}</option>
                                 })}

                                        </select>
                                    </div>
                                </div>


                                <div class="col-lg-3">
                                    <label>Enterprise</label>
                                    <small className='text-danger'>{fields.enterprise === '' ? errors.enterprise : ''}</small>
                                    <div class="main-select">
                                    <select name="somename" class="form-control SlectBox main-select"
                                    required
                                    value={fields.enterprise}
                                    maxLength="10"
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
                                </div>
                               
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="home-tab">
                            <div class="row mt-15">
                                <div class="col-lg-3">
                                    <label>PAN No</label>
                                    <small className='text-danger'>{errors.panNo ? errors.panNo : ''}</small>
                                    <input type="text" class="form-control" placeholder="PAN No"
                                       value={fields.panNo} 
                                       maxLength="50"
                                       onChange={inputOnChange("panNo")}   
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>CIN No</label>
                                    <small className='text-danger'>{errors.cinNo ? errors.cinNo : ''}</small>
                                    <input type="text" class="form-control" placeholder="CIN No"
                                    value={fields.cinNo} 
                                    maxLength="50"
                                    onChange={inputOnChange("cinNo")}    
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>TIN No</label>
                                    <small className='text-danger'>{errors.tinNo ? errors.tinNo : ''}</small>
                                    <input type="text" class="form-control" placeholder="TIN  No"
                                      value={fields.tinNo} 
                                      maxLength="50"
                                      onChange={inputOnChange("tinNo")}   
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>ARN No</label>
                                    <small className='text-danger'>{errors.arnNo ? errors.arnNo : ''}</small>
                                    <input type="text" class="form-control" placeholder="ARN No"
                                      value={fields.arnNo} 
                                      maxLength="30"
                                      onChange={inputOnChange("arnNo")}    
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>GST No</label>
                                    <small className='text-danger'>{errors.gstNo ? errors.gstNo : ''}</small>
                                    <input type="text" class="form-control" placeholder="GST No"
                                     value={fields.gstNo} 
                                     maxLength="30"
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
                                </div>
                               
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
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="row mt-15">
                                <div class="col-lg-3">
                                <label>Email Id 1  </label>
                            <small className='text-danger'>{errors.emailId1 ? errors.emailId1 : ''}</small>
                                    <input type="text" class="form-control" placeholder="Enter emailId 1"
                                       value={fields.emailId1} 
                                       maxLength="50"
                                       onChange={inputOnChange("emailId1")}        
                                    />
                                </div>
                                <div class="col-lg-3">
                                <label>Email Id 2 </label>
                            <small className='text-danger'>{errors.emailId2 ? errors.emailId2 : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter emailId 2'
                               value={fields.emailId2} 
                               maxLength="50"
                               onChange={inputOnChange("emailId2")}             
                                    />
                                </div>
                                <div class="col-lg-3">
                                <label>Contact Person 1  </label>
                            <small className='text-danger'>{errors.contPerson1 ? errors.contPerson1 : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter Contact Person 1'
                               value={fields.contPerson1} 
                               maxLength="50"
                               onChange={inputOnChange("contPerson1")}         
                                    />
                                </div>
                                <div class="col-lg-3">
                                <label>Contact Person 2 </label>
                            <small className='text-danger'>{errors.contPerson2 ? errors.contPerson2 : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter Contact Person 2'
                               value={fields.contPerson2} 
                               maxLength="50"
                               onChange={inputOnChange("contPerson2")}           
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>Contact No 1 </label>
                                    <small className='text-danger'>{errors.contNo1 ? errors.contNo1 : ''}</small>
                                    <input type="text" class="form-control"  placeholder='Enter Contact No 1'
                                    value={fields.contNo1} 
                                    maxLength="25"
                                    onChange={inputOnChange("contNo1")}             
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>Contact No 2 </label>
                                     <small className='text-danger'>{errors.contNo2 ? errors.contNo2 : ''}</small>
                                    <input type="text" class="form-control"  placeholder='Enter Contact No 2'
                                    value={fields.contNo2} 
                                    maxLength="25"
                                    onChange={inputOnChange("contNo2")}                   
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>Fax No  </label>
                                    <small className='text-danger'>{errors.faxNo ? errors.faxNo : ''}</small>
                                    <input type="text" class="form-control"  placeholder='Enter Fax No '
                                    value={fields.faxNo} 
                                    maxLength="25"
                                    onChange={inputOnChange("faxNo")}                         
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>GL Account Code  </label>
                                    <small className='text-danger'>{errors.acctCode ? errors.acctCode : ''}</small>
                                    <input type="text" class="form-control"  placeholder='Enter GL Account Code '
                                    value={fields.acctCode} 
                                    maxLength="18"
                                    onChange={inputOnChange("acctCode")}                           
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>Str Reg No  </label>
                                    <small className='text-danger'>{errors.strRegNo ? errors.strRegNo : ''}</small>
                                    <input type="text" class="form-control"  placeholder='Enter Str Reg No '
                                    value={fields.strRegNo} 
                                    maxLength="25"
                                    onChange={inputOnChange("strRegNo")}                               
                                    />
                                </div>
                                <div class="col-lg-3">
                                    <label>Requested By  </label>
                                    <small className='text-danger'>{errors.requestBy ? errors.requestBy : ''}</small>
                                    <input type="text" class="form-control"  placeholder='Enter Requested By '
                                    value={fields.requestBy} 
                                    maxLength="50"
                                    onChange={inputOnChange("requestBy")}                                     
                                    />
                                </div>
                                <div class="col-lg-3">
                                   <label>Company Code</label>
                                 {/* <small className='text-danger'>{fields.toLocation === '' ? errors.toLocation : ''}</small> */}
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                       required
                                       value={""}
                                       onChange={inputOnChange("toLocation")}               
                                        >
                                      <option value=""> Select Destination Location</option>
                                        {locationName.map((v, index) => {
                                        return <option key={index} value={v.locCode}>{v.locName}</option>
                                 })}

                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                     <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                                     <div className='mt-1'>
                                        <Switch size='default'
                                        checked={fields.active === 'Y'}
                                        onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">
                        <div class=" ">
                            <button class="btn btn-primary search-btn btn-block  " onClick={close}>Cancel</button>
                        </div>
                        <div class="">
                            <button class="btn btn-success search-btn btn-block ml-10" onClick={save}>Save</button>
                        </div>
                    </div>
                </div>


                {/* <!--row closed--> */}
            </div>
        }
      </>
  )
}
SupplierMasterNew.propTypes = {
    name: PropTypes.string
}

export default SupplierMasterNew;