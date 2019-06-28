import React from 'react';
import List from '@material-ui/core/List';
import { Link, withRouter } from "react-router-dom";

class LeftNavigationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuSelected: "",
        };
    }

    selectedmenu(menu){
        if(menu === this.state.menuSelected){
            this.setState({
                menuSelected: ""
            })
        }else{
           this.setState({
                menuSelected: menu
            }) 
        }
        
    }

    render() {
        return (
            <div style={{paddingTop: "20px"}}>
                <div className="mainMenu">
                    <label className="mainHeading" onClick={this.selectedmenu.bind(this, this.props.menus.mainTitle)}>
                        {this.props.menus.mainTitle}
                        <span className="iconRight" 
                        >
                        <img src={(this.state.menuSelected === this.props.menus.mainTitle) ? require('./../../../src/assets/images/right-arrow.svg') : require('./../../../src/assets/images/angle-arrow-down.svg')} 
                        alt={this.props.menus.title}
                        className="img-fluied iconRight" width="12px" />
                        </span>
                    </label>
                </div>
                {(this.props.menus.menus) ? 
                    <code>

                        {this.props.menus.menus.map((menu, index) => {
                            if(this.state.menuSelected === this.props.menus.mainTitle){
                                return (
                                    <Link to={menu.navLink} >
                                        <List key={index}  style={{backgroundColor: "#F7F7F7", paddingTop: "20px"}}>
                                            <span><label className="subMenuText">{menu.title}</label></span>
                                        </List>
                                    </Link>
                                ); 
                            }
                            return(
                                <code></code>
                            );
                            
                        })}
                    </code> : null

                }
               
            </div>
        );
    }

}


export default withRouter(LeftNavigationCard);