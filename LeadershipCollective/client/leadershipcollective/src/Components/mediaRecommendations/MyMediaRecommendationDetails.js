import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteMediaRecommendation, getMediaRecommendationById } from "../../Managers/MediaRecommendationManager";
import { Card, CardImg, CardBody, CardText, CardSubtitle, CardLink, Button, ListGroupItem, ListGroup } from "reactstrap";


export const MyMediaRecommendationDetails =()=> {
    const {id} = useParams(); //id to get details of single mediaRecommendation
    const navigate = useNavigate();
    const [mediaRecommendation, setMediaRecommendation] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    
    //get single media recommendation using params (id)
    const getMediaRecommendation = () => {
        getMediaRecommendationById(id).then(singleRecommendation => setMediaRecommendation(singleRecommendation))
    };
    useEffect(()=> {
        getMediaRecommendation();
    }, []);

    //toggle delete button
    const toggleDeleteConfirm = (e) => {  //toggle delete element
        e.preventDefault();
        setConfirmDelete(!confirmDelete);
    };
    
    //handle delete
    const handleDelete= () => { //delete button confirmation
      deleteMediaRecommendation(mediaRecommendation.id)
      
      .then(()=> {navigate("/myMediaRecommendations")})
   
    };

    
    return (<>
    
    <Card className="my-2">
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/900/180"
      style={{
        height: 180
      }}
      top
      width="100%"
    />
    <CardBody>
        <h1>{mediaRecommendation.title}</h1>
      
      <CardSubtitle className="mb-2 text-muted" tag="h6"> Subject: {mediaRecommendation.subject?.name} </CardSubtitle>

      <CardSubtitle className="mb-2 text-muted" tag="h6"> {mediaRecommendation.author} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6"> {mediaRecommendation.publicationDateString} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6">Service Area: {mediaRecommendation.serviceArea} </CardSubtitle>

      <CardText>{mediaRecommendation.content}</CardText>
      <CardText>
        <CardLink href="/myMediaRecommendations"  className="text-muted" >Go Back</CardLink>
        <CardLink href={"javascript:void(0)"} onClick={toggleDeleteConfirm} className="text-muted" >Delete</CardLink>
        {confirmDelete ?
                    <ListGroup flush>
                        <ListGroupItem className="text-danger">
                            Are you sure you want to delete this recommendation?
                        </ListGroupItem>
                        <ListGroup flush>
                            <ListGroupItem>
                                <Button className="mr-3 btn-danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                                <Button onClick={toggleDeleteConfirm}>
                                    Cancel
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </ListGroup>
                    : <></>}
        <CardLink className="text-muted" href={`/myMediaRecommendations/${mediaRecommendation.id}/edit`} >Edit</CardLink>
        <hr/>
        <CardLink href={mediaRecommendation.linkAddress}  className="text-muted" >{mediaRecommendation.title} Web Page</CardLink><br/>
        <small className="text-muted">Recommended by {mediaRecommendation.userProfile?.fullName} </small>
      </CardText>
    </CardBody>
    
  </Card>
    </>)
}