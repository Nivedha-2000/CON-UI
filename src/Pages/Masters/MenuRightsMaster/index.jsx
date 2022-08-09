/**
 * Simple Line Icons
 */
import React, { Component, Fragment } from 'react';
//  import api from 'Api';
import { Button, Form, FormGroup, Label, FormText, Col, FormFeedback } from 'reactstrap';

//  import React, { Component, Fragment } from 'react';
// import React, { useEffect, useState } from "react";
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
// import api from 'Api';
//   import { Button, Form, FormGroup, Label, FormText, Col, FormFeedback } from 'reactstrap';

// page title bar
//  import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
//  import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
//  import 'font-awesome/css/font-awesome.min.css';
//  import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//  import 'react-vertical-timeline-component/style.min.css';
//  import 'font-awesome/css/font-awesome.min.css';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//  import { NotificationContainer, NotificationManager } from 'react-notifications';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select1 from "react-dropdown-select";
import moment from 'moment';
// import { ItrApiService } from '@afiplfeed/itr-ui';
//  import { getApiCallITR, PostApiCallITR } from "../../services/commonApi";
//  import { getCookies } from "../../services/storage.service";
// import React from "react";
// import Button from "mui-button";

function TabContainer({ children }) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}
class MenurightsElement extends Component {

    state = {
        menuRightsList: [],
        moduleLists: [],
        LocationItem: [],
        RoleTypeList: [],
        UnitCodeList: [],
        UDMasterList: [],
        activeIndex: 0,
        name: '',
        userlevel: '',
        WHCategory: '',
        ICategory: '',
        fromuser: [],
        touser: [],
        username: '',
        modulename: '',
        unitcodename: '',
        modulenameValue: [],
        lpcationItemValue: [],
        codeItemValue: [],
        location: '',
        module: '',
        roletype: [],
        MenurightsSaveList: [],
        textInputValues: [],
        fields: {},
        errors: {},
        userInfo: {}
    }

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message');
                    break;
                case 'error':
                    NotificationManager.error('Error message');
                    break;
                default:
                    NotificationManager.success('Success message', 'Title here');
                    break;
            }
        };
    };

    handleChangesingledropdown = name => event => {
        this.setState({ [name]: event.target.value.toUpperCase() });
    };

    handleChangeIndex(index) {
        this.setState({ activeIndex: index });
    }

    handleChangeradio = (event) => {
        this.setState({ userlevel: event.currentTarget.value });
    }

    handleChange(event, value) {
        this.setState({ activeIndex: value });
    }
    componentDidMount() {
        this.getEmployeePayrolls();
        //  let userDetails = getCookies('userInfo');
        //  let parseData = JSON.parse(userDetails);
        //  //console.log(parseData);
        //  if (parseData) this.setState({ userInfo: parseData });
    }

    handleRadioChange = (event) => {
        this.setState({ selectedRadio: event.currentTarget.value });
    };

    handleRightsItem(event, index, menuRights) {
        console.log(event)

        const { MenurightsSaveList } = this.state;
        MenurightsSaveList[index] = event;
        MenurightsSaveList[index]['menuRights'] = menuRights;

        this.setState({ MenurightsSaveList });
        console.log(this.state.MenurightsSaveList)
    }

    setstatevaluedropdownfunction = name => event => {
        if (event.length > 0) {
            let fields = this.state.fields;
            fields[name] = event[0].value;
            this.setState({ fields });
            this.setState({ [name]: event });
        }
    };

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["roletype"]) {
            formIsValid = false;
            errors["roletype"] = "Cannot be empty";
        }
        if (!fields["modulenameValue"]) {
            formIsValid = false;
            errors["modulenameValue"] = "Cannot be empty";
        }
        if (!fields["lpcationItemValue"]) {
            formIsValid = false;
            errors["lpcationItemValue"] = "Cannot be empty";
        }
        if (!fields["codeItemValue"]) {
            formIsValid = false;
            errors["codeItemValue"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    saveMenuRights() {
        console.log(moment().toDate());
        if (this.handleValidation()) {
            let validation = 'false';
            const dataset = [];
            for (const item of this.state.menuRightsList) {
                //alert(this.state.textInputValues[this.state.menuRightsList.indexOf(item)]);
                this.state.textInputValues[this.state.menuRightsList.indexOf(item)]
                console.log(item);
                dataset.push({
                    roleId: item.roleId,
                    appName: item.appName,
                    menuId: item.menuId,
                    menuRights: item.menuRights,
                    columnRights: "N",//this.state.textInputValues[this.state.menuRightsList.indexOf(item)],
                    unitCode: item.unitCode, //this.state.unitcodename[0].value,
                    createdBy: this.state.userInfo.userCode,
                    modifyBy: this.state.userInfo.userCode,
                    modifyDt: moment().toDate(),
                    locCode: item.locCode,
                    hostName: "ADMIN"
                });
                validation = 'true';
            }
            let data = { "rmrInsertModel": dataset };
            console.log(data);
            if (validation) {
                // setLoader(true)

                ApiCall({
                    method: "POST",
                    path: API_URLS.SAVE_ROLE_MENU_RIGHTS_LIST_MASTER,
                    data: dataset
                }).then(resp => {
                    // setLoader(false)
                    message.success(resp.message)
                    console.log(resp);
                    this.setState({
                                    menuRightsList: [],
                                    activeIndex: 0,
                                    name: '',
                                    userlevel: '',
                                    WHCategory: '',
                                    ICategory: '',
                                    fromuser: [],
                                    touser: [],
                                    username: '',
                                    modulename: '',
                                    unitcodename: '',
                                    modulenameValue: [],
                                    lpcationItemValue: [],
                                    codeItemValue: [],
                                    location: '',
                                    module: '',
                                    roletype: [],
                                    MenurightsSaveList: [],
                                    textInputValues: [],
            
                                    fields: {},
                                    errors: {},
                                });
                    // onClose();
                    //getDatas();
                }).catch(err => {
                    // setLoader(false)                    
                    //  fields['ftdOprName'] = tempOprName
                    //  setFields({...fields})
                    // setErrors({ ...initialErrorMessages })
                    message.error(err.message || err)
                })
            }
            // PostApiCallITR('RoleMenuRights/SaveRoleMenuRights', data).then((response) => {
            //     console.log(response);
            //     if (response.Success) {
            //         NotificationManager.success('Added Sucessfully');
            //         this.setState({
            //             menuRightsList: [],
            //             activeIndex: 0,
            //             name: '',
            //             userlevel: '',
            //             WHCategory: '',
            //             ICategory: '',
            //             fromuser: [],
            //             touser: [],
            //             username: '',
            //             modulename: '',
            //             unitcodename: '',
            //             modulenameValue: [],
            //             lpcationItemValue: [],
            //             codeItemValue: [],
            //             location: '',
            //             module: '',
            //             roletype: [],
            //             MenurightsSaveList: [],
            //             textInputValues: [],

            //             fields: {},
            //             errors: {},
            //         });
            //     }
            // }).catch(error => { console.log(error) });
        }

    }
    // get employee payrols
    getEmployeePayrolls() {
        // getApiCallITR('Buyer/GetBuyerDropDown').then((response) => {
        //     this.setState({ buyerlists: response.data.result.data });
        // }).catch(error => { console.log(error) });



        // ApiCall({
        //     path: API_URLS.GET_MODULE_DROPDOWN,
        //     appCode: 'MODULE'
        // }).then(resp => {
        //     try {
        //         this.setState({ UDMasterList: resp.data });
        //     } catch (e) {
        //         message.error("response is not as expected")
        //     }
        // }).catch(err => {
        //     message.error(err.message || err)
        // })





        //  getApiCallITR('CourierDispatch/GetUDMasterTypeValAll').then((response) => {
        //      this.setState({ UDMasterList: response.data });
        //  }).catch(error => { console.log(error) });

        // getApiCallITR('UserBuyerRights/GetUserBuyerRightsList').then((response) => {
        //     this.setState({ buyerrightlists: response.data.result.data });
        // }).catch(error => { console.log(error) });

        // getApiCallITR('Miscellaneous/GetMiscellaneousDropDown?MType=module').then((response) => {
        //     this.setState({ moduleLists: response.data.result.data });
        //     console.log(response);
        // }).catch(error => { console.log(error) });
        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(response => {
            try {
                this.setState({ LocationItem: response.data });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
        // //  getApiCallITR('Location/GetLocationDropDown').then((response) => {
        // //      this.setState({ LocationItem: response.data.result.data });
        // //  }).catch(error => { console.log(error) });GET_ROLE_MASTER_LIST
        ApiCall({
            path: API_URLS.GET_ROLE_MASTER_LIST
        }).then(response => {
            try {
                this.setState({ RoleTypeList: response.data });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
        //  getApiCallITR('RoleMaster/GetRoleMasterList').then((response) => {
        //      this.setState({ RoleTypeList: response.data.result.data });
        //  }).catch(error => { console.log(error) });


        // getApiCallITR('RoleMenuRights/GeRoleMenuRightsList').then((response) => {
        //     console.log(response);
        //     this.setState({ menuRightsList: response.data.result.data });
        // }).catch(error => { console.log(error) });GET_UNIT_MASTER_LIST

        ApiCall({
            path: API_URLS.GET_UNIT_MASTER_LIST
        }).then(response => {
            try {
                this.setState({ UnitCodeList: response.data });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
        // //  getApiCallITR('Unit/GetUnitDropDown').then((response) => {
        // //      this.setState({ UnitCodeList: response.data.result.data });
        // //  }).catch(error => { console.log(error) });


    }
    onNameEdited(i, event) {
        let textInputValues = [...this.state.textInputValues];
        textInputValues[i] = event.target.value;
        this.setState({ textInputValues });
       // alert(textInputValues);
    }

    fetchMenuRights() {
        if (this.handleValidation()) {
            const RoleID = (this.state.roletype.length > 0 ? this.state.roletype[0].value : "");
            const AppName = (this.state.modulenameValue.length > 0 ? this.state.modulenameValue[0].value : "");
            const LocCode = (this.state.lpcationItemValue.length > 0 ? this.state.lpcationItemValue[0].value : "");
            const UnitCode = (this.state.codeItemValue.length > 0 ? this.state.codeItemValue[0].value : "");
            // alert(API_URLS.GET_ROlE_BASED_LIST +"/" + RoleID +"/" + AppName +"/" + LocCode +"/" + UnitCode);
            ApiCall({
                path: API_URLS.GET_ROlE_BASED_LIST + "/" + RoleID + "/" + AppName + "/" + LocCode + "/" + UnitCode
            }).then(response => {
                try {
                    // this.setState({ menuRightsList: (response.data.result.data == null ? [] : response.data.result.data.menuRight) });           

                    this.setState({ menuRightsList: (response.data == null ? [] : response.data) });
                } catch (e) {
                    message.error("response is not as expected")
                }
            }).catch(err => {
                message.error(err.message || err)
            })

            //  getApiCallITR('RoleMenuRights/GeRoleMenuRightsList?RoleId=' + RoleID + '&AppName=' + AppName + '&LocCode=' + LocCode + '&UnitCode=' + UnitCode).then((response) => {
            //      console.log(response);
            //      this.setState({ menuRightsList: (response.data.result.data == null ? [] : response.data.result.data.menuRight) });
            //  }).catch(error => { console.log(error) });

            // getApiCallITR('RoleMenuRights/GeRoleMenuRightsList?RoleId=' + RoleID + '&AppName=' + AppName + '&LocCode=' + LocCode + '&UnitCode=' + UnitCode).then((response) => {
            //     this.setState({ menuRightsList: response.data.result.data.menuRight });
            // }).catch(error => { console.log(error) });GET_ROlE_BASED_LIST
        }
    }


    CLEAR_ALL_STATE_VALUE = (e) => {
        if (confirm("Are you sure want to clear...!")) {
            this.setState({
                menuRightsList: [],
                activeIndex: 0,
                name: '',
                userlevel: '',
                WHCategory: '',
                ICategory: '',
                fromuser: [],
                touser: [],
                username: '',
                modulename: '',
                unitcodename: '',
                modulenameValue: [],
                lpcationItemValue: [],
                codeItemValue: [],
                location: '',
                module: '',
                roletype: [],
                MenurightsSaveList: [],
                textInputValues: [],

                fields: {},
                errors: {},
            });
        }
    }

    render() {

        // const options1 = [];
        // for (const item of this.state.buyerlists) {
        //     options1.push({ value: item.buyerCode, label: item.buyerName });
        // }

        const moduleListOptions = [];
        moduleListOptions.push({ value: "PDM", label: "PDM" });
        //  for (const item of this.state.UDMasterList.filter(f => f.active == "Y" && f.type == "MODULE")) {
        //      moduleListOptions.push({ value: item.code, label: item.code });
        //  }

        const locationItemOptions = [];
        for (const item of this.state.LocationItem) {
            locationItemOptions.push({ value: item.locCode, label: item.locName });
        }

        const RoleOptions = [];
        for (const item of this.state.RoleTypeList) {
            RoleOptions.push({ value: item.roleId, label: item.roleDesc });
        }

        const UnitItemOptions = [];
        UnitItemOptions.push({ value: "ALL", label: "ALL" });
        // for (const item of this.state.UnitCodeList) {
        //     UnitItemOptions.push({ value: item.uCode, label: item.uName });
        // }

        return (
            <div className="formelements-wrapper main-layout-class">
                {/* <PageTitleBar title="Menu Rights" match={this.props.match} /> */}
                <div className="category-container rct-block">
                    <Accordion>
                        <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                            <div className="acc_title_font">
                                <Typography>Add Menu Rights</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="col-sm-12 col-md-12 col-xl-12 p-0">
                                {/* <RctCollapsibleCard heading=""> */}
                                {/* <div className="btn-sm btn defect-master mt-1 w-100">
                                   
                                </div> */}
                                <div className="clearfix"></div>
                                <div className="row new-form">
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <div className="float-left pl-10">
                                                <InputLabel htmlFor="age-simple" className="pl-15 pt-10">User Level :</InputLabel>
                                            </div>
                                            <div className="pl-10 float-left">
                                                <RadioGroup row aria-label="anchorReference" name="anchorReference">
                                                    <div className="">
                                                        <FormControlLabel color="primary" value="roleuser" control={<Radio onChange={this.handleChangeradio} checked />} label="Role User" />
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12">
                                    <Form>
                                        <Button disabled={this.state.menuRightsList.length == 0} onClick={(e) => this.saveMenuRights()} color="primary" variant="contained" className="col-sm-2 col-md-2 col-xl-2  p-0 defect-master-add">
                                            Save <i className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add"></i>
                                        </Button>
                                        {/* <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn-success mr-10 text-white btn-icon pull-right b-sm"   type="button" onClick={this.createNotification('success')} disabled={!this.state.menuRightsList}><span className="MuiButton-label">save <i className="zmdi zmdi-save"></i></span><span className="MuiTouchRipple-root"></span></button> */}

                                        <button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={this.CLEAR_ALL_STATE_VALUE}><span className="MuiButton-label">Cancel <i className="col-sm-1 col-md-1 col-xl-1 p-0 defect-master-add"></i></span><span className="MuiTouchRipple-root"></span></button>

                                        {/* <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn-info mr-10 text-white btn-icon pull-right b-sm"   type="button" onClick={this.createNotification('error')}><span className="MuiButton-label">Report <i className="zmdi zmdi-file"></i></span><span className="MuiTouchRipple-root"></span></button> */}

                                        <button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={(e) => this.fetchMenuRights()}><span className="MuiButton-label">Menu Rights <i className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add"></i></span><span className="MuiTouchRipple-root"></span></button>
                                    </Form>
                                    </div>
                                </div>
                                <div className="row new-form">
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <div className="form-group select_label_name m-btop-10">
                                                <Select1 dropdownPosition="auto" createNewLabel="Role Type"
                                                    options={RoleOptions}
                                                    onChange={this.setstatevaluedropdownfunction("roletype")}
                                                    placeholder="Role Type"
                                                    values={this.state.roletype}
                                                />
                                                <span className="error">{this.state.errors["roletype"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <div className="form-group m-btop-10">
                                                <FormControl fullWidth>
                                                    <Select1 dropdownPosition="auto"
                                                        //   multi
                                                        createNewLabel="Module"
                                                        options={moduleListOptions}
                                                        onChange={this.setstatevaluedropdownfunction("modulenameValue")}
                                                        placeholder="Module"
                                                        values={this.state.modulenameValue}
                                                    />
                                                    <span className="error">{this.state.errors["modulenameValue"]}</span>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <div className="form-group m-btop-10">
                                                <FormControl fullWidth>
                                                    <Select1 dropdownPosition="auto"
                                                        //   multi
                                                        createNewLabel="Location"
                                                        options={locationItemOptions}
                                                        onChange={this.setstatevaluedropdownfunction("lpcationItemValue")}
                                                        placeholder="Location"
                                                        values={this.state.lpcationItemValue}
                                                    />
                                                    <span className="error">{this.state.errors["lpcationItemValue"]}</span>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <div className="form-group m-btop-10">
                                                <FormControl fullWidth>
                                                    <Select1 dropdownPosition="auto"
                                                        //   multi
                                                        createNewLabel="Unit Code"
                                                        options={UnitItemOptions}
                                                        onChange={this.setstatevaluedropdownfunction("codeItemValue")}
                                                        placeholder="Unit Code"
                                                        values={this.state.codeItemValue}
                                                    />
                                                    <span className="error">{this.state.errors["codeItemValue"]}</span>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </RctCollapsibleCard> */}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <br />
                <div className="row ">
                    <div className="col-sm-12 col-md-12 col-xl-12">
                        {/* <RctCollapsibleCard heading="" fullBlock> */}
                        <Accordion expanded>
                            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                <div className="acc_title_font">
                                    <Typography>Menu Rights</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* <div className="float-right tbl-filter-btn">
                                         <button className="MuiButtonBase-root MuiIconButton-root"   type="button" aria-label="Search" data-testid="Search-iconButton" title="Search">
                                             <span className="MuiIconButton-label">
                                                 <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                     <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                                 </svg>
                                             </span>
                                         </button>
                                         <button className="MuiButtonBase-root MuiIconButton-root jss26"   type="button" data-testid="Download CSV-iconButton" aria-label="Download CSV" title="Download CSV">
                                             <span className="MuiIconButton-label">
                                                 <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                     <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path>
                                                 </svg>
                                             </span>
                                         </button>
                                         <button className="MuiButtonBase-root MuiIconButton-root"   type="button" data-testid="Print-iconButton" aria-label="Print">
                                             <span className="MuiIconButton-label">
                                                 <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                     <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path>
                                                 </svg>
                                             </span>
                                         </button>
                                         <button className="MuiButtonBase-root MuiIconButton-root"   type="button" data-testid="View Columns-iconButton" aria-label="View Columns">
                                             <span className="MuiIconButton-label">
                                                 <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                     <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path>
                                                 </svg>
                                             </span>
                                         </button>
                                         <button className="MuiButtonBase-root MuiIconButton-root jss26"   type="button" data-testid="Filter Table-iconButton" aria-label="Filter Table" title="Filter Table"><span className="MuiIconButton-label"><svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                             <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
                                         </svg></span>
                                         </button>
                                     </div> */}
                                <table className="table">
                                    <thead className="thead-light">
                                        <th className="w-25">Menu Name</th>
                                        <th className="w-25">Menu Type</th>
                                        <th className="text-center w-10" >Full</th>
                                        <th className="text-center w-10" >Read Only</th>
                                        <th className="text-center w-10" >No Access</th>
                                        <th className="w-20">Column rights</th>
                                    </thead>
                                    <tbody>
                                        {this.state.menuRightsList.map((n, index) => {
                                            return (
                                                <tr>
                                                    <td>{n.menuName}</td>
                                                    <td>{n.menuType}</td>
                                                    <td align="center" className="radio-effects">
                                                        <input type="radio" name={index} onClick={(e) => this.handleRightsItem(n, index, 'F')} checked={n.menuRights == 'F'} />
                                                    </td>
                                                    <td align="center" className="radio-effects">
                                                        <input type="radio" name={index} onClick={(e) => this.handleRightsItem(n, index, 'R')} checked={n.menuRights == 'R'} />
                                                    </td>
                                                    <td align="center" className="radio-effects">
                                                        <input type="radio" name={index} onClick={(e) => this.handleRightsItem(n, index, 'N')} checked={n.menuRights == 'N'} />
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" defaultValue={n.columnRights} onChange={this.onNameEdited.bind(this, index)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {this.state.menuRightsList.length === 0 && (
                                            <td colSpan="6" className="no-records-data">
                                                <div>No Record Found</div>
                                            </td>
                                        )}
                                    </tbody>
                                </table>

                            </AccordionDetails>
                        </Accordion>
                        {/* </RctCollapsibleCard> */}
                    </div>
                </div>
            </div>
        );
    };
}
export default MenurightsElement;

