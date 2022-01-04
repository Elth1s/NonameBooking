namespace WebAPI.Models.Response
{
    public class OrderResponse
    {
        public string Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string UserFullName { get; set; }
        public int ApartmentId { get; set; }
        public string ApartmentName { get; set; }
        public string OrderStatusName { get; set; }
    }
}
