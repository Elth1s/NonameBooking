using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Filter
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int FilterGroupId { get; set; }  

        [ForeignKey(nameof(FilterGroupId))]
        public virtual FilterGroup FilterGroup { get; set; }
    }
}
