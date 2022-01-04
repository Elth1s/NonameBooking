using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class File
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ApartmentId { get; set; }
        [ForeignKey(nameof(ApartmentId))]
        public virtual Apartment Apartment { get; set; }
    }
}
