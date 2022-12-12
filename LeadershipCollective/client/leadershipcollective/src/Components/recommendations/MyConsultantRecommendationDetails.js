import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteConsultationRecommendation, getConsultantRecommendationById } from "../../Managers/ConsultantRecommendationManager";
import { ListGroup, ListGroupItem, Button, Card, CardBody,CardLink, CardSubtitle, CardText, CardImg } from "reactstrap";
import { getCurrentUser } from "../../Managers/UserProfileManager";

export const MyConsultantRecommendationDetails =()=> {
    const {id} = useParams(); //id to get details of single consultantRecommendation
    const navigate = useNavigate();
    const [consultantRecommendation, setConsultantRecommendation] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    
    
    

    const getConRecommendation = () => {
        getConsultantRecommendationById(id).then(singleRecommendation => setConsultantRecommendation(singleRecommendation))
    };
    useEffect(()=> {
        getConRecommendation();
    }, []);

    const toggleDeleteConfirm = (e) => {  //toggle delete element
      e.preventDefault();
      setConfirmDelete(!confirmDelete);
  };
  
  const handleDelete= () => { //delete button confirmation
    deleteConsultationRecommendation(consultantRecommendation.id)
    
    .then(navigate("/myConsultantRecommendations"))
 
  };

return(<>

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
        <h1>{consultantRecommendation.name}</h1>
      
      <CardSubtitle className="mb-2 text-muted" tag="h6"> Consulting for: {consultantRecommendation.subject?.name} </CardSubtitle>

      <CardSubtitle className="mb-2 text-muted" tag="h6"> {consultantRecommendation.email} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6"> {consultantRecommendation.phoneNumber} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6">Service Area: {consultantRecommendation.serviceArea} </CardSubtitle>

      <CardText>{consultantRecommendation.content}</CardText>
      <CardText>
        <CardLink href="/myConsultantRecommendations"  className="text-muted" >Go Back</CardLink>
        <CardLink href={"javascript:void(0)"} onClick={toggleDeleteConfirm} className="text-muted" >Delete</CardLink>
        {confirmDelete ?
                    <ListGroup flush>
                        <ListGroupItem className="text-danger">
                            Are you sure you want to delete this post?
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
        <hr/>
        <CardLink href={consultantRecommendation.linkAddress}  className="text-muted" >{consultantRecommendation.name} Web Page</CardLink><br/>
        <small className="text-muted">Recommended by {consultantRecommendation.userProfile?.fullName} </small>
      </CardText>
    </CardBody>
    
  </Card>
  
  
    
</>)

}