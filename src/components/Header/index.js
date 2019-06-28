import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

import LeftNavigationCard from './../../components/sideNavMenu/index';

import Operational from './../../containers/Operational/Sample/index';
import OperationalSample2 from './../../containers/Operational/Sample2/index';


import CustomerSample from './../../containers/CustomerService/Sample/index';
import CustomerSample1 from './../../containers/CustomerService/Sample1/index';


import AccountManager from './../../containers/AccountManager/Sample/index';



import Administrators from './../../containers/SuperAdmin/Administrators/index';
import Settings from './../../containers/SuperAdmin/Settings/index';

import Footer from './../../components/Footer/index';

import menus from './../../data/menus.json';
import DashBoardPage from './../../containers/SuperAdmin/Dashboard/index.js';

import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        zIndex: 0
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    avatar: {
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
    },
    bigAvatar: {
        width: 45,
        height: 45,
    },
    gridRoot: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    rootMenu: {
         width: '100%',
        maxWidth: 150,
        display: 'flex',
        justifyContent: 'center'
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            menus: menus,
            anchorEl: null,
            getUserAvatar: "",
            getUserName: {
                firstName: "John",
                lastName: "Doe"
            },
            openPaper: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    }
    


    handleDrawerOpen(){
        this.setState({ 
            open: true
        })
    }

    handleDrawerClose(){
        this.setState({ open: false })
    }

    profileAccount() {
        this.setState({
            anchorEl: null
        }, () => {
            this.props.history.push('/admin/profile');
        });
    }

    logoutAccount() {
        this.setState({
            anchorEl: null
        });
    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    handleClick (event) {
        this.setState({
            anchorEl: event.currentTarget,
            openPaper: !this.state.openPaper
        })
    }

    render() {
        
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const { open } = this.state;
        if (this.props && this.props.location) {
            var getPath = this.props.location.pathname.substring(1, this.props.location.pathname.length);
        }
        console.log(getPath);
        return (
            <div>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    style={{ background: '#2196F3' }}
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                        <MenuIcon />
                        </IconButton>
                        <div className="profileAvatar">
                            <div className="d-flex" aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true"
                                onClick={this.handleClick.bind(this)}>
                                <Avatar
                                    alt="Adelle Charles"
                                    src={this.state.getUserAvatar}
                                    className={classNames(classes.avatar, classes.bigAvatar)}

                                >JD</Avatar>
                                <Typography variant="h6" className="pt-3" color="inherit" align="right" onClick={this.logoutAccount.bind(this)}>
                                    {this.state.getUserName.firstName}&nbsp;{this.state.getUserName.lastName}
                                </Typography>
                            </div>
                            <div className={classes.root}>
                                {(this.state.openPaper) ?
                                <Paper className={classes.paper} style={{position: "absolute", top: "100%"}}>
                                <MenuList>
                                    <MenuItem onClick={this.profileAccount.bind(this)}><img src={require('./../../../src/assets/images/user.png')} alt="user"  width="20px" style={{marginRight: "10px"}}  />Profile</MenuItem>
                                    <MenuItem ><img src={require('./../../../src/assets/images/system.png')} alt="system" width="20px" style={{marginRight: "10px"}} />Password</MenuItem>
                                    <MenuItem onClick={this.logoutAccount.bind(this)}><img src={require('./../../../src/assets/images/logout.jpg')} alt="logout" width="20px" style={{marginRight: "10px"}} />Logout</MenuItem>                  
                                </MenuList>
                              </Paper>: null }
                            </div>
                        </div>

                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        
                        <IconButton onClick={this.handleDrawerClose.bind(this)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.state.menus.map((menu, index) => { return (<LeftNavigationCard menus={menu} key={index} /> ) })}
                    </List>
                    <Divider />
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                    style={{height: "100vh", overflowY: "auto", marginBottom: "20px"}}
                >
                    <div className={classes.drawerHeader} />
                    <div>
                        {(() => {
                            switch (getPath) {
                                case 'admin/dashboard':
                                    return <DashBoardPage />
                                case 'admin/settings':
                                    return <Settings />
                                case 'admin/administrators':
                                    return <Administrators />
                                case 'admin/operational/sample1':
                                    return <Operational />
                                case 'admin/operational/sample2':
                                    return <OperationalSample2 />
                                case 'admin/customer-service/sample1':
                                    return <CustomerSample />
                                case 'admin/customer-service/sample2':
                                    return <CustomerSample1 />
                                case 'admin/account/sample1':
                                    return <AccountManager />
                                default:
                                    return null;
                            }
                        })()}
                        {(getPath) ? null : <DashBoardPage />}
                    </div>
                </main>
                
            </div>
            <Footer toggleDrawer={this.state.open} />
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Header));