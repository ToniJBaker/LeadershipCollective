﻿using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;
using LeadershipCollective.Models;
using Microsoft.Extensions.Hosting;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultantRecommendationController : ControllerBase
    {
        private readonly IConsultantRecommendationRepository _consultantRecommendationRepository;
        public ConsultantRecommendationController(IConsultantRecommendationRepository consultantRecommendationRepository)
        {
            
            _consultantRecommendationRepository = consultantRecommendationRepository;
        }

        // GET: api/<ConsultantRecommendationController>
        [HttpGet]
        public IActionResult Get()
        {
             return Ok(_consultantRecommendationRepository.GetAll());
        }

        // GET api/<ConsultantRecommendationController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var consultantRecommendation = _consultantRecommendationRepository.GetById(id);
            if (consultantRecommendation == null)
            {
                return NotFound();
            }
            return Ok(consultantRecommendation);
        }

        // POST api/<ConsultantRecommendationController>
        [HttpPost]
        public IActionResult Post(ConsultantRecommendation consultantRecommendation)
        {
            _consultantRecommendationRepository.Add(consultantRecommendation);
            return CreatedAtAction("Get", new { id = consultantRecommendation.Id }, consultantRecommendation);
        }

        // PUT api/<ConsultantRecommendationController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, ConsultantRecommendation consultantRecommendation)
        {
            if (id !=consultantRecommendation.Id)
            {
                return BadRequest();
            }
            _consultantRecommendationRepository.Update(consultantRecommendation);
            return NoContent();
        }

        // DELETE api/<ConsultantRecommendationController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _consultantRecommendationRepository.Delete(id);
            return NoContent();
        }
        // GET api/<ConsultantRecommendationController>/5
        [HttpGet("search/{id}")]
        public IActionResult Search(int id)
        {
            return Ok(_consultantRecommendationRepository.SearchBySubjectId(id));
        }

        // GET api/<ConsultantRecommendationController>/5
        [HttpGet("searchByServiceArea")]
        public IActionResult Search(string criterion)
        {
            return Ok(_consultantRecommendationRepository.SearchByServiceArea(criterion));
        }
    }
}
