import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getConsultantRecommendationById } from "../../Managers/ConsultantRecommendationManager";
import { Card, CardBody,CardLink, CardSubtitle, CardText, CardImg, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { addConsultantRecMessage } from "../../Managers/ConsultantRecMessageManager";

export const ConsultantRecommendationDetails =()=> {
    const {id} = useParams();
    const [consultantRecommendation, setConsultantRecommendation] = useState({});
    

    //items for adding a new message
    const localUser = getCurrentUser();
    const [content, setContent] = useState();

    const getConRecommendation = () => {
        getConsultantRecommendationById(id).then(singleRecommendation => setConsultantRecommendation(singleRecommendation))
    };
    useEffect(()=> {
        getConRecommendation();
    }, []);

    const handleSaveNewMessage = (e)=> {
      e.preventDefault()
      const newConsultantMessageToApi={
        content: content,
        userProfileId: localUser.id,
        consultantRecommendationId: consultantRecommendation.id
      }
      addConsultantRecMessage(newConsultantMessageToApi).then((rec)=>{
        setConsultantRecommendation(rec);
      })
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
    <Form onSubmit={handleSaveNewMessage}>
      <FormGroup>
        <Label for="content"></Label>
        <Input  onChange={(e) => setContent(e.target.value)} type="text" placeholder="type message here" name="content"></Input>
        <Button className="button m-2" color="primary" size="sm" >Save</Button>
      </FormGroup>
    </Form>
    <section className="contentMessages" >
      {
      consultantRecommendation?.messages?.length
        ?consultantRecommendation.messages.map((m)=>(<>
        <div>{m.userProfile.displayName} : {m.content}</div>
        <div className="text-muted">{m.dateCreated}</div> 
        {localUser.id === m.userProfileId
          ?<CardLink href="/ConsultantRecMessageEdit" className="text-muted" >Edit</CardLink>
            
          
          :""
          
        }
       <hr/>

        </>))
        :""
      }
    </section>
    </div>
    
  </Card>
    
</>)

}