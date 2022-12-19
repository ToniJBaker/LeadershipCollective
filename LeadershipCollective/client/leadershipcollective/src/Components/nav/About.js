import React from "react";
import { UncontrolledCarousel } from "reactstrap";

export const About = ()=> {

return(<>
<h1>Our Purpose</h1>
    <section className="aboutParagraph">
        <div>Institutions of Higher Education are regularly affected by internal challenges and by external pressures, requiring a continuous charge for marked advancement.  Over the last 50 years alone, there have been social and technological changes that push institutions toward a trajectory of increased complexity and comprehensiveness. </div><br/> 
        
        <div>High performing leaders can create dynamic organizations.  Strong leadership can benefit the employees and students of the college, and also the community.  A great college enhances socio-economic mobility, and can improve the economy and performance of a community. </div><br/>
        <div>Even the best community college leaders need development.  Even more importantly, the middle managers that are transitioning into leadership must be supported, and guide their divisions forward.</div><br/>
        <div>External partners, supports, and resources are essential to develop these leaders.  Very few colleges have the resources to have extensive internal development plans, and even they benefit from strong external connections.  Training resources, facilitators, and consultants help college leaders excel in their roles and help institutions solve community challenges.</div>


    </section>
<UncontrolledCarousel
  items={[
    {
      altText: 'Slide 1',
      caption: 'Slide 1',
      key: 1,
      src: 'https://picsum.photos/id/123/1200/600'
    },
    {
      altText: 'Slide 2',
      caption: 'Slide 2',
      key: 2,
      src: 'https://picsum.photos/id/456/1200/600'
    },
    {
      altText: 'Slide 3',
      caption: 'Slide 3',
      key: 3,
      src: 'https://picsum.photos/id/678/1200/600'
    }
  ]}
 />
</>)

}