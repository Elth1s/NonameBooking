using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    internal class Apartment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }

        public int TypeOfApartmentId { get; set; }
        public int CityId { get; set; }
        public string OwnerId { get; set; }

        [ForeignKey(nameof(TypeOfApartmentId))]
        public virtual TypeOfApartment TypeOfApartment { get; set; }
        [ForeignKey(nameof(CityId))]
        public virtual City City { get; set; }
        [ForeignKey(nameof(OwnerId))]
        public virtual AppUser Owner { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Filter> Filters { get; set; }

    }
}
