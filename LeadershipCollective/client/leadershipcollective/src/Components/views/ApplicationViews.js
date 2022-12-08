import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../nav/Home";
import { ConsultantRecommendationDetails } from "../recommendations/ConsultantRecommendationDetails";
import { ConsultantRecommendationsList } from "../recommendations/ConsultantRecommendationsList";
import { MyConsultantRecommendations } from "../recommendations/MyConsultantRecommendations";
import { MyConsultantRecommendationEdit } from "../recommendations/MyConsultationRecommendationEdit";
import { UserList } from "../users/UserList";



export default function ApplicationViews(){
return(

    <Routes>
    
    {localStorage.getItem("userProfile") ? //if a logged in user navigate to home page, otherwise directed to login
        <Route path="/" element={<Home />} />
        :
        <Route path="/" element={<Navigate to="/login" />} />
    }

    <Route path="/users" element={<UserList />} />
    <Route path="/consultantRecommendations" element={<ConsultantRecommendationsList />} />
    <Route path="/consultantRecommendation/:id" element={<ConsultantRecommendationDetails />} />
    <Route path="/myConsultantRecommendations" element={<MyConsultantRecommendations />} />
    <Route path="/myConsultantRecommendations/:id/edit" element={<MyConsultantRecommendationEdit />} />


        
    </Routes>
    )
}