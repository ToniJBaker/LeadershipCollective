import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addMediaRecommendation } from "../../Managers/MediaRecommendationManager";
import { getAllResourceTypes } from "../../Managers/ResourceTypeManager";
import { getAllSubjects } from "../../Managers/SubjectManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { Label, Button, FormGroup, Form, Input } from "reactstrap";


export const MediaRecommendationAdd = ()=> {
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [author, setAuthor] = useState();
    const [publicationDate, setPublicationDate] = useState();
    const [linkAddress, setLinkAddress] = useState();
    const [subjectId, setSubjectId] = useState();
    const [resourceTypeId, setResourceTypeId] = useState();

    const localUser= getCurrentUser();
    const userProfileId = localUser.id;

    const [subjects, setSubjects] = useState([]); //state for list of subjects
    const getSubjects = ()=> {
        getAllSubjects().then(s => setSubjects(s))
    };
    useEffect(()=>{
        getSubjects();
    }, []);

    const [resourceTypes, setResourceTypes]= useState([]); //state for list of ResourceTypes
    const getResourceTypes = ()=>{
        getAllResourceTypes().then(r=>setResourceTypes(r))
    };
    useEffect(()=>{
        getResourceTypes();
    },[]);

    const handleSave = (e) => { //add new Media Recommendation to database
        e.preventDefault();
        const newMediaRecommendationToApi = {
            title, content, author, publicationDate, linkAddress, subjectId, resourceTypeId, userProfileId };
            addMediaRecommendation(newMediaRecommendationToApi)
            .then(()=>{
                navigate(`/myMediaRecommendations`)
            })
    };
    const handleCancel = (e)=> { //cancel and go back to list of my recommendations
        e.preventDefault();
        navigate("/myMediaRecommendations")
    }

    return (<>
    <section className="mx-5 mb-5 mt-3 ">
        <h3>New Recommendation for Book, Article or Video</h3>
            <div className="border mt-3 p-3">
                <Form className="editConsultantRecommendation" onSubmit={handleSave}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" required placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}/>
                    </FormGroup>
                   
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="textarea" id="content" placeholder="Add Your Recommendation (cannot be left blank)" onChange={(e) => setContent(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" id="author"  placeholder="Author"
                        onChange={(e) => setAuthor(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="publicationDate">Publication Date</Label>
                        <Input type="date" id="publicationDate" placeholder="Date Published"
                        onChange={(e) => setPublicationDate(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="linkAddress">Media Web Page</Label>
                        <Input type="url" id="linkAddress" placeholder="Link to Purchase"
                        onChange={(e) => setLinkAddress(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="select" id="subject" defaultValue="none" required placeholder="Subject"
                        onChange={(e) => setSubjectId(e.target.value)}
                        >
                            <option value="none" disabled hidden>Select Subject</option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="resourceType">Resource Type</Label>
                        <Input type="select" id="resourceType" defaultValue="none" required placeholder="Resource Type"
                        onChange={(e) => setResourceTypeId(e.target.value)}
                        >
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