import React, { useState, useEffect } from 'react';
import '../DefectMasters/DefectMasters.css';
import { Drawer, Switch, Pagination, Spin, message, Tag, Radio } from 'antd';
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { ItrApiService } from '@afiplfeed/itr-ui';
import PropTypes from 'prop-types';

export default function AqlMaster() {

    useEffect(() => { }, []);

    return (
        <div class="container-fluid" >
            <div class="breadcrumb-header justify-content-between bread-list">
                <div class="w-100">
                    <div class="d-flex border-bottom pb-15">
                        <div class="me-auto ">
                            <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                <h4 class="content-title float-start pr-20 border-0">
                                    <span class="pr-10">
                                        <img src={breadcrumbIcon} alt="" />
                                    </span>
                                    &nbsp; AQL Master
                                </h4>
                            </a>
                        </div>
                        <div class="pt-15"></div>
                    </div>
                    <div class="col-lg"></div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="row mt-15 dis-sel mt-20">
                <div class="col-lg">
                    <label>AQL Type</label>
                    <small className='text-danger'></small>
                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required value={""}>
                            <option value="">Select AQL Type </option>
                        </select>
                    </div>
                </div>
                <div class="col-lg">
                    <label>Audit Format</label>
                    <small className='text-danger'></small>
                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required value={""}>
                            <option value="">Select Audit Format</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg">
                    <label>Unit Code</label>
                    <small className='text-danger'></small>
                    <input type="text" class="form-control" placeholder='Enter Unit Code' value="" />
                </div>
                <div class="col-lg">
                    <label>Buyer Code</label>
                    <small className='text-danger'></small>
                    <input type="text" class="form-control" placeholder='Enter Buyer Code' value="" />
                </div>

                <div class="col-lg pt-20 ">
                    <button class="btn btn-secondary search-btn btn-block  ">Show Result</button>
                </div>
            </div>
            <div class="row mt-25 main-tab pl-15 pr-15">
                <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                            type="button" role="tab" aria-controls="home" aria-selected="true">Visual Sampling Plan </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1" type="button" role="tab" aria-controls="profile" aria-selected="false">Pack audit Sampling plan</button>
                    </li>
                </ul>
                <div class="tab-content p-15" id="myTabContent">
                    <div class="tab-pane fade show active mb-70" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row mt-15">
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack-Qty From</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Pack-Qty From' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack-Qty To</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Pack-Qty To' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Sample Size</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Sample Size' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Critical Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Critical Defect' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Sewing Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Sewing Defect' value="" />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-15">
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Other Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Other Defect' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Visual Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Visual Defect' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Mesurement Pcs</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Mesurement Pcs' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Mesurement Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Mesurement Defect' value="" />
                                </div>
                            </div>
                            <div className='col-lg'></div>
                        </div>
                        <div className='row d-flex my-xl-auto right-content'>
                            <div class="col-5 mg-t-10 mg-md-t-0 p-0 mr-10">
                                <div class="float-start">
                                    <button class="btn btn-primary search-btn btn-block  ">Reset</button>
                                </div>
                                <div class="float-start pl-5">
                                    <button class="btn btn-primary search-btn btn-block">Add to List</button>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div id="table-scroll" class="table-scroll l-tb-1 m-fixx pt-15">
                            <div class="table-wrap">
                                <table id="example" class="table table-striped edit-np f-l1">
                                    <thead>
                                        <tr>
                                            <th class="">Pack-Qty From</th>
                                            <th class="">Pack-Qty To</th>
                                            <th class="">Sample Size</th>
                                            <th>Critical Defect (Max Allowed)</th>
                                            <th>Sewing Defect (Max Allowed)</th>
                                            <th>Other Defect (Max Allowed)</th>
                                            <th>Visual Defect (Max Allowed)</th>
                                            <th>Mesurement Pcs</th>
                                            <th>Mesurement Defect (Max Allowed)</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>150</td>
                                            <td>13</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>
                                                <ul class="nav nav-item  navbar-nav-right ms-auto pl-0 border-0">
                                                    <li class="dropdown main-profile-menu nav nav-item nav-link p-0 border-0">
                                                        <a class="profile-user ind-flex"></a>
                                                        <div class="dropdown-menu">
                                                            <div class="main-header-profile">
                                                                <a class="dropdown-item">Edit</a>
                                                                <a class="dropdown-item">Clone</a>
                                                                <a class="dropdown-item">Remove</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>151</td>
                                            <td>300</td>
                                            <td>20</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>13</td>
                                            <td>0</td>
                                            <td>
                                                <ul class="nav nav-item  navbar-nav-right ms-auto pl-0 border-0">
                                                    <li class="dropdown main-profile-menu nav nav-item nav-link p-0 border-0">
                                                        <a class="profile-user ind-flex"></a>
                                                        <div class="dropdown-menu">
                                                            <div class="main-header-profile">
                                                                <a class="dropdown-item">Edit</a>
                                                                <a class="dropdown-item">Clone</a>
                                                                <a class="dropdown-item">Remove</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>301</td>
                                            <td>450</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>20</td>
                                            <td>0</td>
                                            <td>
                                                <ul class="nav nav-item  navbar-nav-right ms-auto pl-0 border-0">
                                                    <li class="dropdown main-profile-menu nav nav-item nav-link p-0 border-0">
                                                        <a class="profile-user ind-flex"></a>
                                                        <div class="dropdown-menu">
                                                            <div class="main-header-profile">
                                                                <a class="dropdown-item">Edit</a>
                                                                <a class="dropdown-item">Clone</a>
                                                                <a class="dropdown-item">Remove</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade mb-50" id="profile1" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row mt-15">
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Carton From</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Carton From' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Carton To</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Carton To' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack Sample</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Pack Sample' value="" />
                                </div>
                            </div>
                            <div className='col-lg'>
                                <div className='form-group'>
                                    <label>Pack Defect</label>
                                    <small className='text-danger'></small>
                                    <input type="text" class="form-control" placeholder='Enter Pack Defect' value="" />
                                </div>
                            </div>
                            <div className='col-lg'></div>
                        </div>
                        <div className='row d-flex my-xl-auto right-content'>
                            <div class="col-5 mg-t-10 mg-md-t-0 p-0 mr-10">
                                <div class="float-start">
                                    <button class="btn btn-primary search-btn btn-block  ">Reset</button>
                                </div>
                                <div class="float-start pl-5">
                                    <button class="btn btn-primary search-btn btn-block">Add to List</button>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div id="table-scroll" class="table-scroll l-tb-1 m-fixx pt-15">
                            <div class="table-wrap">
                                <table id="example" class="table table-striped edit-np f-l1">
                                    <thead>
                                        <tr>
                                            <th class="">Carton From</th>
                                            <th class="">Carton To</th>
                                            <th class="">Pack Sample</th>
                                            <th>Pack Defect (Max Allowed)</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>150</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>
                                                <ul class="nav nav-item  navbar-nav-right ms-auto pl-0 border-0">
                                                    <li class="dropdown main-profile-menu nav nav-item nav-link p-0 border-0">
                                                        <a class="profile-user ind-flex"></a>
                                                        <div class="dropdown-menu">
                                                            <div class="main-header-profile">
                                                                <a class="dropdown-item">Edit</a>
                                                                <a class="dropdown-item">Clone</a>
                                                                <a class="dropdown-item">Remove</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>151</td>
                                            <td>300</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>
                                                <ul class="nav nav-item  navbar-nav-right ms-auto pl-0 border-0">
                                                    <li class="dropdown main-profile-menu nav nav-item nav-link p-0 border-0">
                                                        <a class="profile-user ind-flex"></a>
                                                        <div class="dropdown-menu">
                                                            <div class="main-header-profile">
                                                                <a class="dropdown-item">Edit</a>
                                                                <a class="dropdown-item">Clone</a>
                                                                <a class="dropdown-item">Remove</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>301</td>
                                            <td>450</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>
                                                <ul class="nav nav-item  navbar-nav-right ms-auto pl-0 border-0">
                                                    <li class="dropdown main-profile-menu nav nav-item nav-link p-0 border-0">
                                                        <a class="profile-user ind-flex"></a>
                                                        <div class="dropdown-menu">
                                                            <div class="main-header-profile">
                                                                <a class="dropdown-item">Edit</a>
                                                                <a class="dropdown-item">Clone</a>
                                                                <a class="dropdown-item">Remove</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}