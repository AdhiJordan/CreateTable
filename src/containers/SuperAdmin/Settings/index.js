import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import validators from './../../../helpers/validators/index';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = theme => ({
root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: "32px",
    marginBottom: "30px"
  },
    dialogPaper: {
        overflow: 'hidden',
        width: "400px",
        textAlign: "center",
        padding: "80px"
    },
    MuiDialogContentroot45: {
        padding: 0
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
  formControl: {
    margin: theme.spacing(3),
  }
});

class Settings extends Component{

  constructor(props){
        super(props);
        this.state = {

            getCheckboxSelected: null,
            toggleCheck: false,


            toggleRadio: null,
            getRadioSelected: "",


           userDetails: {
              name: "",
              email: "",
              phone: "",
              percentage: "",
              password: "",
              Cpassword: ""
           },
           errors: {
            name: "",
            email: "",
            password: "",
            Cpassword: "",
            phone: "",
            percentage: ""
           },
           open: false
        }
        this.validators = validators;
        this.resetValidators();
        this.handleChange = this.handleChange.bind(this);
        this.displayValidationErrors = this.displayValidationErrors.bind(this);
        this.updateValidators = this.updateValidators.bind(this);
        this.resetValidators = this.resetValidators.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChecked(name, event){
      this.setState({ [name]: event.target.checked });
    }

    handleCheckedChange(event){
      let data =  event.target.value
      this.setState({ 
        getCheckboxSelected:data
      }, () => {
        if(this.state.getCheckboxSelected){
          this.setState({
            toggleCheck: true
          })
        }else if(this.state.getCheckboxSelected === ""){
          this.setState({
            toggleCheck: false
          })
        }
      })
    }

    handleRadioChange(event){
        this.setState({
          getRadioSelected: event.target.value,
          
        }, () => {
          if(this.state.getRadioSelected){
              this.setState({
                toggleRadio: true
              })
          }
        })
    }

    handleChange(inputPropName, event) {
      const newState = Object.assign({}, this.state);
      newState.userDetails[inputPropName] = event.target.value;
      this.setState(newState);
      this.updateValidators(inputPropName, event.target.value);
    }
  
  handleSubmit(evt) {
    evt.preventDefault();
    this.isFormValid();
    if(this.state.toggleCheck === true && this.state.toggleRadio === true){
      if(this.validators){
        if(this.validators.name.state !== "" && this.validators.email.state !== ""
          && this.validators.phone.state !== "" && this.validators.percentage.state !== ""
          && this.validators.password.state !== "" && this.validators.Cpassword.state !== ""){
          this.setState({
            open: true
          })
        }
      }else{

      }
    }
  }
  
  updateValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }
  
  resetValidators() {
    Object.keys(this.validators).forEach((fieldName) => {
      this.validators[fieldName].errors = [];
      this.validators[fieldName].state = '';
      this.validators[fieldName].valid = false;
    });
  }
  

  displayValidationErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = '';
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return <span className="error" style={{color: "red", paddingRight: "10px"}} key={index}>{info}</span>;
      });

      return (
        <div className="col s12 row">
          {errors}
        </div>
      );
    }
    return result;
  }

  isFormValid() {
    let status = true;
    Object.keys(this.validators).forEach((field) => {
      if (!this.validators[field].valid) {
        status = false;
      }
    });
    console.log(status)
    return status;
  }

  handleClose(){
    this.setState({
      open: false
    })
  }

  render(){
  const { classes } = this.props;
  const {   superAdmin,
            accountManager,
            operational,
            customerService,
            finance
        } = this.state;
  return(
      <div>
       <Paper className={classes.root}>
      <form>
      <h1>Settings Form</h1>
      <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              placeholder="Joe Chan"
              className={classes.textField}
              onChange={this.handleChange.bind(this, 'name')}
              margin="normal"
              value={this.state.userDetails.name}
            />
            { this.displayValidationErrors('name') }
                </Grid>
                <Grid item xs={6}>
                  <TextField
              
              label="Email"
              placeholder="joe@gmail.com"
              className={classes.textField}
              onChange={this.handleChange.bind(this, 'email')}
              margin="normal"
              value={this.state.userDetails.email}
            />
            { this.displayValidationErrors('email') }
                </Grid>
            </Grid>

             <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
              
              label="Phone"
              placeholder="987654321"
              className={classes.textField}
              value={this.state.userDetails.phone}
              onChange={this.handleChange.bind(this, 'phone')}
              margin="normal"
            />
            { this.displayValidationErrors('phone') }
                </Grid>
            <Grid item xs={6}>
              <TextField
              
              label="Percentage"
              placeholder="100%"
              type="number"
              value={this.state.userDetails.percentage}
              className={classes.textField}
              value={this.state.userDetails.percentage}
              onChange={this.handleChange.bind(this, 'percentage')}
              margin="normal"
            />
            { this.displayValidationErrors('percentage') }
            </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
              
              label="Password"
              type="password"
              placeholder="Password here"
              className={classes.textField}
              value={this.state.userDetails.password}
              onChange={this.handleChange.bind(this, 'password')}
              margin="normal"
            />
            { this.displayValidationErrors('password') }
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  type="password"
              
              label="Confirm Password"
              placeholder="Confirm Password"
              className={classes.textField}
              value={this.state.userDetails.Cpassword}
              onChange={this.handleChange.bind(this, 'Cpassword')}
              margin="normal"
            />
            { this.displayValidationErrors('Cpassword') }
                </Grid>
            </Grid>


            <Grid container spacing={3}>
                <Grid item xs={6}>
               <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2  col-form-label">Roles</label>
          <div className="col-sm-8 pl-2">
        

      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup onChange={this.handleCheckedChange.bind(this)}>
          <FormControlLabel
            control={<Checkbox checked={superAdmin}  value="superAdmin" />}
            label="Super Admin"
          />
          <FormControlLabel
            control={<Checkbox checked={accountManager} value="accountManager" />}
            label="Account Manager"
          />
          <FormControlLabel
            control={
              <Checkbox checked={operational}  value="operational" />
            }
            label="Operational"
          />
          <FormControlLabel
            control={
              <Checkbox  checked={customerService}  value="customerService" />
            }
            label="Customer Service"
          />
          <FormControlLabel
            control={
              <Checkbox checked={finance} value="finance" />
            }
            label="Finance"
          />
        </FormGroup>
      </FormControl>

          </div>
        </div>
                </Grid>
                <Grid item xs={6}>
                <div className="form-group row">
        <label htmlFor="inputPassword" className="col-sm-2  col-form-label">Status</label>
          <div className="col-sm-8 pl-2">
            <FormControl error={this.state.toggleRadio} component="fieldset" className={classes.formControl}>
             <RadioGroup
                  aria-label="Gender"
                  name="gender1"
                  className={classes.group}
                  onChange={this.handleRadioChange.bind(this)}
                >
                  <FormControlLabel value="active" control={<Radio />} label="Active" />
                  <FormControlLabel value="inactive" control={<Radio />} label="InActive" />
            </RadioGroup>
            <FormHelperText style={{color: "red"}}> {(this.state.toggleRadio === false) ? "Select Atleast One Status" : ""} </FormHelperText>
             </FormControl>
          </div>
        </div>
        </Grid>
      </Grid>
        <div className="form-group row">
          <div className="col-sm-8">
            <Button variant="contained" onClick={this.handleSubmit.bind(this)}  style={{color: "white", background: "#2196F3", marginRight: "20px"}} className={classes.margin}>
              Save
            </Button>
            <Button variant="contained" style={{color: "black", background: "#fff"}} className={classes.margin}>
              Cancel
            </Button>
          </div>
        </div>
        </form>
      </Paper>
      <Paper  className={classes.root}>
      <h1>Next Form</h1>
        hi
      </Paper>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose.bind(this)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontSize: "32px"}}>
            success
          </DialogContentText>
        </DialogContent>
      </Dialog>
      </div>

    );
  }
}

export default (withStyles(styles)(Settings));





