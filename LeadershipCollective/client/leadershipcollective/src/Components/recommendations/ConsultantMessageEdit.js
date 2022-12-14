import React from "react"
import { CardLink } from "reactstrap"


export const ConsultantMessageEdit = ({message})=> {
    
   
   
    
    return(<>
    <CardLink href={`/ConsultantRecMessage/${message.id}/Edit`} className="text-muted"  >Edit</CardLink>
     
    
    </>)
}