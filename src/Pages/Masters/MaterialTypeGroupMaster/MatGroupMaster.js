import React, { useState, useEffect } from "react";
import { ItrApiService } from "@afiplfeed/itr-ui";
import { Spin, Tag, message, Drawer, Switch, Pagination } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
export default function MatGroupMaster() {
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const [loader, setLoader] = useState(false);
    const getDatas = (onCreate, onUpdate) => {
        setLoader(true);
        ItrApiService.GET({
            url: 'MatGroupMaster/GetAllMatGroupMaster',
            appCode: 'CNF'
        }).then(res => {
            if (res.Success == true) {
                console.log(res);
                setLoader(false);
                setDatas(res.data);
                setDatas2(res.data);
                if (onCreate && onCreate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: (Math.ceil(res.data.length / pageSize) - 1) * pageSize, maxIndex: Math.ceil(res.data.length / pageSize) * pageSize, current: Math.ceil(res.data.length / pageSize) });
                } else if (onUpdate && onUpdate == true) {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize });
                } else {
                    setPagination({ ...pagination, totalPage: res.data.length / pageSize, minIndex: 0, maxIndex: pageSize });
                }
            }
            else {
                setLoader(false);
            }
        })

    };
    const pageSize = 10;
    const [pagination, setPagination] = useState({
        total: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    })
    const handleChange = (page) => {
        setPagination({ ...pagination, current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize })
    }
    const [matgroupmaster, setMatGroupMaster] = useState({
        createdDate: new Date(),
        createdBy: "string",
        modifiedDate: new Date(),
        modifiedBy: "string",
        isActive: true,
        matType: "",
        matGroup: "",
        matSubGroup: "",
        active: "Y",
        hostName: ""
    })
    const clearFields = () => {
        setMatGroupMaster({
            ...matgroupmaster, matType: "", matGroup: "", matSubGroup: "", active: "Y",
        });
        setErrors({ ...errors, matType: "", matGroup: "", matSubGroup: "", });

    }
    const [errors, setErrors] = useState({
        matType: "",
        matGroup: "",
        matSubGroup: ""
    })
    const [matTypeList, setMatTypeList] = useState([]);
    const getMaterialType = () => {
        setLoader(true);
        ItrApiService.GET({
            url: 'MatTypeMaster/GetAllMattype',
            appCode: 'CNF'
        }).then(res => {
            if (res.Success == true) {
                console.log(res);
                setLoader(false);
                setMatTypeList(res.data);
            }
            else {
                setLoader(false);
            }
        })
    }
    useEffect(() => {
        getDatas();
        getMaterialType();
    }, []);
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    }
    const createMatGroupMaster = () => {
        let { matType, matGroup, matSubGroup } = matgroupmaster;
        if (matType == '' || matGroup == '' || matSubGroup == '') {
            setErrors({ ...errors, matType: 'Material Type is required', matGroup: 'Material Group is required', matSubGroup: 'Material subgroup is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: 'MatGroupMaster/SaveMatGroupMaster',
                appCode: 'CNF',
                data: matgroupmaster
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    message.success('Material Group Master Created Successfully');
                    onClose();
                    clearFields();
                    getDatas(true);
                }
                else {
                    setLoader(false);

                }
            })
        }

    };
    const updateMatGroupMaster = () => {
        let { matType, matGroup, matSubGroup } = matgroupmaster;
        if (matType == '' || matGroup == '' || matSubGroup == '') {
            setErrors({ ...errors, matType: 'Material Type is required', matGroup: 'Material Group is required', matSubGroup: 'Material subgroup is required' })
        }
        else {
            setLoader(true);
            ItrApiService.POST({
                url: `MatGroupMaster/SaveMatGroupMaster`,
                appCode: 'CNF',
                data: matgroupmaster
            }).then(res => {
                if (res.Success == true) {
                    setLoader(false);
                    message.success('Material Group Master Updated Successfully');
                    cancel();
                    clearFields();
                    getDatas(false, true);

                }
                else {
                    setLoader(false);

                }
            })
        }

    };
    const [closeDefect, setCLoseDefect] = useState(false);
    const editMaterialMaster = (matType, matGroup, matSubGroup) => {
        setCLoseDefect(true);
        ItrApiService.GET({
            url: `MatGroupMaster/GetMatGroupMasterByEntityID/` + matType + '/' + matGroup + '/' + matSubGroup,
            appCode: "CNF",
        }).then(res => {
            if (res.Success == true) {
                setMatGroupMaster(res.data);
            }
            else {
                setLoader(false);
            }
        })

    }
    const cancel = () => {
        setCLoseDefect(false);
    }
    const[dynamicpageno,setDynamicPageNo]=useState(1);
    const myFunction = (e) => {
        let val = datas2;
        let ss = val.filter(dd => {
            if (dd.matType.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.matGroup.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
            if (dd.matSubGroup.toLowerCase().search(e.target.value.toLowerCase()) != -1) {
                return dd;
            }
        });
        setDatas(ss);
        setDynamicPageNo(1);
        setPagination({...pagination, current: dynamicpageno, totalPage: ss.length / pageSize, minIndex: 0, maxIndex: pageSize });


    }
    return (
        <div className="defect-master-main">
            <div className="m-3">
                <h4>Material Group Master</h4>
                <div className='row align-items-center mt-2'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1'>
                        <input type="search" className='form-control' id="operationSearch" placeholder="Search" onChange={myFunction} />
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-1 text-end'>
                        <button className='btn-sm btn defect-master-add' onClick={showDrawer} > + Add New </button>
                    </div>
                </div>
                <div className='table-responsive mt-2 defect-master-table'>
                    <table className="table table-hover">
                        <thead id='table-header'>
                            <tr>
                                <th scope="col">Mat Type</th>
                                <th scope="col">Mat Group</th>
                                <th scope="col">Mat Sub Group</th>
                                <th scope="col">Active</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((mat, index) => index >= pagination.minIndex && index < pagination.maxIndex && (
                                <tr key={index}>
                                    <td>{mat.matType}</td>
                                    <td>{mat.matGroup}</td>
                                    <td>{mat.matSubGroup}</td>
                                    <td > <Tag style={{ borderRadius: '4px', backgroundColor: mat.active == 'Y' ? 'green' : 'red', color: 'white' }}
                                    >
                                        {mat.active == 'Y' ? 'YES' : 'NO'}
                                    </Tag>
                                    </td>
                                    <td>
                                        <div className="text-center" onClick={() => editMaterialMaster(mat?.matType, mat?.matGroup, mat?.matSubGroup)}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="#919191" /></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loader && <div className='text-center mt-3'>
                        <Spin style={{ color: '#F57234' }} tip="Loading..." />
                    </div>}
                </div>
                <div className="text-end">
                    <Pagination
                        total={datas.length}
                        current={pagination.current}
                        onChange={handleChange}
                        pageSize={pageSize}
                        showSizeChanger={false}
                        responsive={true}
                    />
                </div>
            </div>
            <Drawer
                footer={
                    <>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={createMatGroupMaster}> Save </button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => {
                                clearFields();
                                onClose();
                            }}> Cancel </button>
                        </div>
                    </>
                } title={< h6 className='m-0' > Add New Material Group Master</h6 >} placement="right" onClose={() => {
                    clearFields();
                    onClose();
                }} visible={visible} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{matgroupmaster.matType == '' ? errors.matType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' required
                            value={matgroupmaster.matType}
                            onChange={(e) => setMatGroupMaster({ ...matgroupmaster, matType: e.target.value })}
                        >
                            <option value="" selected> Select Material Type </option>
                            {matTypeList.filter(f => f.type.includes("F") && f.active.includes("Y") || f.type.includes("T") && f.active.includes("Y")).map((mat, index) => {
                                return <option key={index} value={mat.mattype}>{mat.mattype}</option>
                            })}
                        </select>
                    </div>
                    <div className="mt-3">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <label>Material Group</label>
                            <small className="text-danger">{matgroupmaster.matGroup == '' ? errors.matGroup : ''}</small>
                        </div>
                        <input className="form-control form-control-sm mt-1"
                            placeholder="Enter Material Group"
                            value={matgroupmaster.matGroup}
                            onChange={(e) => setMatGroupMaster({ ...matgroupmaster, matGroup: e.target.value })}

                        />
                    </div>
                    <div className="mt-3">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <label>Material Sub Group</label>
                            <small className="text-danger">{matgroupmaster.matSubGroup == '' ? errors.matSubGroup : ''}</small>
                        </div>
                        <input className="form-control form-control-sm mt-1"
                            placeholder="Enter Material Sub Group"
                            value={matgroupmaster.matSubGroup}
                            onChange={(e) => setMatGroupMaster({ ...matgroupmaster, matSubGroup: e.target.value })}

                        />
                    </div>
                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size="default"
                                checked={matgroupmaster.active == 'Y'}
                                onChange={(e) => setMatGroupMaster({ ...matgroupmaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {matgroupmaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>


                </div>
            </Drawer>
            {/* Edit */}
            <Drawer
                footer={
                    <div>
                        <div>
                            <button className='btn-sm btn defect-master-save mt-1 w-100' onClick={updateMatGroupMaster}>Update</button>
                        </div>
                        <div>
                            <button className='btn-sm btn defect-master-cancel mt-1 w-100' onClick={() => { clearFields(); cancel(); }}>Cancel</button>
                        </div>
                    </div>}
                title={<h4 className='m-0'> Edit Material Group Master</h4>} placement="right" onClose={() => { clearFields(); cancel(); }} visible={closeDefect} >
                <div className='defect-master-add-new'>
                    <div className='mt-3'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <label>Material Type <span className='text-danger'>*  </span> </label>
                            <small className='text-danger'>{matgroupmaster.matType == '' ? errors.matType : ''}</small>
                        </div>
                        <select className='form-select form-select-sm mt-1' disabled
                            value={matgroupmaster.matType}
                            onChange={(e) => setMatGroupMaster({ ...matgroupmaster, matType: e.target.value })}
                        >
                            <option value="" selected> Select Material Type </option>
                            {matTypeList.map((mat, index) => {
                                return <option key={index} value={mat.mattype}>{mat.mattype}</option>
                            })}
                        </select>
                    </div>
                    <div className="mt-3">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <label>Material Group</label>
                            <small className="text-danger">{matgroupmaster.matGroup == '' ? errors.matGroup : ''}</small>
                        </div>
                        <input className="form-control form-control-sm mt-1" disabled
                            placeholder="Enter Material Group"
                            value={matgroupmaster.matGroup}
                            onChange={(e) => setMatGroupMaster({ ...matgroupmaster, matGroup: e.target.value })}

                        />
                    </div>
                    <div className="mt-3">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <label>Material Sub Group</label>
                            <small className="text-danger">{matgroupmaster.matSubGroup == '' ? errors.matSubGroup : ''}</small>
                        </div>
                        <input className="form-control form-control-sm mt-1" disabled
                            placeholder="Enter Material Sub Group"
                            value={matgroupmaster.matSubGroup}
                            onChange={(e) => setMatGroupMaster({ ...matgroupmaster, matSubGroup: e.target.value })}

                        />
                    </div>
                    <div className='mt-3'>
                        <label>Active</label>
                        <div className='mt-1'>
                            <Switch size="default"
                                checked={matgroupmaster.active == 'Y'}
                                onChange={(e) => setMatGroupMaster({ ...matgroupmaster, active: e == true ? 'Y' : 'N' })} />
                            <span className='px-2'> {matgroupmaster.active === 'Y' ? 'Active' : 'Disable'} </span>
                        </div>
                    </div>


                </div>


            </Drawer>
        </div>
    )
}
