using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

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
            //_userProfileRepository = userProfileRepository;
            _consultantRecommendationRepository = consultantRecommendationRepository;
        }

        // GET: api/<ConsultantRecommendationController>
        [HttpGet]
        public IActionResult Get()
        {
             return Ok(_consultantRecommendationRepository.GetAll());
        }

        //// GET api/<ConsultantRecommendationController>/5
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

        //// POST api/<ConsultantRecommendationController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ConsultantRecommendationController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ConsultantRecommendationController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
