namespace WebAPI.Models.Response
{
    public class OrderFullInfoResponse : OrderResponse
    {
        public string UserFullName { get; set; }
        public string Address { get; set; }
    }
}
