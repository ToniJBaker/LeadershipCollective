﻿using LeadershipCollective.Models;
using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultantMessageController : ControllerBase
    {

        private readonly IConsultantMessageRepository _consultantMessageRepository;
        public ConsultantMessageController(IConsultantMessageRepository consultantMessageRepository)
        {

            _consultantMessageRepository = consultantMessageRepository;
        }
        
        // GET: api/<ConsultantMessageController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_consultantMessageRepository.GetAll());
        }



        // GET api/<ConsultantMessageController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var consultantRecMessage = _consultantMessageRepository.GetById(id);
            if (consultantRecMessage == null)
            {
                return NotFound();
            }
            return Ok(consultantRecMessage);
        }

        // POST api/<ConsultantMessageController>
        [HttpPost]
        public IActionResult Post(ConsultantRecMessage consultantRecMessage)
        {
            _consultantMessageRepository.Add(consultantRecMessage);
            return CreatedAtAction("Get", new { id = consultantRecMessage.Id }, consultantRecMessage);
        }

        // PUT api/<ConsultantMessageController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, ConsultantRecMessage consultantRecMessage)
        {
            if (id !=consultantRecMessage.Id)
            {
                return BadRequest();
            }
            _consultantMessageRepository.Update(consultantRecMessage);
            return NoContent();
        }

        // DELETE api/<ConsultantMessageController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _consultantMessageRepository.Delete(id);
            return NoContent();
        }
    }
}
