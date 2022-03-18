using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreMovieHunterAPI.Migrations.MovieHunterMembers
{
    /// <inheritdoc />
    public partial class membersUsername : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Members",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "Members");
        }
    }
}
