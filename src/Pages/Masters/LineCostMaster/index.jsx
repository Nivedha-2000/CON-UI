import React, { useRef, useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import '../DefectMasters/DefectMasters.css';
import '../LineCostMaster/table.css';
import { Drawer, Switch, message, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import ApiCall from "../../../services"
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";

//import MedalCellRenderer from '../LineCostMaster/calculation';
import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'


//import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

// import 'ag-grid-community/styles//ag-grid.css'; // Core grid CSS, always needed
// import 'ag-grid-community/styles//ag-theme-alpine.css'; // Optional theme CSS





const initialErrorMessages = {
    id: 0,
    transMonth: "",
    transYear: "",
    locCode: "",
    factCode: "",
    lineGroup: "",
    operators: 0,
    workingHrs: 0,
    linecost: 0,
    smv: 0,


},
    initialFieldValues = {
        id: 0,
        transMonth: "",
        transYear: "",
        locCode: "",
        factCode: "",
        lineGroup: "",
        operators: 0,
        workingHrs: 0,
        linecost: 0,
        smv: 0,
    },
    requiredFields = ["transMonth", "transYear", "locCode", "factCode", "lineGroup", "locName"]

function LineCostMaster({ name }) {
    const clearFields = () => {
        setFields({
            ...initialFieldValues
        });
        setRowData([]);
        setErrors({ ...initialErrorMessages });
    }

    const [visible, setVisible] = useState(false);
    const [datas, setDatas] = useState([]);

    // const dataSource = [
    //     {
    //     //  key: '1',
    //       transMonth: "JAN",
    //       transYear: 0,
    //       locCode: "",
    //       factCode: "",
    //       lineGroup:"",
    //       operators:65,
    //       workingHrs:9.00,
    //       linecost:2000,
    //       smv:0,
    //     },
    //     {
    //    //   key: '2',
    //       transMonth: "FEB",
    //       transYear: 0,
    //       locCode: "",
    //       factCode: "",
    //       lineGroup:"",
    //       operators:65,
    //       workingHrs:9.00,
    //       linecost:2000,
    //       smv:0,
    //     },
    //   ];

    // const pageSize = 10;

    // // for-list-pagination
    // const [pagination, setPagination] = useState({
    //     totalPage: 0,
    //     current: 1,
    //     minIndex: 0,
    //     maxIndex: 0
    // });

    // const handleChange = (page) => {
    //     setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    // };


    // const add = () => {
    //     try {
    //         setVisible(true);
    //         clearFields()
    //     } catch (err) {
    //         setLoader(false)
    //         message.error(typeof err == "string" ? err : "data not found")
    //     }
    // };



    //const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

    const [rowDataTemp, setRowDataTemp] = useState([])

    const onClose = () => {
        clearFields()
        setVisible(false);
    };


    const [fields, setFields] = useState({
        ...initialFieldValues
    });


    const inputOnChange = (name) => e => {
        debugger;
        let value = e.target.value
        // if (name == "operators") value = validateInputOnKeyup(e)
        setFields({ ...fields, [name]: value })
    }

    useEffect(() => {

    }, [rowData]);
    const inputOnChange1 = (index, name) => e => {
        debugger;
        let err = {}, validation = true
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let value = e.target.value
            let res = rowData[index];
            let curname1 = name;
            var oData = rowData;
            res[name] = value;
            if (name == "workingHrs" || name == "linecost") {
                var workHrs = res["workingHrs"]
                var lineCost = res["linecost"]
                res["smv"] =parseFloat((lineCost / workHrs) / 60).toFixed(2) ;
            }

            const updatedObject = rowData.map((user, rowIndex) =>
                index === rowIndex ? res : user
            );
            setRowData(updatedObject)
        } else {

        }

    }

    // const onNameEdited = (i, event) => {
    //     debugger;
    //     let textInputValues = [...this.state.textInputValues];
    //     textInputValues[i] = event.target.value;
    //     this.setRowData({ textInputValues });
    //     alert(textInputValues);

    //}

    const [listLoading, setListLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [locationList, setLocationList] = useState([]);
    const [finyearList, setFinyearList] = useState([]);
    const [foctoryList, setFoctoryList] = useState([]);

    const [list, setList] = useState([]);
    const [errors, setErrors] = useState({
        ...initialErrorMessages
    })

    // this.state.textInputValues[this.state.menuRightsList.indexOf(item)]

    const getLocationList = () => {
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(resp => {
            if (Array.isArray(resp.data)) {
                setLocationList(resp.data.filter(d => d.active == "Y"))
            } else {
                message.error("Response data is expected as array")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    const getFactCodeDropDown = () => {
        debugger;
        setFields({ ...fields, factCode: fields.id == 0 ? "" : fields.factCode })


        if (fields.locCode) {
            console.log(API_URLS.GET_ALLFACTORY_LIST + `/${fields.locCode}`)
            ApiCall({
                path: API_URLS.GET_ALLFACTORY_LIST + "?locationcode=" + `${fields.locCode}`  //"/" + fields.locCode
            }).then(respp => {
                try {
                    setFoctoryList(respp.data)
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setFoctoryList([])
        }
    }



    const getFinyearList = () => {

        if (fields.locCode) {
            ApiCall({
                path: API_URLS.GET_FINYEAR_MASTER_LIST
            }).then(resp => {
                try {
                    setFinyearList(resp.data.filter(a => a.locCode == fields.locCode))
                } catch (er) {
                    message.error("Response data is not as expected")
                }
            })
                .catch(err => {
                    message.error(err.message || err)
                })
        } else {
            setFinyearList([])
        }
    }

    function GridDataLoad(transYear, locCode, factCode, lineGroup) {

        debugger;
        //  transYear='2021-2022', locCode='IND', factCode='D15-2', lineGroup='D15-2'
        // if (loader) return
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            } else {
                validation = true
            }
        })
        setErrors({ ...initialErrorMessages, ...err })
        if (validation) {
            console.log(API_URLS.GET_LINECOST_MONTHWISE_LIST + "?Finyear=" + transYear + "&LocCode=" + locCode + "&FactCode=" + factCode + "&LineGroup=" + lineGroup);
            ApiCall({
                path: API_URLS.GET_LINECOST_MONTHWISE_LIST + "?Finyear=" + transYear + "&LocCode=" + locCode + "&FactCode=" + factCode + "&LineGroup=" + lineGroup,
            }).then(respp => {
                console.log(respp)
                if (Array.isArray(respp.data)) {
                    //setList(respp.data)
                    setRowData(respp.data)

                } else {
                    message.error("Response data is expected as array")
                }
            }).catch(err => {
                message.error(err.message || err)
            })

        }
    }
    useEffect(() => {
        if (fields.locCode) {
            getFactCodeDropDown(fields.locCode)
        }
    }, [fields.locCode])
    useEffect(() => {
        if (fields.locCode) {
            getFinyearList(fields.locCode)
        }
    }, [fields.locCode])

    useEffect(() => {
        getLocationList()
        //  getFinyearList()
    }, []);



    // const [tableProps, setTableProps] = useState({
    //     page: 0,
    //     rowsPerPage: 12,
    //     sortOrder: {
    //         name: 'mattype',
    //         direction: 'asc'
    //     }
    // })

    // const updateTableProps = props => {
    //     setTableProps({
    //         ...tableProps,
    //         ...props
    //     })
    // }

    // // const tableColumns = [
    // //     {
    // //         name: "transMonth",
    // //         label: "transMonth",
    // //         editable: true
    // //     },   
    // //     {
    // //         name: "operators",
    // //         label: "operators",
    // //         editable: true
    // //     },  
    // //     {
    // //         name: "workingHrs",
    // //         label: "workingHrs"
    // //     },  
    // //     {
    // //         name: "linecost",
    // //         label: "linecost"
    // //     }, 
    // //     {
    // //         name: "smv",
    // //         label: "smv"
    // //     }
    // //     //,     
    // //     // {
    // //     //     name: "mattype",
    // //     //     label: "Action",
    // //     //     options: {
    // //     //         customBodyRender: (value, tm) => {
    // //     //             return (
    // //     //                 <div style={{display: 'flex', justifyContent: 'space-around'}}>
    // //     //                     <div onClick={() => edit(value, 'edit')}>
    // //     //                         <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
    // //     //                     </div>
    // //     //                     {/* <div onClick={() => edit(value, 'clone')}>
    // //     //                         <FontAwesomeIcon icon={faCopy} color="#919191" />
    // //     //                     </div> */}
    // //     //                 </div>

    // //     //             )
    // //     //         }
    // //     //     }
    // //     // }
    // // ]

    // // Each Column Definition results in one Column.
    // const [columnDefs, setColumnDefs] = useState([
    //     { field: 'transMonth', filter: true },
    //     {
    //         field: 'operators'
    //         , filter: true
    //         // , cellRenderer: MedalCellRenderer
    //         // , cellRendererParams: {
    //         //     "onClick": (operParam) => operatorschange(operParam),
    //         // }
    //         , editable: true
    //     },
    //     {
    //         field: 'workingHrs'
    //         , filter: true
    //         // , cellRenderer: MedalCellRenderer
    //         // , cellRendererParams: {
    //         //     "onClick": (whrParam) => workingHrschange(whrParam),
    //         // }
    //         , editable: true
    //     },
    //     {
    //         field: 'linecost'
    //         , filter: true
    //         , cellRenderer: MedalCellRenderer
    //         , cellRendererParams: {
    //             "onClick": (testParam) => change(testParam),
    //         }
    //         , editable: true

    //     },
    //     {
    //         field: 'smv'
    //         , filter: true
    //         , cellRenderer: (param) => {
    //             debugger;
    //             return param.data.workingHrs * param.data.linecost;
    //         }
    //     }
    // ]);

    // function change(testParam) {
    // const changetrrtrt = (testParam) => {
    //     debugger;
    //     setRowData({ ...rowData, testParam })
    //     const test = rowData;
    //     // const index=test.findIndex(x=>)
    //     test[0] = testParam;
    //     setRowData(test);
    // }

    // const change1 = (testParam) => {
    //     debugger;
    //     console.log(rowData);
    //     const test = rowData;
    //     test[0] = testParam;

    // }
    // const operatorschange = (operParam) => {
    //     debugger;
    //     console.log(rowData);

    // }

    // const workingHrschange = (whrParam) => {
    //     debugger;
    //     console.log(rowData);
    // }

    // DefaultColDef sets props common to all Columns
    // const defaultColDef = useMemo(() => ({
    //     sortable: true
    // }));

    // Example of consuming Grid Event
    // const cellClickedListener = useCallback(event => {
    //     console.log('cellClicked', event);
    // }, []);

    // Example using Grid's API
    // const buttonListener = useCallback(e => {
    //     gridRef.current.api.deselectAll();
    // }, []);

    function postLineCostsave() {
        debugger;
        let err = {}, validation = true
        requiredFields.forEach(f => {
            if (fields[f] === "") {
                err[f] = "This field is required"
                validation = false
            } else {
                validation = true
            }
        })

        setErrors({ ...initialErrorMessages, ...err })

        if ((fields.locName != "")) {
            let validation = 'false';
            const dataset = [];
            for (const item of rowData) {

                dataset.push({
                    transMonth: item.transMonth,
                    transYear: item.transYear,
                    locCode: item.locCode,
                    factCode: item.factCode,
                    lineGroup: item.lineGroup,
                    operators: item.operators,
                    workingHrs: item.workingHrs,
                    linecost: item.linecost,
                    smv: item.smv,
                    createdDate: item.createdDate,
                    createdBy: "ADMIN",
                    modifiedDate: item.modifiedDate,
                    modifiedBy: "ADMIN",
                    hostName: "NAllA"
                });
                validation = 'true';
            }
            console.log(dataset);
            if (validation) {

                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_LINECOST_MASTER,
                    data: dataset
                }).then(resp => {
                    message.success(resp.message)
                    onClose();
                    setFields('');
                }).catch(err => {
                    message.error(err.message || err)
                })
            }
        } else {
            NotificationManager.error('Please Select One User');
        }
    }


    return (

        <>
            <div class="container-fluid">
                <div class="row mt-25 main-tab pl-15 pr-15">
                    <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                        {/* <li class="nav-item" role="presentation">
                            <button class="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                type="button" role="tab" aria-controls="home" aria-selected="true">Thread</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Fabric</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Details</button>
                        </li> */}
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active1" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                                type="button" role="tab" aria-controls="contact" aria-selected="false">Line Cost Master</button>
                        </li>
                    </ul>
                    <div class="tab-content p-15 mb-80" id="myTabContent">
                        <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div class="row mt-10">

                                <div class="col-lg-4">
                                    <label>Location <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{errors.locCode}</small>
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            id="locCode"
                                            value={fields.locName} onChange={inputOnChange("locCode")} required>
                                            <option value="" hidden>Select Location Code</option>
                                            {
                                                locationList.map((t, ind) => (
                                                    <option key={ind} value={t.locCode}>{t.locName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <label>Financial Year <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.transYear === '' ? errors.transYear : ''}</small>
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            required
                                            value={fields.transYear}
                                            onChange={inputOnChange("transYear")}
                                            id="transYear"
                                        >
                                            <option value=""> Financial Year</option>
                                            {
                                                finyearList.map((t, ind) => (
                                                    <option key={ind} value={t.finyear}>{t.finyear}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <label>FactCode <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.factCode === '' ? errors.factCode : ''}</small>
                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            required
                                            value={fields.factCode}
                                            onChange={inputOnChange("factCode")}
                                        >
                                            <option value=""> Select FactCode</option>
                                            {foctoryList.map((v, index) => {
                                                return <option key={index} value={v.uCode}>{v.uCode}</option>
                                            })}
                                            {/* <option value="D15-2"> D15-2 </option>
                                            <option value="B9B10"> B9B10 </option> */}
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <label>Line Group <span className='text-danger'>*  </span> </label>
                                    <small className='text-danger'>{fields.lineGroup === '' ? errors.lineGroup : ''}</small>
                                    <input type="text" class="form-control" placeholder='Enter line Group'
                                        value={fields.lineGroup} maxLength="50" autoComplete="off"
                                        id="line-Group"
                                        onChange={inputOnChange("lineGroup")}
                                        required />
                                </div>

                                <div class="col-lg-1">
                                    <label></label>
                                    <button class="btn btn-success search-btn btn-block ml-10 mt-10" onClick={() => GridDataLoad(fields.transYear, fields.locCode, fields.factCode, fields.lineGroup)}>
                                        ADD
                                    </button>
                                    {/* <div class=" ">
                                        <button class="btn btn-primary search-btn btn-block ml-10 " onClick={() => onClose()}>Cancel</button>
                                    </div>
                                    <div class="">
                                        <button class="btn btn-success search-btn btn-block ml-10" onClick={() => postLineCostsave()}>Save</button>
                                    </div> */}
                                </div>
                                <div class="col-lg-1">
                                    <label></label>
                                    <button class="btn btn-primary search-btn btn-block ml-10 mt-10" onClick={() => onClose()}>Cancel</button>

                                </div>
                                <div class="col-lg-1">
                                    <label></label>
                                    <button class="btn btn-success search-btn btn-block ml-10 mt-10" onClick={() => postLineCostsave()}>Save</button>

                                </div>
                            </div>

                            {/* <div class="table-responsive pb-10 bg-white mt-20"> */}

                            <div className="table-responsive pb-10 bg-white mt-20">
                                <table id="example-1" class="table table-striped tbl-wht   text-md-nowrap">
                                    <thead>
                                        <tr>
                                            <th>SlNo</th>
                                            <th>Month</th>
                                            <th>Operators </th>
                                            <th>WorkingHrs </th>
                                            <th>LineCost $ </th>
                                            {/* <th>OT Amount </th> */}
                                            <th>SMV </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowData.map((linecost, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>
                                                    {linecost.transMonth}
                                                    {/* <input type="text" className="form-control form-control-sm mt-1"
                                                        value={linecost.transMonth} id="transMonth" onChange={inputOnChange("transMonth")} /> */}
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control-sm mt-1" value={linecost.operators} name={index} onChange={inputOnChange1(index, "operators")} />
                                                    {/* <input type="text" className="form-control form-control-sm mt-1"   onChange={onNameEdited.bind(this, index)}
                                                            value={linecost.operators} name="operators" onChange={inputOnChange("operators")} /> */}
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control-sm mt-1" value={linecost.workingHrs} name={index} onChange={inputOnChange1(index, "workingHrs")} />
                                                    {/* <input type="text" className="form-control form-control-sm mt-1"
                                                            value={linecost.workingHrs} name="workingHrs" onChange={inputOnChange("workingHrs")} /> */}
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control-sm mt-1" value={linecost.linecost} name={index} onChange={inputOnChange1(index, "linecost")} />

                                                    {/* <input type="text" className="form-control form-control-sm mt-1"
                                                            value={linecost.linecost} name="linecost" onChange={inputOnChange("linecost")} /> */}

                                                </td>
                                                <td>
                                                    <input type="text" className="form-control-sm mt-1" maxLength="5" value={linecost.smv} name={index} onChange={inputOnChange1("smv")} />

                                                    {/* <input type="text" className="form-control form-control-sm mt-1"
                                                            value={linecost.smv} name="smv" onChange={inputOnChange("smv")} /> */}

                                                </td>
                                                {/* <td>
                                                        {linecost.operators}
                                                    </td> */}
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    {/* <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">
                        <div class=" ">
                            <button class="btn btn-primary search-btn btn-block  " onClick={() => onClose()}>Cancel</button>
                        </div>
                        <div class="">
                            <button class="btn btn-success search-btn btn-block ml-10" onClick={() => postLineCostsave()}>Save</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

LineCostMaster.propTypes = {
    name: PropTypes.string
}


export default LineCostMaster;