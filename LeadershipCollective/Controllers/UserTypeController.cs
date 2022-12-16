﻿using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {

        private readonly IUserTypeRepository _userTypeRepository;
        public UserTypeController(IUserTypeRepository userTypeRepository)
        {

            _userTypeRepository = userTypeRepository;
        }
        // GET: api/<UserTypeController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userTypeRepository.GetAll());
        }

        //// GET api/<UserTypeController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<UserTypeController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<UserTypeController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<UserTypeController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
