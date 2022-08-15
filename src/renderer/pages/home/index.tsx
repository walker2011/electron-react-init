import { ConfigProvider, Layout, Select } from 'antd';
import { useContext } from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import UploadComponent from './upload/UploadComponent';
import { AppContext } from '../../AppContext';
import { EN, LocaleSummary, ZH_CN } from '../../translate/Translate';


const { Option } = Select;

export default function Home() {
    const { userData, setUserDataInternal } = useContext(AppContext);

    const onSelectLocal = (value: string) => {
        setUserDataInternal({
            ...userData,
            localeName: value
        });
    };

    return (
        <ConfigProvider locale={LocaleSummary[userData.localeName].locale}>
            <Layout style={{
                minHeight: '100vh',
                minWidth: '100vh'
            }}>
                <Header>
                    <Select
                        defaultValue={userData.localeName}
                        style={{
                            width: 120
                        }}
                        onChange={onSelectLocal}
                    >
                        <Option value={ZH_CN} key={ZH_CN}>{LocaleSummary[ZH_CN].locale}</Option>
                        <Option value={EN} key={EN}>{LocaleSummary[EN].locale}</Option>
                    </Select>
                </Header>
                <Content>
                    <UploadComponent />
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
