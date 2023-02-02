/**
 * Simple Line Icons
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//import api from 'Api';
import { Button, Form, FormGroup, Label, FormText, Col, FormFeedback } from 'reactstrap';
// page title bar
//import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import TextField from '@material-ui/core/TextField';
// rct card box
//import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
//import 'font-awesome/css/font-awesome.min.css';
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import 'react-vertical-timeline-component/style.min.css';
//import 'font-awesome/css/font-awesome.min.css';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
//import { NotificationContainer, NotificationManager } from 'react-notifications';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select1 from "react-dropdown-select";
// import { ItrApiService } from '@afiplfeed/itr-ui';
import moment from 'moment';
//import { getApiCallITR, PostApiCallITR } from "../../services/commonApi";
//import { getCookies } from "../../services/storage.service";


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
import { Radio } from 'antd';


function TabContainer({ children }) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}


class MenuElement extends Component {
    state = {
        edit_add: false,
        menuId: 0,
        menulists: [],
        menutypelists: [],
        modulelists: [],
        employeePayroll: null,
        activeIndex: 0,
        name: '',
        parent_menu_id: [],
        module: [],
        menu_type: [],
        menuname: '',
        menuurl: '',
        menudesc: '',
        active_status: 'Y',
        menu_visible: 'Y',
        isparent: '',
        displayindex: 0,

        fields: {},
        errors: {},
        userInfo: {},
        tableColumns: [{
            name: "menuId",
            label: "Action",
            options: {
                customBodyRender: (value, tm) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div onClick={() => this.editMenu(tm.rowData[0])}>
                                <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                            </div>
                        </div>

                    )
                }
            }
        },
        {
            name: "menuId",
            label: "Menu ID",
        },
        {
            name: "parantMenuId",
            label: "ParentMenuID",
        },
        {
            name: "menuType",
            label: "Menu Type",
        },
        {
            name: "menuName",
            label: "Menu Name",
        },
        {
            name: "menuUrl",
            label: "Menu URL",
        },
        {
            name: "appName",
            label: "Module",
        },
        {
            name: "menuVisible",
            label: "Visible",
        },
        {
            name: "active",
            label: "Active",
        }],
        tableProps: {
            page: 0,
            rowsPerPage: 10,
            sortOrder: {
                name: 'menuId',
                direction: 'asc'
            }
        }
    }
    updateTableProps = penprops => {
        debugger;
        this.setState({
            tableProps: {
                page: penprops.page,
                rowsPerPage: penprops.rowsPerPage,
                sortOrder: penprops.sortOrder
            }
        })
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
    pageSize = 10;

    // for-list-pagination
    // [pagination, setPagination] = useState({
    //     totalPage: 0,
    //     current: 1,
    //     minIndex: 0,
    //     maxIndex: 0
    // });
    handleChangepage(index) {
        this.setState({ activeIndex: index });
    }
    handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    };
    handleChangesingledropdown = name => event => {
        this.setState({ [name]: (event.target.value == "N" ? "Y" : "N") });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleChangeIndex(index) {
        this.setState({ activeIndex: index });
    }

    handleChange(event, value) {
        this.setState({ activeIndex: value });
    }
    componentDidMount() {
        this.getMenulists();
        this.getfilldropdownlists();

        // let userDetails = getCookies('userInfo');
        //  let parseData = JSON.parse(userDetails);
        //console.log(parseData);
        // if (parseData) this.setState({ userInfo: parseData });
    }

    setstatevaluedropdownfunction = name => event => {
        //console.log({ name, event })
        if (event.length > 0) {
            let fields = this.state.fields;
            fields[name] = event[0].value;
            this.setState({ fields });
            this.setState({ [name]: event });
        }
    };
    getMenusave() {
        if (this.handleValidation()) {
            let data = {
                menuId: 0,
                parantMenuId: (this.state.parent_menu_id.length ? this.state.parent_menu_id[0].value : 0),
                menuType: (this.state.menu_type.length > 0 ? this.state.menu_type[0].value : ""),
                menuName: this.state.menuname,
                menuUrl: this.state.menuurl,
                appName: (this.state.module.length > 0 ? this.state.module[0].value : ""),
                menuDescription: this.state.menudesc,
                displayIndex: this.state.displayindex,
                active: this.state.active_status,
                menuVisible: this.state.menu_visible,
                createdDate: moment().format('YYYY-MM-DD'),
                createdBy: "Admin",
                modifiedBy: "Admin",//this.state.userInfo.userCode,
                isActive: false,
                modifiedDate: moment().format('YYYY-MM-DD'),
                hostName: ""//this.state.userInfo.displayName
            };
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_MENU_MASTER,
                data: data
            }).then(resp => {
                // setLoader(false)
                message.success(resp.message)
                console.log(resp);
                this.setState({
                    edit_add: false,
                    menuId: 0,
                    parent_menu_id: [],
                    module: [],
                    menu_type: [],
                    menuname: '',
                    menuurl: '',
                    menudesc: '',
                    active_status: 'Y',
                    menu_visible: "Y",
                    isparent: '',
                    displayindex: 0
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
            // PostApiCallITR('Menu/SaveMenu', data).then((response) => {
            //     console.log(response);
            //     if (response.Success) {
            //         this.getMenulists();
            //         NotificationManager.success('Added Sucessfully');
            //         this.setState({
            //             edit_add: false,
            //             menuId: 0,
            //             parent_menu_id: [],
            //             module: [],
            //             menu_type: [],
            //             menuname: '',
            //             menuurl: '',
            //             menudesc: '',
            //             active_status: 'Y',
            //             menu_visible: "Y",
            //             isparent: '',
            //             displayindex: 0
            //         });
            //     } else {
            //         NotificationManager.error(response.message);
            //     }
            // }).catch(error => { console.log(error) })
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["module"]) {
            formIsValid = false;
            errors["module"] = "Cannot be empty";
        }
        if (!fields["menu_type"]) {
            formIsValid = false;
            errors["menu_type"] = "Cannot be empty";
        }
        if (this.state.menuname == "" || this.state.menuname == null) {
            formIsValid = false;
            errors["menuname"] = "Cannot be empty";
        }
        if (this.state.menuurl == "" || this.state.menuurl == null) {
            formIsValid = false;
            errors["menuurl"] = "Cannot be empty";
        }
        if (this.state.menudesc == "" || this.state.menudesc == null) {
            formIsValid = false;
            errors["menudesc"] = "Cannot be empty";
        }
        // debugger;
        // if (this.state.displayindex == "" || this.state.displayindex == null) {
        //     formIsValid = false;
        //     errors["displayindex"] = "Cannot be empty";
        // }

        this.setState({ errors: errors });
        console.log(errors)
        return formIsValid;
    }

    getMenuUpdate() {
        if (this.handleValidation()) {
            let data = {
                menuId: this.state.menuId,
                parantMenuId: (this.state.parent_menu_id.length > 0 ? this.state.parent_menu_id[0].value : 0),
                menuType: (this.state.menu_type.length > 0 ? this.state.menu_type[0].value : ""),
                menuName: this.state.menuname,
                menuUrl: this.state.menuurl,
                appName: (this.state.module.length > 0 ? this.state.module[0].value : ""),
                menuDescription: this.state.menudesc,
                displayIndex: this.state.displayindex,
                menuVisible: this.state.menu_visible,
                active: this.state.active_status,
                createdDate: moment().format('YYYY-MM-DD'),
                createdBy: "Admin",
                modifiedBy: "Admin",
                isActive: false,
                modifiedDate: moment().format('YYYY-MM-DD'),
                // createdBy: this.state.userInfo.userCode,
                // modifyBy: this.state.userInfo.userCode,
                // modifyDt: moment().format('YYYY-MM-DD'),
                hostName: ":."//
            };
            console.log(data);
            console.log(JSON.stringify(data));
            ApiCall({
                method: "POST",
                path: API_URLS.SAVE_MENU_MASTER,
                data: data
            }).then(resp => {
                // setLoader(false)
                message.success(resp.message)
                console.log(resp);
                this.setState({
                    edit_add: false,
                    menuId: 0,
                    parent_menu_id: [],
                    module: [],
                    menu_type: [],
                    menuname: '',
                    menuurl: '',
                    menudesc: '',
                    active_status: 'Y',
                    menu_visible: 'Y',
                    isparent: '',
                    displayindex: 0
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
            // PostApiCallITR('Menu/SaveMenu', data).then((response) => {
            //     console.log(response);
            //     if (response.Success) {
            //         this.getMenulists();
            //         NotificationManager.success('Updated Sucessfully');
            //         this.setState({
            //             edit_add: false,
            //             menuId: 0,
            //             parent_menu_id: [],
            //             module: [],
            //             menu_type: [],
            //             menuname: '',
            //             menuurl: '',
            //             menudesc: '',
            //             active_status: 'Y',
            //             menu_visible: 'Y',
            //             isparent: '',
            //             displayindex: 0
            //         });
            //     } else {
            //         NotificationManager.error(response.message);
            //     }
            // }).catch(error => { console.log(error) })
        }
    }

    getfilldropdownlists() {
        // alert(API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.MODULE);
        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.MODULE
        }).then(resp => {
            try {
                this.setState({ modulelists: resp.data });
                /// alert(modulelists);
            } catch (e) {
                // message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })

        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.MENUTYPE
        }).then(resp => {
            try {
                this.setState({ menutypelists: resp.data });
                //alert(modulelists);
            } catch (e) {
                //message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
        // //  getApiCallITR('Miscellaneous/GetMiscellaneousList?MType=Module')
        // //      .then((response) => {
        // //          this.setState({ modulelists: response.data.result.data });
        // //      }).catch(error => { console.log(error) })

        // //  getApiCallITR('Miscellaneous/GetMiscellaneousList?MType=Menutype')
        // //      .then((response) => {
        // //          this.setState({ menutypelists: response.data.result.data });
        // //      }).catch(error => { console.log(error) })
    }
    getMenulists() {
        //alert(API_URLS.GET_UD_MASTER_BY_ID + "/" + "MENUTYPE");
        debugger;
        ApiCall({
            path: API_URLS.GET_MENU_MASTER_LIST // + "/" + "MENUTYPE"          
        }).then(resp => {
            try {
                this.setState({ edit_add: false });
                this.setState({ menulists: resp.data });
                console.log(response.data)
            } catch (e) {
                //message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })


        // //  getApiCallITR('Menu/GetMenuList')
        // //      .then((response) => {
        // //          this.setState({ edit_add: false });
        // //          this.setState({ menulists: response.data.result.data });
        // //          //console.log(response.data.result.data)
        // //      }).catch(error => { console.log(error) })
    }

    deleteMenu(id, menuType, menuUrl) {
        if (confirm("Are you sure want to remove...!")) {
            let data = { "menuId": id, "menuType": menuType, "menuUrl": menuUrl };
            console.log(JSON.stringify(data));
            // //  PostApiCallITR('Menu/RemoveMenu', data).then((response) => {
            // //      console.log(response);
            // //      if (response.Success) {
            // //          this.getMenulists();
            // //          this.setState({ edit_add: false });
            // //          NotificationManager.success('Deleted Sucessfully');
            // //      }
            // //  }).catch(error => { console.log(error) })
        }
    }

    editMenu(id) {

        this.setState({ edit_add: true });
        ApiCall({
            path: API_URLS.GET_MENU_MASTER_EDIT_BY_ID + "/" + id
        }).then(response => {
            try {
                debugger;
                let dataval = response.data;
                // alert(dataval.parentMenuName);
                console.log(response.data);
                this.setState({
                    module: [{ value: dataval.appName, label: dataval.appName }]
                    , parent_menu_id: [{
                        value: dataval.parantMenuId, label:
                            (dataval.parantMenuId == 0 ? dataval.menuName : this.state.menulists.filter(f => f.menuId == dataval.parantMenuId).map(d => d.menuName)[0])
                    }],
                    //  parentmenutypedropdown.push({ value: item.menuId, label: item.menuName });
                    menu_type: [{ value: dataval.menuType, label: dataval.menuType }],
                    menuname: dataval.menuName, menuurl: dataval.menuUrl,
                    menudesc: dataval.menuDescription, displayindex: dataval.displayIndex,
                    menuId: dataval.menuId, active_status: dataval.active, menu_visible: dataval.menuVisible
                });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
        // //  getApiCallITR('Menu/GetMenuList?MenuID=' + id).then((response) => {
        // //      let dataval = response.data.result.data[0];
        // //      console.log(response.data.result.data);
        // //      this.setState({ module: [{ value: dataval.appName, label: dataval.appName }], parent_menu_id: [{ value: dataval.parantMenuId, label: (dataval.parentMenuName == null ? dataval.menuName : dataval.parentMenuName) }], menu_type: [{ value: dataval.menuType, label: dataval.menuType }], menuname: dataval.menuName, menuurl: dataval.menuUrl, menudesc: dataval.menuDescription, displayindex: dataval.displayIndex, menuId: dataval.menuId, active_status: dataval.active, menu_visible: dataval.menuVisible });
        // //  }).catch(error => { console.log(error) })
    }

    getCancel() {
        if (confirm("Are you sure want to clear...!")) {
            this.setState({
                edit_add: false,
                menuId: 0,
                parent_menu_id: [],
                module: [],
                menu_type: [],
                menuname: '',
                menuurl: '',
                menudesc: '',
                active_status: 'Y',
                menu_visible: 'Y',
                isparent: '',
                displayindex: 0
            });
        }
    }


    render() {
        const { employeePayroll } = this.state;
        const { match } = this.props;

        const moduledropdown = [];
        for (const item of this.state.modulelists.filter(f => f.active == "Y")) {
            moduledropdown.push({ value: item.code, label: item.codeDesc });
        }

        const menutypedropdown = [];
        for (const item of this.state.menutypelists.filter(f => f.active == "Y")) {
            menutypedropdown.push({ value: item.code, label: item.codeDesc });
        }

        const parentmenutypedropdown = [];
        for (const item of this.state.menulists) {
            parentmenutypedropdown.push({ value: item.menuId, label: item.menuName });
        }

        return (
            <div className="formelements-wrapper main-layout-class">
                {/* <PageTitleBar title={"Menu<IntlMessages id="sidebar.simpleform" />} match={this.props.match} /> */}
                {/* <PageTitleBar title="Menu" match={this.props.match} /> */}
                <div className="category-container rct-block">
                    <Accordion>
                        <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                            <div className="acc_title_font">
                                <Typography>Add Menu</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>

                            <div className="col-sm-12 col-md-12 col-xl-12 p-0">

                                {/* <RctCollapsibleCard heading=""> */}


                                {/* <div className="w-50 float-right pr-0 but-tp">
                                    <Form>
                                        {(() => {

                                            if (this.state.edit_add == false) {
                                                return (
                                                    <button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={(e) => this.getMenusave()} ><span className="MuiButton-label">save <i className="zmdi zmdi-save"></i></span><span className="MuiTouchRipple-root"></span></button>
                                                )
                                            }
                                            if (this.state.edit_add != false) {
                                                return (<button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={(e) => this.getMenuUpdate()} ><span className="MuiButton-label">Update <i className="zmdi zmdi-save"></i></span><span className="MuiTouchRipple-root"></span></button>
                                                )
                                            }
                                        })()}
                                        <button className="col-sm-2 col-md-2 col-xl-2 p-0 defect-master-add" type="button" onClick={(e) => this.getCancel()}><span className="MuiButton-label">Cancel <i className="zmdi zmdi-close"></i></span><span className="MuiTouchRipple-root"></span></button>
                                    </Form>
                                </div> */}
                                <div className="clearfix"></div>
                                <div className="row new-form">
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group select_label_name mt-15 ">
                                            {/* select_label_name mt-15 */}
                                            <Select1
                                                dropdownPosition="auto"
                                                //   multi
                                                createNewLabel="Module"
                                                options={moduledropdown}
                                                onChange={this.setstatevaluedropdownfunction("module")}
                                                placeholder="Module"
                                                values={this.state.module}
                                            />
                                            <span className="text-danger">{this.state.errors["module"]}</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group select_label_name mt-15 ">
                                            <Select1
                                                dropdownPosition="auto"
                                                //   multi
                                                createNewLabel="Menu Type"
                                                options={menutypedropdown}
                                                onChange={this.setstatevaluedropdownfunction("menu_type")}
                                                placeholder="Menu Type"
                                                values={this.state.menu_type}
                                            />
                                            <span className="text-danger">{this.state.errors["menu_type"]}</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <TextField id="menuname" value={this.state.menuname} onChange={this.handleChange('menuname')} fullWidth label="Menu Name" type="text" />
                                            <span className="text-danger">{this.state.errors["menuname"]}</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group select_label_name mt-15 ">
                                            <Select1
                                                dropdownPosition="auto"
                                                //   multi
                                                createNewLabel="Parent Menu ID"
                                                options={parentmenutypedropdown}
                                                onChange={this.setstatevaluedropdownfunction("parent_menu_id")}
                                                placeholder="Parent Menu ID"
                                                values={this.state.parent_menu_id}
                                            />
                                            <span className="text-danger">{this.state.errors["parent_menu_id"]}</span>
                                        </div>
                                    </div>

                                </div>


                                <div className="row new-form">
                                    <div className="col-lg-6 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <TextField id="menudesc" value={this.state.menudesc} onChange={this.handleChange('menudesc')} fullWidth label="Menu Desc" type="text" />
                                            <span className="text-danger">{this.state.errors["menudesc"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <TextField id="menuurl" value={this.state.menuurl} onChange={this.handleChange('menuurl')} fullWidth label="Menu URL" type="text" />
                                            <span className="text-danger">{this.state.errors["menuurl"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <TextField id="displayindex" value={this.state.displayindex} onChange={this.handleChange('displayindex')} fullWidth label="Display Index" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row new-form">
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">

                                            <FormControlLabel control={<Checkbox color="primary" checked={(this.state.active_status == "Y" ? true : false)} onChange={this.handleChangesingledropdown('active_status')} value={(this.state.active_status == "Y" ? "Y" : "N")} />} label="Active" />
                                            {/*(() => {
 
                                                     // if (this.state.active_status == 'Y') {
                                                     //     return (
                                                     //         <FormControlLabel control={<Checkbox color="primary" checked onChange={this.handleChangesingledropdown('active_status')} value="Y" />} label="Active" />
                                                     //     )
                                                     // } else {
                                                     //     return (
                                                     //         <FormControlLabel control={<Checkbox color="primary" onChange={this.handleChangesingledropdown('active_status')} value="Y" />} label="Active" />
                                                     //     )
                                                     // }
                                                 })() */}
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">

                                            <FormControlLabel control={<Checkbox color="primary" checked={(this.state.menu_visible == "Y" ? true : false)} onChange={this.handleChangesingledropdown('menu_visible')} value={(this.state.menu_visible == "Y" ? "Y" : "N")} />} label="Visible" />
                                            {/*(() => {
 
                                                     // if (this.state.active_status == 'Y') {
                                                     //     return (
                                                     //         <FormControlLabel control={<Checkbox color="primary" checked onChange={this.handleChangesingledropdown('active_status')} value="Y" />} label="Active" />
                                                     //     )
                                                     // } else {
                                                     //     return (
                                                     //         <FormControlLabel control={<Checkbox color="primary" onChange={this.handleChangesingledropdown('active_status')} value="Y" />} label="Active" />
                                                     //     )
                                                     // }
                                                 })() */}
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">

                                            <Form>
                                                {(() => {

                                                    if (this.state.edit_add == false) {
                                                        return (
                                                            <button className="col-sm-4 col-md-4 col-xl-4 p-0 defect-master-add" type="button" onClick={(e) => this.getMenusave()} ><span className="MuiButton-label">save <i className="zmdi zmdi-save"></i></span><span className="MuiTouchRipple-root"></span></button>
                                                        )
                                                    }
                                                    if (this.state.edit_add != false) {
                                                        return (<button className="col-sm-4 col-md-4 col-xl-4 p-0 defect-master-add" type="button" onClick={(e) => this.getMenuUpdate()} ><span className="MuiButton-label">Update <i className="zmdi zmdi-save"></i></span><span className="MuiTouchRipple-root"></span></button>
                                                        )
                                                    }
                                                })()}
                                            </Form>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div className="form-group">

                                            <button className="col-sm-4 col-md-4 col-xl-4 p-0 defect-master-add" type="button" onClick={(e) => this.getCancel()}><span className="MuiButton-label">Cancel <i className="zmdi zmdi-close"></i></span><span className="MuiTouchRipple-root"></span></button>

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
                    {/* d-tbl-sp  */}
                    <div className="col-sm-12 col-md-12 col-xl-12">
                        {/* <RctCollapsibleCard heading="" fullBlock> */} 
                        <Accordion expanded>
                            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                <div className="acc_title_font">
                                    <Typography>Menu</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* <table className="table">
                                    <thead className="thead-light">
                                        <th className="text-center w-10">Actions</th>
                                        <th className="text-center w-10">Menu ID</th>
                                        <th className="text-center w-10">ParentMenuID</th>
                                        <th className="w-10" >Menu Type</th>
                                        <th className="" >Menu Name</th>
                                        <th className="" >Menu URL</th>
                                        <th className="">Module</th>
                                        <th className="">Visible</th>
                                        <th className="">Active</th>
                                    </thead>
                                    <tbody>

                                        {this.state.menulists.map((n, index) => {

                                            return (
                                                <tr>
                                                    <td className="text-center">
                                                        <div onClick={(e) => this.editMenu(n.menuId)}>
                                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" />
                                                        </div>
                                                    </td>
                                                    <td>{n.menuId}</td>
                                                    <td>{n.parantMenuId}</td>
                                                    <td>{n.menuType}</td>
                                                    <td>{n.menuName}</td>
                                                    <td>{n.menuUrl}</td>
                                                    <td>{n.appName}</td>
                                                    <td>{n.menuVisible}</td>
                                                    <td>{n.active}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table> */}
                                <div>
                                    <CustomTableContainer
                                        columns={this.state.tableColumns}
                                        data={this.state.menulists}
                                        options={{
                                            download: !1,
                                            print: !1,
                                            filter: !1,
                                            viewColumns: !1,
                                            jumpToPage: !0,
                                            selectableRows: "none",
                                            rowsPerPageOptions: [10, 25, 50, 100],
                                            rowsPerPage: this.state.tableProps.rowsPerPage,
                                            page: this.state.tableProps.page,
                                            count: this.state.menulists.length,
                                            sortOrder: this.state.tableProps.sortOrder,
                                            onTableChange: (action, tableState) => {
                                                if (!["changePage", "search", "changeRowsPerPage", "sort"].includes(action)) return
                                                const { page, rowsPerPage, sortOrder } = tableState
                                                this.updateTableProps({
                                                    page, rowsPerPage, sortOrder
                                                })
                                            }
                                        }}
                                    />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        {/* </RctCollapsibleCard> */}



                    </div>


                </div>
            </div>
        );
    };
}
MenuElement.propTypes = {
    name: PropTypes.string
}
export default MenuElement;

