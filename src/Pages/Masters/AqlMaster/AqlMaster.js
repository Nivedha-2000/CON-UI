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
                <div class="col-lg-2">
                    <label>AQL Type</label>
                    <small className='text-danger'></small>
                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required value={""}>
                            <option value="">Select AQL Type </option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <label>Audit Format</label>
                    <small className='text-danger'></small>
                    <div class="main-select">
                        <select name="somename" class="form-control SlectBox main-select" required value={""}>
                            <option value="">Select Audit Format</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2">
                    <label>Unit Code</label>
                    <small className='text-danger'></small>
                    <input type="text" class="form-control" placeholder='Enter Unit Code' value="" />
                </div>
                <div class="col-lg-2">
                    <label>Buyer Code</label>
                    <small className='text-danger'></small>
                    <input type="text" class="form-control" placeholder='Enter Buyer Code' value="" />
                </div>
                <div class="col-lg-2 d-flex align-content-center pt-20 justify-content-center sticky-bottom">
                    <div class=" ">
                        <button class="btn btn-primary search-btn btn-block  ">Cancel</button>

                    </div>
                </div>
            </div>
        </div>
    )
}