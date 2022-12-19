import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form,Button, Label, Input, FormGroup } from "reactstrap";
import { getEventById, updateEvent } from "../../Managers/LeadershipEventManager";

export const EventDetailsEdit = ()=> {
    const navigate = useNavigate();
    const {id} = useParams();
    
    const [event, setEvent] = useState({
        title:undefined,
        date: undefined,
        location: undefined,
        content: undefined,
        imageLocation: undefined,
        linkAddress:undefined
        
    });

    const getSingleEvent = ()=> {
        getEventById(id).then((res)=>setEvent(res))
    };

    useEffect(()=>{
        getSingleEvent();
    }, []);

    const handleSave = (e)=> {  //handle saving new information into edit event form
        e.preventDefault();
        const editedEvent = {
            id: id,
            title:event.title,
            date: event.date,
            location: event.location,
            content: event.content,
            imageLocation: event.imageLocation,
            linkAddress:event.linkAddress
        };
        updateEvent(editedEvent).then(() => navigate(`/events/`));
    }
    
    const handleCancel = (e)=> { //cancel and go back to list of events
        e.preventDefault();
        navigate(`/events`)
    }

return(<>

<section className="mx-5 mb-5 mt-3 ">
<h3>Edit Event: </h3><h3 className="eventTitle">{event.title}</h3>
<div className="border mt-3 p-3">
<Form className="editEventForm" onSubmit={handleSave}>
    
    <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="content" required value={event.title}
        onChange={(e) => {
        const eventCopy = { ...event };
        eventCopy.title = e.target.value;
        setEvent(eventCopy);
        }} />
    </FormGroup>
    <FormGroup>
        <Label for="date">Date</Label>
        <Input type="date" name="date" required value={event.date}
        onChange={(e) => {
        const eventCopy = { ...event };
        eventCopy.date = e.target.value;
        setEvent(eventCopy);
        }} />
    </FormGroup>
    <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" required value={event.location}
        onChange={(e) => {
        const eventCopy = { ...event };
        eventCopy.location = e.target.value;
        setEvent(eventCopy);
        }} />
    </FormGroup>
    <FormGroup>
        <Label for="content">Content</Label>
        <Input type="textarea" name="content" required value={event.content}
        onChange={(e) => {
        const eventCopy = { ...event };
        eventCopy.content = e.target.value;
        setEvent(eventCopy);
        }} />
    </FormGroup>
    <FormGroup>
        <Label for="imageLocation">Image link Address</Label>
        <Input type="text" name="imageLocation" required value={event.imageLocation}
        onChange={(e) => {
        const eventCopy = { ...event };
        eventCopy.imageLocation = e.target.value;
        setEvent(eventCopy);
        }} />
    </FormGroup>
    <FormGroup>
        <Label for="linkAddress">Link to Register</Label>
        <Input type="text" name="linkAddress" required value={event.linkAddress}
        onChange={(e) => {
        const eventCopy = { ...event };
        eventCopy.linkAddress = e.target.value;
        setEvent(eventCopy);
        }} />
    </FormGroup>
    <Button className="button mr-2">Save</Button>
    <Button onClick={handleCancel} className="button m-2">Cancel</Button>
</Form>

</div>
</section>
</>)

}