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
                    
                    {/* <FormGroup>
                    <Label for="serviceArea">Service Area</Label>
                        <Input type="text" id="serviceArea" required placeholder="Consultant Service Area"
                        onChange={(e) => setServiceArea(e.target.value)} />
                    </FormGroup> */}
                    
                    <FormGroup>
                    <Label for="serviceArea">Service Area</Label>
                    <Input type="select" id="serviceArea" placeholder="select service area state"
                    onChange={(e) => setServiceArea(e.target.value)} >
                        <option selected>Choose...</option>
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