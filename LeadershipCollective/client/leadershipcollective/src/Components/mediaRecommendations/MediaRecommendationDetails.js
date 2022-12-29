import React, { useEffect, useState, useRef } from "react";
import { getMediaRecommendationById } from "../../Managers/MediaRecommendationManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { Card, CardImg, CardBody, CardSubtitle, CardText, CardLink, Form, Input,FormGroup, Button, Label } from "reactstrap";
import { useParams } from "react-router";
import { MediaMessageDetails } from "./MediaMessageDetails";
import { addMediaRecMessage } from "../../Managers/MediaRecMessageManager";



export const MediaRecommendationDetails = ()=> {
    const {id} = useParams();
    const localUser = getCurrentUser();
    const [mediaRecommendation, setMediaRecommendation] = useState({});
    const messageRef= useRef();
    const [wasMessagePosted, setWasMessagePosted]= useState(false);

    //fetch call GET a single recommendation by the id
    const getSingleMediaRecommendation = ()=> {
        getMediaRecommendationById(id).then((res)=>setMediaRecommendation(res))
    };
    useEffect(()=>{
        getSingleMediaRecommendation()
        messageRef.current.value=""
      }, [wasMessagePosted]);
   

    const handleSave = (e)=> {
      e.preventDefault()
      console.log(messageRef.current.value)
      const newMediaMessageToApi={
        content: messageRef.current.value,
        userProfileId: localUser.id,
        mediaRecommendationId:id
      }
      addMediaRecMessage(newMediaMessageToApi)
      .then((m)=>{
        console.log("this is m in add consultant rec message", m)
        setMediaRecommendation(m)
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
        <h1>{mediaRecommendation.title}</h1>
      
      <CardSubtitle className="mb-2 text-muted" tag="h6"> Subject: {mediaRecommendation.subject?.name} </CardSubtitle>

      <CardSubtitle className="mb-2 text-muted" tag="h6"> {mediaRecommendation.author} </CardSubtitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6"> {mediaRecommendation.publicationDateString} </CardSubtitle>
      

      <CardText>{mediaRecommendation.content}</CardText>
      <CardText>
        <CardLink href="/mediaRecommendations"  className="text-muted" >Go Back</CardLink>
        <hr/>
        <CardLink href={mediaRecommendation.linkAddress}  className="text-muted" >Purchase {mediaRecommendation.title}</CardLink><br/>
        <small className="text-muted">Recommended by {mediaRecommendation.userProfile?.fullName} </small>
      </CardText>
    </CardBody>
    
  </Card>
  <Card >
    <div className="messagesOnConsultantRecommendations">
      <section className="headerMessages">
        <h3>Join The Conversation</h3> 
        <div className="text-muted">messages {mediaRecommendation.messages?.length}</div>
      </section>
      
      <Form onSubmit={handleSave}>
        <FormGroup>
          <Label for="content"></Label>
          <Input innerRef={messageRef} type="text" placeholder="type message here" name="content"></Input>
          <Button  className="button m-2" color="primary" size="sm" >Save</Button>
        </FormGroup>
      </Form>
      
      <section className="contentMessages" >
        {mediaRecommendation?.messages?.map((message)=> (<MediaMessageDetails key={message.id} message={message} changeMessageState={getSingleMediaRecommendation } />))}        
      </section>
    
    </div>
  </Card>
</>)

}