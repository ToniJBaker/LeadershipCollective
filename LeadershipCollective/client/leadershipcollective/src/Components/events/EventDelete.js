import React, { useState } from "react";
import { CardLink, ListGroup, ListGroupItem, Button } from "reactstrap";
import { deleteEvent } from "../../Managers/LeadershipEventManager";

export const EventDelete = ({event, getLeadershipEvents})=> {
    const [confirmDelete, setConfirmDelete] = useState(false);
    

    const toggleDeleteConfirm = (e) => {  //toggle delete element
        e.preventDefault();
        setConfirmDelete(!confirmDelete);
    };

   const handleDelete= (e) => { //delete button confirmation
        e.preventDefault();
        deleteEvent(event.id)
        .then((res)=>getLeadershipEvents(res));//
    }
   
   return(<>
    
        <CardLink href={"javascript:void(0)"} onClick={toggleDeleteConfirm}>Delete Event</CardLink>
        {confirmDelete ?
                    <ListGroup flush>
                        <ListGroupItem className="text-danger">
                            This event will permanently be deleted.
                            Are you sure you want to delete this event?
                        </ListGroupItem>
                        <ListGroup flush>
                            <ListGroupItem>
                                <Button className="mr-3 btn-danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                                <Button onClick={toggleDeleteConfirm}>
                                    Cancel
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </ListGroup>
                : <></>}

    </>)
}