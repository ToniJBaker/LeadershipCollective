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
            <div>My Recommendations</div>
            <div>Make a Recommendation</div>
        </section>
    
    </div>
       
    )
}