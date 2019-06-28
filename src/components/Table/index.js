import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './../TablePagination/index';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { grey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


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


class TablePage extends Component{
	constructor(props){
        super(props);
        this.state = {
	        rows: [],
	        page: 0,
	        rowsPerPage: 5,
          headers: []
        }
    }

    componentDidMount(){
      if(this.props.rows){
        this.setState({
          rows: this.props.rows,
          headers: this.props.headers
        })
      }
    }

    componentWillReceiveProps(newProps){
      if(newProps.rows){
        this.setState({
          rows: newProps.rows
        })
      }

    }



  handleChangePage(event, page){
    this.setState({ page });
  };

  handleChangeRowsPerPage(event){
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

	render(){
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
		return(
			<div className={classes.tableWrapper}>
              <Table className={classes.table}>
               <TableHead>
                  <TableRow>
                    {(this.state.headers.map((data) => {
                      if(data === "Avatar"){
                        return(
                            <TableCell style={{textAlign: "center"}}>{data}</TableCell>
                        );
                      }
                      return(
                          <TableCell>{data}</TableCell>
                      );
                    }))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) =>{
                    return(
                      <div style={{display: "contents"}}>
                        <TableRow key={row.id}
                            hover
                            style={{cursor: 'pointer'}}
                        >
                          <TableCell style={{width: "100px"}}>
                              <Avatar
                                alt="Adelle Charles"
                                src={row.avatar}
                                style={{margin: "0px auto"}}
                                />
                          </TableCell>
                          <TableCell>{row.name}</TableCell>                      
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{moment(row.date, 'YYYY ddd MMM DD HH:mm').format('L')}</TableCell>
                          <TableCell>
                             <img src={require('./../../assets/images/edit.svg')} alt="LeftIcon" width="30px" />
                          </TableCell>
                        </TableRow>
                        </div>
                    )})}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell  />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell style={{position: "relative", left: "calc(100% - 70%)", border: "none"}}>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      style={{border: "none"}}
                      onChangePage={this.handleChangePage.bind(this)}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
		);
	}
}

TablePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(tableStyles)(TablePage);