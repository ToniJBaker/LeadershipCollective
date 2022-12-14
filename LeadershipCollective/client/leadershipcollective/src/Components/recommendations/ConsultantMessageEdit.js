import React, {useState} from "react"
import { CardLink, FormGroup, Label, Input } from "reactstrap"



export const ConsultantMessageEdit = ({message})=> {
    const [confirmEdit, setConfirmEdit] = useState(false);
    

    const toggleEditConfirm = (e) => {  //toggle delete element
        e.preventDefault();
        setConfirmEdit(!confirmEdit);
    };

    const handleEdit = (e)=>{
        e.preventDefault();

    };
    
    
    return(<>
    <CardLink href={`/consultantRecommendations`} className="text-muted"  onClick={toggleEditConfirm} >Edit</CardLink>
    {confirmEdit ?
                    <FormGroup onSubmit={handleEdit}>
                    <Label for="content">Content</Label>
                    <Input type="textarea" name="content" required value={message.content}
                    onChange={(e) => {
                        const messageCopy = { ...message };
                        messageCopy.content = e.target.value;
                        // setMyConsultantRecommendation(messageCopy);
                    }} />
                </FormGroup>
                : <></>}
       
    </>)
}