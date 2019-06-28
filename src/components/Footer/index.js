import React, {Component} from 'react';


export default class Footer extends Component{

	constructor(props){
        super(props);
        this.state = {
           
        }
    }

	render(){
		return(
			<div className="footerCls pl-5 pt-2" style={{background: "#fff", bottom: "0px", left: (this.props.toggleDrawer === true) ? "240px" : "0px"}}>
				<p className="text-left">Footer</p>
			</div>

		);
	}
}