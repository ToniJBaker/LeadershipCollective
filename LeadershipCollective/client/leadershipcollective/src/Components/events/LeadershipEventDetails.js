import React from "react";
import { CardLink } from "reactstrap";
import { Link } from "react-router-dom";
import { EventDelete } from "./EventDelete";

export const LeadershipEventDetails = ({event, getLeadershipEvents})=> {
    
    
    
    return(<>
    
    <tr>
            <th scope="row">
                <div >
                    {event.title}
                </div>
                <Link to={`/event/${event.id}/edit`}> edit event details</Link>
            </th>
                
            <td>
                {event.date}
            </td>
            <td>
                {event.location} 
            </td>
            <td>
            <CardLink href={event.linkAddress}>Register for Event</CardLink>
            </td>
            <td>
            <EventDelete key={event.id} event={event} getLeadershipEvents={getLeadershipEvents} />
            </td>

        </tr>
    </>)
}