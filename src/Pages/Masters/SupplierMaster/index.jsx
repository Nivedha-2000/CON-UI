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
import { Radio } from 'antd';

const requiredFields = [ "supCategory","supCode","supName"],
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
        active: 'Y'
    };

function SupplierMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [supCategoryList, setsupCategoryList] = useState([]);
    const [countryList, setcountryList] = useState([]);
    const [Mattype, setMattypeList] = useState([]);
    const [MatDesc, setMatDescList] = useState([]);
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
        getSupCategory();
        getDatas();
     //   getFashionGroup();
        getOrginLocationType();
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
                setList(resp.data)
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            setListLoading(false)
            message.error(err.message || err)
        })
    }


    // const onChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    //   };
    

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

    const tableColumns = [
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
        // {
        //     name: "city",
        //     label: "city"
        // },   
        // {
        //     name: "pinCode",
        //     label: "pinCode"
        // },   
        // {
        //     name: "country",
        //     label: "country"
        // },   
        // {
        //     name: "tngstNo",
        //     label: "tngstNo"
        // },   
        // {
        //     name: "tinNo",
        //     label: "tinNo"
        // },   
        // {
        //     name: "cstNo",
        //     label: "cstNo"
        // },   
        // {
        //     name: "panNo",
        //     label: "panNo"
        // },   
        // {
        //     name: "cinNo",
        //     label: "cinNo"
        // },   
        // {
        //     name: "emailId1",
        //     label: "emailId1"
        // },   
        // {
        //     name: "emailId2",
        //     label: "emailId2"
        // },   
        // {
        //     name: "contPerson1",
        //     label: "contPerson1"
        // },  
        // {
        //     name: "contPerson2",
        //     label: "contPerson2"
        // },  
        // {
        //     name: "contNo1",
        //     label: "contNo1"
        // },  
        // {
        //     name: "contNo2",
        //     label: "contNo2"
        // },  
        // {
        //     name: "faxNo",
        //     label: "faxNo"
        // },  
        // {
        //     name: "acctCode",
        //     label: "acctCode"
        // },  
        // {
        //     name: "tdsType",
        //     label: "tdsType"
        // },  
        // {
        //     name: "tdsCategory",
        //     label: "tdsCategory"
        // },  
        // {
        //     name: "strRegNo",
        //     label: "strRegNo"
        // },  
        // {
        //     name: "requestBy",
        //     label: "requestBy"
        // },  
        // {
        //     name: "arnNo",
        //     label: "arnNo"
        // },  
        // {
        //     name: "gstNo",
        //     label: "gstNo"
        // },  
        // {
        //     name: "supplierNo",
        //     label: "supplierNo"
        // },  
        // {
        //     name: "supplierGroup",
        //     label: "supplierGroup"
        // },  
        // {
        //     name: "paymentType",
        //     label: "paymentType"
        // },  
        // {
        //     name: "enterprise",
        //     label: "enterprise"
        // },  
        // {
        //     name: "epType",
        //     label: "epType"
        // },  
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
            name: "supCategory",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                           {/* </div> 
                           <div onClick={() => edit(tm.rowData[0],tm.rowData[1],tm.rowData[2], 'edit')}> 
                           */}
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
                            if(_id === 0)add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Supplier Master`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>
                  
                  
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Supplier Category <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.supCategory === '' ? errors.supCategory : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.supCategory}
                                onChange={inputOnChange("supCategory")}                            
                        >
                            <option value=""> Supplier Category </option>
                            {supCategoryList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                  
           
                   <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Supplier Code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.supCode === '' ? errors.supCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Supplier Code'
                            value={fields.supCode} maxLength="10"
                            id="supCode"
                            onChange={inputOnChange("supCode")} 
                            required />
                    </div>

                     <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Supplier Name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.supName === '' ? errors.supName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Supplier name'
                            value={fields.supName} maxLength="50"
                            id="supName"
                            onChange={inputOnChange("supName")} 
                            required />
                    </div>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address1 </label>
                            <small className='text-danger'>{errors.address1 ? errors.address1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Address'
                               value={fields.address1} 
                               onChange={inputOnChange("address1")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address2 </label>
                            <small className='text-danger'>{errors.address2 ? errors.address2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Address 2'
                               value={fields.address2} 
                               onChange={inputOnChange("address2")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>address3 </label>
                            <small className='text-danger'>{errors.address3 ? errors.address3 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Address 3'
                               value={fields.address3} 
                               onChange={inputOnChange("address3")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>city </label>
                            <small className='text-danger'>{errors.city ? errors.city : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter city'
                               value={fields.city} 
                               onChange={inputOnChange("city")}                         
                        />
                    </div> 

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>EP Type  </label>
                            <small className='text-danger'>{fields.epType === '' ? errors.epType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.epType}
                                onChange={inputOnChange("epType")}                            
                        >
                            <option value=""> Select EP Type</option>
                            <option value="M">Manufacture</option>
                            <option value="S">Services</option>
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Pin Code </label>
                            <small className='text-danger'>{errors.pinCode ? errors.pinCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter pinCode'
                               value={fields.pinCode} 
                               onChange={inputOnChange("pinCode")}                         
                        />
                    </div> 

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Country </label>
                            <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.country}
                                onChange={inputOnChange("country")}                            
                        >
                            <option value=""> Select country</option>
                            {countryList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>
                 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Enter prise </label>
                            <small className='text-danger'>{fields.enterprise === '' ? errors.enterprise : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
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

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>PAN No  </label>
                            <small className='text-danger'>{errors.panNo ? errors.panNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter pan No'
                               value={fields.panNo} 
                               onChange={inputOnChange("panNo")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>CIN No  </label>
                            <small className='text-danger'>{errors.cinNo ? errors.cinNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter cinNo'
                               value={fields.cinNo} 
                               onChange={inputOnChange("cinNo")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>TIN No  </label>
                            <small className='text-danger'>{errors.tinNo ? errors.tinNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter tinNo'
                               value={fields.tinNo} 
                               onChange={inputOnChange("tinNo")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>ARN No </label>
                            <small className='text-danger'>{errors.arnNo ? errors.arnNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter arnNo'
                               value={fields.arnNo} 
                               onChange={inputOnChange("arnNo")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>GST No  </label>
                            <small className='text-danger'>{errors.gstNo ? errors.gstNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter gstNo'
                               value={fields.gstNo} 
                               onChange={inputOnChange("gstNo")}                         
                        />
                    </div> 
                    

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>TDS Type  </label>
                            <small className='text-danger'>{errors.tdsType ? errors.tdsType : ''}</small>
                        </div>
                        <Radio.Group onChange={inputOnChange("tdsType")} value={fields.tdsType}>
                            <Radio value={1}>Company</Radio>
                            <Radio value={2}>Otherthan Company</Radio>
                            </Radio.Group>
                    </div> 

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>TDS Category   </label>
                            <small className='text-danger'>{errors.tdsCategory ? errors.tdsCategory : ''}</small>
                        </div>
                        <Radio.Group onChange={inputOnChange("tdsCategory")} value={fields.tdsCategory}>
                            <Radio value={1}>Firms</Radio>
                            <Radio value={2}>Individual</Radio>
                            </Radio.Group>
                    </div> 

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Email Id 1  </label>
                            <small className='text-danger'>{errors.emailId1 ? errors.emailId1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter emailId 1'
                               value={fields.emailId1} 
                               onChange={inputOnChange("emailId1")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Email Id 2 </label>
                            <small className='text-danger'>{errors.emailId2 ? errors.emailId2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter emailId 2'
                               value={fields.emailId2} 
                               onChange={inputOnChange("emailId2")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Contact Person 1  </label>
                            <small className='text-danger'>{errors.contPerson1 ? errors.contPerson1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person 1'
                               value={fields.contPerson1} 
                               onChange={inputOnChange("contPerson1")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Contact Person 2 </label>
                            <small className='text-danger'>{errors.contPerson2 ? errors.contPerson2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person 2'
                               value={fields.contPerson2} 
                               onChange={inputOnChange("contPerson2")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Contact No 1 </label>
                            <small className='text-danger'>{errors.contNo1 ? errors.contNo1 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No 1'
                               value={fields.contNo1} 
                               onChange={inputOnChange("contNo1")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Contact No 2 </label>
                            <small className='text-danger'>{errors.contNo2 ? errors.contNo2 : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No 2'
                               value={fields.contNo2} 
                               onChange={inputOnChange("contNo2")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Fax No  </label>
                            <small className='text-danger'>{errors.faxNo ? errors.faxNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Fax No '
                               value={fields.faxNo} 
                               onChange={inputOnChange("faxNo")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>GL Account Code  </label>
                            <small className='text-danger'>{errors.acctCode ? errors.acctCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter GL Account Code '
                               value={fields.acctCode} 
                               onChange={inputOnChange("acctCode")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Str Reg No  </label>
                            <small className='text-danger'>{errors.strRegNo ? errors.strRegNo : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Str Reg No '
                               value={fields.strRegNo} 
                               onChange={inputOnChange("strRegNo")}                         
                        />
                    </div> 
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Requested By  </label>
                            <small className='text-danger'>{errors.requestBy ? errors.requestBy : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Requested By '
                               value={fields.requestBy} 
                               onChange={inputOnChange("requestBy")}                         
                        />
                    </div> 
                    {/* <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Company Code  <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.com === '' ? errors.supCategory : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.supCategory}
                                onChange={inputOnChange("supCategory")}                            
                        >
                            <option value=""> Supplier Category </option>
                            {supCategoryList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div> */}
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

SupplierMaster.propTypes = {
    name: PropTypes.string
}

export default SupplierMaster;