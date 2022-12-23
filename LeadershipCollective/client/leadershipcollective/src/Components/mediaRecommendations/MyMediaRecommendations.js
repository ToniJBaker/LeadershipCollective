import React, { useState, useEffect }  from "react";
import { Card, CardBody, CardText, CardTitle, CardSubtitle, CardLink } from "reactstrap";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { getMediaRecommendations } from "../../Managers/MediaRecommendationManager";


export const MyMediaRecommendations =()=> {
    const localUser = getCurrentUser();
    const [myMediaRecommendations, setMyMediaRecommendations] = useState([]);
    
    const getMyMediaRecommendations = ()=> {
        getMediaRecommendations().then(recommendations =>
            {
            setMyMediaRecommendations(recommendations)      
        } )
    };
    
    useEffect(()=>{
        getMyMediaRecommendations();
    }, []);



    return(<>
   
    
        <Card >
            <div className="addingMyRecommendations">Create Recommendations<br/>
            <Link to="/addConsultantRecommendation" className="addRecommendationLink" >Add New Consultant Recommendation</Link><br/>
            <Link to="/addMediaRecommendation" className="addRecommendationLink">Add New Media Recommendation</Link>
            </div>
        </Card>

        <section className="allRecommendations">

       { myMediaRecommendations.map((rec) => (
           rec.userProfileId === localUser.id
            ?<Card key={rec.id} style={{width: '18rem'}} >
                <CardBody>
                    <CardTitle tag="h5">
                        {rec.resourceType.name}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.title} </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.author} </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.publicationDateString} </CardSubtitle>
                    <hr/>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.subject.name} </CardSubtitle>
                    
                </CardBody>
                    <img alt="Card cap" src="https://picsum.photos/318/180" width="100%"/>
                <CardBody>
                    <CardText> Recommended by: {rec.userProfile.fullName}</CardText>
                    <CardText> On: {rec.dateCreatedString}</CardText>
                    <CardLink href={`/myMediaRecommendations/${rec.id}`}>View Details</CardLink>
                    <CardLink href={rec.linkAddress}>{rec.title}</CardLink><br/>
                    
                    
                    


                </CardBody>
                
            </Card>
            :""
            ))}
        
            
        </section>
        
    </>)
}