using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class BookingDbContext : IdentityDbContext
    {
        public BookingDbContext(DbContextOptions<BookingDbContext> options) : base(options)
        {

        }

        internal DbSet<Apartment> Apartments { get; set; }
        internal DbSet<AppUser> AppUsers { get; set; }
        internal DbSet<City> Cities { get; set; }
        internal DbSet<Country> Countries { get; set; }
        internal DbSet<Filter> Filters { get; set; }
        internal DbSet<FilterGroup> FilterGroups { get; set; }
        internal DbSet<Order> Orders { get; set; }
        internal DbSet<OrderStatus> OrderStatuses { get; set; }
        internal DbSet<TypeOfApartment> TypeOfApartments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }
    }
}
