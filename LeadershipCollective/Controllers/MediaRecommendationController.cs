using LeadershipCollective.Models;
using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaRecommendationController : ControllerBase
    {

        private readonly IMediaRecommendationRepository _mediaRecommendationRepository;
        public MediaRecommendationController(IMediaRecommendationRepository mediaRecommendationRepository)
        {

            _mediaRecommendationRepository = mediaRecommendationRepository;
        }
        // GET: api/<MediaRecommendationController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_mediaRecommendationRepository.GetAll());
        }

        // GET api/<MediaRecommendationController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var mediaRecommendation = _mediaRecommendationRepository.GetById(id);
            if (mediaRecommendation == null)
            {
                return NotFound();
            }
            return Ok(mediaRecommendation);
        }

        // POST api/<MediaRecommendationController>
        [HttpPost]
        public IActionResult Post(MediaRecommendation mediaRecommendation)
        {
            _mediaRecommendationRepository.Add(mediaRecommendation);
            return CreatedAtAction("Get", new { id = mediaRecommendation.Id }, mediaRecommendation);
        }

        // PUT api/<MediaRecommendationController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, MediaRecommendation mediaRecommendation)
        {
            if (id !=mediaRecommendation.Id)
            {
                return BadRequest();
            }
            _mediaRecommendationRepository.Update(mediaRecommendation);
            return NoContent();
        }

        // DELETE api/<MediaRecommendationController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _mediaRecommendationRepository.Delete(id);
            return NoContent();
        }
    }
}
