import React from 'react';
import {  Tooltip, Button } from 'antd';
import { SyncOutlined, UserOutlined,  } from '@ant-design/icons';
import { AI, PLAYER } from "../../common/constant";
import './index.css';

export function ButtonSet(props) {
    const {
        firstPlayer = PLAYER,
        handleReplay = () => {},
        handleChangeFirstPlayer = () => {}
    } = props;

    return (
        <div className='button-set-wrapper'>
            <Button size='large' shape="circle" onClick={handleReplay}>
                <Tooltip title='replay'>
                    <SyncOutlined />
                </Tooltip>
            </Button>

            <Button
                size='large'
                shape="circle"
                onClick={handleChangeFirstPlayer}
                type={firstPlayer === AI ? 'default' : 'primary'}
            >
                <Tooltip title={`let ${firstPlayer === AI ? 'me' : 'AI'} play first`}>
                    <UserOutlined />
                </Tooltip>
            </Button>
        </div>
    );

}

