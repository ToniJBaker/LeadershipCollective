import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Label, Input, FormGroup } from "reactstrap";
import { addEvent } from "../../Managers/LeadershipEventManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";

export const EventAdd = ()=> {
    const navigate = useNavigate();
    const localUser= getCurrentUser();
    const userProfileId = localUser.id;

    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [content, setContent] = useState();
    const [location, setLocation] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [linkAddress, setLinkAddress] = useState();
   

    const handleSave = (e) => { //add new Consultant Recommendation to database
        e.preventDefault();
        const newEventToApi = {
            title, date, content, location, imageLocation, linkAddress, userProfileId };
            addEvent(newEventToApi)
            .then(()=>{
                navigate(`/events`)
            })
    };

    const handleCancel = (e)=> { //cancel and go back to list of events
        e.preventDefault();
        navigate(`/events`)
    }
    
    return(<>
    <section className="mx-5 mb-5 mt-3 ">
    <h3>Add Event</h3>
    <div className="border mt-3 p-3">
        <Form onSubmit={handleSave}>
            <FormGroup>
                <Label for="title">Title of Event</Label>
                <Input type="text" id="title" required placeholder="Event Title"
                onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input type="text" id="date" required placeholder="Event Date"
                onChange={(e) => setDate(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="location">Location</Label>
                <Input type="text" id="location" required placeholder="Event Location"
                onChange={(e) => setLocation(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content/Details</Label>
                <Input type="text" id="content" required placeholder="Event Content"
                onChange={(e) => setContent(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="imageLocation">Image Address</Label>
                <Input type="text" id="imageLocation" required placeholder="Add Image Address or Null"
                onChange={(e) => setImageLocation(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="linkAddress">Content/Details</Label>
                <Input type="text" id="linkAddress" required placeholder="Add Link to Register or Null"
                onChange={(e) => setLinkAddress(e.target.value)} />
            </FormGroup>
            
            <Button className="button mr-2">Save</Button>
            <Button onClick={handleCancel} className="button m-2">Cancel</Button>
        </Form>

    </div>
    </section>
    </>)
}