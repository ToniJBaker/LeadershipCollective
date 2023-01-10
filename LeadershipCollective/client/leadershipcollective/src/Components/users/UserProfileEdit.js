import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getCurrentUser, getSingleUser, updateUserProfile } from "../../Managers/UserProfileManager";

export const UserProfileEdit = ()=> {

    const localUser = getCurrentUser();
    const navigate = useNavigate();
    const [myProfile, setMyProfile] = useState({
        firstName: undefined,
        lastName: undefined,
        displayName: undefined,
        email: undefined,
    });
    
    const getCurrentUserProfile = ()=>{
        getSingleUser(localUser.id).then(user => {setMyProfile(user);
        })
    }
    useEffect(()=>{
        getCurrentUserProfile();
    },[]);

    const handleSave = (e)=> {  //handle saving new information into edit userProfile form, navigate back to home
        e.preventDefault();
    
        const editedProfile = {
            id: myProfile.id,
            firstName: myProfile.firstName,
            lastName: myProfile.lastName,
            email: myProfile.email,
            displayName: myProfile.displayName
             
        };
        updateUserProfile(editedProfile).then(() => navigate(`/`));
    }
    
    const handleCancel = (e)=> { //cancel and go back to home page
        e.preventDefault();
        navigate(`/`)
    }
    
    return (<>
    <h1>edit my profile</h1>
    <section className="mx-5 mb-5 mt-3 " >
            <h3>Edit My Profile</h3>
            <div className="border mt-3 p-3">
            <Form className="editConsultantRecommendation" onSubmit={handleSave} >
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" required value={myProfile.firstName}
                        onChange={(e) => {
                            const userCopy = { ...myProfile };
                            userCopy.firstName = e.target.value;
                            setMyProfile(userCopy);
                        }} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" required value={myProfile.lastName}
                        onChange={(e) => {
                            const userCopy = { ...myProfile };
                            userCopy.lastName = e.target.value;
                            setMyProfile(userCopy);
                        }} />
                </FormGroup>
                <FormGroup>
                    <Label for="displayName">Display Name</Label>
                    <Input type="text" name="displayName" required value={myProfile.displayName}
                        onChange={(e) => {
                            const userCopy = { ...myProfile };
                            userCopy.displayName = e.target.value;
                            setMyProfile(userCopy);
                        }} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" required value={myProfile.email}
                        onChange={(e) => {
                            const userCopy = { ...myProfile };
                            userCopy.email = e.target.value;
                            setMyProfile(userCopy);
                        }} />
                </FormGroup>
            
            <Button className="button mr-2">Save</Button>
            <Button onClick={handleCancel} className="button m-2">Cancel</Button>
            </Form>
            </div>
    </section>        
    </>)
}