import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Toolbar } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TablePage from './../../../components/Table/index';
import faker from 'faker';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { grey } from '@material-ui/core/colors';


const tableStyles = theme => ({
  root: {
    width: '100%',
    marginBottom: "20px",
    flexGrow: 1,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  input: {
    margin: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '1 1 100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 220,
  },
  iconButton: {
    padding: 10,
    position: 'relative',
    right: "45px"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
    fake: {
    backgroundColor: grey[200],
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing(3),
    },
  },
});
class DashboardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rows: [],
        selectedFromDay: "",
        selectedToDay: "",
        searchResult: "",
        openSelect: false,
        tableHeaders: ['Avatar', 'UserName', 'Email', 'Phone Number', 'Date', 'Operations']
    }
  }

    componentDidMount(){
        this.getUser();
    }

    getUser(){
        for(var i = 0; i < 25; i++) {
          this.state.rows.push(this.buildFakeUser());
        }
        this.setState({
            rows: this.state.rows
        })
    }


    buildFakeUser() {
      return {
        name: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat(),
        date: faker.date.between('2015-01-01', '2015-01-05')
      };
    }


    handleInputSearch(event) {
        var searchQuery = event.target.value.toLowerCase();
        this.setState({
            searchResult: searchQuery
        }, () => {
        if(this.state.searchResult === null || this.state.searchResult === ""){
            this.state.rows = [];
            this.setState({
                rows: this.state.rows
            }, () => {
                this.getUser();
            })
            
        }
        var displayedContacts = this.state.rows.filter(function(el) {
        var searchValue = el.name.toLowerCase();

          return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
          rows: displayedContacts
        }, () => {
          console.log("rows", this.state.rows)
        });
    })
    }


  selectedRow(idxValue){
    this.setState({
      indexCollapse: idxValue,
      collapsedRow: !this.state.collapsedRow
    })
  } 

filterSearch(e){
    e.preventDefault();
    if(this.state.selectedFromDay && this.state.selectedToDay){
        let result = this.state.rows.filter(item => {
            var time =  moment(item.date).format("DD-MM-YYYY");
            return (this.state.selectedFromDay < time && time < this.state.selectedToDay);
        });
      this.setState({
        rows: result
      })
    }
  }

  handleFromDateChange(day){
    if(day){
    var dateString = moment(day).format("MM-DD-YYYY");
        this.setState({ selectedFromDay: dateString }); 
      }else{
        this.setState({ selectedFromDay: "" });
      }
  }

    handleToDateChange(day){
        if(day){
        var dateString = moment(day).format("MM-DD-YYYY");
            this.setState({ selectedToDay: dateString }); 
          }else{
            this.setState({ selectedToDay: "" });
          }
        }

  resetAll(){
    this.setState({
        rows: []
    }, () => {
        this.getUser();
        this.setState({
            searchResult: "",
            selectedToDay: "",
            selectedFromDay: ""
        })
    })
  }

  handleClick(){
    this.setState({
      openSelect: !this.state.openSelect
    })
  }

  handleClickAway(){
    this.setState({
      openSelect: false
    })
  }

  render() {
    const { classes } = this.props;
    const fake = <div className={classes.fake} />;
    return (
      <div>
        <Paper className={classes.root}>
            <Paper style={{paddingTop: "10px"}}>
            <Toolbar className={classes.root + " row"}>
                  <Grid container spacing={1}>
                      <Grid item xs={2}>
                          <input type="text" className="mt-1" value={this.state.searchResult} placeholder="Search Name" style={{width: "100%"}} onChange={this.handleInputSearch.bind(this)} />
                      </Grid>
                      <Grid item xs={2}>
                         <div className={classes.root}>
                            <ClickAwayListener onClickAway={this.handleClickAway.bind(this)}>
                              <div style={{textAlign: "center"}}>
                                <Button onClick={this.handleClick.bind(this)}>Select an Address</Button>
                                {this.state.openSelect ? (
                                  <Paper className={classes.paper} style={{width: "210px", position: "absolute", top: '48px'}}>
                                    {fake}
                                    {fake}
                                    {fake}
                                    {fake}
                                    {fake}
                                  </Paper>
                                ) : null}
                              </div>
                            </ClickAwayListener>
                          </div>
                        
                      </Grid>
                      <Grid item xs={7}>
                          <label className="pr-3">Create Time</label>
                          <DayPickerInput  value={this.state.selectedFromDay}  onDayChange={this.handleFromDateChange.bind(this)} />
                          <DayPickerInput  value={this.state.selectedToDay} onDayChange={this.handleToDateChange.bind(this)} />
                          <Button onClick={this.filterSearch.bind(this)}  variant="contained" style={{color: "white", background: "#2196F3", marginLeft: "20px", marginRight: "20px"}} className={classes.margin}>
                            Search
                          </Button>
                          <Button onClick={this.resetAll.bind(this)} variant="contained" style={{color: "black", background: "white"}} className={classes.margin}>
                            Reset
                          </Button>
                      </Grid>
                       <Grid item xs={1}>
                        <Button  style={{color: "white", background: "#2196F3"}} className={classes.margin}>
                            Create
                          </Button>
                      </Grid>
                  </Grid>
            </Toolbar>
            </Paper>
            <TablePage rows={this.state.rows} headers={this.state.tableHeaders} />
        </Paper>
        </div>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(tableStyles)(DashboardPage);