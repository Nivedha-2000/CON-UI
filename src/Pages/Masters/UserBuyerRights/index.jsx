/**
 * Simple Line Icons
 */
 import React, { Component, Fragment } from 'react';
 // import React, { useEffect, useState } from "react";
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
 // import api from 'Api';
  import { Button, Form, FormGroup, Label, FormText, Col, FormFeedback } from 'reactstrap';
 // page title bar
 // import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 // rct card box
 // import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 // import 'font-awesome/css/font-awesome.min.css';
 // import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
 // import 'react-vertical-timeline-component/style.min.css';
 // import 'font-awesome/css/font-awesome.min.css';
 import Accordion from '@material-ui/core/Accordion';
 import AccordionDetails from '@material-ui/core/AccordionDetails';
 import AccordionSummary from '@material-ui/core/AccordionSummary';
 import Typography from '@material-ui/core/Typography';
 import InputLabel from '@material-ui/core/InputLabel';
 // import { NotificationContainer, NotificationManager } from 'react-notifications';
 import RadioGroup from '@material-ui/core/RadioGroup';
 import Radio from '@material-ui/core/Radio';
 import FormControlLabel from '@material-ui/core/FormControlLabel';
 import Checkbox from '@material-ui/core/Checkbox';
 import Select1 from "react-dropdown-select";
 import moment from 'moment';
 import { CloseOutlined } from '@mui/icons-material';
 // import { ItrApiService } from '@afiplfeed/itr-ui';
 // import { getApiCallITR, PostApiCallITR } from "../../services/commonApi";
 
 // const $ = require('jquery');
 
 function TabContainer({ children }) {
     return (
         <Typography component="div" style={{ padding: 8 * 3 }}>
             {children}
         </Typography>
     );
 }
 
 class UserbuyerrightsElement extends Component {
     state = {
         mainarray: [],
         name: [],
         buyerlists: [],
         buyerrightlists: [],
         enuserlist: [],
         employeePayroll: null,
         activeIndex: 0,
         userlevel: '',
         options: [],
         fromuser: [],
         touser: [],
         username: []
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
 
     handleChangeradio = (event) => {
         this.setState({ userlevel: event.currentTarget.value, username: [], touser: [], buyerrightlists: [] });
 
     }
 
     handleChangesingledropdown = name => event => {
         this.setState({ [name]: event.target.value });
     };
 
     handleChangeIndex(index) {
         this.setState({ activeIndex: index });
     }
 
     handleChange(event, value) {
         this.setState({ activeIndex: value });
     }
     componentDidMount() {
         this.getBuyeruserlists();
     }
 
     handleChangecheckbox(event, index, e) {
         if (event.notify == 'Y') {
             event.notify = 'N';
             const { buyerrightlists } = this.state;
             buyerrightlists[index] = event;
             this.setState({ buyerrightlists });
         } else {
             event.notify = 'Y';
             const { buyerrightlists } = this.state;
             buyerrightlists[index] = event;
             this.setState({ buyerrightlists });
         }
     }
 
     handleChangecheckboxall(event) {
         if (this.state.buyerrightlists.length > 0) {
             let allbuyerrights = this.state.buyerrightlists.map(item => {
                 if (event.target.checked) item.notify = 'Y'; else item.notify = 'N';
                 return item;
             });
             this.setState({ buyerrightlists: allbuyerrights });
         }
     }
 
     handleChangedrop = event => {
         this.setState({ name: event.target.value });
     };
     
     getBuyerusersave() {
         if ((this.state.userlevel == "singleuser" && this.state.username.length > 0) || (this.state.userlevel == "copyuser" && this.state.touser.length > 0)) {
             let user_id = 0;
             if (this.state.userlevel == "singleuser") {
                 user_id = this.state.username[0].value;
             }
 
             if (this.state.userlevel == "copyuser") {
                 user_id = this.state.touser[0].value;
             }
 
             let validation = 'false'; 
             const dataset = [];
             for (const item of this.state.buyerrightlists) {
                 if (item.notify == "Y") {
                     dataset.push({
                         userId: user_id,
                         buyerCode: item.buyerCode,
                         buyerDivCode: item.buyerDivCode,
                         notify: "Y",
                         createdBy: "ADMIN",
                         hostname: "ADMIN"
                     });
                     validation = 'true';
                 }
 
             }
             alert();
            //console(dataset);
             if (validation) {
                // setLoader(true)
                 let data = { "UBInsertModel": dataset };
                 ApiCall({
                     method: "POST",
                     path: API_URLS.SAVE_USER_BUYER_RIGHTS_MASTER,
                     data: data
                 }).then(resp => {
                    // setLoader(false)
                     message.success(resp.message)
                     console.log(resp);
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
             // if (validation == 'true') {
             //     let data = { "UBInsertModel": dataset };
             //     PostApiCallITR('UserBuyerRights/SaveUserBuyerRights', data).then((response) => {
             //         console.log(response);
             //         if (response.Success) {
             //             NotificationManager.success('Added Sucessfully');
             //         } else NotificationManager.error('Added Sucessfully');
 
             //     }).catch(error => { console.log(error) });
             // } else {
             //     NotificationManager.error('Atleast Choose One User Buyer Rights');
             // } 
         } else {
             NotificationManager.error('Please Select One User');
         }
     }
     // get employee payrols
      getBuyeruserlists() {
         ApiCall({
             //path: 'User/GetAll'
             path: API_URLS.GET_USER_BUYER_RIGHTS_MASTER_ENS ,
             appCode: MISCELLANEOUS_TYPES.Catalog
         }).then(resp => {
             try {
                // console.log('Hai');
                // console.log(API_URLS.GET_USER_BUYER_RIGHTS_MASTER_ENS + "/" + MISCELLANEOUS_TYPES.Catalog);
 
                 this.setState({ enuserlist: (!Array.isArray(resp.data.activeUsers) ? [] : resp.data.activeUsers) });
                 //console.log(enuserlist);
                 //console.log(this.setState);
                // enuserlist(resp.data.map(d => ({ code: d.productType, codeDesc: d.productType })))
             } catch (e) {
                 message.error("response is not as expected")
             }
         }).catch(err => {
             message.error(err.message || err)
         })
     //     getApiCallITR('User/GetAll', {}, "Catalog").then((response) => {
     //         this.setState({ enuserlist: (!Array.isArray(response.data.activeUsers) ? [] : response.data.activeUsers) });
     //     }).catch(error => { console.log(error) });
      }
      getbuyerrightlists(val) {
        
         this.setState({ username: val.username, buyerrightlists: [] });
         //alert(API_URLS.GET_USER_BUYER_RIGHTS_MASTER_BY_ID +"/"+ val.username[0].value);
        // console.log(API_URLS.GET_MISCELLANEOUS_DROPDOWN + val.username[0].value);
         ApiCall({
             path: API_URLS.GET_USER_BUYER_RIGHTS_MASTER_BY_ID +"/" + val.username[0].value //val.username[0].value
         }).then(response => {
             try {
                    debugger;
                 this.setState({ buyerrightlists: response.data });
                 
             } catch (e) {
                 message.error("response is not as expected")
             }
         }).catch(err => {
             ///alert('Out')
             message.error(err.message || err)
         })
     //     this.setState({ username: val.username, buyerrightlists: [] });
     //     getApiCallITR('UserBuyerRights/GetUserBuyerRightsList?UserID=' + val.username[0].value).then((response) => {
     //         this.setState({ buyerrightlists: response.data.result.data });
     //     }).catch(error => { console.log(error) });
      }
 
     render() {
         const options1 = [];
         for (const item of this.state.enuserlist) {
             options1.push({ value: item.userCode, label: (item.displayName + ' - ' + item.emailID) });
         }
       //  alert(this.state.buyerrightlists.length);
         const allCheck = (this.state.buyerrightlists.length > 0 ? (this.state.buyerrightlists.length == this.state.buyerrightlists.filter(f => f.notify == "Y").length) : false);
         return (
             <div className="formelements-wrapper main-layout-class">
                 {/* <PageTitleBar title="User Buyer Rights" match={this.props.match} /> */}
                 <div className="category-container rct-block">
                     <Accordion expanded>
                         <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                             <div className="acc_title_font">
                                 <Typography>User Buyer Rights</Typography>
                             </div>                            
                             <button type="button"  onClick={(e) => this.getBuyerusersave()}>save</button>
                             
                         </AccordionSummary>
                         <AccordionDetails>
                             <div className="col-sm-12 col-md-12 col-xl-12 p-0">
                                 {/* <RctCollapsibleCard heading=""> */}
                                     {/* <div className="col-sm-3 col-md-3 col-xl-4 float-right pr-0 but-tp">
                                         <Form>
                                             <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn-success mr-10 mb-10 text-white btn-icon pull-left b-sm"  type="button" onClick={(e) => this.getBuyerusersave()} >
                                                 <span className="MuiButton-label">save
                                                     <i className="zmdi zmdi-save"></i>
                                                 </span>
                                                 <span className="MuiTouchRipple-root"></span>
                                             </button>
                                         </Form>
                                     </div> */}
                                     <div className="clearfix"></div>
                                     <div className="row new-form">
                                         <div className="col-lg-5 col-md-3 col-sm-6 col-xs-12 p-0 mt-15">
                                             <div className="row">
                                                 <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                     <InputLabel htmlFor="age-simple" className="pl-15 pt-10">User Level :</InputLabel>
                                                 </div>
 
                                                 <div className="col-lg-8 col-md-6 col-sm-6 col-xs-12">
                                                     <RadioGroup row aria-label="anchorReference" name="anchorReference">
                                                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                             <FormControlLabel color="primary" value="singleuser" control={<Radio onChange={this.handleChangeradio} />} label="Single User" />
                                                         </div>
                                                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                             <FormControlLabel color="primary" value="copyuser" control={<Radio onChange={this.handleChangeradio} />} label="Copy User" />
                                                         </div>
                                                     </RadioGroup>
                                                 </div>
                                             </div>
                                         </div>
 
                                         {(() => {
                                             if (this.state.userlevel == 'copyuser') {
                                                 return (
                                                     <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                         <div className="row">
                                                             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                 <div className="form-group select_label_name mt-15">
                                                                     <Select1
                                                                         dropdownPosition="auto"
                                                                         //   multi
                                                                         createNewLabel="From User"
                                                                         options={options1}
                                                                         onChange={values => this.getbuyerrightlists({ username: values })}
                                                                         placeholder="From User"
                                                                         values={this.state.username}
                                                                     />
                                                                 </div>
                                                             </div>
                                                             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                 <div className="form-group select_label_name mt-15">
                                                                     <Select1
                                                                         dropdownPosition="auto"
                                                                         //   multi
                                                                         createNewLabel="To User"
                                                                         options={options1}
                                                                         onChange={values => this.setState({ touser: values })}
                                                                         placeholder="To User"
                                                                         values={this.state.touser}
                                                                     />
                                                                 </div>
                                                             </div>
                                                         </div>
                                                     </div>
                                                 )
                                             }
                                             if (this.state.userlevel == 'singleuser') {
                                                 return (
                                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                         <div className="form-group select_label_name mt-15">
                                                             {/* select_label_name mt-15 */}
                                                             <Select1
                                                                 dropdownPosition="auto"
                                                                 //   multi
                                                                 createNewLabel="User ID"
                                                                 options={options1}
                                                                 onChange={values => this.getbuyerrightlists({ username: values })}
                                                                 placeholder="User ID"
                                                                 values={this.state.fromuser}
                                                             />
                                                         </div>
                                                     </div>
                                                 )
                                             }
                                         })()}
 
                                     </div>
                                     <br />
                                     <table className="table">
                                         <thead className="thead-light">
                                             <th align='center' style={{ textAlign: "center" }}>
                                                 <Checkbox color="primary" onClick={(e) => this.handleChangecheckboxall(e)} title={"select all buyer"} checked={allCheck} />
                                             </th>
                                             <th>Buyer</th>
                                             <th>Buyer Division</th>
                                             <th>Division Name</th>
                                         </thead>
                                         <tbody>                                           
                                             {
                                                 this.state.buyerrightlists.map((n, index) => (
                                                     <tr>
                                                         <td className='' align='center'>
                                                             <Checkbox color="primary" onClick={(e) => this.handleChangecheckbox(n, index, e)} checked={n.notify == 'Y' ? true : false} />
                                                         </td>
                                                         <td>{n.buyCode}</td>
                                                         <td>{n.buyDivCode}</td>
                                                         <td>{n.divName}</td>
                                                     </tr>
                                                 ))
                                             }
                                         </tbody>
                                     </table>
                                 {/* </RctCollapsibleCard> */}
                             </div>
                         </AccordionDetails>
                     </Accordion>
                 </div>
             </div >
         );
     };
 }
 
 
 UserbuyerrightsElement.propTypes = {
     name: PropTypes.string
 }
 export default UserbuyerrightsElement;
 
 