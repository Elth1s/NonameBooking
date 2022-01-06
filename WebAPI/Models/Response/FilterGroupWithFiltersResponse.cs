namespace WebAPI.Models.Response
{
    public class FilterGroupWithFiltersResponse: LookupData
    {
        public IEnumerable<FilterResponse> Filters { get; set; }
    }
}
