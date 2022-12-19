import React, { useEffect, useState } from "react";
import { getMediaRecommendationById } from "../../Managers/MediaRecommendationManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { Card, CardImg, CardBody, CardSubtitle, CardText, CardLink } from "reactstrap";
import { useParams } from "react-router";



export const MediaRecommendationDetails = ()=> {
    const {id} = useParams();
    const localUser = getCurrentUser();
    const [mediaRecommendation, setMediaRecommendation] = useState({});

    //fetch call GET a single recommendation by the id
    const getSingleMediaRecommendation = ()=> {
        getMediaRecommendationById(id).then((res)=>setMediaRecommendation(res))
    };
    useEffect(()=>{
        getSingleMediaRecommendation();
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
        <h1>{mediaRecommendation.title}</h1>
      
      <CardSubtitle className="mb-2 text-muted" tag="h6"> Subject: {mediaRecommendation.subject?.name} </CardSubtitle>

      <CardSubtitle className="mb-2 text-muted" tag="h6"> {mediaRecommendation.author} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6"> {mediaRecommendation.publicationDateString} </CardSubtitle>
      

      <CardText>{mediaRecommendation.content}</CardText>
      <CardText>
        <CardLink href="/mediaRecommendations"  className="text-muted" >Go Back</CardLink>
        <hr/>
        <CardLink href={mediaRecommendation.linkAddress}  className="text-muted" >Purchase {mediaRecommendation.title}</CardLink><br/>
        <small className="text-muted">Recommended by {mediaRecommendation.userProfile?.fullName} </small>
      </CardText>
    </CardBody>
    
  </Card>
</>)

}