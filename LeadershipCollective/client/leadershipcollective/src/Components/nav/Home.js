import React from "react"
import { Link } from "react-router-dom"




export const Home = ()=> {
    
    
    
    return (
    <div className="homePage">
    
     <h1 >Best Resources for Higher Education Leaders</h1>
        
        <section className="homeSearchItems">
            <div className="searchItem">
            <Link to="/consultantRecommendations" className="searchText">Search for a Consultant?</Link>
            </div>
            
            <div className="searchItem">
            <Link className="searchText" >Search Articles/Books/Videos</Link>
            </div>
        </section>
        <section className="homeMyRecommendations">
            <Link className="homeLink" to="/myConsultantRecommendations"  >My Consultant Recommendations</Link>
            <Link className="homeLink" to="/myMediaRecommendations"  >My Media Recommendations</Link>

        </section>
    
    </div>
       
    )
}