using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CoreMovieHunterAPI.Models
{
    public partial class MovieHunterMembersContext : DbContext
    {
        public MovieHunterMembersContext()
        {
        }

        public MovieHunterMembersContext(DbContextOptions<MovieHunterMembersContext> options)
            : base(options)
        {
        }



        public virtual DbSet<Member> Members { get; set; } = null!;

        public virtual DbSet<Comment> Comments { get; set; } = null!;






    }
}
