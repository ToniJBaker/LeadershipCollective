import React, { useState } from "react";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { CardLink, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteConsultantRecMessage } from "../../Managers/ConsultantRecMessageManager";

export const ConsultantMessageDetails = ({message})=> {
    const localUser = getCurrentUser();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    const toggleDeleteConfirm = (e) => {  //toggle delete element
        e.preventDefault();
        setConfirmDelete(!confirmDelete);
    };

    const handleDelete= () => { //delete button confirmation
        deleteConsultantRecMessage(message.id)
        .then(navigate("/myConsultantRecommendations"))
    };
    
    return (<>
          
          <div>{message.userProfile.displayName} : {message.content}</div>
          <div className="text-muted">{message.dateCreated}</div> 
          {localUser.id === message.userProfileId
            ?<div>
              <CardLink href={`/ConsultantRecMessage/${message.id}/Edit`} className="text-muted"  >Edit</CardLink>
              <CardLink href={"javascript:void(0)"} onClick={toggleDeleteConfirm} className="text-muted"  >Delete</CardLink>
              {confirmDelete ?
                    <ListGroup flush>
                        <ListGroupItem className="text-danger">
                            This message will permanently be deleted.
                            Are you sure you want to delete this message?
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
            </div>
            :""
          }
        <hr/>
    
    </>)
}