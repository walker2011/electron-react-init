import { MemoryRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AppContext, UserData } from './AppContext';
import NotFound from './pages/404/NotFound';
import PrimaryRoutes from './pages/layouts/PrimaryRouter';
import './styles/index.less';
import { useEffect, useState } from 'react';
import Store from 'store';
import { USER_DATA } from './models/LocalStorageKey';
import { ZH_CN } from './translate/Translate';
import moment from 'moment/moment';

const App = () => {
    const [userData, setUserData] = useState<UserData>({
        localeName: ZH_CN
    });

    const setUserDataInternal = (value: UserData) => {
        setUserData(value);
        Store.set(USER_DATA, JSON.stringify(value));
        moment.locale(value.localeName);
    };

    useEffect(() => {
        let dataStr = Store.get(USER_DATA, null);
        if (!!dataStr) {
            let data = JSON.parse(dataStr);
            setUserData(data);
        } else {
            setUserData({
                localeName: ZH_CN
            });
        }
    }, [setUserData]);

    return (
        <AppContext.Provider value={{ userData, setUserDataInternal }}>
            <Router>
                <Switch>
                    <Route path='/404' exact component={NotFound} />
                    <Route path='/' component={PrimaryRoutes} />
                    <Redirect to='/' />
                </Switch>
            </Router>
        </AppContext.Provider>
    );
};

export default App;
