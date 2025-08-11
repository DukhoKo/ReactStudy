import React from 'react';
import { UnorderedListOutlined, AppstoreOutlined, CalendarOutlined, LineChartOutlined } from '@ant-design/icons';
import { Menu as AntdMenu} from 'antd';
import './Menus.css';

const items = [
    {
        key: 'list',
        label: 'List',
        icon: <UnorderedListOutlined />,
    },
    { type: 'divider'},
    {
        key: 'kanban',
        label: 'Kanban',
        icon: <AppstoreOutlined />,
    },
    { type: 'divider'},
    {
        key: 'calendar',
        label: 'Calendar',
        icon: <CalendarOutlined />
    },
    { type: 'divider'},
    {
        key: 'chart',
        label: 'Chart',
        icon: <LineChartOutlined />
    },
];

function Menus() {
    const onClick = e => {
        console.log('click ', e);
    };
    return (
        <AntdMenu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['list']} 
            mode="inline"
            items={items}
        />
    );
};
export default Menus;