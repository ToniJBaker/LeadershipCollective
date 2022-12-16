import React, { useEffect, useRef, useState } from "react"
import {  useParams } from "react-router-dom"
import {  getConsultantRecommendationById } from "../../Managers/ConsultantRecommendationManager";
import { Card, CardBody,CardLink, CardSubtitle, CardText, CardImg, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { addConsultantRecMessage } from "../../Managers/ConsultantRecMessageManager";
import { ConsultantMessageDetails } from "./ConsultantMessageDetails";

export const ConsultantRecommendationDetails =()=> {
    const {id} = useParams();
    const [consultantRecommendation, setConsultantRecommendation] = useState({});
    const [wasMessagePosted, setWasMessagePosted]= useState(false);
    
    
    //items for adding a new message
    const localUser = getCurrentUser();
    const messageRef= useRef();

    const getConRecommendation = () => {
        getConsultantRecommendationById(id).then(singleRecommendation => setConsultantRecommendation(singleRecommendation))
    };
    useEffect(()=> {
        getConRecommendation()
        messageRef.current.value=""
    }, [wasMessagePosted]);

    const handleSave = (e)=> {
      e.preventDefault()
      console.log(messageRef.current.value)
      const newConsultantMessageToApi={
        content: messageRef.current.value,
        userProfileId: localUser.id,
        consultantRecommendationId:id
      }
      addConsultantRecMessage(newConsultantMessageToApi)
      .then((m)=>{
        console.log("this is m in add consultant rec message", m)
        setConsultantRecommendation(m)
      })
      .then(()=>{setWasMessagePosted(!wasMessagePosted)});

    }

return(<>

<Card className="my-2">
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/900/180"
      style={{
        height: 180
      }}
      top
      width="100%"
    />
    <CardBody>
        <h1>{consultantRecommendation.name}</h1>
      
      <CardSubtitle className="mb-2 text-muted" tag="h6"> Consulting for: {consultantRecommendation.subject?.name} </CardSubtitle>

      <CardSubtitle className="mb-2 text-muted" tag="h6"> {consultantRecommendation.email} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6"> {consultantRecommendation.phoneNumber} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6">Service Area: {consultantRecommendation.serviceArea} </CardSubtitle>

      <CardText>{consultantRecommendation.content}</CardText>
      <CardText>
        <CardLink href="/consultantRecommendations"  className="text-muted" >Go Back</CardLink>
        <hr/>
        <CardLink href={consultantRecommendation.linkAddress}  className="text-muted" >{consultantRecommendation.name} Web Page</CardLink><br/>
        <small className="text-muted">Recommended by {consultantRecommendation.userProfile?.fullName} </small>
      </CardText>
    </CardBody>
    
  </Card>
  <Card >
    <div className="messagesOnConsultantRecommendations">
      <section className="headerMessages">
        <h3>Join The Conversation</h3> 
        <div className="text-muted">messages {consultantRecommendation.messages?.length}</div>
      </section>
      
      <Form onSubmit={handleSave}>
        <FormGroup>
          <Label for="content"></Label>
          <Input innerRef={messageRef} type="text" placeholder="type message here" name="content"></Input>
          <Button  className="button m-2" color="primary" size="sm" >Save</Button>
        </FormGroup>
      </Form>
      
      <section className="contentMessages" >
        {consultantRecommendation?.messages?.map((message)=> (<ConsultantMessageDetails key={message.id} message={message} changeMessageState={getConRecommendation } />))}        
      </section>
    
    </div>
  </Card>
</>)

}