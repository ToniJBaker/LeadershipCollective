import React, { useEffect, useState } from "react"
import { Input,Card, CardBody, CardTitle, CardSubtitle, CardLink, CardText } from "reactstrap"
import { getConsultantRecommendations, searchConsultantRecommendationsByServiceArea, searchConsultantRecommendationsBySubjectId } from "../../Managers/ConsultantRecommendationManager";
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
    
    const handleSelect = (e)=> { //search by Subject
        e.preventDefault(); 
        if(e.target.value === "true"){
            getAllConRecommendations();
        }
        else{
            searchConsultantRecommendationsBySubjectId(e.target.value) //use .then when you have a fetch call
            .then ((rec)=>setAllConsultantRecommendations(rec))
        }
        
    };
    
    const handleSelectServiceArea = (e)=> {
        e.preventDefault();
        if(e.target.value ==="true"){
            getAllConRecommendations();
        }
        else{
            searchConsultantRecommendationsByServiceArea(e.target.value)
            .then((rec)=>setAllConsultantRecommendations(rec))
        }

    };
    
    return(<>
    <h3>Consultant/Facilitator Recommendations</h3>

        <Input type="select" name="tags" defaultValue="none" onChange={handleSelect}  >
                <option value="none" disabled hidden>Click to Search By Specialty</option>
                            <option value="true"   > Get All </option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
        </Input>
        
        {/* <Input type="select" name="tags" defaultValue="none" onChange={handleSelect}  >
                <option value="none" disabled hidden>Click to Search By Service Area</option>
                            <option value="true"   > Get All </option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
        </Input> */}
        
        
        <Input className="searchByServiceArea" type="select" name="serviceArea" defaultValue="none" onChange={handleSelectServiceArea} >
                        <option value="none" disabled hidden>Click to Search By Service Area</option>
                        <option value="true"   > Get All </option>
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
                    <CardSubtitle className="mb-2 text-muted" tag="h6">Specialty: {rec.subject.name} </CardSubtitle>
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