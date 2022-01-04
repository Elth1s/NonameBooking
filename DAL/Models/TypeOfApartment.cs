using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class TypeOfApartment : IAggregateRoot
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Apartment> Apartments { get; set; }
    }
}
