﻿namespace WebAPI.Models
{
    public class OrderVM
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public float Total { get; set; }
        public string UserId { get; set; }
        public int ApartmentId { get; set; }
    }
}
