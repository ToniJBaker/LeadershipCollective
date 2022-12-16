import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUser, updateUserProfileType } from "../../Managers/UserProfileManager";
import { getAllUserTypes } from "../../Managers/UserTypeManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useEffect, useState } from "react";


export const UserProfileTypeEdit = ()=> {

    const navigate = useNavigate();
    const { id } = useParams();
    const [userTypes, setUserTypes] = useState([]);
    const [userProfile, setUserProfile] = useState({
        id: 0,
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        dateCreated: 0,
        userTypeId: 0,
});

const getUserProfile = () => {
    getSingleUser(id).then(p => {
        setUserProfile(p);
    })
};
useEffect(()=> {
    getUserProfile();
    
}, []);
    
    
    const getUserTypes = () => {
        getAllUserTypes().then(t => {
            setUserTypes(t)});
    };
    useEffect(()=> {
        
        getUserTypes();
    }, []);
    
    const handleSave = (e) => {
        e.preventDefault();

        const editedUserProfile = {
            id: userProfile.id,
            displayName: userProfile.displayName,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email,
            dateCreated: userProfile.dateCreated,
            userTypeId: parseInt(userProfile.userTypeId),
            
        };
        
        updateUserProfileType(editedUserProfile).then((res)=>setUserProfile(res))
         //updateUserProfile needs to go in Manager
        .then(()=>navigate("/users"));
    };
    const handleCancel = (e)=> { //cancel and go back to list of users
        e.preventDefault();
        navigate("/users")
    }

    return (<>
    <section className="mx-5 mb-5 mt-3 ">
            <h3>Edit User Type For : {userProfile.displayName}</h3>
            <div className="border mt-3 p-3">
                <Form onSubmit={handleSave} >
                    <FormGroup>

                        <Label for="userType">Current User Type is {userProfile?.userType?.name}</Label>
                            <Input type="select" name="userType" defaultValue="none" required value={userProfile.userTypeId}
                            onChange={(e) => {
                                const userProfileCopy = { ...userProfile };
                                userProfileCopy.userTypeId = e.target.value;
                                setUserProfile(userProfileCopy);
                            }}>
                                <option value="none" disabled hidden>Select a User Type</option>
                                {userTypes.map((userType) => (
                                    <option key={userType.id} value={userType.id}>{userType.name}</option>
                                ))}
                            </Input>

                        
                    </FormGroup>
                    <Button className="button mr-2">Save</Button>
                    <Button onClick={handleCancel} className="button m-2">Cancel</Button>
                </Form>
            </div>
        </section>
    </>)
}