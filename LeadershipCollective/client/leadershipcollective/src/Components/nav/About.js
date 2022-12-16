import React from "react";
import { UncontrolledCarousel } from "reactstrap";

export const About = ()=> {

return(<>
<h1>Our Purpose</h1>
    <section className="aboutParagraph">
        <div>Institutions of Higher Education are regularly affected by internal challenges and by external pressures, requiring a continuous charge for marked advancement.  Over the last 50 years alone, there have been social and technological changes that push institutions toward a trajectory of increased complexity and comprehensiveness. </div><br/> 
        
        <div>Higher Ed Leaders require quality resources for institutional development. Access to best resources can make an approach to change an efficient process. Leaders need access and awareness of best, most current innovation. From Strategic Planning, to Budgets, to Diversity and Inclusion, our purpose is to provide knowledge of best resources. </div>


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