using System;
using System.Collections.Generic;

namespace CoreMovieHunterAPI.Models
{
    public partial class Contact
    {
        public long Id { get; set; }
        public string Content { get; set; } = null!;
    }
}
