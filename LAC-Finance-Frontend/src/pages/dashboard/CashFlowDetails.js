import React, { Component } from 'react';
import '../../components/common/Common.css';
import {
    Button, TextField, Grid, withStyles, Select, MenuItem, useMediaQuery, FormControl,
    InputLabel
} from '@material-ui/core';
import '../../components/common/CommonModal.css';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ActionRenderer from '../../components/common/ActionRenderer';
import ConfirmModal from '../../components/modal/ConfirmModal';
import ErrorModal from '../../components/modal/ErrorModal';
import api from '../../components/common/APIValues';
import { useStyles } from '../../components/common/useStyles';
import AddCashFlow from './AddCashFlow';

const withMediaQuery = (...args) => Component => props => {
    const mediaQuery = useMediaQuery(...args);
    return <Component mediaQuery={mediaQuery} {...props} />;
};

const validateForm = (errors) => {
    let valid = true;
    Object.keys(errors).map(function (e) {
        if (errors[e].length > 0) {
            valid = false;
        }
    });
    return valid;
}

class CashFlowDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portCoId: 0,
            shareClassId: 0,
            fundId: 0,
            portCoDetails: [],
            fundTypes: [],
            shareClasses: [],
            errorMessage: null,
            loading: false,
            userId: null,
            open: false,
            recordId: 0,
            errors: {
                categoryName: '',
                isActive: '',
            },
            columnDefs: [
                { headerName: 'PortoCo Name', field: 'PortCoName', cellStyle: { 'text-align': "center" } },
                { headerName: 'Fund Type', field: 'FundType', cellStyle: { 'text-align': "center" } },
                { headerName: 'Share Class', field: 'ShareClass', cellStyle: { 'text-align': "center" } },
                { headerName: 'Start Date', field: 'StartDate', cellStyle: { 'text-align': "center" } },
                { headerName: 'Investment Cost', field: 'InvestmentCost', cellStyle: { 'text-align': "center" } },
                { headerName: 'Estimated Value', field: 'EstimatedValue', cellStyle: { 'text-align': "center" } },
                { headerName: 'Actions', field: 'Actions', sorting: false, filter: false, cellRenderer: 'actionRenderer', cellStyle: { 'text-align': "center" } },
            ],
            context: { componentParent: this },
            frameworkComponents: { actionRenderer: ActionRenderer },
            rowData: [
                {
                    PortCoName: 'PortCoName',
                    FundType: 'FundType',
                    ShareClass: 'ShareClass',
                    StartDate: '01/01/2023',
                    InvestmentCost: '$200',
                    EstimatedValue: '$180'
                },
                {
                    PortCoName: 'PortCoName',
                    FundType: 'FundType',
                    ShareClass: 'ShareClass',
                    StartDate: '01/01/2023',
                    InvestmentCost: '$200',
                    EstimatedValue: '$180'
                },
                {
                    PortCoName: 'PortCoName',
                    FundType: 'FundType',
                    ShareClass: 'ShareClass',
                    StartDate: '01/01/2023',
                    InvestmentCost: '$200',
                    EstimatedValue: '$180'
                },
                {
                    PortCoName: 'PortCoName',
                    FundType: 'FundType',
                    ShareClass: 'ShareClass',
                    StartDate: '01/01/2023',
                    InvestmentCost: '$200',
                    EstimatedValue: '$180'
                }
            ],
            defaultColDef: { flex: window.innerWidth <= 600 ? 0 : 1, sortable: true, resizable: true, filter: true },
            rowClassRules: {
                'grid-row-even': function (params) { return params.node.rowIndex % 2 === 0; },
                'grid-row-odd': function (params) { return params.node.rowIndex % 2 !== 0; }
            },
        };
    }

    addCashFlowDetails = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    createCategory = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors) && this.state.categoryName) {
            this.setState({ loading: true });
            let newCategory = {};
            newCategory.CategoryId = this.state.categoryId;
            newCategory.CategoryName = this.state.categoryName;
            newCategory.IsActive = this.state.isActive;
            newCategory.UserId = this.state.userId;
            this.createCategory(newCategory);
        } else {
            let errors = this.state.errors;
            if (!this.state.categoryName) {
                errors.categoryName = 'Please enter category name';
            }
            if (!this.state.isActive) {
                errors.isActive = 'Please select active option';
            }
            this.setState({ errors, errorMessage: null });
        }
    }

    loadCategories() {
        let partialUrl = api.URL;
        fetch(partialUrl + 'Category/GetCategories')
            .then(res => res.json())
            .then(result => this.setState({ rowData: result, loading: false }))
            .catch(err => console.log(err));
    }

    DeleteRecord() {
        this.setState({ loading: true })
        let CategoryId = this.state.categoryId;
        let partialUrl = api.URL;
        fetch(partialUrl + 'Category/DeleteCategory?CategoryId=' + CategoryId, {
            method: 'POST',
            mode: 'cors'
        }).then(data => {
            this.loadCategories();
            this.setState({ loading: false })
        });
    }

    componentDidMount() {
        let loggedInUser = sessionStorage.getItem('loggedInUser');

        if (loggedInUser) {
            //this.setState({ userId: loggedInUser, loading: true });
            //this.loadCategories();
        } else {
            const { history } = this.props;
            if (history) history.push('/Home');
        }
    }

    editRowData = row => {
        this.setState({open: true, recordId: 101})
    };

    showConfirmPopup = row => {
        this.setState({ categoryId: row.CategoryId })
        this.refs.cnfrmModalComp.openModal();
    }

    createCategory(newCategory) {
        let partialUrl = api.URL;
        fetch(partialUrl + 'Category/CreateCategory', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newCategory),
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    this.loadProductCategories();
                    this.setState({
                        loading: false, actionName: 'CREATE', categoryId: 0, categoryName: null
                    });
                } else {
                    this.setState({
                        loading: false, actionName: 'CREATE', categoryId: 0, categoryName: null
                    });
                    var errorMsg = 'Category already exists.';
                    this.refs.errModalComp.openModal(errorMsg);
                }
            })
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'categoryName':
                this.state.categoryName = value;
                errors.categoryName = value.length <= 0 ? 'Please enter category name' : '';
                break;
            case 'isActive':
                this.state.isActive = value;
                errors.isActive = value.length <= 0 ? 'Please select active option' : '';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }

    render() {
        const { classes, mediaQuery } = this.props;

        let portCoDetails = this.state.portCoDetails.map((portCo) =>
            <MenuItem value={portCo.PortCoId}>{portCo.PortCoName}</MenuItem>
        );
        let fundTypes = this.state.fundTypes.map((fundType) =>
            <MenuItem value={fundType.FundId}>{fundType.FundType}</MenuItem>
        );

        let shareClasses = this.state.shareClasses.map((shareClass) =>
            <MenuItem value={shareClass.ShareClassId}>{shareClass.ShareClass}</MenuItem>
        );

        return (
            <div>
                {this.state.loading ? (
                    <Loader />
                ) : (
                    <div>
                        {/* <ErrorModal ref="errModalComp" />
                        <ConfirmModal ref="cnfrmModalComp" onClick={(e) => this.DeleteRecord(e)} /> */}

                        <AddCashFlow 
                            open = {this.state.open}
                            recordId = {this.state.recordId}
                            handleClose = {this.handleClose}
                            onAddCashFlow = {this.onAddCashFlow}
                        />

                        <h2 className="header-text-color">Cash Flow Details</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <InputLabel style={{fontFamily: 'poppins'}} id="demo-simple-select-label">PortCo Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.portCoId}
                                        label="PortCoName"
                                        onChange={this.handleChange}
                                        name="PortCoName"
                                        style={{ backgroundColor: '#f9f9f9' }}
                                    >
                                        <MenuItem value='0'>All</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <InputLabel style={{fontFamily: 'poppins'}} id="demo-simple-select-label">Fund Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.fundId}
                                        label="FundType"
                                        onChange={this.handleChange}
                                        name="FundType"
                                        style={{ backgroundColor: '#f9f9f9' }}
                                    >
                                        <MenuItem value='0'>All</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <InputLabel style={{fontFamily: 'poppins'}} id="demo-simple-select-label">Share Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.shareClassId}
                                        label="ShareClass"
                                        onChange={this.handleChange}
                                        name="ShareClass"
                                        style={{ backgroundColor: '#f9f9f9' }}
                                    >
                                        <MenuItem value='0'>All</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <InputLabel style={{fontFamily: 'poppins'}} id="demo-simple-select-label">Year</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.year}
                                        label="Year"
                                        onChange={this.handleChange}
                                        name="Year"
                                        style={{ backgroundColor: '#f9f9f9' }}
                                    >
                                        <MenuItem value='Y'>Yes</MenuItem>
                                        <MenuItem value='N'>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <InputLabel style={{fontFamily: 'poppins'}} id="demo-simple-select-label">Quarter</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.quarter}
                                        label="Quarter"
                                        onChange={this.handleChange}
                                        name="Quarter"
                                        style={{ backgroundColor: '#f9f9f9' }}
                                    >
                                        <MenuItem value='Q1'>Q1</MenuItem>
                                        <MenuItem value='Q2'>Q2</MenuItem>
                                        <MenuItem value='Q3'>Q3</MenuItem>
                                        <MenuItem value='Q4'>Q4</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button fullWidth className={classes.customButtonSecondary} variant="contained"
                                    color="primary" onClick={this.searchCashFlowDetails} size="medium">
                                    Search
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button fullWidth className={classes.customButtonPrimary} variant="contained"
                                    color="primary" onClick={this.addCashFlowDetails} size="medium">
                                    Add Cash Flow
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <div className="ag-theme-alpine" style={{ width: "100%", height: 425, marginTop: 20 }}>
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs} rowData={this.state.rowData}
                                        onGridReady={this.onGridReady} defaultColDef={this.state.defaultColDef}
                                        frameworkComponents={this.state.frameworkComponents} context={this.state.context}
                                        pagination={true} gridOptions={this.gridOptions} paginationAutoPageSize={true}
                                        components={this.state.components} rowClassRules={this.state.rowClassRules} suppressClickEdit={true}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(withMediaQuery('(min-width:600px)')(CashFlowDetails)))