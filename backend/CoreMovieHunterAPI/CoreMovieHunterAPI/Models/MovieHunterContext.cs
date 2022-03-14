using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CoreMovieHunterAPI.Models
{
    public partial class MovieHunterContext : DbContext
    {
        public MovieHunterContext()
        {
        }

        public MovieHunterContext(DbContextOptions<MovieHunterContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; } = null!;
        public virtual DbSet<Movie> Movies { get; set; } = null!;
        public virtual DbSet<News> News { get; set; } = null!;
        public virtual DbSet<Message> Messages { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("contact");

                entity.Property(e => e.Content)
                    .HasColumnType("TEXT")
                    .HasColumnName("content");
            });

            modelBuilder.Entity<Movie>(entity =>
            {
                entity.ToTable("movies");

                entity.Property(e => e.Description)
                    .HasColumnType("TEXT")
                    .HasColumnName("description");

                entity.Property(e => e.Director)
                    .HasColumnType("TEXT")
                    .HasColumnName("director");

                entity.Property(e => e.Duration)
                    .HasColumnType("TEXT")
                    .HasColumnName("duration");

                entity.Property(e => e.Genres)
                    .HasColumnType("TEXT")
                    .HasColumnName("genres");

                entity.Property(e => e.Image)
                    .HasColumnType("TEXT")
                    .HasColumnName("image");

                entity.Property(e => e.Rating)
                    .HasColumnType("TEXT")
                    .HasColumnName("rating");

                entity.Property(e => e.ReleaseDate)
                    .HasColumnType("TEXT")
                    .HasColumnName("releaseDate");

                entity.Property(e => e.Stars)
                    .HasColumnType("TEXT")
                    .HasColumnName("stars");

                entity.Property(e => e.Title)
                    .HasColumnType("TEXT")
                    .HasColumnName("title");

                entity.Property(e => e.Trailer)
                    .HasColumnType("TEXT")
                    .HasColumnName("trailer");

                entity.Property(e => e.Writers)
                    .HasColumnType("TEXT")
                    .HasColumnName("writers");
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.ToTable("news");

                entity.Property(e => e.Content)
                    .HasColumnType("TEXT")
                    .HasColumnName("content");

                entity.Property(e => e.Date)
                    .HasColumnType("TEXT")
                    .HasColumnName("date");

                entity.Property(e => e.Title)
                    .HasColumnType("TEXT")
                    .HasColumnName("title");
            }); 

            modelBuilder.Entity<Message>(entity =>
            {
                entity.ToTable("messages");

                entity.Property(e => e.Content)
                    .HasColumnType("TEXT")
                    .HasColumnName("content");

                entity.Property(e => e.Content)
                    .HasColumnType("TEXT")
                    .HasColumnName("content");

                entity.Property(e => e.Email)
                    .HasColumnType("TEXT")
                    .HasColumnName("email");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
