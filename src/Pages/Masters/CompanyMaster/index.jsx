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
import { Button, Form, FormGroup, Label, Input, FormText, Col, FormFeedback } from 'reactstrap';
// import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'

const requiredFields = ["entityID", "eCode", "eName", "address1", "address2", "address3", "city", "pinCode", "country", "tngstNo", "tinNo", "tanNo", "cinNo", "cstNo", "panNo", "stNo", "areaCode", "emailId", "contPerson1", "contPerson2", "contNo", "gstNo"],
    initialErrorMessages = {
        entityID: "",
        eCode: "",
        eName: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        pinCode: "",
        country: "",
        tngstNo: "",
        tinNo: "",
        tanNo: "",
        cinNo: "",
        cstNo: "",
        cstDate: "",
        panNo: "",
        stNo: "",
        areaCode: "",
        emailId: "",
        contPerson1: "",
        contPerson2: "",
        contNo: "",
        gstNo: "",
        active: 'Y',
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
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
        country: "",
        tngstNo: "",
        tinNo: "",
        tanNo: "",
        cinNo: "",
        cstNo: "",
        cstDate: Date.UTC,
        panNo: "",
        stNo: "",
        areaCode: "",
        emailId: "",
        contPerson1: "",
        contPerson2: "",
        contNo: "",
        gstNo: "",
        active: 'Y',
        hostName: "",
        createdDate: "2022-08-22",
        createdBy: "AD",
        modifiedDate: "2022-08-22",
        modifiedBy: "",
        isActive: false
    };

function CompanyMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [countryList, setcountryList] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [entityVisible, setEntityVisible] = useState(false);
    const [Savevisible, setSavevisible] = React.useState(true);
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
        getOrginLocationType();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

    // const getOrginLocationType = () => {
    //     ApiCall({
    //         path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.COUNTRY
    //     }).then(resp => {
    //         // try {
    //         setcountryList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
    //         // } catch (e) {
    //         //     message.error("response is not as expected")
    //         // }
    //     }).catch(err => {
    //         message.error(err.message || err)
    //     })
    // }

    const getOrginLocationType = () => {

        ItrApiService.GET({
            url: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.COUNTRY,
            appCode: "CNF"
        }).then(resp => {
            setcountryList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        });
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

    const onClick = () => {
        setShowResults(false)
        setShowForm(true)
    }

    const close = () => {
        clearFields()
        setShowResults(true)
        setShowForm(false)
        setSavevisible(true)
        setUpdatevisible(false)
        setEntityVisible(false);
    }

    // const ChangeEvent = (e) => {
    //     debugger;
    //     this.setState({ [e.target.name]: e.target.value });
    //     // this.setstatevaluedropdownfunction(e.target.name, e.target.value);
    // }

    const inputOnChange = name => e => {
        let err = {}, validation = true
        let value = e.target.value
        if (name === 'entityID' || name === 'eCode' || name === 'eName') {
            setFields({ ...fields, [name]: value.toUpperCase() })
        }
        else {
            setFields({ ...fields, [name]: value })
        }

    }


    const Save = async (entityID, eCode, eName, type) => {
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
                    url: API_URLS.GET_COMPANY_MASTER_BY_ID + "/" + entityID + "/" + eCode + "/" + eName,
                    appCode: "CNF"
                }).then(res => {
                    //  alert(res.Success);
                    if (res.Success == false) {
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
                        err = "Company Details Already Available"
                        message.error(err)
                        // }
                    }
                });


            }

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
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => edit(tm.rowData[1], tm.rowData[2], tm.rowData[3], 'edit')}>
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
        }

    ]

    const getDataById = (entityID, eCode, eName) => {

        return ApiCall({
            path: API_URLS.GET_COMPANY_MASTER_BY_ID + "/" + entityID + "/" + eCode + "/" + eName,

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
    const edit = async (entityID, eCode, eName, type) => {
        try {
            setLoader(true);
            setVisible(true);
            setShowResults(false);
            setShowForm(true);
            let { data } = (entityID && await getDataById(entityID, eCode, eName))
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
                                            src={breadcrumbIcon} alt="" /></span> Company Master</h4>
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
                        <div class="col-lg-4">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Entity ID<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.entityID === '' ? errors.entityID : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Entity ID'
                                value={fields.entityID} minLength="1" maxLength="3"
                                onChange={inputOnChange("entityID")} disabled={entityVisible}
                            />
                        </div>
                        <div class="col-lg-4">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Entity Code<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.eCode === '' ? errors.eCode : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Entity Code'
                                value={fields.eCode} minLength="1" maxLength="10"
                                onChange={inputOnChange("eCode")} disabled={entityVisible}
                            />
                        </div>

                        <div class="col-lg-4">
                            <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                <label>Entity Name<span className='text-danger'>*  </span> </label>
                                <small className='text-danger'>{fields.eName === '' ? errors.eName : ''}</small>
                            </div>
                            <input className='form-control form-control-sm mt-1' placeholder='Enter Entity Name'
                                value={fields.eName} minLength="1" maxLength="100"
                                onChange={inputOnChange("eName")} disabled={entityVisible}
                            />
                        </div>

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

                                    <div class="col-lg-3">
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Country <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small>
                                        </div>
                                        {/* <label>Country</label>
                                        <small className='text-danger'>{fields.country === '' ? errors.country : ''}</small> */}
                                        <div class="main-select">
                                            <select name="somename" className='form-control form-control-sm mt-1'
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

                            <div class="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row mt-15">

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>TNGST No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.tngstNo === '' ? errors.tngstNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter TNGST No'
                                            value={fields.tngstNo} minLength="1" maxLength="50"
                                            onChange={inputOnChange("tngstNo")}
                                        />
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>TIN No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.tinNo === '' ? errors.tinNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter TIN No'
                                            value={fields.tinNo} minLength="1" maxLength="10"
                                            onChange={inputOnChange("tinNo")}
                                        />
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>TAN No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.tanNo === '' ? errors.tanNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter TAN No'
                                            value={fields.tanNo} minLength="1" maxLength="50"
                                            onChange={inputOnChange("tanNo")}
                                        />
                                    </div>


                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>CIN No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.cinNo === '' ? errors.cinNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter CIN No'
                                            value={fields.cinNo} minLength="1" maxLength="50"
                                            onChange={inputOnChange("cinNo")}
                                        />
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>CST No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.cstNo === '' ? errors.cstNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter CST No'
                                            value={fields.cstNo} minLength="1" maxLength="50"
                                            onChange={inputOnChange("cstNo")}
                                        />
                                    </div>

                                    <div class="col-lg-3">
                                        <div className="form-group">
                                            <label> CST Date </label>
                                            <Input type="date" name="cstDate" className="form-control form-control-sm mt-1" id="cstDate" placeholder="cst Date" value={fields.cstDate} onChange={inputOnChange("cstDate")} />
                                            {/* <span className="error">{fields.errors["cstDate"]}</span> */}
                                        </div>
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>PAN No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.panNo === '' ? errors.panNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter PAN No'
                                            value={fields.panNo} minLength="1" maxLength="50"
                                            onChange={inputOnChange("panNo")}
                                        />
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>ST No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.stNo === '' ? errors.stNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter ST No'
                                            value={fields.stNo} minLength="1" maxLength="50"
                                            onChange={inputOnChange("stNo")}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row mt-15">
                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Email Id <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.emailId === '' ? errors.emailId : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Email Id'
                                            value={fields.emailId} minLength="1" maxLength="50"
                                            onChange={inputOnChange("emailId")}
                                        />
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person1 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.contPerson1 === '' ? errors.contPerson1 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person1'
                                            value={fields.contPerson1} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson1")}
                                        />
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact Person2 <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.contPerson2 === '' ? errors.contPerson2 : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact Person2'
                                            value={fields.contPerson2} minLength="1" maxLength="50"
                                            onChange={inputOnChange("contPerson2")}
                                        />
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={fields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChange("contNo")}
                                        />
                                    </div>

                                    {/* <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Contact No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.contNo === '' ? errors.contNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Contact No'
                                            value={fields.contNo} minLength="1" maxLength="25"
                                            onChange={inputOnChange("contNo")}
                                        />
                                    </div> */}

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>Area Code <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.areaCode === '' ? errors.areaCode : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter Area Code'
                                            value={fields.areaCode} minLength="1" maxLength="25"
                                            onChange={inputOnChange("areaCode")}
                                        />
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                                            <label>GST No <span className='text-danger'>*  </span> </label>
                                            <small className='text-danger'>{fields.gstNo === '' ? errors.gstNo : ''}</small>
                                        </div>
                                        <input className='form-control form-control-sm mt-1' placeholder='Enter GST No'
                                            value={fields.gstNo} minLength="1" maxLength="30"
                                            onChange={inputOnChange("gstNo")}
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
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">

                            <div class=" ">
                                <button class="btn btn-primary search-btn btn-block ml-10" onClick={close}>Back</button>
                            </div>
                            {/* <div class=" ">
                    <button class="btn btn-primary search-btn btn-block ml-10">Cancel</button>
                </div> */}
                            {/* <div>
                                <button className='btn btn-primary search-btn btn-block ml-10' onClick={(e) => { add() }}> Cancel </button>
                            </div> */}
                            <div>
                                <button className='btn btn-primary search-btn btn-block ml-10' onClick={(e) => {
                                    let _id = Number(fields.id)
                                    if (_id === 0) add()
                                    else edit(fields.entityID, fields.eCode, fields.eName)
                                }}> Cancel </button>
                            </div>
                            <div class="">
                                {Savevisible && <button class="btn btn-success search-btn btn-block ml-10" disabled={loader} onClick={() => Save(fields.entityID, fields.eCode, fields.eName, 'save')}>Save</button>}
                                {updatevisible && <button class="btn btn-success search-btn btn-block ml-10" disabled={loader} onClick={() => Save(fields.entityID, fields.eCode, fields.eName, 'update')}>Update</button>}
                                {/* <button class="btn btn-success search-btn btn-block ml-10" onClick={save}>Save</button> */}
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