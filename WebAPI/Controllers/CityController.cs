using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : Controller
    {   
       [HttpGet]
       public IEnumerable<string> Get()
        {
            return new string[] { "Atlanta", "New York" };
        }
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Atlanta";
        }
    }
}
