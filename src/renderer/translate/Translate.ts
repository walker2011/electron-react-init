const strings: any = {
    cn: {},
    en: {},
};

// eslint-disable-next-line import/prefer-default-export
export function tr(key: string, language: string) {
    const group: any = strings[language];
    if (group) {
        return group[key] || key;
    }
    return key;
}
