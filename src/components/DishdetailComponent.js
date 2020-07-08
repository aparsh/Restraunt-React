import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
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
                    <div className="offset-md-1">
                        <div className="row">
                            <p>{comment.comment}</p>
                        </div>
                        <div className="row">
                            <p>--{comment.author}, <FormatDate date={comment.date} />
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
    const DishDeatils = ({dish}) => {
        if(dish!=null)
        {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderCommets comments={dish.comments} />
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


export default DishDeatils;