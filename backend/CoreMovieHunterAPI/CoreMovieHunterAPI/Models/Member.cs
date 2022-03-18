namespace CoreMovieHunterAPI.Models
{
    public partial class Member
    {


        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Email { get; set; } = null!;

        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Phonenumber { get; set; } = null!;
        public DateTime Date {  get; } = DateTime.Now;
        public string Alias { get; set; } = null!;




    }
}
