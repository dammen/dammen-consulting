using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dammenConsulting.Controllers
{
    public class HomeController : Controller
    {
        private SignInManager<IdentityUser> _signInManager;

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, SignInManager<IdentityUser> signInManager)
        {
            _logger = logger;
            _signInManager = signInManager;

        }

        [HttpGet]
        [Route("")]
        [ResponseCache(NoStore = true, Duration = 0)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public ActionResult Index()
        {
            return File("~/index.html", "text/html");
        }

        [HttpGet]
        [Authorize]
        [Route("admin")]
        [Produces("text/html")]
        [ResponseCache(NoStore = true, Duration = 0)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public ActionResult Admin()
        {
            if (User.Identity.IsAuthenticated && _signInManager.IsSignedIn(User))
            {
                return File("~/index.html", "text/html");
            }
            
            return Redirect("/");
            
        }
        
    }

}