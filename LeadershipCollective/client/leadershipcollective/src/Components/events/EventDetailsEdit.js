import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export const EventDetailsEdit = ()=> {
    const navigate = useNavigate();
    const {id} = useParams();
    const [event, setEvent] = useState();

    const getSingleEvent = ()=> {
//get and event by id fetch call
    };
    
    
    const handleCancel = (e)=> { //cancel and go back to list of events
        e.preventDefault();
        navigate(`/events`)
    }

return(<>
edit the details

<Button className="button mr-2">Save</Button>
<Button onClick={handleCancel} className="button m-2">Cancel</Button>
</>)

}