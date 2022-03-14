using System;
using System.Collections.Generic;

namespace CoreMovieHunterAPI.Models
{
    public partial class Message
    {
        public long Id { get; set; }
        public string Content { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
