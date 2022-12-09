using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectRepository _subjectRepository;
        public SubjectController(ISubjectRepository subjectRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _subjectRepository = subjectRepository;
        }

        // GET: api/<SubjectController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subjectRepository.GetAll());
        }

        // GET api/<SubjectController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var subject = _subjectRepository.GetSubjectById(id);
            if (subject == null)
            {
                return NotFound();
            }
            return Ok(subject);
        }

        //// POST api/<SubjectController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<SubjectController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<SubjectController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
