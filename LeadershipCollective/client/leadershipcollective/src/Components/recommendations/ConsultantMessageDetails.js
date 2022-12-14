import React from "react";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { ConsultantMessageEdit } from "./ConsultantMessageEdit";
import { ConsultantMessageDelete } from "./ConsultantMessageDelete";

export const ConsultantMessageDetails = ({message})=> {
    const localUser = getCurrentUser();
    
    
    return (<>
          
          <div>{message.userProfile.displayName} : {message.content}</div>
          <div className="text-muted">{message.dateCreated}</div> 
          {localUser.id === message.userProfileId
            ?<div>
              
              <ConsultantMessageEdit message={message}/> 
              <ConsultantMessageDelete message={message}/>
              
            </div>
            :""
          }
        <hr/>
    
    </>)
}