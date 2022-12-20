import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";
import { UserProfileItem } from "./UserProfileItem";



export const UserList = () => {
    const [allUserProfiles, setAllUserProfiles] = useState([]);

    //method and useEffect to get all user profiles
    const getUserProfiles = ()=> {
        getAllUserProfiles().then(allUsers => setAllUserProfiles(allUsers))
    }
    useEffect(()=> {
        getUserProfiles();
    }, []);

    
    
    return(<>
    <h4 className="m-5">All Users</h4>
    <div className="m-5">
    <Table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Display Name</th>
          <th>Email</th>
          <th>User Type</th>
         
          
        </tr>
      </thead>
      <tbody>
          {allUserProfiles.map((user) => (
            <UserProfileItem key={user.id} user={user} setAllUserProfile={setAllUserProfiles} />
          ))}
      </tbody>
    </Table>
    </div>
    
    </>)
}