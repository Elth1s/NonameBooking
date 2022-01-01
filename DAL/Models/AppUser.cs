using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }


        public virtual ICollection<Apartment> Apartments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }


    }
}
