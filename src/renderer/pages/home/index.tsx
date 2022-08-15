import { ConfigProvider, Layout, Select } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import { Locale } from 'antd/lib/locale-provider';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import UploadComponent from './upload/UploadComponent';
import cv, { Mat } from '@epascal/opencv-ts';


const { Option } = Select;
moment.locale('zhCN');

const str2Local: { [key: string]: Locale } = {
    zhCN,
    enUS
};

const str2MomentLocal: { [key: string]: string } = {
    zhCN: 'zh-cn',
    enUS: 'en'
};

const str2Key: { [key: string]: string } = {
    zhCN: '中文',
    enUS: 'English'
};

export default function Home() {
    const [localeStr, setLocalStr] = useState<string>('zhCN');

    const onSelectLocal = (value: string) => {
        setLocalStr(value);
        moment.locale(str2MomentLocal[value]);
    };

    return (
        <ConfigProvider locale={str2Local[localeStr]}>
            <Layout style={{
                minHeight: '100vh',
                minWidth: '100vh'
            }}>
                <Header>
                    <Select
                        defaultValue={str2Key[localeStr]}
                        style={{
                            width: 120
                        }}
                        onChange={onSelectLocal}
                    >
                        <Option value='zhCN'>{str2Key.zhCN}</Option>
                        <Option value='enUS'>{str2Key.enUS}</Option>
                    </Select>
                </Header>
                <Content>
                    <UploadComponent />
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
