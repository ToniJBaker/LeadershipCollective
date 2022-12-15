import React, {useState, useEffect} from "react";
import { getAllEvents } from "../../Managers/LeadershipEventManager";
import { LeadershipEventDetails } from "./LeadershipEventDetails";
import { Table } from "reactstrap";


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
    <div className="m-5">
    <Table>
      <thead>
        <tr>
          <th>Event Title</th>
          <th>Date</th>
          <th>Location</th>
          <th>View Details</th>
        </tr>
      </thead>
      <tbody>
          {leadershipEvents.map((event) => (
            <LeadershipEventDetails key={event.id} event={event} />
          ))}
      </tbody>
    </Table>
    </div>
    

</>)

}