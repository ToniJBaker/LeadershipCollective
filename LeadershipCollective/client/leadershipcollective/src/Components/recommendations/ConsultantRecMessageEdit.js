import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import { addConsultantRecMessage, getConsultantRecMessageById } from "../../Managers/ConsultantRecMessageManager";

export const ConsultantRecMessageEdit = ()=> {
const {id} = useParams();
const navigate = useNavigate();
const[message, setMessage] = useState({
    content: undefined
});

const getSingleConsultantRecMessage = ()=> {
    getConsultantRecMessageById(id).then(singleMessage => setMessage(singleMessage))
};

useEffect(()=>{
    getSingleConsultantRecMessage();
},[]);

const handleSaveEdit = (e)=> {   //work on editing a message and navigating
    e.preventDefault()
    const editedMessage={
      content: message.content,
    }
    addConsultantRecMessage(editedMessage)
    .then((m)=>{setMessage(m)
    .then(() => navigate(`/consultantRecommendation/${message.consultantRecommendationId}`));
    })
  }

  const handleCancel = (e)=> { //cancel and go back to list of my recommendations
    e.preventDefault();
    navigate(`/consultantRecommendation/${message.consultantRecommendationId}`)
}

return(<>

    <section className="mx-5 mb-5 mt-3 ">
            <h3>Edit Message</h3>
            <div className="border mt-3 p-3">
                <Form onSubmit={handleSaveEdit}>
                    <FormGroup>
                        <Label for="name">Content</Label>
                        <Input type="text" name="name" required value={message.content}
                        onChange={(e) => {
                            const messageCopy = { ...message };
                            messageCopy.content = e.target.value;
                            setMessage(messageCopy);
                        }} />
                    </FormGroup>
                    <Button className="button mr-2">Save</Button>
                    <Button onClick={handleCancel} className="button m-2">Cancel</Button> 
                </Form>
            </div>
    </section>

</>)

}