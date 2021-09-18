import React , {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, 
    BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label} from 'reactstrap';
import{Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish}) {
        if(dish!=null){
            return (
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card >
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
    function FormatDate({date}){
        var formattedDate = new Intl.DateTimeFormat('en-GB', { 
                            month: 'short', 
                            day: '2-digit',
                            year: 'numeric', 
                            }).format(new Date(Date.parse(date)));
        return formattedDate;
    }


    function RenderCommets({comments}) {
        if(comments!=null){

            var commentsList = comments.map((comment)=>{
                return (
                    <Fade in>
                        <div className="offset-md-1">
                            <div className="row">
                                <p>{comment.comment}</p>
                            </div>
                            <div className="row">
                                <p>--{comment.author}, <FormatDate date={comment.date} />
                                </p>
                            </div>
                        </div>
                    </Fade>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <Stagger in>
                        {commentsList}
                    </Stagger>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }

const required = (val)=> val && val.length;
const maxLength = (length) => (val) => !(val) || (val.length <= length);
const minLength = (length) => (val) => (val) && (val.length >= length);

class DishDeatils extends Component {
    constructor(props){
        super(props);
        this.state={
            isCommentModalOpen:false
        };
        this.toggleCommentModalForm = this.toggleCommentModalForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    toggleCommentModalForm = ()=>{
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
          });
    }
    handleSubmit(values){
        console.log("the current state is: "+ JSON.stringify(values));
        this.props.postComment(this.props.dish.id, values.rating, values.author, values.comment);
    }
    render(){
        const CommentForm = () =>{
            return (
                <div>
                <Modal id="SubmitComment" isOpen={this.state.isCommentModalOpen}
                            toggle={this.toggleCommentModalForm}>
                    <ModalHeader toggle={this.toggleCommentModalForm}>Submit Comment</ModalHeader>
                    <ModalBody className="ml-3 mr-3">
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row className="form-group">
                            <Label htmlFor="rating" >Rating</Label>
                            <Control.select model=".rating" name="rating"
                                        className="form-control">
                                            <option selected>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                            </Control.select>                       
                            </Row>
                            <Row className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength : minLength(3),
                                            maxLength : maxLength(15)
                                        }}/>
                            <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required : 'Required ',
                                            minLength : 'Name must be greater than 2 characters.',
                                            maxLength: 'Name must be small than 15 characters.' 
                                        }}
                            />
                            </Row>
                            <Row className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model =".comment"id="comment" name="comment"
                                        rows="8" className="form-control"
                                        validators={{
                                            required
                                        }}/>
                            <Errors className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required : 'Required'
                                        }}
                            />
                            </Row>
                            <Row className="form-group">
                                <Button color="primary" type="submit">
                                    Comment
                                </Button>
                            </Row>                        
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline color="secondary" className="mt-auto" 
                 onClick={this.toggleCommentModalForm}>
                    <span className="fa fa-pencil fa-lg"/>
                    Submit Comment
                </Button>
                </div>
            );
    }

        if(this.props.dishesLoading)
        {
            return (
                <div className="continer">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(this.props.dishesErrmsg)
        {
            return (
                <div className="continer">
                    <div className="row">
                        <h4>{this.props.dishesErrmsg}</h4>
                    </div>
                </div>
            );
        }
        else if(this.props.dish!=null)
        {
            return (
                <div>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderCommets comments={this.props.comments} />
                            <CommentForm />
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
        
}

export default DishDeatils;