import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    ButtonToolbar,
    Button
} from "react-bootstrap";
import axios from 'axios';

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";
import FinishedChallengeItemBody from "./FinishedChallengeItemBody";
import VerticalModal from '../common/VerticalModal';

class FinishedChallengeItem extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            modalShow: false,
            resultJson:{}
        }
    }

    modalClose = () => {
        this.setState({ 
            modalShow: false,
            resultJson: {}
        });
    }
    
    handleClick = () => {
        console.log("Here:")
        console.log(SERVER_IP,SERVER_PORT)
        axios({
            method:"get",
            url:"http://"+SERVER_IP+":"+SERVER_PORT+"/api/postchallengemetrics/"+this.props.ID,
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("accessToken")
            }
        })
        .then((resp)=>{
            console.log("resp:",resp);
            this.setState({
                resultJson:resp.data
            },()=>{
                this.setState({
                    modalShow:true
                })
            })
        })
        .catch((resp)=>{

        })
    }

    render() {
        return (
            <Container style={questionWrapperStyle}>
                <Row style={questionStyle}>
                    <Col xl={9} lg={9} md={9} sm={9} xs={9}>
                        <span style={questionNameStyle}>ID: {this.props.ID}</span><br/>
                        <span style={questionDetsStyle}>Time Limit: </span>
                        <span style={questionDetsStyle}>{this.props.timeLimitHrs} hrs</span>
                        <span style={questionDetsStyle}> {this.props.timeLimitMins} mins</span>
                    </Col>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                            <ButtonToolbar>
                                <Button
                                    variant="info"
                                    onClick={this.handleClick}
                                    block
                                >
                                    Details
                                </Button>

                                <VerticalModal
                                    show={this.state.modalShow}
                                    modaltitle="Results"
                                    onHide={this.modalClose}
                                    modalbody={
                                        <FinishedChallengeItemBody 
                                            addTest = {this.addTest} 
                                            hideModal = {this.modalClose}
                                            resultJson = {this.state.resultJson}
                                        />
                                    }
                                />
                            </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        );
    }
}


const questionWrapperStyle = {
    paddingLeft:"10px",
    paddingRight:"10px"
}

const questionStyle = {
    marginTop:"10px",
    paddingLeft:"10px",
    paddingRight:"10px",
    borderBottom:"1px solid black"
}

const questionNameStyle = {
    fontSize:"20px" 
}

const questionDetsStyle = {
    fontSize:"15px" 
}

export default FinishedChallengeItem;