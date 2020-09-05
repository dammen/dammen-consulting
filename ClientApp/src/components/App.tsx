import React, {FunctionComponent, useEffect, useState, createContext} from 'react';
import {Route} from 'react-router';
import {Layout} from './Layout';
import {Home} from './Home';
import {Admin} from './Admin';
import {Projects} from './Projects';

import '../custom.css'

interface Config {
    name: string;
    isLoggedIn: boolean;
}
export const ConfigContext = createContext<Config | null>(null)

export const App: FunctionComponent = () => {

    const [config, setConfig] = useState<Config | null>(null);

    useEffect(() => {
        let didUnmount = false;

        const fetchData = async (): Promise<void> => {

            try {
                fetch("/config").then((response) => response.json()).then((data) => {
                    console.log('This is your data', data)
                    if (!didUnmount) {
                        setConfig(data)

                    }
                });

            } catch (err) {console.log(err)}
        }
        fetchData();

        return (): void => {
            didUnmount = true;
        };
    }, [])

    return (
        <ConfigContext.Provider value={config}>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/projects' component={Projects} />
                <Route path='/admin' component={Admin} />
                <Route path='/account' component={Admin} />

            </Layout>
        </ConfigContext.Provider>

    );

}
