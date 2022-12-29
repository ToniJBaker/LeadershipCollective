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
const handleCancel = (e)=> { //cancel and go back to details of recommendation
    e.preventDefault();
    navigate(`/myConsultantRecommendation/${id}`)
}


return(<>

<section className="mx-5 mb-5 mt-3 ">
            <h3>Edit My Recommendation for Consultant: {myConsultantRecommendation.name}</h3>
            <div className="border mt-3 p-3">
                <Form className="editConsultantRecommendation" onSubmit={handleSave}>
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

                    {/* <FormGroup>
                        <Label for="serviceArea">Service Area</Label>
                        <Input type="text" name="serviceArea"  required value={myConsultantRecommendation.serviceArea}
                        onChange={(e) => {
                            const recCopy = { ...myConsultantRecommendation };
                            recCopy.serviceArea = e.target.value;
                            setMyConsultantRecommendation(recCopy);
                        }}/>
                    </FormGroup> */}
                    
                    <FormGroup>
                    <Label for="serviceArea">Service Area</Label>
                    <Input type="select" name="serviceArea" required value={myConsultantRecommendation.serviceArea}
                    onChange={(e) => {
                        const recCopy = { ...myConsultantRecommendation };
                        recCopy.serviceArea = e.target.value;
                        setMyConsultantRecommendation(recCopy);
                    }}>
                        <option selected>Current: {myConsultantRecommendation.serviceArea}</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </Input>
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