using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadershipEventController : ControllerBase
    {
        private readonly ILeadershipEventRepository _leadershipEventRepository;
        public LeadershipEventController(ILeadershipEventRepository leadershipEventRepository)
        {

            _leadershipEventRepository = leadershipEventRepository;
        }


        // GET: api/<LeadershipEventController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_leadershipEventRepository.GetAll());
        }

        //// GET api/<LeadershipEventController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<LeadershipEventController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<LeadershipEventController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<LeadershipEventController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
