import React, { useState } from "react";
import { ListGroup, ListGroupItem, Button, CardLink } from "reactstrap";
import { deleteConsultantRecMessage } from "../../Managers/ConsultantRecMessageManager";

export const ConsultantMessageDelete = ({message , changeMessageState}) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    

    const toggleDeleteConfirm = (e) => {  //toggle delete element
        e.preventDefault();
        setConfirmDelete(!confirmDelete);
    };

    const handleDelete= (e) => { //delete button confirmation
        e.preventDefault();
        deleteConsultantRecMessage(message.id)
        .then((res)=>{changeMessageState(res)});
    }
return(<>
    <CardLink href={"javascript:void(0)"} onClick={toggleDeleteConfirm} className="text-muted"  >Delete</CardLink>
              {confirmDelete ?
                    <ListGroup   flush>
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

    </>)

}