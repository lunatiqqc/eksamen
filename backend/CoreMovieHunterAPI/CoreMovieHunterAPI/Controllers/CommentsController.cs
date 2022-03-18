#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreMovieHunterAPI.Models;
using Microsoft.AspNetCore.Authorization;

using System.Security.Claims;

namespace CoreMovieHunterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly MovieHunterMembersContext _context;

        public CommentsController(MovieHunterMembersContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(long id)
        {
            var message = await _context.Comments.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(long id, Comment message)
        {
            if (id != message.Id)
            {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            var user = await GetCurrentUserAsync();


            comment.MemberId = user.Id;


            comment.Alias = user.Alias;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.Id,  }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(long id)
        {
            var message = await _context.Comments.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(long id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }

        private async Task<Member> GetCurrentUserAsync()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                var Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

                return await _context.Members.Where(member => member.Username == Username).FirstOrDefaultAsync();
               
            }
            return null;
        }
    }
}
