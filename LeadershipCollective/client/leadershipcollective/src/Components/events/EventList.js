import React, {useState, useEffect} from "react";
import { getAllEvents } from "../../Managers/LeadershipEventManager";
import { LeadershipEventDetails } from "./LeadershipEventDetails";
import { CardLink, Table } from "reactstrap";


export const EventList = ()=> {
    const [leadershipEvents, setLeadershipEvents] = useState([]);
    
    const getLeadershipEvents = ()=>{
        getAllEvents().then(allEvents=>setLeadershipEvents(allEvents))
    };
    useEffect(()=>{
        getLeadershipEvents();
    },[]);


return (<>

<h4 className="m-5">All Events</h4>
<CardLink href="/events/add" className="m-5">Add Event</CardLink>

    <div className="m-5">
    <Table  >
      <thead>
        <tr>
          <th>Event Title</th>
          <th>Date</th>
          <th>Location</th>
          <th>View Details</th>
          <th>Delete Event</th>

        </tr>
      </thead>
      <tbody>
          {leadershipEvents.map((event) => (
            <LeadershipEventDetails key={event.id} event={event} getLeadershipEvents={getLeadershipEvents} />
          ))}
      </tbody>
    </Table>
    </div>
    

</>)

}