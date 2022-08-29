import AppContext from './AppContext';
import { ProLayout, ProSettings, SettingDrawer } from '@ant-design/pro-components';
import HomeConfig, { HomeMenuData } from './HomeConfig';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Content } from 'antd/es/layout/layout';

const Home = () => {
    const [pathname, setPathname] = useState('/item');
    const [collapsed, setCollapsed] = useState(false);
    const [clickedPathname, setClickedPathname] = useState(new Set<string>());
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });

    useEffect(() => {
        setClickedPathname(keys => new Set<string>([...Array.from(keys), pathname]));
    }, [pathname, setClickedPathname]);

    const getMenuRenders = useCallback((config: HomeMenuData[]) => {
        return config.reduce((prev: HomeMenuData[], data) => {
            prev.push(data);
            return prev;
        }, []);
    }, []);

    const menuRenders = useMemo(() => getMenuRenders(HomeConfig.route.routes), [getMenuRenders]);

    const onClickMenu = useCallback((item) => {
        setPathname(item.path || '/item');
    }, [setPathname]);

    return (
        <AppContext.Provider value={{ game: { rootPath: 'E:/masters/barren' } }}>
            <div
                id='pro-layout'
                style={{
                    height: '100vh'
                }}
            >
                <ProLayout
                    {...HomeConfig}
                    location={{ pathname: pathname }}
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    menuItemRender={(item, dom) => (
                        <a
                            onClick={() => onClickMenu(item)}
                        >
                            {dom}
                        </a>
                    )}
                    {...settings}
                >
                    <Content style={{
                        margin: '20px 20px 0',
                        background: 'white',
                        minHeight: '75vh',
                        position: 'relative'
                    }}>
                        {
                            menuRenders.map(data => clickedPathname.has(data.path) ?
                                (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        className={(window.location.hostname === 'localhost' ? 'display' : 'scale') + (data.path === pathname ? '-show' : '-hide')}
                                        key={data.path}
                                    >
                                        {data.render}
                                    </div>
                                ) : null)
                        }
                    </Content>
                </ProLayout>
                <SettingDrawer
                    pathname={pathname}
                    enableDarkTheme
                    getContainer={() => document.getElementById('pro-layout')}
                    settings={settings}
                    onSettingChange={(changeSetting) => {
                        setSetting(changeSetting);
                    }}
                    disableUrlParams={false}
                >
                </SettingDrawer>
            </div>
        </AppContext.Provider>
    );
};

export default Home;
