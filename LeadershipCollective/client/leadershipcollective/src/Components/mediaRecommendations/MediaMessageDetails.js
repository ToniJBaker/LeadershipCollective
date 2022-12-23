import React from "react";
import { getCurrentUser } from "../../Managers/UserProfileManager";


export const MediaMessageDetails = ({message, changeMessageState})=> {
    const localUser = getCurrentUser();

    return (<>
    <div>{message.userProfile.displayName} : {message.content}</div>
          <div className="text-muted">{message.dateCreatedString}</div> 
          {localUser.id === message.userProfileId
            ?<div>
              
              {/* <ConsultantMessageEdit message={message} changeMessageState={changeMessageState}/> 
              <ConsultantMessageDelete message={message} changeMessageState={changeMessageState}/> */}
              
            </div>
            :""
          }
        <hr/>
    
    </>)
}