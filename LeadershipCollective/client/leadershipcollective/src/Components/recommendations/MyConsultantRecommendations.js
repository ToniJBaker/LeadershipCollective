import React, { useEffect, useState } from "react";
import {Card, CardTitle, CardSubtitle, CardBody, CardText, CardLink} from "reactstrap";
import { getConsultantRecommendationById, getConsultantRecommendations } from "../../Managers/ConsultantRecommendationManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { Link } from "react-router-dom";

export const MyConsultantRecommendations = ()=> {
const localUser = getCurrentUser();
const [myConsultantRecommendations, setMyConsultantRecommendations] = useState([]);

const getMyConsultantRecommendations = ()=> {
    getConsultantRecommendations().then(recommendations =>
        {
        setMyConsultantRecommendations(recommendations)      
    } )
};

useEffect(()=>{
    getMyConsultantRecommendations();
}, []);



return(<>
    
    <Card >
    <div className="addingMyRecommendations">Create Recommendations<br/>
    <Link to="/addConsultantRecommendation" className="addRecommendationLink" >Add New Consultant Recommendation</Link><br/>
    <Link className="addRecommendationLink">Add New Media Recommendation</Link>
    </div>
    </Card>

<section className="allRecommendations">

       { myConsultantRecommendations.map((rec) => (
           rec.userProfileId === localUser.id
            ?<Card key={rec.id} style={{width: '18rem'}} >
                <CardBody>
                    <CardTitle tag="h5">
                        {rec.resourceType.name}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.name} </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.email} </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.phoneNumber} </CardSubtitle>
                    <hr/>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.subject.name} </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">Service Area: {rec.serviceArea} </CardSubtitle>
                </CardBody>
                    <img alt="Card cap" src="https://picsum.photos/318/180" width="100%"/>
                <CardBody>
                    <CardText> Recommended by: {rec.userProfile.fullName}</CardText>
                    <CardLink href={`/consultantRecommendation/${rec.id}`}>Recommendation</CardLink>
                    <CardLink href={rec.linkAddress}>{rec.name}</CardLink><br/>
                    <CardLink href={`/myConsultantRecommendations/${rec.id}/edit`} >Edit</CardLink>

                </CardBody>
            </Card>
            :""
            ))}
        
            
        </section>

        </>)

}