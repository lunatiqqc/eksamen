using System;
using System.Collections.Generic;

namespace CoreMovieHunterAPI.Models
{
    public partial class Movie
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;
        public string Rating { get; set; } = null!;
        public string Duration { get; set; } = null!;
        public string Genres { get; set; } = null!;
        public string ReleaseDate { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Trailer { get; set; } = null!;
        public string Director { get; set; } = null!;
        public string Writers { get; set; } = null!;
        public string Stars { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
