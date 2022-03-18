using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreMovieHunterAPI.Migrations.MovieHunterMembers
{
    /// <inheritdoc />
    public partial class membertoken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Members",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "Members");
        }
    }
}
