import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import { Locale } from 'antd/es/locale-provider';

const strings: any = {
    'zh-cn': {},
    'en': {}
};

// eslint-disable-next-line import/prefer-default-export
export function tr(key: string, language: string) {
    const group: any = strings[language];
    if (group) {
        return group[key] || key;
    }
    return key;
}

export const ZH_CN = 'zh-cn';
export const EN = 'en';

export const LocaleSummary: { [key: string]: { locale: Locale, label: string } } = {
    'zh-cn': {
        'locale': zhCN,
        'label': '中文'
    },
    'en': {
        'locale': enUS,
        'label': 'English'
    }
};

