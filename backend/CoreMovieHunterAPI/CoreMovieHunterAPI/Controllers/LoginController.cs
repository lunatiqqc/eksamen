
using Microsoft.AspNetCore.Mvc;

using CoreMovieHunterAPI.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json.Linq;

namespace CoreMovieHunterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MovieHunterMembersContext _context;
        private readonly IWebHostEnvironment _env;
        private IConfiguration _config;

        public LoginController(MovieHunterMembersContext context, IWebHostEnvironment env, IConfiguration config)
        {
            _context = context;
            _env = env;
            _config = config;
        }

        // GET: api/Movies
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] MemberLogin memberLogin)
        {
            var user = Authenticate(memberLogin);

            

            if (user != null)
            {
                var token = Generate(user);

                return Ok(token);
            }

            return NotFound("User not found");
        }

        private string Generate(Member member)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, member.Username),
                new Claim(ClaimTypes.Email, member.Email),
                new Claim(ClaimTypes.Name, member.Name),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(60 * 24 * 14),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

   

        private Member Authenticate(MemberLogin memberLogin)
        {
            var currentUser = _context.Members.Where(o => o.Username.ToLower() == memberLogin.Username.ToLower() && o.Password == memberLogin.Password).FirstOrDefault();

            if (currentUser != null)
            {
                return currentUser;
            }

            return null;
        }
    }
}
