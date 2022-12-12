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

        
        
        //// GET api/<ConsultantMessageController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<ConsultantMessageController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ConsultantMessageController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ConsultantMessageController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
