import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/navigation/Layout';
import CashFlowDetails from './pages/dashboard/CashFlowDetails';
import UserManagement from './pages/user/UserManagement';

export default class DashboardApp extends Component {
    static displayName = DashboardApp.name;

    render() {
        return (
            <Layout>
                <Route path='/home/cashflowdetails' component={CashFlowDetails} />
                <Route path='/home/usermanagement' component={UserManagement} />
            </Layout>
        );
    }
}
