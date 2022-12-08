import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getConsultantRecommendationById, updateConsultantRecommendation } from "../../Managers/ConsultantRecommendationManager";
import { Form,FormGroup, Label, Input, Button } from "reactstrap";
import { getAllSubjects } from "../../Managers/SubjectManager";
import { getAllResourceTypes } from "../../Managers/ResourceTypeManager";

export const MyConsultantRecommendationEdit = ()=> {
const {id} = useParams();
const navigate = useNavigate();


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

//initial state for my single recommendation
const [myConsultantRecommendation, setMyConsultantRecommendation] = useState({
    name: undefined,
    content: undefined,
    email: undefined,
    phoneNumber: undefined,
    linkAddress: undefined,
    serviceArea: undefined,
    subjectId: undefined,
    resourceTypeId: undefined,
    
});

const getSingleConsultantRecommendation = () => {
    getConsultantRecommendationById(id).then(rec => {setMyConsultantRecommendation(rec);
    })
};
useEffect(()=> {
    getSingleConsultantRecommendation();
},[]);

const handleSave = (e)=> {  //handle saving new information into edit recommendation form, navigate back to this single recommendation
    e.preventDefault();

    const editedRecommendation = {
        id: myConsultantRecommendation.id,
        name: myConsultantRecommendation.name,
        content: myConsultantRecommendation.content,
        email: myConsultantRecommendation.email,
        phoneNumber: myConsultantRecommendation.phoneNumber,
        linkAddress: myConsultantRecommendation.linkAddress,
        serviceArea: myConsultantRecommendation.serviceArea,
        subjectId: parseInt(myConsultantRecommendation.subjectId),
        resourceTypeId: parseInt(myConsultantRecommendation.resourceTypeId), 
    };
    updateConsultantRecommendation(editedRecommendation).then(() => navigate(`/myConsultantRecommendations/`));

}
const handleCancel = (e)=> { //cancel and go back to list of my recommendations
    e.preventDefault();
    navigate("/myConsultantRecommendations")


}


return(<>

<section className="mx-5 mb-5 mt-3 ">
            <h3>Edit My Recommendation for Consultant: {myConsultantRecommendation.name}</h3>
            <div className="border mt-3 p-3">
                <Form onSubmit={handleSave}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" required value={myConsultantRecommendation.name}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.name = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="textarea" name="content" required value={myConsultantRecommendation.content}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.content = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email"  required value={myConsultantRecommendation.email}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.email = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="serviceArea">Service Area</Label>
                        <Input type="text" name="serviceArea"  required value={myConsultantRecommendation.serviceArea}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.serviceArea = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber">Phone Number</Label>
                        <Input type="text" name="phoneNumber" value={myConsultantRecommendation.phoneNumber}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.phoneNumber = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="linkAddress">Consultant Web Page</Label>
                        <Input type="url" name="linkAddress" value={myConsultantRecommendation.linkAddress}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.linkAddress = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="select" name="subject" defaultValue="none" required value={myConsultantRecommendation.subjectId}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.subjectId = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }}>
                            <option value="none" disabled hidden>Select Subject</option>
                            {subjects.map((sub) => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="resourceType">Resource Type</Label>
                        <Input type="select" name="resourceType" defaultValue="none" required value={myConsultantRecommendation.resourceTypeId}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.resourceTypeId = e.target.value;
                            setMyConsultantRecommendation(recCopy);
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