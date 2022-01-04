namespace WebAPI.Models.Response
{
    public class FilterResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FilterGroupId { get; set; }

        public FilterResponse(int id, string name, int filterGroupId)
        {
            Id = id;
            Name = name;
            FilterGroupId = filterGroupId;
        }
    }
}
