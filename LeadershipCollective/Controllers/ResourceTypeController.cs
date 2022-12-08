using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceTypeController : ControllerBase
    {
        private readonly IResourceTypeRepository _resourceTypeRepository;
        public ResourceTypeController(IResourceTypeRepository resourceTypeRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _resourceTypeRepository = resourceTypeRepository;
        }


        // GET: api/<ResourceTypeController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_resourceTypeRepository.GetAll());
        }

        //// GET api/<ResourceTypeController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<ResourceTypeController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ResourceTypeController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ResourceTypeController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
