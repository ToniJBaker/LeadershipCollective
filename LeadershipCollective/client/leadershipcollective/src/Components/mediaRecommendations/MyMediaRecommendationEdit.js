import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getMediaRecommendationById, updateMediaRecommendation } from "../../Managers/MediaRecommendationManager";
import { getAllResourceTypes } from "../../Managers/ResourceTypeManager";
import { getAllSubjects } from "../../Managers/SubjectManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


export const MyMediaRecommendationEdit = ()=> {
    const {id} = useParams();
    const navigate = useNavigate();

    //fetch all subjects
    const [subjects, setSubjects] = useState([]); //state for list of subjects
    const getSubjects = ()=> {
    getAllSubjects().then(s => setSubjects(s))
    };
    useEffect(()=>{
        getSubjects();
    }, []);
    
    //fetch all resource types  
    const [resourceTypes, setResourceTypes]= useState([]); //state for list of ResourceTypes
    const getResourceTypes = ()=>{
        getAllResourceTypes().then(r=>setResourceTypes(r))
    };
    useEffect(()=>{
        getResourceTypes();
    },[]);          

    //initial state for my single media recommendation
const [myMediaRecommendation, setMyMediaRecommendation] = useState({
    title: undefined,
    content: undefined,
    author: undefined,
    publicationDate: undefined,
    linkAddress: undefined,
    subjectId: undefined,
    resourceTypeId: undefined,
});

//fetch single media recommendation by id
const getMediaRecommendation = () => {
    getMediaRecommendationById(id).then(singleRecommendation => setMyMediaRecommendation(singleRecommendation))
};
useEffect(()=> {
    getMediaRecommendation();
}, []);


const handleSave = (e)=> {  //handle saving new information into edit recommendation form, navigate back to this single recommendation
    e.preventDefault();

    const editedRecommendation = {
        id: myMediaRecommendation.id,
        title: myMediaRecommendation.title,
        content: myMediaRecommendation.content,
        author: myMediaRecommendation.author,
        publicationDate: myMediaRecommendation.publicationDate,
        linkAddress: myMediaRecommendation.linkAddress,
        subjectId: parseInt(myMediaRecommendation.subjectId),
        resourceTypeId: parseInt(myMediaRecommendation.resourceTypeId), 
    };
    updateMediaRecommendation(editedRecommendation).then(() => navigate(`/myMediaRecommendations/${id}`));
}
const handleCancel = (e)=> { //cancel and go back to details of recommendation
    e.preventDefault();
    navigate(`/myMediaRecommendations/${id}`)
}

    return (<>
    <section className="mx-5 mb-5 mt-3 ">
            <h3>Edit My Recommendation Resource: {myMediaRecommendation.title}</h3>
            <div className="border mt-3 p-3">
                <Form className="editConsultantRecommendation" onSubmit={handleSave}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" required value={myMediaRecommendation.title}
                        onChange={(e) => {
                            const recCopy = { ...myMediaRecommendation };
                            recCopy.title = e.target.value;
                            setMyMediaRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="textarea" name="content" required value={myMediaRecommendation.content}
                        onChange={(e) => {
                            const recCopy = { ...myMediaRecommendation };
                            recCopy.content = e.target.value;
                            setMyMediaRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author"  required value={myMediaRecommendation.author}
                        onChange={(e) => {
                            const recCopy = { ...myMediaRecommendation };
                            recCopy.author = e.target.value;
                            setMyMediaRecommendation(recCopy);
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publicationDate">Publication Date</Label>
                        <Input type="date" name="publicationDate" value={myMediaRecommendation.publicationDateString}
                        onChange={(e) => {
                            const recCopy = { ...myMediaRecommendation };
                            recCopy.publicationDate = e.target.value;
                            setMyMediaRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="linkAddress">Media Web Page</Label>
                        <Input type="url" name="linkAddress" value={myMediaRecommendation.linkAddress}
                        onChange={(e) => {
                            const recCopy = { ...myMediaRecommendation };
                            recCopy.linkAddress = e.target.value;
                            setMyMediaRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="select" name="subject" defaultValue="none" required value={myMediaRecommendation.subjectId}
                        onChange={(e) => {
                            const recCopy = { ...myMediaRecommendation };
                            recCopy.subjectId = e.target.value;
                            setMyMediaRecommendation(recCopy);
                        }}>
                            <option value="none" disabled hidden>Select Subject</option>
                            {subjects.map((sub) => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="resourceType">Resource Type</Label>
                        <Input type="select" name="resourceType" defaultValue="none" required value={myMediaRecommendation.resourceTypeId}
                        onChange={(e) => {
                            const recCopy = { ...myMediaRecommendation };
                            recCopy.resourceTypeId = e.target.value;
                            setMyMediaRecommendation(recCopy);
                        }}>
                            <option value="none" disabled hidden>Select Resource Type</option>
                            {resourceTypes.map((r) => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Button className="button mr-2">Save</Button>
                    <Button onClick={handleCancel} className="button m-2">Cancel</Button>
                </Form>
            </div>
        </section>
    </>)
}