import {  Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Footer from './../../components/Footer/index';

const styles = theme => ({
root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: "32px",
    marginBottom: theme.spacing.unit * 3
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: '100%',
  },
});

 
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                email: "",
                password: "" 
            },
            errors: {}
        };
    }


    handleValidation(){
        let fields = this.state.loginDetails;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "Password Cannot be empty !!!";
        }

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Email Cannot be empty !!!";
        }

        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid !!!";
            }
       }  
       this.setState({
            errors: errors
        });
       return formIsValid;
   }

    handleChange(name, event){
        this.state.loginDetails[name] = event.target.value;
        this.setState({
            loginDetails: this.state.loginDetails
        })
    }

    loginUser(e){
        e.preventDefault();
        this.props.history.push('admin')
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <div className="pl-2 pr-2 loginform" style={{overflowY: "hidden", overflowX: "hidden"}}>
                
                <Grid container spacing={3}>
                <Grid item xs={1} lg={4}></Grid>
                <Grid item xs={10} lg={4}>
                    <Paper className={classes.root}>
                    <img src={require('./../../../src/assets/images/greyb.png')} alt="grey" width="100px" />
                    <TextField
                    id="outlined-name"
                    label="Email"
                    placeholder="joe@gmail.com"
                    className={classes.textField}
                    onChange={this.handleChange.bind(this, 'email')}
                    margin="normal"
                    
                  />

                  <TextField
                    id="outlined-name"
                    label="Password"
                    placeholder="Password here"
                    className={classes.textField}
                    onChange={this.handleChange.bind(this, 'password')}
                    margin="normal"
                    
                  />
                  <div className="pt-5" style={{display: "flex", justifyContent: "center"}}>
                  
                  <Button onClick={this.loginUser.bind(this)} variant="contained"  style={{color: "white", background: "#2196F3"}} className={classes.margin}>
                  Sign In
                  </Button>
                </div>
                </Paper>
                </Grid>
                <Grid item xs={1} lg={4}></Grid>
                </Grid>
            </div>
            <Footer  />
            </div>
        );
    }
}

export default withRouter((withStyles(styles)(Login)));




