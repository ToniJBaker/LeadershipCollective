using System.Collections.Generic;
using LeadershipCollective.Models;
using System;

namespace LeadershipCollective.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        UserProfile GetByEmail(string email);
        void Add(UserProfile userProfile);
        void UpdateUserType(int id, UserProfile userProfile);
        void UpdateUserProfile(int id, UserProfile userProfile);

    }
}
