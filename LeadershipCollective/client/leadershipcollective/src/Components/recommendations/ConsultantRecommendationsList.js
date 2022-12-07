import React, { useEffect, useState } from "react"
import { Input,Card, CardBody, CardTitle, CardSubtitle, CardLink, CardText } from "reactstrap"
import { getConsultantRecommendations } from "../../Managers/ConsultantRecommendationManager";

export const ConsultantRecommendationsList = () =>{
    const [allConsultantRecommendations, setAllConsultantRecommendations] = useState([]);

    const getAllConRecommendations = ()=>{
        getConsultantRecommendations().then(allRecommendations => setAllConsultantRecommendations(allRecommendations))
    }

    useEffect(() => {
        getAllConRecommendations();
    }, []);
    
    return(<>
        <Input type="select" name="tags" defaultValue="none" >
                <option value="none" disabled hidden>Search By Subject</option>
        </Input>
        <section className="allRecommendations">
        {allConsultantRecommendations.map((rec) => (
            <Card style={{width: '18rem'}} >
                <CardBody>
                    <CardTitle tag="h5">
                        Consultant
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
                    <CardLink href={rec.linkAddress}>{rec.name}</CardLink>
                </CardBody>
            </Card>))}
        </section>
    
    </>)
}