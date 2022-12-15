import React from "react";
import { UncontrolledCarousel } from "reactstrap";

export const About = ()=> {

return(<>
<h1>Our Purpose</h1>
    <section className="aboutParagraph">
        Higher Education Leaders require quality resources for institutional advancement. Access to best resources can make an approach to change an efficient process. From Strategic Planning to Budgets to Diversity and Inclusion, our purpose is to provide knowledge of best resources.   
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