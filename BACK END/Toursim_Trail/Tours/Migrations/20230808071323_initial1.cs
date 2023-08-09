using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tours.Migrations
{
    /// <inheritdoc />
    public partial class initial1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    admin_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.admin_id);
                });

            migrationBuilder.CreateTable(
                name: "ImageGallery",
                columns: table => new
                {
                    image_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "00, 1"),
                    Carousel = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageGallery", x => x.image_id);
                });

            migrationBuilder.CreateTable(
                name: "Tour_agency",
                columns: table => new
                {
                    tour_owner_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "101, 1"),
                    email_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tour_company_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tour_company_address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phone_no = table.Column<long>(type: "bigint", nullable: true),
                    company_logo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tour_agency", x => x.tour_owner_id);
                });

            migrationBuilder.CreateTable(
                name: "Add_Tours",
                columns: table => new
                {
                    tour_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "201, 1"),
                    tour_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tour_location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tour_duration_days = table.Column<int>(type: "int", nullable: true),
                    tour_duration_nights = table.Column<int>(type: "int", nullable: true),
                    tour_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tour_price = table.Column<int>(type: "int", nullable: true),
                    nearby_hotels = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    costfor_two = table.Column<int>(type: "int", nullable: true),
                    hotel_cusine = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hotel_image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tour_Agencytour_owner_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Add_Tours", x => x.tour_id);
                    table.ForeignKey(
                        name: "FK_Add_Tours_Tour_agency_tour_Agencytour_owner_id",
                        column: x => x.tour_Agencytour_owner_id,
                        principalTable: "Tour_agency",
                        principalColumn: "tour_owner_id");
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    feedback_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "301, 1"),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    rating = table.Column<int>(type: "int", nullable: false),
                    feedback = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Add_Tourtour_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.feedback_id);
                    table.ForeignKey(
                        name: "FK_Feedbacks_Add_Tours_Add_Tourtour_id",
                        column: x => x.Add_Tourtour_id,
                        principalTable: "Add_Tours",
                        principalColumn: "tour_id");
                });

            migrationBuilder.CreateTable(
                name: "Itineraries",
                columns: table => new
                {
                    itinerary_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "401, 1"),
                    day = table.Column<int>(type: "int", nullable: true),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    location_image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Add_Tourtour_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Itineraries", x => x.itinerary_id);
                    table.ForeignKey(
                        name: "FK_Itineraries_Add_Tours_Add_Tourtour_id",
                        column: x => x.Add_Tourtour_id,
                        principalTable: "Add_Tours",
                        principalColumn: "tour_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Add_Tours_tour_Agencytour_owner_id",
                table: "Add_Tours",
                column: "tour_Agencytour_owner_id");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_Add_Tourtour_id",
                table: "Feedbacks",
                column: "Add_Tourtour_id");

            migrationBuilder.CreateIndex(
                name: "IX_Itineraries_Add_Tourtour_id",
                table: "Itineraries",
                column: "Add_Tourtour_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "ImageGallery");

            migrationBuilder.DropTable(
                name: "Itineraries");

            migrationBuilder.DropTable(
                name: "Add_Tours");

            migrationBuilder.DropTable(
                name: "Tour_agency");
        }
    }
}
