import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, message, Spin,Input, Table, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import { ColumnProps } from "antd/lib/table";
import { render } from "react-dom";

import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import ApiCall from "../../../services"
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";
import { PDM_APP_CODE } from "../../../constants";

const initialErrorMessages = {
    locCode: "",
    locName: "",
},
    initialFieldValues = {
        id: 0,
        locCode: "",
        locName: "",
        active: "Y",
    },
    requiredFields = ["locCode", "locName"]

function LacationMaster({ name }) {
    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setErrors({ ...initialErrorMessages });
    }

    const [visible, setVisible] = useState(false);
    const add = () => {
        try {
            setVisible(true);
            clearFields()
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    };

    const getDataById = id => {
        return ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_BY_ID + "/" + id,
        })
    }

    const edit = async id => {
        try {
            setLoader(true)
            setVisible(true);
            let { data } = (await getDataById(id))
            data = Array.isArray(data) ? data[0] : data
            if (!data) {
                message.error("Data not found")
                return
            }
            setFields({
                id,
                locCode: data.locCode,
                locName: data.locName,
                active: data.active,
            })
            setLoader(false)
        } catch (err) {
            setLoader(false)
            message.error(typeof err == "string" ? err : "data not found")
        }
    }
    const onClose = () => {
        clearFields()
        setVisible(false);
    };


    const [fields, setFields] = useState({
        ...initialFieldValues
    });
    const [tableProps, setTableProps] = useState({
        page: 0,
        rowsPerPage: 10,
        sortOrder: {
            name: 'locCode',
            direction: 'asc'
        }
    })

    const updateTableProps = props => {
        setTableProps({
            ...tableProps,
            ...props
        })
    }

    const inputOnChange = name => e => {
        let value = e.target.value
    //    if (name == "unitperPack") value = validateInputOnKeyup(e)
        setFields({ ...fields, [name]: value })
    }

    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [locCode, setlocCodeList] = useState([]);
    const [locName, setlocNameList] = useState([]);
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    const save = () => {
        if (loader) return
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            }
        })
        // if (fields.unitperPack && /[^\d]/g.test(fields.unitperPack)) {
        //     err.unitperPack = "Enter numbers only"
        //     validation = false
        // }
        // if (fields.unitperPack && parseInt(fields.unitperPack) == 0) {
        //     err.unitperPack = "Should be greater than zero"
        //     validation = false
        // }
        setErrors({ ...initialErrorMessages, ...err })
        if (validation) {
            setLoader(true)
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_LOCATION_MASTER,
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
                message.error(err.message || err)
            })
        }
    }

    const getDatas = () => {
        setListLoading(true)
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(resp => {
            setListLoading(false)
            if (Array.isArray(resp.data)) {
                setList(resp.data.map(d => {
                    d.activeText = d.active == "Y" ? "Yes" : "No"
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

    // const onInputChange = (key, index) => (
    //     e: React.ChangeEvent<HTMLInputElement>
    //   ) => {
    //     const newData = [...tableData];
    //     newData[index][key] = Number(e.target.value);
    //     setTotal(newData, index);
    //     setTableData(newData);
    //   };
    
   
   

    useEffect(() => {
        getDatas()
       // getBuyerList()
    }, []);

    const tableColumns = [
        {
            name: "locCode",
            label: "Location code"
            // ,
            // render: (text, record, index) => (
            //     <Input value={text} onChange={onInputChange("locCode", index)} />
            //   )
        },
        {
            name: "locName",
            label: "Location Name"
        },
        {
            name: "activeText",
            label: "Active"
        },
        {
            name: "locCode",
            label: "Action",
            
            options: {
                sort: false,
                customBodyRender: (value, tm) => {
                    return (
                        <div title="Edit" onClick={() => edit(value)}>
                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                        </div>
                    )
                }
            }
        }
    ]

    return (
        <div className='defect-master-main'>
            <div className='m-3'>
                <h6 className='m-0 p-0' style={{fontWeight: "bold"}}>{name}</h6>

                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-1'>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' id="frd-opr-add" onClick={add}> + Add New </button>
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
                                <button disabled={loader} className='btn-sm btn defect-master-save mt-1 w-100' onClick={save}> {fields.id == 0 ? "Submit" : "Update"} </button>
                                : (
                                    <div className="text-center">
                                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                                    </div>
                                )
                        }
                    </div>
                    <div>
                        <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={e => {
                            let _id = new Number(fields.id)
                            if (_id == 0) add()
                            else edit(_id)
                        }}> Cancel </button>
                    </div>
                </>
            } title={< h6 className='m-0' > {`${fields.id == 0 ? "Add New" : "Edit"} Location Master`}</h6 >} placement="right" onClose={onClose} visible={visible} maskClosable={false} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Location code <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.locCode === '' ? errors.locCode : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter location code'
                            value={fields.locCode} maxLength="10"
                            id="location-code"
                            onChange={inputOnChange("locCode")} 
                            required />
                    </div>

                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Location name <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{fields.locName === '' ? errors.locName : ''}</small>
                        </div>
                        <input className='form-control form-control-sm mt-1' placeholder='Enter location name'
                            value={fields.locName} maxLength="50"
                            id="location-name"
                            onChange={inputOnChange("locName")} 
                            required />
                    </div>

                    <div className='mt-3'>
                        <label>{fields.active === 'Y' ? 'Active' : 'In Active'}</label>
                        <div className='mt-1'>
                            <Switch size='default'
                                checked={fields.active == 'Y'}
                                id="opr-active"
                                onChange={(e) => setFields({ ...fields, active: e ? 'Y' : 'N' })} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div >
    )
}

LacationMaster.propTypes = {
    name: PropTypes.string
}


export default LacationMaster;