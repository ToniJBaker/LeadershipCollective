import React from "react";
import { CardLink } from "reactstrap";
import { Link } from "react-router-dom";

export const LeadershipEventDetails = ({event})=> {
    
    
    
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

        </tr>
    </>)
}