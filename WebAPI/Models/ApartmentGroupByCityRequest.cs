namespace WebAPI.Models
{
    public class ApartmentGroupByCityRequest:ApartmentSearch
    {
        public int? TakeCityGroup { get; set; }
        public int? TakeCityGroupWithApartment { get; set; }
        public int? TakeApartments { get; set; }   
    }
}
