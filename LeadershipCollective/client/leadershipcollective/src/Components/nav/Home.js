import React from "react"
import { Link } from "react-router-dom"
import { EventsToDisplay } from "../events/EventsToDisplay"
import { useState, useEffect } from "react"
import { getAllEvents } from "../../Managers/LeadershipEventManager"




export const Home = ()=> {
    const [leadershipEvents, setLeadershipEvents] = useState([]);
    
    const getLeadershipEvents = ()=>{
        getAllEvents().then(allEvents=>setLeadershipEvents(allEvents))
    };
    useEffect(()=>{
        getLeadershipEvents();
    },[]);
    
    
    return (
        
    <div className="homePage">
    <h4 className="homeSeparator">Recommended Resources for Higher Education Development</h4>
    
        
        <section className="homeSearchItems">
            <div className="searchItem">
            <Link to="/consultantRecommendations" className="searchText">Search for a Consultant?</Link>
            </div>
            
            <div className="searchItem">
            <Link to="/mediaRecommendations" className="searchText" >Search Articles/Books/Videos</Link>
            </div>
        </section>
        <section className="homeMyRecommendations">
            <Link className="homeLink" to="/myConsultantRecommendations"  >My Consultant Recommendations</Link>
            <Link className="homeLink" to="/myMediaRecommendations"  >My Media Recommendations</Link>
        </section>

        <section className="homeEvents">
        <div className="homeEventSectionTitle">2023 Conferences and Events </div>
            <p className="homeEventSectionTitle">For Higher Ed Leaders</p>
            <div className="eventCard">
            {
                leadershipEvents.map((event) => (
                    <EventsToDisplay key={event.id} event={event} />
                ))
            }
            </div>
        </section>
    
    </div>
       
    )
}