import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDeatils extends Component {
    constructor(props) {
        super(props);
        this.state={
            dish:null
        };
    }

    renderDish(dish) {
        if(dish!=null){
            return (
                <Card >
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
    formatDate  (date){
        var formattedDate = new Intl.DateTimeFormat('en-GB', { 
                            month: 'short', 
                            day: '2-digit',
                            year: 'numeric', 
                            }).format(new Date(Date.parse(date)));
        return formattedDate;
}


    renderCommets (comments){
        if(comments!=null){

            var commentsList = comments.map((comment)=>{
                return (
                    <div className="offset-md-1">
                        <div className="row">
                            <p>{comment.comment}</p>
                        </div>
                        <div className="row">
                            <p>--{comment.author}, {this.formatDate(comment.date)}
                            </p>
                        </div>
                    </div>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    {commentsList}
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
    render(){
        if(this.props.dish!=null)
        {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderCommets(this.props.dish.comments)}
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