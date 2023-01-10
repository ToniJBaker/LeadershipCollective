using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using LeadershipCollective.Models;
using LeadershipCollective.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {

        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userProfileRepository = userProfileRepository;
        }


        // GET: api/<UserProfileController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        // GET api/<UserProfileController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userProfileRepository.GetByEmail(email);
            if(email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //POST api/<UserProfileController>
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.DateCreated = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByEmail",
                new { email = userProfile.Email},
                userProfile);
        }

        // PUT api/<UserProfileController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<UserProfileController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        [HttpPut("{id}/updateUserType")]
        public IActionResult PutUpdateUserType(int id, UserProfile userProfile)
        {

            if (userProfile == null)
            {
                return NotFound();
            }
            _userProfileRepository.UpdateUserType(id, userProfile);
            return Ok(userProfile);
        }

        [HttpPut("{id}/updateUserProfile")]
        public IActionResult PutUpdateUserProfile(int id, UserProfile userProfile)
        {

            if (userProfile == null)
            {
                return NotFound();
            }
            _userProfileRepository.UpdateUserProfile(id, userProfile);
            return Ok(userProfile);
        }
    }
}
