import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getConsultantRecommendationById } from "../../Managers/ConsultantRecommendationManager";
import { Card, CardBody,CardLink, CardSubtitle, CardText, CardImg } from "reactstrap";

export const ConsultantRecommendationDetails =()=> {
    const {id} = useParams();
    const [consultantRecommendation, setConsultantRecommendation] = useState({});

    const getConRecommendation = () => {
        getConsultantRecommendationById(id).then(singleRecommendation => setConsultantRecommendation(singleRecommendation))
    };
    useEffect(()=> {
        getConRecommendation();
    }, []);

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
        <CardLink href="/consultantRecommendations"  className="text-muted" >Go Back</CardLink>
        <hr/>
        <CardLink href={consultantRecommendation.linkAddress}  className="text-muted" >{consultantRecommendation.name} Web Page</CardLink><br/>
        <small className="text-muted">Recommended by {consultantRecommendation.userProfile?.fullName} </small>
      </CardText>
    </CardBody>
    
  </Card>
  <Card >
    <div className="messagesOnConsultantRecommendations">Leave a Message</div>
  </Card>
    
</>)

}