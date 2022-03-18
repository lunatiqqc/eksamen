using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreMovieHunterAPI.Migrations.MovieHunterMembers
{
    /// <inheritdoc />
    public partial class commentsAlias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Alias",
                table: "Comments",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alias",
                table: "Comments");
        }
    }
}
