using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    internal class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }


        public virtual ICollection<Apartment> Apartments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }


    }
}
