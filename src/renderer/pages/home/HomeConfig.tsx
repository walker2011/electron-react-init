import { SmileOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import ItemDB from './item/ItemDB';

export type HomeMenuData = {
    path: string,
    name: string,
    icon: ReactNode,
    render: ReactNode,
}

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/item',
                name: '道具',
                icon: <SmileOutlined />,
                render: <ItemDB />,
            },
            {
                path: '/item2',
                name: '道具',
                icon: <SmileOutlined />,
                render: <ItemDB />,
            },
        ],
    },
    location: {
        pathname: '/item',
    },
};
