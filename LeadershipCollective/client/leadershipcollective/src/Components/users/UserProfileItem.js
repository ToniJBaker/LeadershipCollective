import React from "react";
import { Link } from "react-router-dom";

export const UserProfileItem = ({user}) => {

    
    return (<>
        <tr>
            
            <td>
                {user.fullName}
            </td>
            <td>
                {user.displayName}
            </td>
            
            <td>
                {user.userType.name} <Link to={`/users/${user.id}/editUserType`}>Edit</Link> 
            </td>

        </tr>
    
    </>)
}