using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class UpdateModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Filters_Apartments_ApartmentId",
                table: "Filters");

            migrationBuilder.DropIndex(
                name: "IX_Filters_ApartmentId",
                table: "Filters");

            migrationBuilder.DropColumn(
                name: "ApartmentId",
                table: "Filters");

            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApartmentFilter",
                columns: table => new
                {
                    ApartmentsId = table.Column<int>(type: "int", nullable: false),
                    FiltersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentFilter", x => new { x.ApartmentsId, x.FiltersId });
                    table.ForeignKey(
                        name: "FK_ApartmentFilter_Apartments_ApartmentsId",
                        column: x => x.ApartmentsId,
                        principalTable: "Apartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApartmentFilter_Filters_FiltersId",
                        column: x => x.FiltersId,
                        principalTable: "Filters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "File",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApartmentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_File", x => x.Id);
                    table.ForeignKey(
                        name: "FK_File_Apartments_ApartmentId",
                        column: x => x.ApartmentId,
                        principalTable: "Apartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentFilter_FiltersId",
                table: "ApartmentFilter",
                column: "FiltersId");

            migrationBuilder.CreateIndex(
                name: "IX_File_ApartmentId",
                table: "File",
                column: "ApartmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApartmentFilter");

            migrationBuilder.DropTable(
                name: "File");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ApartmentId",
                table: "Filters",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Filters_ApartmentId",
                table: "Filters",
                column: "ApartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Filters_Apartments_ApartmentId",
                table: "Filters",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id");
        }
    }
}
