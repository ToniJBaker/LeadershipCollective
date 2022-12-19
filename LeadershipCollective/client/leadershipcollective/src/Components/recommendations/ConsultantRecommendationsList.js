import React, { useEffect, useState } from "react"
import { Input,Card, CardBody, CardTitle, CardSubtitle, CardLink, CardText } from "reactstrap"
import { getConsultantRecommendations, searchConsultantRecommendationsBySubjectId } from "../../Managers/ConsultantRecommendationManager";
import { getAllSubjects } from "../../Managers/SubjectManager";

export const ConsultantRecommendationsList = () =>{
    const [allConsultantRecommendations, setAllConsultantRecommendations] = useState([]);
    
    
    const [subjects, setSubjects] = useState([]); //state for list of subjects
    const getSubjects = ()=> {
        getAllSubjects().then(s => setSubjects(s))
    };
    useEffect(()=>{
        getSubjects();
    }, []);

    const getAllConRecommendations = ()=>{
        getConsultantRecommendations().then(allRecommendations => setAllConsultantRecommendations(allRecommendations))
    };

    useEffect(() => {
        getAllConRecommendations();
    }, []);
    
    const handleSelect = (e)=> {
        e.preventDefault(); 
        if(e.target.value === "true"){
            getAllConRecommendations();
        }
        else{
            searchConsultantRecommendationsBySubjectId(e.target.value) //use .then when you have a fetch call
            .then ((rec)=>setAllConsultantRecommendations(rec))
        }
        
    };
    
    return(<>
    <h3>Consultant/Facilitator Recommendations</h3>

        <Input type="select" name="tags" defaultValue="none" onChange={handleSelect}  >
                <option value="none" disabled hidden>Search By Subject</option>
                            <option value="true"   > Get All </option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
        </Input>
        <section className="allRecommendations">
        {allConsultantRecommendations.map((rec) => (
            <Card key={rec.id} style={{width: '18rem'}} >
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
                    <CardText> On: {rec.dateCreatedString}</CardText>
                    <CardLink href={`/consultantRecommendation/${rec.id}`} >View Details</CardLink>
                    <CardLink href={rec.linkAddress}>{rec.name}</CardLink>
                </CardBody>
            </Card>))}
        </section>
    
    </>)
}