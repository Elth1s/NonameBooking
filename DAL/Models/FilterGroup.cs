using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class FilterGroup : IAggregateRoot
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Filter> Filters { get; set;}
    }
}
