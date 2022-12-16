using LeadershipCollective.Models;
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

        // GET api/<LeadershipEventController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var leadershipEvent = _leadershipEventRepository.GetById(id);
            if (leadershipEvent == null)
            {
                return NotFound();
            }
            return Ok(leadershipEvent);
        }

        // POST api/<LeadershipEventController>
        [HttpPost]
        public IActionResult Post(LeadershipEvent leadershipEvent)
        {
            _leadershipEventRepository.Add(leadershipEvent);
            return CreatedAtAction("Get", new { id = leadershipEvent.Id }, leadershipEvent);
        }

        // PUT api/<LeadershipEventController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, LeadershipEvent leadershipEvent)
        {
            if (id !=leadershipEvent.Id)
            {
                return BadRequest();
            }
            _leadershipEventRepository.Update(leadershipEvent);
            return NoContent();
        }

        // DELETE api/<LeadershipEventController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _leadershipEventRepository.Delete(id);
            return NoContent();
        }
    }
}
