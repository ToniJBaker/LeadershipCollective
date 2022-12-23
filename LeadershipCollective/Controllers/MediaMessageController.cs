using LeadershipCollective.Models;
using LeadershipCollective.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeadershipCollective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaMessageController : ControllerBase
    {
        private readonly IMediaMessageRepository _mediaMessageRepository;
        public MediaMessageController(IMediaMessageRepository mediaMessageRepository)
        {

            _mediaMessageRepository = mediaMessageRepository;
        }
        // GET: api/<MediaMessageController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_mediaMessageRepository.GetAll());
        }

        // GET api/<MediaMessageController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var mediaRecMessage = _mediaMessageRepository.GetById(id);
            if (mediaRecMessage == null)
            {
                return NotFound();
            }
            return Ok(mediaRecMessage);
        }

        // POST api/<MediaMessageController>
        [HttpPost]
        public IActionResult Post(MediaRecMessage mediaRecMessage)
        {
            _mediaMessageRepository.Add(mediaRecMessage);
            return CreatedAtAction("Get", new { id = mediaRecMessage.Id }, mediaRecMessage);
        }

        // PUT api/<MediaMessageController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, MediaRecMessage mediaRecMessage)
        {
            if (id !=mediaRecMessage.Id)
            {
                return BadRequest();
            }
            _mediaMessageRepository.Update(mediaRecMessage);
            return NoContent();
        }

        // DELETE api/<MediaMessageController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _mediaMessageRepository.Delete(id);
            return NoContent();
        }
    }
}
