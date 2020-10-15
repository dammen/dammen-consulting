import React, {FunctionComponent, useEffect, useState} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {Admin} from './components/Admin';
import {Projects} from './components/Projects';
import {Config} from './types/config';
import {ConfigContext} from './contexts/config';
import './custom.css'
import {BrowserRouter} from 'react-router-dom';

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

    const reloadConfig = () => {
        const fetchData = async (): Promise<void> => {

            try {
                fetch("/config").then((response) => response.json()).then((data) => {
                    console.log('This is your data', data)
                    setConfig(data)

                });

            } catch (err) {console.log(err)}
        }
        fetchData();
    }

    if (config) {
        return (

            <ConfigContext.Provider value={{...config, reload: reloadConfig}}>
                <BrowserRouter>
                    <Layout>
                        <Route exact path='/' component={Home} />
                        <Route path='/projects' component={Projects} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/account' component={Admin} />
                    </Layout>
                </BrowserRouter>

            </ConfigContext.Provider>

        );
    }
    return <div>Cant find config...</div>

}
