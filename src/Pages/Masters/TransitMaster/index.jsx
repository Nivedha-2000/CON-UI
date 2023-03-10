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

const requiredFields = ["countrycode", "shipmode", "toLocation", "transitdays"],
    initialErrorMessages = {
        countrycode: "",
        shipmode: "",
        toLocation: "",
        transitdays: 0,     
        active: 'Y'
    },
    initialFieldValues = {
        id: 0,       
        countrycode: "",
        shipmode: "",
        toLocation: "",
        transitdays: 0,       
        active: 'Y'
    };

function TransitMaster({ name }) {
    const [visible, setVisible] = useState(false);
    const [locationName, setLocationName] = useState([]);
    const [orginLocationList, setOrginLocationList] = useState([]);
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
        getOrginLocationType();
        getDatas()
        getLocationMaster()
        
        getShipModeType();
    }, []);

    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };

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
    const getOrginLocationType = () => {
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.COUNTRY
        }).then(resp => {
            try {
                setOrginLocationList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
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
            path: API_URLS.GET_TRANSIT_MASTER_LIST
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
        if (name === 'transitdays'){
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFields({ ...fields, [name]: value });
                err['transitdays'] =  ''
                setErrors({ ...errors, ...err })
            }
            else {
                err['transitdays'] = "Please enter numbers only"
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
                path: API_URLS.SAVE_TRANSIT_MASTER,
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
            name: 'countrycode',
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
            name: "countrycode",
            label: "countrycode",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>                     
                        {orginLocationList.filter(d => d.code===value).map(d =>  d.codeDesc )}
                    </div>
                }
            }

        },
        {
            name: "shipmode",
            label: "shipmode",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>                     
                        {shipmodeList.filter(d => d.code===value).map(d =>  d.codeDesc )}
                    </div>
                }
            }
        },
        {
            name: "toLocation",
            label: "toLocation",
            options: {
                customBodyRender: (value, tm) => {
                    return <div>                     
                        {locationName.filter(d => d.locCode===value).map(d =>  d.locName )}
                    </div>
                }
            }
        },
        {
            name: "transitdays",
            label: "transitdays"
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

    const getDataById = id => {
        return ApiCall({
            path: API_URLS.GET_TRANSIT_MASTER_BY_ID + "/" + id,
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
    const edit = async (id, type) => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (id && await getDataById(id))
            if (!data) {
                message.error("Data not found")
                return
            }
            const tableId = type === 'clone' ? 0 : id
            setFields({
                id: tableId,                    
                countrycode: data.countrycode,
                shipmode: data.shipmode,
                toLocation: data.toLocation,
                transitdays: data.transitdays,     
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
            } title={< h6 className='m-0' > {`${fields.id === 0 ? "Add New" : "Edit"} Transit`}</h6 >} placement="right" onClose={() => {
                clearFields();
                onClose();
            }} visible={visible} >
                <div className='defect-master-add-new'>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Origin Location <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.countrycode === '' ? errors.countrycode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.countrycode}
                                onChange={inputOnChange("countrycode")}                            
                        >
                            <option value=""> Select Origin Location</option>
                            {orginLocationList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>
                             
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Ship mode <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.shipmode === '' ? errors.shipmode : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.shipmode}
                                onChange={inputOnChange("shipmode")}                            
                        >
                            <option value=""> Select Ship mode</option>
                            {shipmodeList.map((v, index) => {
                                return <option key={index} value={v.code}>{v.codeDesc}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Destination Location <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.toLocation === '' ? errors.toLocation : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                                value={fields.toLocation}
                                onChange={inputOnChange("toLocation")}                            
                        >
                            <option value=""> Select Destination Location</option>
                            {locationName.map((v, index) => {
                                return <option key={index} value={v.locCode}>{v.locName}</option>
                            })}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Transit days </label>
                            <small className='text-danger'>{errors.transitdays ? errors.transitdays : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter Transit days Value'
                               value={fields.transitdays==0?'':fields.transitdays} minLength="1" maxLength="2"
                               onChange={inputOnChange("transitdays")}                            
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

TransitMaster.propTypes = {
    name: PropTypes.string
}

export default TransitMaster;