using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Users_module.Migrations
{
    /// <inheritdoc />
    public partial class initial1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "501, 1"),
                    email_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phone_no = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    booking_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "601, 1"),
                    email_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phone_no = table.Column<long>(type: "bigint", nullable: false),
                    tour_id = table.Column<int>(type: "int", nullable: false),
                    date_of_travel = table.Column<DateTime>(type: "datetime2", nullable: false),
                    no_of_person = table.Column<int>(type: "int", nullable: false),
                    vacation_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_id_fk = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.booking_id);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    transaction_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1001, 1"),
                    card_no = table.Column<int>(type: "int", nullable: false),
                    cvv_no = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    booking_id_fk = table.Column<int>(type: "int", nullable: false),
                    booking_id = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.transaction_id);
                    table.ForeignKey(
                        name: "FK_Payments_Bookings_booking_id",
                        column: x => x.booking_id,
                        principalTable: "Bookings",
                        principalColumn: "booking_id");
                    table.ForeignKey(
                        name: "FK_Payments_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_user_id",
                table: "Bookings",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_booking_id",
                table: "Payments",
                column: "booking_id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_user_id",
                table: "Payments",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
