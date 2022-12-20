import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../nav/Home";
import { ConsultantRecommendationAdd } from "../recommendations/ConsultantRecommendationAdd";
import { ConsultantRecommendationDetails } from "../recommendations/ConsultantRecommendationDetails";
import { ConsultantRecommendationsList } from "../recommendations/ConsultantRecommendationsList";
import { MyConsultantRecommendations } from "../recommendations/MyConsultantRecommendations";
import { MyConsultantRecommendationDetails } from "../recommendations/MyConsultantRecommendationDetails";
import { MyConsultantRecommendationEdit } from "../recommendations/MyConsultationRecommendationEdit";
import { UserList } from "../users/UserList";
import { MyMediaRecommendations } from "../mediaRecommendations/MyMediaRecommendations";
import { About } from "../nav/About";
import { EventList } from "../events/EventList";
import { EventDetailsEdit } from "../events/EventDetailsEdit";
import { EventAdd } from "../events/EventAdd";
import { UserProfileTypeEdit } from "../users/UserProfileTypeEdit";
import { MediaRecommendationsList } from "../mediaRecommendations/MediaRecommendationsList";
import { MediaRecommendationDetails } from "../mediaRecommendations/MediaRecommendationDetails";
import { MyMediaRecommendationEdit } from "../mediaRecommendations/MyMediaRecommendationEdit";
import { MyMediaRecommendationDetails } from "../mediaRecommendations/MyMediaRecommendationDetails";





export default function ApplicationViews(){
return(

    <Routes>
    
    {localStorage.getItem("userProfile") ? //if a logged in user navigate to home page, otherwise directed to login
        <Route path="/" element={<Home />} />
        :
        <Route path="/" element={<Navigate to="/login" />} />
    }

    <Route path="/users" element={<UserList />} />
    <Route path="/users/:id/editUserType" element={<UserProfileTypeEdit />} />

    <Route path="/events" element={<EventList />} />
    <Route path="/events/add" element={<EventAdd />} />
    <Route path="/event/:id/edit" element={<EventDetailsEdit />} />
    
    <Route path="/aboutApplication" element={<About />} />

    <Route path="/mediaRecommendations" element={<MediaRecommendationsList />} />
    <Route path="/mediaRecommendation/:id" element={<MediaRecommendationDetails />} />
    <Route path="/myMediaRecommendations" element={<MyMediaRecommendations />} />
    <Route path="/myMediaRecommendations/:id" element={<MyMediaRecommendationDetails />} />
    <Route path="/myMediaRecommendations/:id/edit" element={<MyMediaRecommendationEdit />} />


   

    <Route path="/consultantRecommendations" element={<ConsultantRecommendationsList />} />
    <Route path="/consultantRecommendation/:id" element={<ConsultantRecommendationDetails />} />
    <Route path="/myConsultantRecommendations" element={<MyConsultantRecommendations />} />
    <Route path="/myConsultantRecommendations/:id/edit" element={<MyConsultantRecommendationEdit />} />
    <Route path="/myConsultantRecommendation/:id" element={<MyConsultantRecommendationDetails />} />
    <Route path="/addConsultantRecommendation" element={<ConsultantRecommendationAdd />} />
    


   




        
    </Routes>
    )
}