namespace WebAPI.Models
{
    public class ApartmentRequest : ApartmentSearch
    {
        public int CityId { get; set; }
        public int? Take { get; set; }
        public int? Page { get; set; }   
    } 
}
