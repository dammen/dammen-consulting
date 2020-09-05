using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dammenConsulting.Controllers
{
    [Route("account")]
    public class AccountController : Controller
    {
        private SignInManager<IdentityUser> _signInManager;
        private UserManager<IdentityUser> _userManager;
        private readonly ILogger<HomeController> _logger;

        public AccountController(ILogger<HomeController> logger,
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager)
        {
            _logger = logger;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("signin")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        public async Task<ActionResult> SignIn([FromBody] SignInRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Email,
                request.Password, request.RememberMe, lockoutOnFailure: true);
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in.");
                return LocalRedirect("account");
            }

            return BadRequest("log in failed");
        }

        [HttpPost("signout")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        public async Task<ActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return Ok("Successfully signed out");
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        public async Task<ActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new IdentityUser {UserName = request.Email, Email = request.Email};
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                await _signInManager.SignInAsync(user, isPersistent: false);
                return LocalRedirect("Account");
            }

            return BadRequest("Registration failed");
        }
    }

    public class SignInRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }

    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}