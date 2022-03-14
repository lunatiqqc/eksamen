using System;
using System.Collections.Generic;

namespace CoreMovieHunterAPI.Models
{
    public partial class News
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public byte[] Date { get; set; } = null!;
    }
}
