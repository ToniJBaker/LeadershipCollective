import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResourceTypes } from "../../Managers/ResourceTypeManager";
import { getAllSubjects } from "../../Managers/SubjectManager";
import { Form,FormGroup, Label, Input, Button } from "reactstrap";
import { addConsultantRecommendation } from "../../Managers/ConsultantRecommendationManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";

export const ConsultantRecommendationAdd = () => {

const navigate = useNavigate();    
const [name, setName] = useState();
const [content, setContent] = useState();
const [email, setEmail] = useState();
const [phoneNumber, setPhoneNumber] = useState();
const [linkAddress, setLinkAddress] = useState();
const [serviceArea, setServiceArea] = useState();
const [subjectId, setSubjectId] = useState();
const [resourceTypeId, setResourceTypeId ]= useState();

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

const handleSave = (e) => { //add new Consultant Recommendation to database
    e.preventDefault();
    const newConsultantRecommendationToApi = {
        name, content, email, phoneNumber, linkAddress, serviceArea, subjectId, resourceTypeId, userProfileId  };
        addConsultantRecommendation(newConsultantRecommendationToApi)
        .then(()=>{
            navigate(`/myConsultantRecommendations`)
        })
};
const handleCancel = (e)=> { //cancel and go back to list of my recommendations
    e.preventDefault();
    navigate("/myConsultantRecommendations")
}



return(<>
 <section className="mx-5 mb-5 mt-3 ">
            <h3>New Recommendation for Consultant or Facilitator</h3>
            <div className="border mt-3 p-3">
                <Form className="addConsultantRecommendation" onSubmit={handleSave}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" id="name" required placeholder="Consultant Name"
                        onChange={(e) => setName(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup>
                    <Label for="content">Content</Label>
                        <Input type="text" id="content" required placeholder="Type your Recommendation"
                        onChange={(e) => setContent(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup>
                    <Label for="email">Email</Label>
                        <Input type="text" id="email" required placeholder="Consultant Email"
                        onChange={(e) => setEmail(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                        <Input type="text" id="phoneNumber" required placeholder="Consultant Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup>
                    <Label for="serviceArea">Service Area</Label>
                        <Input type="text" id="serviceArea" required placeholder="Consultant Service Area"
                        onChange={(e) => setServiceArea(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup>
                    <Label for="linkAddress">Consultant Web Page Address</Label>
                        <Input type="text" id="linkAddress" required placeholder="Consultant Web Page"
                        onChange={(e) => setLinkAddress(e.target.value)} />
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