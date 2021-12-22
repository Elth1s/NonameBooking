﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    internal class City
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int CountryId { get; set; }

        [ForeignKey(nameof(CountryId))]
        public virtual Country Country { get; set; }
    }
}
