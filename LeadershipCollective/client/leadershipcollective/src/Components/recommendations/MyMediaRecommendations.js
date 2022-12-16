import React  from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

export const MyMediaRecommendations =()=> {
    return(<>
    <h1>Recommendations Here</h1>
    
        <Card >
            <div className="addingMyRecommendations">Create Recommendations<br/>
            <Link to="/addConsultantRecommendation" className="addRecommendationLink" >Add New Consultant Recommendation</Link><br/>
            <Link className="addRecommendationLink">Add New Media Recommendation</Link>
            </div>
        </Card>
        
    </>)
}