import React from 'react';
import { Table } from 'antd';

function ListView() {
    const data = [
        { key: '1', name: 'Task 1', status: 'Pending' },
        { key: '2', name: 'Task 2', status: 'Done' },
    ];

    const columns = [
        { key:'title', title: 'title', dataIndex: 'name' },
        { key:'status', title: 'Status', dataIndex: 'status' },
        { key:'due date', title: 'Due date', dataIndex: 'due date'}
    ];

    return <Table dataSource={data} columns={columns} scroll={{x: 'max-content'}} style={{width: '100%'}} size="middle"/>;
}

export default ListView;
