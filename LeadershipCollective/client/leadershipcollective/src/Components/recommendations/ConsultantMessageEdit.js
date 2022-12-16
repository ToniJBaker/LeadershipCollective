import React, {useEffect, useState} from "react"
import { CardLink, FormGroup, Label, Input, Button, Form } from "reactstrap"
import { getConsultantRecMessageById, updateConsultantRecMessage } from "../../Managers/ConsultantRecMessageManager";



export const ConsultantMessageEdit = ({message, changeMessageState})=> {
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [messageToEdit, setMessageToEdit] = useState({});

    const getMessage = ()=>{
        getConsultantRecMessageById(message.id).then(singleMessage => setMessageToEdit(singleMessage))
    };

useEffect(()=>{
getMessage();
},[]);

    const toggleEditConfirm = (e) => {  //toggle delete element
        e.preventDefault();
        setConfirmEdit(!confirmEdit);
    };

    const handleEdit = (e)=>{
        e.preventDefault();
        const editedMessage = {
            id: messageToEdit.id,
            content: messageToEdit.content
        };
        updateConsultantRecMessage(editedMessage).then((res)=>{changeMessageState(res)})
        setConfirmEdit(!confirmEdit);
    };
    
    
    return(<>
    <CardLink href={`/consultantRecommendations`} className="text-muted"  onClick={toggleEditConfirm} >Edit</CardLink>
    {confirmEdit ?<div>
                    <Form onSubmit={handleEdit} >
                    <FormGroup >
                        <Label for="content">Content</Label>
                        <Input type="textarea" name="content" required value={messageToEdit.content}
                        onChange={(e) => {
                            const messageCopy = { ...messageToEdit };
                            messageCopy.content = e.target.value;
                            setMessageToEdit(messageCopy);
                          
                        }} />
                    <Button className="button mr-2">Save</Button>  
                  </FormGroup>
                  </Form>
                </div>
                : <></>}
       
    </>)
}