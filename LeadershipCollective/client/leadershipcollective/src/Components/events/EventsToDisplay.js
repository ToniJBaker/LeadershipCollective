import React from "react";
import {  Card, CardImg, CardTitle,  CardText, CardBody, CardLink } from "reactstrap";



export const EventsToDisplay = ({event})=> {

return (<section>
<Card className="eventCard">
<CardBody>
      <CardTitle tag="h5">
        {event.title}
      </CardTitle><hr/>
      <CardText>
        {event.content}
      </CardText>
      <CardText>
        <small className="text-muted">
          {event.dateString}
        </small><br/>
        <small className="text-muted">
          {event.location}
        </small><hr/>
        <CardLink href={event.linkAddress}>Register for Event</CardLink>
      </CardText>
    </CardBody>
    <CardImg
      alt="Card image cap"
      bottom
      src={event.imageLocation}
      style={{
        height: 250
        
      }}
      width="50%"
      
    />

    </Card>
   
</section>)

}