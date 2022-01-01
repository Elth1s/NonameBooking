using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Order
    {
        public string Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public string UserId { get; set; }
        public int ApartmentId { get; set; }
        public int OrderStatusId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual AppUser User { get; set; }
        [ForeignKey(nameof(ApartmentId))]
        public virtual Apartment Apartment { get; set; }
        [ForeignKey(nameof(OrderStatusId))]
        public virtual OrderStatus OrderStatus { get; set; }
        
    }
}
