import React, { useState, useEffect } from 'react';
import {
    DialogContent, IconButton, Grid, Dialog, TextField, DialogActions, Button,
    useMediaQuery, makeStyles, FormControl, InputLabel, Select, MenuItem, InputAdornment
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../components/common/APIValues';
//import axios from 'axios';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
    customButtonPrimary: {
        borderRadius: '8px',
        fontWeight: 500,
        color: "#f9f9f9",
        backgroundColor: "#702492",
        "&:hover": {
            backgroundColor: "#702492"
        },
        "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12)"
        },
        textTransform: 'none',
        fontFamily: 'poppins',
    },
}));

export default function AddCashFlow(props) {
    const [cashFlowDetails, setCashFlowDetails] = useState({
        portCoId: null,
        fundId: null,
        shareClassId: null,
        date: null,
        investmentCost: null,
        estimatedValue: null
    });
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyles();
    const action = props.recordId > 0 ? 'Update Cash Flow' : 'Add Cash Flow'

    // const createRole = () => {
    //     if(validateAllInputs()) {
    //         let rowData = {};
    //         rowData.GroupId = Number(props.groupId);
    //         rowData.RoleId = props.roleId;
    //         rowData.RoleName = props.roleName;
    //         rowData.RoleType = 'C';
    //         rowData.CreatedUserId = props.userId;
    //         rowData.Env = api.env;

    //         axios({
    //             method: 'post',
    //             url: api.partialURL + 'Role/CreateNewRole',
    //             data: JSON.stringify(rowData),
    //             headers: { 'Content-Type': 'application/json' },
    //             mode: 'cors',
    //         })
    //         .then(res => {
    //             if(res) {
    //                 if (res.data.result === 'success' && res.data.roleId > 0) {
    //                     let role = {
    //                         RoleId: res.data.roleId,
    //                         RoleName: props.roleName,
    //                         RoleType: 'C'
    //                     }
    //                     props.onCreateNewRole(role);
    //                 } else if (res.data.result === 'error') {
    //                     setRoleNameErr('Role name is already exists');
    //                 } else {
    //                     setRoleNameErr('Failed to create role name');
    //                 } 
    //             }
    //         })
    //         .catch(function (response) {
    //             setRoleNameErr(response);
    //         });
    //     } else {
    //         if (!props.roleName) {
    //             setRoleNameErr('Please enter role name');
    //         }
    //     }
    // }

    const addCashFlow = () => {

    }

    const handleChange = (event) => {

    }

    const validateAllInputs = () => {
        if (!props.roleName) {
            return false;
        }
        else { return true; }
    }

    return (
        <React.Fragment>
            <Dialog fullWidth open={props.open}
                onClose={props.handleClose} disableBackdropClick
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Grid container spacing={0}>
                        <Grid item xs={matches ? 11 : 9}></Grid>
                        <Grid item xs={matches ? 1 : 3}>
                            <IconButton style={{ marginLeft: '22px', marginTop: '-20px' }}
                                onClick={props.handleClose}
                                aria-label="settings">
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required size="small">
                                <InputLabel style={{ fontFamily: 'poppins' }} id="demo-simple-select-label">PortCo Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cashFlowDetails.portCoId}
                                    label="PortCoName"
                                    onChange={handleChange}
                                    name="PortCoName"
                                >
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required size="small">
                                <InputLabel style={{ fontFamily: 'poppins' }} id="demo-simple-select-label">Fund Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cashFlowDetails.fundId}
                                    label="FundType"
                                    onChange={handleChange}
                                    name="FundType"
                                >
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required size="small">
                                <InputLabel style={{ fontFamily: 'poppins' }} id="demo-simple-select-label">Share Class</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cashFlowDetails.shareClassId}
                                    label="ShareClass"
                                    onChange={handleChange}
                                    name="ShareClass"
                                >
                                </Select>
                            </FormControl>
                        </Grid>                        
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker fullWidth format="dd/MM/yyyy"
                                    id="dateUpdated" label="Date"
                                    value={cashFlowDetails.date}
                                    onChange={handleChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    inputVariant="outlined"
                                    size="small"
                                    required
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth name="InvestmentCost" label="Investment Cost" required size="small"
                                onChange={handleChange} noValidate value={cashFlowDetails.investmentCost}
                                variant="outlined" style={{ fontFamily: 'poppins' }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth name="EstimatedValue" label="Estimated Value" required size="small"
                                onChange={handleChange} noValidate value={cashFlowDetails.estimatedValue}
                                variant="outlined" style={{ fontFamily: 'poppins' }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                }} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ padding: '8px 24px 16px 24px' }}>
                    <Button onClick={addCashFlow} color="primary" className={classes.customButtonPrimary} size="medium">
                        {action}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}