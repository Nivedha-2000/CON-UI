import React, { Component, Fragment, useRef, useMemo, useCallback, useEffect, useState } from 'react';
//import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// rct card box
//import api from "Api";
//import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import Checkbox from '@material-ui/core/Checkbox';
//import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Button, Form, FormGroup, Label, Input, FormText, Col, FormFeedback } from 'reactstrap';
import ProductivityMasterList from '../ProductivityMaster/productivitymasterlist';
// import { ItrApiService } from '@afiplfeed/itr-ui';
import { getApiCallITR, PostApiCallITR } from "../../../services/commonApi";


import PropTypes from 'prop-types';
import { Drawer, Switch, message, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import CustomTableContainer from "../../../components/Table/alter/AlterMIUITable";
import { getHostName, validateInputOnKeyup } from "../../../helpers";
import ApiCall from "../../../services"
//import {API_URLS, MISCELLANEOUS_TYPES} from "../../../constants/api_url_constants";
import { API_URLS, MISCELLANEOUS_TYPES } from "../../../constants/api_url_constants";

class ProductivityMaster extends Component {
    constructor() {
        super();
        //this.ChangeDifficultyLevel == this.ChangeDifficultyLevel.bind(this);
        this.state = {
            LocCode: "",
            FactCode: "",
            LineGroup: "65OPR",
            ProductType: "",
            NoOfOperators: "",
            PlaidType: "NA",
            DifficultyLevel: "",
            WorkingHrs: 0,
            ScaleUpDay: "",
            ScaleUpEffPer: 0,
            PeakEff: "N",
            StartDate: Date.UTC,
            EndDate: Date.UTC,

            ListData: [],
            ListDataTemp: [],
            ListDataTemp1: [],

            fields: {},
            errors: {},
            IsEditRow: false,

            LocationList: [],
            FactoryList: [],
            OperatorList: [],
            FabTypeList: [],
            DifficultyLevel1: [],
            ProductTypeList: [],
            ScaleUpDayList: [],
        }
    }

    ChangeEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setstatevaluedropdownfunction(e.target.name, e.target.value);
    }

    ChangeDifficultyLevel = (e) => {
        debugger;
        this.setState({ [e.target.name]: e.target.value });
        this.setstatevaluedropdownfunction(e.target.name, e.target.value);
        //  this.ChangeDifficultyLevelFunc(e.target.value);

        // this.setState({ [e.target.name]: e.target.value });
        // this.setstatevaluedropdownfunction(e.target.name, e.target.value);
    }

    ChangeDifficultyLevelFunc(vall) {
        this.setState({ ListDataTemp: this.state.ListData.filter(f => f.factCode == this.state.FactCode && f.productType == this.state.ProductType && f.noOfOperators == this.state.NoOfOperators && f.difficultyLevel == vall) });

        let addDate = 1, availDates = [];
        this.state.ListData.filter(f => f.factCode == this.state.FactCode && f.productType == this.state.ProductType && f.noOfOperators == this.state.NoOfOperators && f.difficultyLevel == vall).map((sData, sInd) => {
            if (!availDates.some(o => o == sData.scaleUpDay)) {
                availDates.push(sData.scaleUpDay);
                addDate = sData.scaleUpDay;
            }
        })
        availDates.push(addDate + 1);
        this.setState({ ScaleUpDayList: availDates });
        this.ShowColumn(this.state.ListData.filter(f => f.factCode == this.state.FactCode && f.productType == this.state.ProductType && f.noOfOperators == this.state.NoOfOperators && f.difficultyLevel == vall));
    }

    setstatevaluedropdownfunction(name, val) {
        let fields = this.state.fields;
        fields[name] = val;
        this.setState({ fields });
    };

    getCommonData() {
        // getApiCallITR('Location/GetLocationDropDown').then((response) => {
        //     this.setState({ LocationList: response.data.result.data });
        // }).catch(error => { console.log(error) });

        // getApiCallITR('ProductType/GetProductTypeDropDown').then((response1) => {
        //     console.log(response1.data.result.data);
        //     this.setState({ ProductTypeList: response1.data.result.data });
        // }).catch(error => { console.log(error) });

        // getApiCallITR('LineCost/GetLineCostList').then((response) => {
        //     this.setState({ FactoryList: response.data.result.data.filter(f => f.locCode == e.target.value) });
        // }).catch(error => { console.log(error) });

        ApiCall({
            path: API_URLS.GET_LOCATION_MASTER_LIST
        }).then(response => {
            try {
                this.setState({ LocationList: response.data.filter(d => d.active == "Y") });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {

            message.error(err.message || err)
        })

        ApiCall({
            path: API_URLS.GET_PRODUCTTYPE_MASTER_LIST
        }).then(response => {
            try {
                this.setState({ ProductTypeList: response.data.filter(d => d.active == "Y") });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })

        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.FABTYPE
        }).then(response => {
            try {
                this.setState({ FabTypeList: response.data });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })

        ApiCall({
            path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.DLEVEL
        }).then(response => {
            try {
                this.setState({ DifficultyLevel1: response.data });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })


        // ApiCall({
        //     path: API_URLS.GET_MISCELLANEOUS_DROPDOWN + MISCELLANEOUS_TYPES.SHIPMODE
        // }).then(resp => {
        //     try {
        //         setShipmodeList(resp.data.map(d => ({ code: d.code, codeDesc: d.codeDesc })))
        //     } catch (e) {
        //         message.error("response is not as expected")
        //     }
        // }).catch(err => {
        //     message.error(err.message || err)
        // })


        getApiCallITR('ProductType/GetProductTypeDropDown').then((response) => {
            console.log(response.data.result.data);
            this.setState({ ListData: response.data.result.data });
            this.setState({ ListDataTemp: response.data.result.data });
        }).catch(error => { console.log(error) });
    }

    LocationChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setstatevaluedropdownfunction(e.target.name, e.target.value);
        ApiCall({
            path: API_URLS.GET_UNIT_MASTER_LIST
        }).then(response => {
            try {
                this.setState({ FactoryList: response.data.filter(f => f.loccode == this.state.LocCode) });
            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })
    }

    FactoryChangeHandle = (e) => {
        console.log(API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + this.state.LocCode + "&FactCode=" + e.target.value);
        console.log(e.target.value);
        ApiCall({
            path: API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + this.state.LocCode + "&FactCode=" + e.target.value
        }).then(response => {
            try {
                //  this.setState({ OperatorList: response.data.filter(f => f.loccode == this.state.LocCode) && f.FactCode == e.target.value });
                this.setState({ OperatorList: response.data });

            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })

    }

    ToDateChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setstatevaluedropdownfunction(e.target.name, e.target.value);

        alert(e.target.value)

        // ApiCall({
        //     path: API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + this.state.LocCode + "&FactCode=" + e.target.value
        // }).then(response => {
        //     try {
        //         //  this.setState({ OperatorList: response.data.filter(f => f.loccode == this.state.LocCode) && f.FactCode == e.target.value });
        //         this.setState({ OperatorList: response.data });

        //     } catch (e) {
        //         message.error("response is not as expected")
        //     }
        // }).catch(err => {
        //     message.error(err.message || err)
        // })
    }

    NoOfOperatorsChangeHandle = (e) => {

        this.setState({ [e.target.name]: e.target.value });
        this.setstatevaluedropdownfunction(e.target.name, e.target.value);
        ApiCall({
            path: API_URLS.GET_LINECOST_MASTER_LOCCODEFACTORY_LIST + "?LocCode=" + this.state.LocCode + "&FactCode=" + e.target.value
        }).then(response => {
            try {
                //  this.setState({ OperatorList: response.data.filter(f => f.loccode == this.state.LocCode) && f.FactCode == e.target.value });
                this.setState({ OperatorList: response.data });

            } catch (e) {
                message.error("response is not as expected")
            }
        }).catch(err => {
            message.error(err.message || err)
        })

    }

    groupByKey1(array, key) {
        return array
            .reduce((hash, obj) => {
                if (obj[key] === undefined) return hash;
                return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
            }, {})
    }

    groupByKey(list, key) {
        return list.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };


    componentDidMount() {
        this.getCommonData()
    }

    ShowColumn(filterData) {
        let finalDetl1 = [];
        let factCodeTemp = "", lineGroupTemp = "", noOfOperatorsTemp = 0, productTypeTemp = "", plaidTypeTemp = "", difficultyLevelTemp = "", workingHrsTemp = "";

        filterData.map((data, ind) => {
            if (data.factCode != factCodeTemp || data.lineGroup != lineGroupTemp || data.noOfOperators != noOfOperatorsTemp || data.productType != productTypeTemp || data.plaidType != plaidTypeTemp || data.difficultyLevel != difficultyLevelTemp || data.workingHrs != workingHrsTemp) {
                finalDetl1.push(data);
            }
            factCodeTemp = data.factCode, lineGroupTemp = data.lineGroup, noOfOperatorsTemp = data.noOfOperators, productTypeTemp = data.productType, plaidTypeTemp = data.plaidType, difficultyLevelTemp = data.difficultyLevel, workingHrsTemp = data.workingHrs
        })
        this.setState({ ListDataTemp1: finalDetl1 });
    }

    WorkingHrsChangeHandle = (e) => {
        console.log(Date.UTC);

        this.setState({ [e.target.name]: e.target.value });
        this.setstatevaluedropdownfunction(e.target.name, e.target.value);

        this.setState({ StartDate: "" });
        this.setState({ EndDate: "" });

        // this.state.ListDataTemp.filter(item => item.factCode == this.state.FactCode && item.lineGroup == this.state.LineGroup && item.noOfOperators == this.state.NoOfOperators && item.productType == this.state.ProductType && item.plaidType == this.state.PlaidType && item.difficultyLevel == this.state.DifficultyLevel && item.workingHrs == e.target.value).map((item) => {
        //     this.setState({ StartDate: item.startdate });
        //     this.setState({ EndDate: item.enddate });
        // });
    }

    ScaleUpDayChangeHandle = (e) => {
        if (true) {
            this.setState({ [e.target.name]: e.target.value });
            this.setstatevaluedropdownfunction(e.target.name, e.target.value);

            this.setState({ ScaleUpEffPer: 0 });
            this.setState({ PeakEff: "N" });

            this.state.ListDataTemp.filter(item => item.factCode == this.state.FactCode && item.lineGroup == this.state.LineGroup && item.noOfOperators == this.state.NoOfOperators && item.productType == this.state.ProductType && item.plaidType == this.state.PlaidType && item.difficultyLevel == this.state.DifficultyLevel && item.workingHrs == this.state.WorkingHrs && item.scaleUpDay == e.target.value).map((item) => {
                //alert('s')
                this.setState({ ScaleUpEffPer: item.scaleUpEffPer });
                this.setState({ PeakEff: item.peakEff });
            });
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["LocCode"]) {
            formIsValid = false;
            errors["LocCode"] = "Cannot be empty";
        }
        if (!fields["FactCode"]) {
            formIsValid = false;
            errors["FactCode"] = "Cannot be empty";
        }
        if (!fields["NoOfOperators"]) {
            formIsValid = false;
            errors["NoOfOperators"] = "Cannot be empty";
        }

        if (!fields["ProductType"]) {
            formIsValid = false;
            errors["ProductType"] = "Cannot be empty";
        }

        if (!fields["ProductType"]) {
            formIsValid = false;
            errors["ProductType"] = "Cannot be empty";
        }

        // if (!fields["PlaidType"]) {
        //     formIsValid = false;
        //     errors["PlaidType"] = "Cannot be empty";
        // }

        if (!fields["DifficultyLevel"]) {
            formIsValid = false;
            errors["DifficultyLevel"] = "Cannot be empty";
        }

        if (!fields["WorkingHrs"]) {
            formIsValid = false;
            errors["WorkingHrs"] = "Cannot be empty";
        }

        if (!fields["StartDate"]) {
            formIsValid = false;
            errors["StartDate"] = "Cannot be empty";
        }
        if (!fields["EndDate"]) {
            formIsValid = false;
            errors["EndDate"] = "Cannot be empty";
        }
        if (!fields["ScaleUpDay"]) {
            formIsValid = false;
            errors["ScaleUpDay"] = "Cannot be empty";
        }
        if (!fields["ScaleUpEffPer"]) {
            formIsValid = false;
            errors["ScaleUpEffPer"] = "Cannot be empty";
        }

        if (!formIsValid) {
            console.log(this.state);
        }
        this.setState({ errors: errors });
        if (this.state.IsEditRow) {
            formIsValid = true;
            this.setState({ errors: {} });
        }
        return formIsValid;
    }

    AddChangeHandle = (e) => {

        if (this.handleValidation()) {
            var addItem = {
                difficultyLevel: this.state.DifficultyLevel,
                enddate: this.state.EndDate,
                factCode: this.state.FactCode,
                lineGroup: this.state.LineGroup,
                locCode: this.state.LocCode,
                noOfOperators: this.state.NoOfOperators,
                peakEff: this.state.PeakEff,
                plaidType: this.state.PlaidType,
                productType: this.state.ProductType,
                // scaleUpDay: Number(this.state.ScaleUpDay),
                scaleUpEffPer: Number(this.state.ScaleUpEffPer),
                startdate: this.state.StartDate,
                workingHrs: Number(this.state.WorkingHrs),
            }



            if (this.state.ListDataTemp.filter(item => item.factCode == this.state.FactCode && item.lineGroup == this.state.LineGroup && item.noOfOperators == this.state.NoOfOperators && item.productType == this.state.ProductType && item.plaidType == this.state.PlaidType && item.difficultyLevel == this.state.DifficultyLevel && item.workingHrs == this.state.WorkingHrs && item.scaleUpDay == this.state.ScaleUpDay).length > 0) {
                let toUpdateData = this.state.ListData.map((item) => {
                    if (item.factCode == this.state.FactCode && item.lineGroup == this.state.LineGroup && item.noOfOperators == this.state.NoOfOperators && item.productType == this.state.ProductType && item.plaidType == this.state.PlaidType && item.difficultyLevel == this.state.DifficultyLevel && item.workingHrs == this.state.WorkingHrs && item.scaleUpDay == this.state.ScaleUpDay) {
                        item.startdate = this.state.StartDate;
                        item.enddate = this.state.EndDate;
                        item.scaleUpEffPer = this.state.ScaleUpEffPer;
                        item.peakEff = this.state.PeakEff;
                    }
                    return item;
                })

                let toUpdateData1 = this.state.ListDataTemp.map((item) => {
                    if (item.factCode == this.state.FactCode && item.lineGroup == this.state.LineGroup && item.noOfOperators == this.state.NoOfOperators && item.productType == this.state.ProductType && item.plaidType == this.state.PlaidType && item.difficultyLevel == this.state.DifficultyLevel && item.workingHrs == this.state.WorkingHrs && item.scaleUpDay == this.state.ScaleUpDay) {

                        item.startdate = this.state.StartDate;
                        item.enddate = this.state.EndDate;
                        item.scaleUpEffPer = this.state.ScaleUpEffPer;
                        item.peakEff = this.state.PeakEff;
                    }
                    return item;
                })

                this.setState({ ListData: toUpdateData });
                this.setState({ ListDataTemp: toUpdateData1 });

            } else {

                const varListData = this.state.ListData;
                varListData.push(addItem);
                this.setState({ ListData: varListData });

                const varListData1 = this.state.ListDataTemp;
                varListData1.push(addItem);
                this.setState({ ListDataTemp: varListData1 });

            }

            this.ShowColumn(this.state.ListDataTemp)
            this.ChangeDifficultyLevelFunc(this.state.DifficultyLevel);
        }
    }

    Edit_Data_TO_Head = (e) => {
        var jsonData = JSON.parse(e.target.getAttribute("data-param"))
        const ListTemp = this.state.ListDataTemp;
        ListTemp.filter(item => item.factCode == jsonData.factCode && item.lineGroup == jsonData.lineGroup && item.noOfOperators == jsonData.noOfOperators && item.productType == jsonData.productType && item.plaidType == jsonData.plaidType && item.difficultyLevel == jsonData.difficultyLevel && item.workingHrs == jsonData.workingHrs && item.scaleUpDay == 1).map((data, ind) => (
            this.setState({
                LocCode: data.locCode,
                FactCode: data.factCode,
                LineGroup: data.lineGroup,
                ProductType: data.productType,
                NoOfOperators: data.noOfOperators,
                PlaidType: data.plaidType,
                DifficultyLevel: data.difficultyLevel,
                WorkingHrs: data.workingHrs,
                ScaleUpDay: data.scaleUpDay,
                ScaleUpEffPer: data.scaleUpEffPer,
                PeakEff: data.peakEff,
                StartDate: data.startdate,
                EndDate: data.enddate,
                IsEditRow: true,
            })
        ));
    }

    POST_Data_To_Save = (e) => {

        const POST_Data = [];
        this.state.ListDataTemp.map((data, ind) => {
            var addItem = {
                difficultyLevel: data.difficultyLevel,
                'enddate': data.enddate,
                factCode: data.factCode,
                lineGroup: data.lineGroup,
                locCode: data.locCode,
                noOfOperators: data.noOfOperators,
                peakEff: data.peakEff,
                plaidType: data.plaidType,
                productType: data.productType,
                scaleUpDay: Number(data.scaleUpDay),
                scaleUpEffPer: Number(data.scaleUpEffPer),
                'startdate': data.startdate,
                workingHrs: Number(data.workingHrs),
                createdBy: "ADMIN",
                modifyBy: "ADMIN",
                'modifyDt': Date.UTC,
                hostName: "ADMIN"
            }
            POST_Data.push(addItem);
        });

        PostApiCallITR("Productivity/SaveProductivityMaster", POST_Data).then((response) => {
            NotificationManager.success('Added Sucessfully');
            this.setState({
                ScaleUpEffPer: 0,
                PeakEff: "N",
                //IsEditRow: false,
                // fields: {},
                // errors: {},
            });
        });
        console.log(POST_Data);
    }

    render() {

        return (
            <div>
                {/* <RctCollapsibleCard heading=""> */}
                {/* <PageTitleBar title="Productivity Master" match={this.props.match} /> */}
                <div className="row new-form mt-10" id="ProductivityForm">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div className="form-group">
                            <label> Location </label>
                            <select className="form-control" name="LocCode" id='LocCode' onChange={this.LocationChangeHandle} value={this.state.LocCode} >
                                <option value="">- Location -</option>
                                {
                                    this.state.LocationList.map((val) => (
                                        <option value={val.locCode} name={val.locName}>{val.locName}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["LocCode"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div className="form-group">
                            <label> Factory </label>
                            <select className="form-control" name="FactCode" id='FactCode' value={this.state.FactCode} onChange={e => { this.ChangeEvent(e); this.FactoryChangeHandle(e) }} >
                                {/* onChange={this.ChangeEvent} */}
                                <option value="">- Factory -</option>
                                {
                                    // Object.keys(this.groupByKey(this.state.FactoryList, 'uCode')).map((val) => (
                                    //     <option value={val.uCode} name={val.uCode}>{val.uCode}</option>
                                    // ))

                                    this.state.FactoryList.map((val) => (
                                        <option value={val.uCode} name={val.uCode}>{val.uCode}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["FactCode"]}</span>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Start Date </label>
                            <Input type="date" name="StartDate" className="form-control" id="StartDate" placeholder="Start Date" value={this.state.StartDate} onChange={this.ChangeEvent} />
                            <span className="error">{this.state.errors["StartDate"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> End Date </label>
                            <Input type="date" name="EndDate" className="form-control" id="EndDate" placeholder="End Date" value={this.state.EndDate}
                                onChange={e => { this.ChangeEvent(e); this.ToDateChangeHandle(e) }}
                            />
                            <span className="error">{this.state.errors["EndDate"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div className="form-group">
                            <label> NoOfOperators </label>
                            <select className="form-control" name="NoOfOperators" id='NoOfOperators' value={this.state.NoOfOperators}
                                onChange={this.ChangeEvent}
                            // onChange={this.NoOfOperatorsChangeHandle(e)}

                            >
                                <option value="">- NoOfOperators -</option>
                                {/* <option value="65">65</option>
                                <option value="35">35</option> */}
                                {
                                    this.state.OperatorList.map((val) => (
                                        <option value={val.operators} name={val.operators}>{val.operators}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["NoOfOperators"]}</span>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Working Hrs </label>
                            {/* <Input type="text" name="WorkingHrs" className="form-control" id="WorkingHrs" placeholder="Working Hrs" value={this.state.WorkingHrs} onChange={this.WorkingHrsChangeHandle} /> */}
                            <select className="form-control" name="WorkingHrs" id='WorkingHrs' value={this.state.WorkingHrs} onChange={this.WorkingHrsChangeHandle} >
                                <option value="">- Working Hrs -</option>
                                {
                                    this.state.OperatorList.map((val) => (
                                        <option value={val.workingHrs} name={val.workingHrs}>{val.workingHrs}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["WorkingHrs"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Product Type </label>
                            <select className="form-control" name="ProductType" id='ProductType' value={this.state.ProductType} onChange={this.ChangeEvent} >
                                <option value="">- ProductType -</option>
                                {
                                    this.state.ProductTypeList.map((val) => (
                                        <option value={val.productType} name={val.productType}>{val.productType}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["ProductType"]}</span>
                        </div>
                    </div>
                    {/* <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <div className="form-group">
                                <label> Sub Product Type </label>
                                <select className="form-control" name="ProductType" id='ProductType' value={this.state.ProductType} onChange={this.ChangeEvent} >
                                    <option value="">- Sub Product Type -</option>
                                    {
                                        this.state.ProductTypeList.map((val) => (
                                            <option value={val.productType} name={val.productType}>{val.productType}</option>
                                        ))
                                    }
                                </select>
                                <span className="error">{this.state.errors["ProductType"]}</span>
                            </div>
                        </div> */}
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Fabric Type </label>
                            <select className="form-control" name="PlaidType" id='PlaidType' value={this.state.PlaidType} onChange={this.ChangeEvent} >
                                <option value="">- Fabric Type -</option>
                                {
                                    this.state.FabTypeList.map((val) => (
                                        <option value={val.code} name={val.code}>{val.codeDesc}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["PlaidType"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Difficulty Level </label>
                            <select className="form-control" name="DifficultyLevel" id='DifficultyLevel' value={this.state.DifficultyLevel}
                                onChange={this.ChangeEvent}
                            //  onChange={this.ChangeDifficultyLevel} 
                            >
                                <option value="">- Difficulty Level -</option>
                                {/* <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option> */}
                                {
                                    this.state.DifficultyLevel1.map((val) => (
                                        <option value={val.code} name={val.code}>{val.codeDesc}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["DifficultyLevel"]}</span>
                        </div>
                    </div>


                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Scaleup Day </label>
                            <select className="form-control" name="ScaleUpDay" id='ScaleUpDay' value={this.state.ScaleUpDay} onChange={this.ScaleUpDayChangeHandle} >
                                <option value="">- ScaleUpDay -</option>
                                {
                                    this.state.ScaleUpDayList.map((data, ind) => (
                                        <option value={data}>{data}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors["ScaleUpDay"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Scaleup Qty </label>
                            <Input type="text" name="ScaleUpEffPer" className="form-control" id="ScaleUpEffPer" placeholder="ScaleUp Eff" value={this.state.ScaleUpEffPer} onChange={this.ChangeEvent} />
                            <span className="error">{this.state.errors["ScaleUpEffPer"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <label> Peak Eff </label>
                            <select className="form-control" name="PeakEff" id='PeakEff' value={this.state.PeakEff} onChange={this.ChangeEvent} >
                                <option value="">- Peak Eff -</option>
                                <option value="Y">YES</option>
                                <option value="N" selected={true}>NO</option>
                            </select>
                            <span className="error">{this.state.errors["PeakEff"]}</span>
                        </div>
                    </div>
                    <div className="col-lg-12 pr-0 mt-15">
                        <div className="form-group mt-15 text-right">
                            <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn-danger mr-10 text-white btn-icon b-sm" tabindex="0" type="button" >
                                <span className="MuiButton-label">
                                    Cancel
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                            </button>

                            <button onClick={this.AddChangeHandle} className="MuiButtonBase-root MuiButton-root MuiButton-contained btn-success mr-10 text-white btn-icon b-sm" tabindex="0" type="button" >
                                <span className="MuiButton-label">
                                    Add
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                            </button>
                            <button onClick={this.POST_Data_To_Save} className="MuiButtonBase-root MuiButton-root MuiButton-contained btn-primary mr-10 text-white btn-icon b-sm" tabindex="0" type="button" >
                                <span className="MuiButton-label">
                                    Save
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                            </button>

                        </div>
                    </div>
                </div>
                <div className="clearboth">
                    <ProductivityMasterList PML={this.state.ListDataTemp.filter(f => f.locCode == this.state.LocCode && f.factCode == this.state.FactCode && f.productType == this.state.ProductType && f.noOfOperators == this.state.NoOfOperators && f.difficultyLevel == this.state.DifficultyLevel)} PML1={this.state.ListDataTemp1} daylist={this.state.ScaleUpDayList} EditRow={this.Edit_Data_TO_Head}></ProductivityMasterList>
                </div>
                {/* </RctCollapsibleCard> */}
            </div>
        )
    }
}

export default ProductivityMaster;