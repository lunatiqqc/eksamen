#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreMovieHunterAPI.Models;
using System.Security.Claims;

namespace CoreMovieHunterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly MovieHunterMembersContext _context;
        private readonly IWebHostEnvironment _env;

        public MembersController(MovieHunterMembersContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await _context.Members.ToListAsync();
        }

        [HttpPost("member")]
        public IActionResult MemberGetter()
        {
            var currentUser = GetCurrentUser();

            if (currentUser == null)
            {
                return NotFound();
            }

            return Ok(currentUser);


        }

        private Member  GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                var Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
                var Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value;
                var Name = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value;

                return _context.Members.Where(o => o.Username.ToLower() == Username.ToLower()).FirstOrDefault();
                
            }
            return null;
        }



        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(long id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // PUT: api/Movies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(long id, Member member)
        {
            if (id != member.Id)
            {
                return BadRequest();
            }

            if (Tools.IsBase64String(member.Image))
            {
                Tools.DeleteFile(_env.WebRootPath, _context.Members.AsNoTracking().FirstOrDefault(e => e.Id == id).Image);
                member.Image = Tools.ConvertBase64ToFile(member.Image, _env.WebRootPath);
            }

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Movies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(Member member)
        {
            var userExisits = _context.Members.Where(o => o.Username.ToLower() == member.Username.ToLower() || o.Email == member.Email).FirstOrDefault();

            if (userExisits != null)
            {
                return StatusCode(409);
            }

            if (Tools.IsBase64String(member.Image))
            {
                member.Image = Tools.ConvertBase64ToFile(member.Image, _env.WebRootPath);
            }

            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMember", new { id = member.Id }, member);
        }

        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(long id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }
    
            _context.Members.Remove(member);
            Tools.DeleteFile(_env.WebRootPath, member.Image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberExists(long id)
        {
            return _context.Members.Any(e => e.Id == id);
        }

        
    }
}
