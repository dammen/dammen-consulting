using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace dammenConsulting.Controllers
{
    public class ConfigController : Controller
    {
        private SignInManager<IdentityUser> _signInManager;

        public ConfigController(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpGet("config")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ConfigResponse))]
        public ActionResult Index()
        {
            var conf = new ConfigResponse() {Name = User.Identity.Name};

            if (User.Identity.IsAuthenticated && _signInManager.IsSignedIn(User))
            {
                conf.IsLoggedIn = true;
            }
            else
            {
                conf.IsLoggedIn = false;
            }

            return Ok(conf);
        }
    }

    public class ConfigResponse
    {
        public string Name { get; set; }
        public bool IsLoggedIn { get; set; }
    }
}