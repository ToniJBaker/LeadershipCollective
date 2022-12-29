import React, { useEffect, useState } from "react";
import { getAllSubjects } from "../../Managers/SubjectManager";
import { Input,Card, CardBody, CardTitle, CardSubtitle, CardLink, CardText } from "reactstrap"
import { getMediaRecommendations, searchMediaRecommendationsBySubjectId } from "../../Managers/MediaRecommendationManager";


export const MediaRecommendationsList = ()=> {
    const [allMediaRecommendations, setAllMediaRecommendations] = useState([]);
    const [subjects, setSubjects] = useState([]); //state for list of subjects
    
    //fetch call Get list of Subjects
    const getSubjects = ()=> {
        getAllSubjects().then(s => setSubjects(s))
    };
    useEffect(()=>{
        getSubjects();
    }, []);

    //fetch call GET list of Media Recommendations
    const getAllMediaRecommendations=()=>{
        getMediaRecommendations().then((res)=>setAllMediaRecommendations(res))
    };
    useEffect(()=>{
        getAllMediaRecommendations();
    },[]);

    const handleSelect = (e)=> {
        e.preventDefault(); 
        if(e.target.value === "true"){
            getAllMediaRecommendations();
        }
        else{
            searchMediaRecommendationsBySubjectId(e.target.value) //use .then when you have a fetch call
            .then ((rec)=>setAllMediaRecommendations(rec))
        }
        
    };
    
    return (<>
    <h3>Media Recommendations</h3>
    <Input type="select" name="tags" defaultValue="none" onChange={handleSelect}  >
                <option value="none" disabled hidden>Click to Search By Subject</option>
                            <option value="true"   > Get All </option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
    </Input>
    <section className="allRecommendations">
        {allMediaRecommendations.map((rec) => (
            <Card key={rec.id} style={{width: '20rem'}} >
                <CardBody>
                <CardTitle tag="h5">
                        {rec.resourceType.name}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">Title: {rec.title} </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">Author: {rec.author} </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">Publication Date: {rec.publicationDateString} </CardSubtitle>
                    <hr/>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {rec.subject.name} </CardSubtitle>
                    
                </CardBody>
                    <img alt="Card cap" src="https://picsum.photos/318/180" width="100%"/>
                <CardBody>
                    <CardText> Recommended by: {rec.userProfile.fullName}</CardText>
                    <CardText> On: {rec.dateCreatedString}</CardText>
                    <CardLink href={`/mediaRecommendation/${rec.id}`} >View Details</CardLink>
                    <CardLink href={rec.linkAddress}>{rec.title}</CardLink>
                </CardBody>
            </Card>))}
        </section>
    </>)
}