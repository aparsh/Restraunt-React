import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import{Link} from 'react-router-dom';

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
    const DishDeatils = ({dish, comments}) => {
        if(dish!=null)
        {
            return (
                <div>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderCommets comments={comments} />
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


export default DishDeatils;