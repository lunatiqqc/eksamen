namespace CoreMovieHunterAPI.Models
{
    public partial class Comment
    {


        public long Id { get; set; } 

        public long MemberId { get; set; }

        public long MovieId { get; set; }
        public string Alias { get; set; } = null!;
        public string Message { get; set; } = null!;

        public DateTime Date { get; set; } = DateTime.Now;





    }
}
