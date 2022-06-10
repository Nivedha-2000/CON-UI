import React,{useEffect} from 'react';
import './Defects.css';
import { Table } from 'antd';
// import {ItrApiService} from '@afiplfeed/itr-ui';
import axios from 'axios';
import {baseUrl} from '../../../Env/baseUrl';

export default function Defects() {

    useEffect(() => {
       
    },[])

    const columns = [
        { title: 'Defect Level', dataIndex: 'defectLevel', key: 'defectLevel' },
        { title: 'Defect Category', dataIndex: 'defectCategory', key: 'defectCategory' },
        Table.SELECTION_COLUMN,
        { title: 'Defect Code', dataIndex: 'defectCode', key: 'defectCode' },
        { title: 'Defect Name', dataIndex: 'defectName', key: 'defectName' },
        Table.EXPAND_COLUMN,
    ];

    const data = [
        {
            key: 1,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-02',
            defectName: 'Color Is Not Matching Approved Swatch'
        },
        {
            key: 2,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-03',
            defectName: 'Color Migration/Bleeding'
        },
        {
            key: 3,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-04',
            defectName: 'Color Shading / Discoloration'
        },
        {
            key: 4,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-05',
            defectName: 'Hand Feel Deviation'
        },
        {
            key: 5,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-07',
            defectName: 'Knot - Face Side'
        },
        {
            key: 6,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-98',
            defectName: 'Knot - Inside'
        },
        {
            key: 7,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-09',
            defectName: 'Offensive Odor'
        },
        {
            key: 8,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-10',
            defectName: 'Dyeing Defect'
        },
        {
            key: 9,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-96',
            defectName: 'Printing Defect'
        },
        {
            key: 10,
            defectLevel: 'Major',
            defectCategory: 'MATERIAL',
            defectCode: 'MA-11',
            defectName: 'White/Light Material Yellowing'
        },
    ];

    return (
        <div className='defects-main'>
            <div className='mt-3'>
                <h6> Defects List </h6>
                <Table className='mt-3 defects-list-table' 
                    columns={columns}
                    // rowSelection={{}}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0, color: 'black' }}>{record.defectName}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable'
                    }}
                    dataSource={data}
                />
            </div>
        </div>
    )
}
