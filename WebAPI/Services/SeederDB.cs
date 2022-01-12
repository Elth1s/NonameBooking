using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Constants;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public static class SeederDB
    {
        public static void SeedData(this IApplicationBuilder app)
        {

            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                var countryRepos = scope.ServiceProvider.GetRequiredService<IRepository<Country>>();
                var cityRepos = scope.ServiceProvider.GetRequiredService<IRepository<City>>();
                var typeOfApartmentRepos = scope.ServiceProvider.GetRequiredService<IRepository<TypeOfApartment>>();
                var apartmentRepos = scope.ServiceProvider.GetRequiredService<IRepository<Apartment>>();
                var filterGroupRepos = scope.ServiceProvider.GetRequiredService<IRepository<FilterGroup>>();
                var filterRepos = scope.ServiceProvider.GetRequiredService<IRepository<Filter>>();
                var orderStatusRepos = scope.ServiceProvider.GetRequiredService<IRepository<OrderStatus>>();
                var orderRepos = scope.ServiceProvider.GetRequiredService<IRepository<Order>>();


                //Roles
                if (managerRole.FindByNameAsync(Roles.Admin).Result == null)
                {
                    var result = managerRole.CreateAsync(new IdentityRole
                    {
                        Name = Roles.Admin,
                        NormalizedName = Roles.Admin.ToUpper()
                    }).Result;
                }
                if (managerRole.FindByNameAsync(Roles.User).Result == null)
                {
                    var result = managerRole.CreateAsync(new IdentityRole
                    {
                        Name = Roles.User,
                        NormalizedName = Roles.User.ToUpper()
                    }).Result;
                }

                //Users
                string firstEmail = "admin@gmail.com";
                string secondEmail = "dg646726@gmail.com";
                if (manager.FindByEmailAsync(firstEmail).Result == null)
                {

                    var firstUser = new AppUser
                    {
                        Email = firstEmail,
                        UserName = firstEmail,
                        PhoneNumber = "1234567890",
                        Name = Roles.Admin,
                        Surname = Roles.Admin
                    };
                    var result = manager.CreateAsync(firstUser, "zxc_VBN123").Result;
                    result = manager.AddToRoleAsync(firstUser, Roles.Admin).Result;
                }
                if (manager.FindByEmailAsync(secondEmail).Result == null)
                {

                    var user = new AppUser
                    {
                        Email = secondEmail,
                        UserName = secondEmail,
                        PhoneNumber = "380976024149",
                        Name = "Dima",
                        Surname = "Hladunov"
                    };
                    var result = manager.CreateAsync(user, "QWEqwe123_").Result;
                    result = manager.AddToRoleAsync(user, Roles.Admin).Result;
                }

                //Country
                if (countryRepos.ListAsync().Result.Count == 0)
                {
                    var countries = new List<Country>()
                    {
                          new(){ Name= "Afghanistan", Code= "AF" },
                          new(){ Name= "Alland Islands", Code= "AX"},
                          new(){ Name= "Albania", Code= "AL" },
                          new(){ Name= "Algeria", Code= "DZ"},
                          new(){ Name= "American Samoa", Code= "AS"},
                          new(){ Name= "Andorra", Code= "AD"},
                          new(){ Name= "Angola", Code= "AO"},
                          new(){ Name= "Anguilla", Code= "AI"},
                          new(){ Name= "Antarctica", Code= "AQ"},
                          new(){ Name= "Antigua and Barbuda", Code= "AG"},
                          new(){ Name= "Argentina", Code= "AR"},
                          new(){ Name= "Armenia", Code= "AM"},
                          new(){ Name= "Aruba", Code= "AW" },
                          new(){ Name= "Australia", Code= "AU"},
                          new(){ Name= "Austria", Code= "AT"},
                          new(){ Name= "Azerbaijan", Code= "AZ"},
                          new(){ Name= "Bahamas", Code= "BS"},
                          new(){ Name= "Bahrain", Code= "BH"},
                          new(){ Name= "Bangladesh", Code= "BD"},
                          new(){ Name= "Barbados", Code= "BB"},
                          new(){ Name= "Belarus", Code= "BY"},
                          new(){ Name= "Belgium", Code= "BE"},
                          new(){ Name= "Belize", Code= "BZ"},
                          new(){ Name= "Benin", Code= "BJ"},
                          new(){ Name= "Bermuda", Code= "BM"},
                          new(){ Name= "Bhutan", Code= "BT"},
                          new(){ Name= "Bolivia", Code= "BO"},
                          new(){ Name= "Bosnia and Herzegovina", Code= "BA"},
                          new(){ Name= "Botswana", Code= "BW"},
                          new(){ Name= "Bouvet Island", Code= "BV"},
                          new(){ Name= "Brazil", Code= "BR"},
                          new(){ Name= "British Indian Ocean Territory", Code= "IO"},
                          new(){ Name= "British Virgin Islands", Code= "VG"},
                          new(){ Name= "Brunei Darussalam", Code= "BN"},
                          new(){ Name= "Bulgaria", Code= "BG"},
                          new(){ Name= "Burkina Faso", Code= "BF"},
                          new(){ Name= "Burundi", Code= "BI"},
                          new(){ Name= "Cambodia", Code= "KH"},
                          new(){ Name= "Cameroon", Code= "CM"},
                          new(){ Name= "Canada", Code= "CA"},
                          new(){ Name= "Cape Verde", Code= "CV"},
                          new(){ Name= "Cayman Islands", Code= "KY"},
                          new(){ Name= "Central African Republic", Code= "CF"},
                          new(){ Name= "Chad", Code= "TD"},
                          new(){ Name= "Chile", Code= "CL"},
                          new(){ Name= "China", Code= "CN"},
                          new(){ Name= "Christmas Island", Code= "CX"},
                          new(){ Name= "Cocos (Keeling) Islands", Code= "CC"},
                          new(){ Name= "Colombia", Code= "CO"},
                          new(){ Name= "Comoros", Code= "KM"},
                          new(){ Name= "Congo, Democratic Republic of the", Code= "CG"},
                          new(){ Name= "Congo, Republic of the", Code= "CD"},
                          new(){ Name= "Cook Islands", Code= "CK"},
                          new(){ Name= "Costa Rica", Code= "CR"},
                          new(){ Name= "Cote d'Ivoire", Code= "CI"},
                          new(){ Name= "Croatia", Code= "HR"},
                          new(){ Name= "Cuba", Code= "CU"},
                          new(){ Name= "Curacao", Code= "CW"},
                          new(){ Name= "Cyprus", Code= "CY"},
                          new(){ Name= "Czech Republic", Code= "CZ"},
                          new(){ Name= "Denmark", Code= "DK"},
                          new(){ Name= "Djibouti", Code= "DJ"},
                          new(){ Name= "Dominica", Code= "DM"},
                          new(){ Name= "Dominican Republic", Code= "DO"},
                          new(){ Name= "Ecuador", Code= "EC"},
                          new(){ Name= "Egypt", Code= "EG"},
                          new(){ Name= "El Salvador", Code= "SV"},
                          new(){ Name= "Equatorial Guinea", Code= "GQ"},
                          new(){ Name= "Eritrea", Code= "ER"},
                          new(){ Name= "Estonia", Code= "EE"},
                          new(){ Name= "Ethiopia", Code= "ET"},
                          new(){ Name= "Falkland Islands (Malvinas)", Code= "FK"},
                          new(){ Name= "Faroe Islands", Code= "FO"},
                          new(){ Name= "Fiji", Code= "FJ"},
                          new(){ Name= "Finland", Code= "FI"},
                          new(){ Name= "France", Code= "FR"},
                          new(){ Name= "French Guiana", Code= "GF"},
                          new(){ Name= "French Polynesia", Code= "PF"},
                          new(){ Name= "French Southern Territories", Code= "TF"},
                          new(){ Name= "Gabon", Code= "GA"},
                          new(){ Name= "Gambia", Code= "GM"},
                          new(){ Name= "Georgia", Code= "GE"},
                          new(){ Name= "Germany", Code= "DE"},
                          new(){ Name= "Ghana", Code= "GH"},
                          new(){ Name= "Gibraltar", Code= "GI"},
                          new(){ Name= "Greece", Code= "GR"},
                          new(){ Name= "Greenland", Code= "GL"},
                          new(){ Name= "Grenada", Code= "GD"},
                          new(){ Name= "Guadeloupe", Code= "GP"},
                          new(){ Name= "Guam", Code= "GU"},
                          new(){ Name= "Guatemala", Code= "GT"},
                          new(){ Name= "Guernsey", Code= "GG"},
                          new(){ Name= "Guinea-Bissau", Code= "GW"},
                          new(){ Name= "Guinea", Code= "GN"},
                          new(){ Name= "Guyana", Code= "GY"},
                          new(){ Name= "Haiti", Code= "HT"},
                          new(){ Name= "Heard Island and McDonald Islands", Code= "HM"},
                          new(){ Name= "Holy See (Vatican City State)",Code= "VA"},
                          new(){ Name= "Honduras", Code= "HN"},
                          new(){ Name= "Hong Kong", Code= "HK"},
                          new(){ Name= "Hungary", Code= "HU"},
                          new(){ Name= "Iceland", Code= "IS"},
                          new(){ Name= "India", Code= "IN"},
                          new(){ Name= "Indonesia", Code= "ID"},
                          new(){ Name= "Iran, Islamic Republic of", Code= "IR"},
                          new(){ Name= "Iraq", Code= "IQ"},
                          new(){ Name= "Ireland", Code= "IE"},
                          new(){ Name= "Isle of Man", Code= "IM"},
                          new(){ Name= "Israel", Code= "IL"},
                          new(){ Name= "Italy", Code= "IT"},
                          new(){ Name= "Jamaica", Code= "JM"},
                          new(){ Name= "Japan", Code= "JP"},
                          new(){ Name= "Jersey", Code= "JE"},
                          new(){ Name= "Jordan", Code= "JO"},
                          new(){ Name= "Kazakhstan", Code= "KZ"},
                          new(){ Name= "Kenya", Code= "KE"},
                          new(){ Name= "Kiribati", Code= "KI"},
                          new(){ Name= "Korea, Democratic People's Republic of",Code= "KP"},
                          new(){ Name= "Korea, Republic of", Code= "KR"},
                          new(){ Name= "Kosovo", Code= "XK"},
                          new(){ Name= "Kuwait", Code= "KW"},
                          new(){ Name= "Kyrgyzstan", Code= "KG"},
                          new(){ Name= "Lao People's Democratic Republic", Code= "LA"},
                          new(){ Name= "Latvia", Code= "LV"},
                          new(){ Name= "Lebanon", Code= "LB"},
                          new(){ Name= "Lesotho", Code= "LS"},
                          new(){ Name= "Liberia", Code= "LR"},
                          new(){ Name= "Libya", Code= "LY"},
                          new(){ Name= "Liechtenstein", Code= "LI"},
                          new(){ Name= "Lithuania", Code= "LT"},
                          new(){ Name= "Luxembourg", Code= "LU"},
                          new(){ Name= "Macao", Code= "MO"},
                          new(){ Name= "Macedonia, the Former Yugoslav Republic of", Code= "MK"},
                          new(){ Name= "Madagascar", Code= "MG"},
                          new(){ Name= "Malawi", Code= "MW"},
                          new(){ Name= "Malaysia", Code= "MY"},
                          new(){ Name= "Maldives", Code= "MV"},
                          new(){ Name= "Mali", Code= "ML"},
                          new(){ Name= "Malta", Code= "MT"},
                          new(){ Name= "Marshall Islands", Code= "MH"},
                          new(){ Name= "Martinique", Code= "MQ"},
                          new(){ Name= "Mauritania", Code= "MR"},
                          new(){ Name= "Mauritius", Code= "MU"},
                          new(){ Name= "Mayotte", Code= "YT"},
                          new(){ Name= "Mexico", Code= "MX"},
                          new(){ Name= "Micronesia, Federated States of", Code= "FM"},
                          new(){ Name= "Moldova, Republic of", Code= "MD"},
                          new(){ Name= "Monaco", Code= "MC"},
                          new(){ Name= "Mongolia", Code= "MN"},
                          new(){ Name= "Montenegro", Code= "ME"},
                          new(){ Name= "Montserrat", Code= "MS"},
                          new(){ Name= "Morocco", Code= "MA"},
                          new(){ Name= "Mozambique", Code= "MZ"},
                          new(){ Name= "Myanmar", Code= "MM"},
                          new(){ Name= "Namibia", Code= "NA"},
                          new(){ Name= "Nauru", Code= "NR"},
                          new(){ Name= "Nepal", Code= "NP"},
                          new(){ Name= "Netherlands", Code= "NL"},
                          new(){ Name= "New Caledonia", Code= "NC"},
                          new(){ Name= "New Zealand", Code= "NZ"},
                          new(){ Name= "Nicaragua", Code= "NI"},
                          new(){ Name= "Niger", Code= "NE"},
                          new(){ Name= "Nigeria", Code= "NG"},
                          new(){ Name= "Niue", Code= "NU"},
                          new(){ Name= "Norfolk Island", Code= "NF"},
                          new(){ Name= "Northern Mariana Islands", Code= "MP"},
                          new(){ Name= "Norway", Code= "NO"},
                          new(){ Name= "Oman", Code= "OM"},
                          new(){ Name= "Pakistan", Code= "PK"},
                          new(){ Name= "Palau", Code= "PW"},
                          new(){ Name= "Palestine, State of", Code= "PS"},
                          new(){ Name= "Panama", Code= "PA"},
                          new(){ Name= "Papua New Guinea", Code= "PG"},
                          new(){ Name= "Paraguay", Code= "PY"},
                          new(){ Name= "Peru", Code= "PE"},
                          new(){ Name= "Philippines", Code= "PH"},
                          new(){ Name= "Pitcairn", Code= "PN"},
                          new(){ Name= "Poland", Code= "PL"},
                          new(){ Name= "Portugal", Code= "PT"},
                          new(){ Name= "Puerto Rico", Code= "PR"},
                          new(){ Name= "Qatar", Code= "QA"},
                          new(){ Name= "Reunion", Code= "RE"},
                          new(){ Name= "Romania", Code= "RO"},
                          new(){ Name= "Russian Federation", Code= "RU"},
                          new(){ Name= "Rwanda", Code= "RW"},
                          new(){ Name= "Saint Barthelemy", Code= "BL"},
                          new(){ Name= "Saint Helena", Code= "SH"},
                          new(){ Name= "Saint Kitts and Nevis", Code= "KN"},
                          new(){ Name= "Saint Lucia", Code= "LC"},
                          new(){ Name= "Saint Martin (French part)", Code= "MF"},
                          new(){ Name= "Saint Pierre and Miquelon", Code= "PM"},
                          new(){ Name= "Saint Vincent and the Grenadines", Code= "VC"},
                          new(){ Name= "Samoa", Code= "WS"},
                          new(){ Name= "San Marino", Code= "SM"},
                          new(){ Name= "Sao Tome and Principe", Code= "ST"},
                          new(){ Name= "Saudi Arabia", Code= "SA"},
                          new(){ Name= "Senegal", Code= "SN"},
                          new(){ Name= "Serbia", Code= "RS"},
                          new(){ Name= "Seychelles", Code= "SC"},
                          new(){ Name= "Sierra Leone", Code= "SL"},
                          new(){ Name= "Singapore", Code= "SG"},
                          new(){ Name= "Sint Maarten (Dutch part)", Code= "SX"},
                          new(){ Name= "Slovakia", Code= "SK"},
                          new(){ Name= "Slovenia", Code= "SI"},
                          new(){ Name= "Solomon Islands", Code= "SB"},
                          new(){ Name= "Somalia", Code= "SO"},
                          new(){ Name= "South Africa", Code= "ZA"},
                          new(){ Name= "South Georgia and the South Sandwich Islands", Code= "GS"},
                          new(){ Name= "South Sudan", Code= "SS"},
                          new(){ Name= "Spain", Code= "ES"},
                          new(){ Name= "Sri Lanka", Code= "LK"},
                          new(){ Name= "Sudan", Code= "SD"},
                          new(){ Name= "Suriname", Code= "SR"},
                          new(){ Name= "Svalbard and Jan Mayen", Code= "SJ"},
                          new(){ Name= "Swaziland", Code= "SZ"},
                          new(){ Name= "Sweden", Code= "SE"},
                          new(){ Name= "Switzerland", Code= "CH"},
                          new(){ Name= "Syrian Arab Republic", Code= "SY"},
                          new(){ Name= "Taiwan, Province of China", Code= "TW"},
                          new(){ Name= "Tajikistan", Code= "TJ" },
                          new(){ Name= "Thailand", Code= "TH"},
                          new(){ Name= "Timor-Leste", Code= "TL"},
                          new(){ Name= "Togo", Code= "TG"},
                          new(){ Name= "Tokelau", Code= "TK"},
                          new(){ Name= "Tonga", Code= "TO"},
                          new(){ Name= "Trinidad and Tobago", Code= "TT"},
                          new(){ Name= "Tunisia", Code= "TN"},
                          new(){ Name= "Turkey", Code= "TR"},
                          new(){ Name= "Turkmenistan", Code= "TM"},
                          new(){ Name= "Turks and Caicos Islands", Code= "TC"},
                          new(){ Name= "Tuvalu", Code= "TV"},
                          new(){ Name= "Uganda", Code= "UG"},
                          new(){ Name= "Ukraine", Code= "UA"},
                          new(){ Name= "United Arab Emirates", Code= "AE"},
                          new(){ Name= "United Kingdom", Code= "GB"},
                          new(){ Name= "United Republic of Tanzania", Code= "TZ"},
                          new(){ Name= "United States", Code= "US"},
                          new(){ Name= "Uruguay", Code= "UY"},
                          new(){ Name= "US Virgin Islands", Code= "VI"},
                          new(){ Name= "Uzbekistan", Code= "UZ"},
                          new(){ Name= "Vanuatu", Code= "VU"},
                          new(){ Name= "Venezuela", Code= "VE"},
                          new(){ Name= "Vietnam", Code= "VN"},
                          new(){ Name= "Wallis and Futuna", Code= "WF"},
                          new(){ Name= "Western Sahara", Code= "EH"},
                          new(){ Name= "Yemen", Code= "YE"},
                          new(){ Name= "Zambia", Code= "ZM"},
                          new(){ Name= "Zimbabwe", Code= "ZW"}
                        };
                    Country country;
                    foreach (var item in countries)
                    {
                        country = countryRepos.AddAsync(item).Result;
                    }
                }

                //City
                if (cityRepos.ListAsync().Result.Count == 0)
                {
                    var cities = new List<City>()
                    {
                        new (){ Name="Copenhagen", CountryId=61, Image="city.png" },
                        new (){ Name="Aarhus",CountryId=61,Image="city.png"},
                        new (){ Name="Esbjerg",CountryId=61,Image="city.png"},
                        new (){ Name="Randers",CountryId=61,Image="city.png"},
                        new (){ Name="Herning",CountryId=61,Image="city.png"},
                        new (){ Name="Hørsholm",CountryId=61,Image="city.png"},

                        new (){ Name="Paris", CountryId=76, Image="city.png" },
                        new (){ Name="Strasbourg",CountryId=76,Image="city.png"},
                        new (){ Name="Lyon",CountryId=76,Image="city.png"},
                        new (){ Name="Bordeaux",CountryId=76,Image="city.png"},
                        new (){ Name="Rennes",CountryId=76,Image="city.png"},
                        new (){ Name="Saint-Étienne",CountryId=76,Image="city.png"},

                        new (){ Name="Berlin", CountryId=83, Image="city.png" },
                        new (){ Name="Hamburg",CountryId=83,Image="city.png"},
                        new (){ Name="Stuttgart",CountryId=83,Image="city.png"},
                        new (){ Name="Dortmund",CountryId=83,Image="city.png"},
                        new (){ Name="Bremen",CountryId=83,Image="city.png"},
                        new (){ Name="Dresden",CountryId=83,Image="city.png"},

                        new (){ Name="Kyiv", CountryId=233, Image="city.png" },
                        new (){ Name="Kharkiv",CountryId=233,Image="city.png"},
                        new (){ Name="Odesa",CountryId=233,Image="city.png"},
                        new (){ Name="Dnipro",CountryId=233,Image="city.png"},
                        new (){ Name="Lviv",CountryId=233,Image="city.png"},
                        new (){ Name="Mariupol",CountryId=233,Image="city.png"},

                    };
                    City city;
                    foreach (var item in cities)
                    {
                        city = cityRepos.AddAsync(item).Result;
                    }
                }

                //TypeOfApartment
                if (typeOfApartmentRepos.ListAsync().Result.Count == 0)
                {
                    var types = new List<TypeOfApartment>()
                    {
                    new TypeOfApartment() { Name = "House" },
                    new TypeOfApartment() { Name = "Flat" },
                    new TypeOfApartment() { Name = "Apartment" },
                    new TypeOfApartment() { Name = "Hostel" },
                    new TypeOfApartment() { Name = "Hotel" },
                    new TypeOfApartment() { Name = "Loft" }
                    };

                    TypeOfApartment type;
                    foreach (var item in types)
                    {
                        type = typeOfApartmentRepos.AddAsync(item).Result;
                    }
                }

                //FilterGroup
                if (filterGroupRepos.ListAsync().Result.Count == 0)
                {
                    var filterGroups = new List<FilterGroup>() {
                    new FilterGroup { Name = "Bathroom" },
                    new FilterGroup { Name = "Bedroom and laundry" },
                    new FilterGroup { Name = "Entertainment" },
                    new FilterGroup { Name = "Family" },
                    new FilterGroup { Name = "Heating and cooling" },
                    new FilterGroup { Name = "Internet and office" },
                    new FilterGroup { Name = "Home safety" },
                    new FilterGroup { Name = "Kitchen and dining" },
                    new FilterGroup { Name = "Services" },
                    new FilterGroup { Name = "Location features" },
                    new FilterGroup { Name = "Parking and facilities" },
                    new FilterGroup { Name = "Outdoor" },
                    };
                    FilterGroup filterGroup;
                    foreach (var item in filterGroups)
                    {
                        filterGroup = filterGroupRepos.AddAsync(item).Result;
                    }
                }

                //Filter
                if (filterRepos.ListAsync().Result.Count == 0)
                {

                    var filters = new List<Filter>()
                    {
                        new Filter { Name = "Hair dryer", FilterGroupId = 1 },
                        new Filter { Name = "Shampoo", FilterGroupId = 1 },
                        new Filter { Name = "Conditioner", FilterGroupId = 1 },
                        new Filter { Name = "Hot water", FilterGroupId = 1 },
                        new Filter { Name = "Bath", FilterGroupId = 1 },
                        new Filter { Name = "Body soap", FilterGroupId = 1 },
                        new Filter { Name = "Shower gel", FilterGroupId = 1 },
                        new Filter { Name = "Bidet", FilterGroupId = 1 },
                        new Filter { Name = "Cleaning products", FilterGroupId = 1 },


                        new Filter { Name = "Washer", FilterGroupId = 2 },
                        new Filter { Name = "Dryer", FilterGroupId = 2 },
                        new Filter { Name = "Clothing storage", FilterGroupId = 2 },
                        new Filter { Name = "Safe", FilterGroupId = 2 },
                        new Filter { Name = "Hangers", FilterGroupId = 2 },
                        new Filter { Name = "Drying rack for clothing", FilterGroupId = 2 },
                        new Filter { Name = "Bed linen", FilterGroupId = 2 },
                        new Filter { Name = "Iron", FilterGroupId = 2 },
                        new Filter { Name = "Room - darkening shades", FilterGroupId = 2 },
                        new Filter { Name = "Extra pillows and blankets", FilterGroupId = 2 },


                        new Filter { Name = "TV with standard cable/satellitee", FilterGroupId = 3 },
                        new Filter { Name = "TV", FilterGroupId = 3 },
                        new Filter { Name = "Suitable for events", FilterGroupId = 3 },
                        new Filter { Name = "Ethernet connection", FilterGroupId = 3 },
                        new Filter { Name = "Record player", FilterGroupId = 3 },
                        new Filter { Name = "Sound system", FilterGroupId = 3 },
                        new Filter { Name = "Books and reading material", FilterGroupId = 3 },


                        new Filter { Name = "Crib", FilterGroupId = 4 },
                        new Filter { Name = "Fireplace guards", FilterGroupId = 4 },
                        new Filter { Name = "High chair", FilterGroupId = 4 },


                        new Filter { Name = "Air conditioning", FilterGroupId = 5 },
                        new Filter { Name = "Heating", FilterGroupId = 5 },
                        new Filter { Name = "Indoor fireplace", FilterGroupId = 5 },
                        new Filter { Name = "Ceiling fan", FilterGroupId = 5 },
                        new Filter { Name = "Portable fans", FilterGroupId = 5 },


                        new Filter { Name = "Wifi", FilterGroupId = 6 },
                        new Filter { Name = "Dedicated workspace", FilterGroupId = 6 },


                        new Filter { Name = "Smoke alarm", FilterGroupId = 7 },
                        new Filter { Name = "Carbon monoxide alarm", FilterGroupId = 7 },
                        new Filter { Name = "Fire extinguisher", FilterGroupId = 7 },
                        new Filter { Name = "First aid kit", FilterGroupId = 7 },
                        new Filter { Name = "Security cameras on property", FilterGroupId = 7 },


                        new Filter { Name = "Kitchen", FilterGroupId = 8 },
                        new Filter { Name = "Refrigerator", FilterGroupId = 8 },
                        new Filter { Name = "Cooking basics", FilterGroupId = 8 },
                        new Filter { Name = "Dishes and silverware", FilterGroupId = 8 },
                        new Filter { Name = "Dishwasher", FilterGroupId = 8 },
                        new Filter { Name = "Stove", FilterGroupId = 8 },
                        new Filter { Name = "Electric stove", FilterGroupId = 8 },
                        new Filter { Name = "Hot water kettle", FilterGroupId = 8 },
                        new Filter { Name = "Wine glasses", FilterGroupId = 8 },
                        new Filter { Name = "Dining table", FilterGroupId = 8 },
                        new Filter { Name = "Microwave", FilterGroupId = 8 },
                        new Filter { Name = "Mini fridge", FilterGroupId = 8 },
                        new Filter { Name = "Oven", FilterGroupId = 8 },
                        new Filter { Name = "Coffee maker", FilterGroupId = 8 },
                        new Filter { Name = "Baking sheet", FilterGroupId = 8 },
                        new Filter { Name = "Toaster", FilterGroupId = 8 },
                        new Filter { Name = "Bread maker", FilterGroupId = 8 },
                        new Filter { Name = "Trash compactor", FilterGroupId = 8 },
                        new Filter { Name = "Rice maker", FilterGroupId = 8 },
                        new Filter { Name = "Barbecue utensils", FilterGroupId = 8 },


                        new Filter { Name = "Self check-in", FilterGroupId = 9 },
                        new Filter { Name = "Long term stays allowed", FilterGroupId = 9 },
                        new Filter { Name = "Pets allowed", FilterGroupId = 9 },
                        new Filter { Name = "Luggage dropoff allowed", FilterGroupId = 9 },
                        new Filter { Name = "Cleaning before checkout", FilterGroupId = 9 },
                        new Filter { Name = "Breakfast", FilterGroupId = 9 },
                        new Filter { Name = "Host greets you", FilterGroupId = 9 },


                        new Filter { Name = "Private entrance", FilterGroupId = 10 },
                        new Filter { Name = "Lake access", FilterGroupId = 10 },


                        new Filter { Name = "Free street parking", FilterGroupId = 11 },
                        new Filter { Name = "Free parking on premises", FilterGroupId = 11 },
                        new Filter { Name = "Paid parking off premises", FilterGroupId = 11 },
                        new Filter { Name = "Elevator", FilterGroupId = 11 },
                        new Filter { Name = "Hot tub", FilterGroupId = 11 },
                        new Filter { Name = "Private pool", FilterGroupId = 11 },
                        new Filter { Name = "Private hot tub", FilterGroupId = 11 },
                        new Filter { Name = "Single level home", FilterGroupId = 11 },
                        new Filter { Name = "EV charger", FilterGroupId = 11 },
                        new Filter { Name = "Gym", FilterGroupId = 11 },


                        new Filter { Name = "Private patio or balcony", FilterGroupId = 12 },
                        new Filter { Name = "Outdoor furniture", FilterGroupId = 12 },
                        new Filter { Name = "Outdoor dining area", FilterGroupId = 12 },
                        new Filter { Name = "BBQ grill", FilterGroupId = 12 },
                        new Filter { Name = "Backyard", FilterGroupId = 12 },
                        new Filter { Name = "Beach essentials", FilterGroupId = 12 },
                        new Filter { Name = "Fire pit", FilterGroupId = 12 },
                        new Filter { Name = "Outdoor kitchen", FilterGroupId = 12 },

                };
                    Filter filter;
                    foreach (var item in filters)
                    {
                        filter = filterRepos.AddAsync(item).Result;
                    }
                }

                //Apartment
                if (apartmentRepos.ListAsync().Result.Count == 0)
                {
                    var ownerId = manager.FindByEmailAsync(firstEmail).Result.Id;
                    var apartments = new List<Apartment>()
                    {
                         new Apartment()
                        {
                            Name = "Summer Holiday Villa",
                            Description = "Summer Holiday Villa is a perfect choice " +
                            "for your stay.It has its own garden enabling you to spend the evenings" +
                            " enjoying nature and the fresh air.The house also has a private area for a " +
                            "barbecue with all the required facilities, a sauna, and a patio.",
                            Beds = 8,
                            Bedrooms = 4,
                            Bathrooms = 2,
                            CityId = 1,
                            TypeOfApartmentId = 1,
                            OwnerId = ownerId,
                            Price = 11286
                        },

                         new Apartment()
                         {
                             Name = "Little House at the lake",
                             Description = "Our small, old and charming little house on the lake in a fantastic location, located on Lake Olching, guarantees a" +
                             " great lake view. And YES, we are in nature and there are" +
                             " squirrels, spiders, martens..." +
                             "We have furnished everything very lovingly and equipped with special details, so that you can feel completely comfortable here." +
                             "With the propeller as a fan, an oven, the rain shower and heated floor or the extraordinary sink made of granite," +
                             "the stand alone cottage stands out from others.A special place in the immediate vicinity of Munich.Our motto is: \"Do not dream your life, " +
                             "but live your dream\"!",
                             Beds = 1,
                             Bedrooms = 1,
                             Bathrooms = 1,
                             CityId = 1,
                             TypeOfApartmentId = 1,
                             OwnerId = ownerId,
                             Price = 2900
                         },

                         new Apartment()
                         {
                             Name = "Tiny Loft House",
                             Description = "Our Tiny Loft House offers enough space for 2 people on 25 " +
                             "sqm over two levels and scores in addition to a cozy bed, a cute kitchen, a small terrace " +
                             "and private entrance. A minimalistly furnished apartment in a typical Scandinavian style with " +
                             "light woods and furniture in a simple but functional design, with a cozy living-dining area and" +
                             " modern bathroom with rain shower. Ceiling-high glass windows let in light and air." +
                             " Breakfast is served on your own terrace.",
                             Beds = 1,
                             Bedrooms = 1,
                             Bathrooms = 1,
                             CityId = 2,
                             TypeOfApartmentId = 2,
                             OwnerId = ownerId,
                             Price = 2400
                         },

                         new Apartment()
                        {
                            Name = "Summer Holiday Villa",
                            Description = "Summer Holiday Villa is a perfect choice " +
                            "for your stay.It has its own garden enabling you to spend the evenings" +
                            " enjoying nature and the fresh air.The house also has a private area for a " +
                            "barbecue with all the required facilities, a sauna, and a patio.",
                            Beds = 7,
                            Bedrooms = 3,
                            Bathrooms = 2,
                            CityId = 2,
                            TypeOfApartmentId = 2,
                            OwnerId = ownerId,
                            Price = 11300
                        },

                         new Apartment()
                         {
                             Name = "Little House at the lake",
                             Description = "Our small, old and charming little house on the lake in a fantastic location, located on Lake Olching, guarantees a" +
                             " great lake view. And YES, we are in nature and there are" +
                             " squirrels, spiders, martens..." +
                             "We have furnished everything very lovingly and equipped with special details, so that you can feel completely comfortable here." +
                             "With the propeller as a fan, an oven, the rain shower and heated floor or the extraordinary sink made of granite," +
                             "the stand alone cottage stands out from others.A special place in the immediate vicinity of Munich.Our motto is: \"Do not dream your life, " +
                             "but live your dream\"!",
                             Beds = 2,
                             Bedrooms = 2,
                             Bathrooms = 1,
                             CityId = 2,
                             TypeOfApartmentId = 2,
                             OwnerId = ownerId,
                             Price = 3900
                         },

                         new Apartment()
                         {
                             Name = "Tiny Loft House",
                             Description = "Our Tiny Loft House offers enough space for 2 people on 25 " +
                             "sqm over two levels and scores in addition to a cozy bed, a cute kitchen, a small terrace " +
                             "and private entrance. A minimalistly furnished apartment in a typical Scandinavian style with " +
                             "light woods and furniture in a simple but functional design, with a cozy living-dining area and" +
                             " modern bathroom with rain shower. Ceiling-high glass windows let in light and air." +
                             " Breakfast is served on your own terrace.",
                             Beds = 3,
                             Bedrooms = 3,
                             Bathrooms = 2,
                             CityId = 2,
                             TypeOfApartmentId = 3,
                             OwnerId = ownerId,
                             Price = 12400
                         },

                         new Apartment()
                         {
                         Name = "Summer Holiday Villa",
                         Description = "Summer Holiday Villa is a perfect choice " +
                         "for your stay.It has its own garden enabling you to spend the evenings" +
                         " enjoying nature and the fresh air.The house also has a private area for a " +
                           "barbecue with all the required facilities, a sauna, and a patio.",
                           Beds = 6,
                           Bedrooms = 2,
                           Bathrooms = 2,
                           CityId = 3,
                           TypeOfApartmentId = 3,
                           OwnerId = ownerId,
                           Price = 1300
                         },

                         new Apartment()
                         {
                             Name = "Little House at the lake",
                             Description = "Our small, old and charming little house on the lake in a fantastic location, located on Lake Olching, guarantees a" +
                             " great lake view. And YES, we are in nature and there are" +
                             " squirrels, spiders, martens..." +
                             "We have furnished everything very lovingly and equipped with special details, so that you can feel completely comfortable here." +
                             "With the propeller as a fan, an oven, the rain shower and heated floor or the extraordinary sink made of granite," +
                             "the stand alone cottage stands out from others.A special place in the immediate vicinity of Munich.Our motto is: \"Do not dream your life, " +
                             "but live your dream\"!",
                             Beds = 5,
                             Bedrooms = 5,
                             Bathrooms = 3,
                             CityId = 4,
                             TypeOfApartmentId = 5,
                             OwnerId = ownerId,
                             Price = 5900
                         },

                         new Apartment()
                         {
                             Name = "Tiny Loft House",
                             Description = "Our Tiny Loft House offers enough space for 2 people on 25 " +
                             "sqm over two levels and scores in addition to a cozy bed, a cute kitchen, a small terrace " +
                             "and private entrance. A minimalistly furnished apartment in a typical Scandinavian style with " +
                             "light woods and furniture in a simple but functional design, with a cozy living-dining area and" +
                             " modern bathroom with rain shower. Ceiling-high glass windows let in light and air." +
                             " Breakfast is served on your own terrace.",
                             Beds = 5,
                             Bedrooms = 5,
                             Bathrooms = 3,
                             CityId = 3,
                             TypeOfApartmentId = 1,
                             OwnerId = ownerId,
                             Price = 12400
                         },

                         new Apartment()
                         {
                             Name = "Summer Holiday Villa",
                             Description = "Summer Holiday Villa is a perfect choice " +
                            "for your stay.It has its own garden enabling you to spend the evenings" +
                            " enjoying nature and the fresh air.The house also has a private area for a " +
                            "barbecue with all the required facilities, a sauna, and a patio.",
                             Beds = 7,
                             Bedrooms = 3,
                             Bathrooms = 2,
                             CityId = 2,
                             TypeOfApartmentId = 2,
                             OwnerId = ownerId,
                             Price = 11300
                         },

                         new Apartment()
                         {
                             Name = "Little House at the lake",
                             Description = "Our small, old and charming little house on the lake in a fantastic location, located on Lake Olching, guarantees a" +
                             " great lake view. And YES, we are in nature and there are" +
                             " squirrels, spiders, martens..." +
                             "We have furnished everything very lovingly and equipped with special details, so that you can feel completely comfortable here." +
                             "With the propeller as a fan, an oven, the rain shower and heated floor or the extraordinary sink made of granite," +
                             "the stand alone cottage stands out from others.A special place in the immediate vicinity of Munich.Our motto is: \"Do not dream your life, " +
                             "but live your dream\"!",
                             Beds = 2,
                             Bedrooms = 2,
                             Bathrooms = 1,
                             CityId = 2,
                             TypeOfApartmentId = 2,
                             OwnerId = ownerId,
                             Price = 3900
                         },

                         new Apartment()
                         {
                             Name = "Tiny Loft House",
                             Description = "Our Tiny Loft House offers enough space for 2 people on 25 " +
                             "sqm over two levels and scores in addition to a cozy bed, a cute kitchen, a small terrace " +
                             "and private entrance. A minimalistly furnished apartment in a typical Scandinavian style with " +
                             "light woods and furniture in a simple but functional design, with a cozy living-dining area and" +
                             " modern bathroom with rain shower. Ceiling-high glass windows let in light and air." +
                             " Breakfast is served on your own terrace.",
                             Beds = 3,
                             Bedrooms = 3,
                             Bathrooms = 2,
                             CityId = 2,
                             TypeOfApartmentId = 3,
                             OwnerId = ownerId,
                             Price = 12400
                         },
                        
                         new Apartment()
                          {
                              Name = "Summer Holiday Villa",
                              Description = "Summer Holiday Villa is a perfect choice " +
                            "for your stay.It has its own garden enabling you to spend the evenings" +
                            " enjoying nature and the fresh air.The house also has a private area for a " +
                            "barbecue with all the required facilities, a sauna, and a patio.",
                              Beds = 7,
                              Bedrooms = 3,
                              Bathrooms = 2,
                              CityId = 2,
                              TypeOfApartmentId = 2,
                              OwnerId = ownerId,
                              Price = 11300
                          },
                         
                         new Apartment()
                         {
                             Name = "Little House at the lake",
                             Description = "Our small, old and charming little house on the lake in a fantastic location, located on Lake Olching, guarantees a" +
                             " great lake view. And YES, we are in nature and there are" +
                             " squirrels, spiders, martens..." +
                             "We have furnished everything very lovingly and equipped with special details, so that you can feel completely comfortable here." +
                             "With the propeller as a fan, an oven, the rain shower and heated floor or the extraordinary sink made of granite," +
                             "the stand alone cottage stands out from others.A special place in the immediate vicinity of Munich.Our motto is: \"Do not dream your life, " +
                             "but live your dream\"!",
                             Beds = 2,
                             Bedrooms = 2,
                             Bathrooms = 1,
                             CityId = 2,
                             TypeOfApartmentId = 2,
                             OwnerId = ownerId,
                             Price = 3900
                         },
                        
                         new Apartment()
                         {
                             Name = "Tiny Loft House",
                             Description = "Our Tiny Loft House offers enough space for 2 people on 25 " +
                             "sqm over two levels and scores in addition to a cozy bed, a cute kitchen, a small terrace " +
                             "and private entrance. A minimalistly furnished apartment in a typical Scandinavian style with " +
                             "light woods and furniture in a simple but functional design, with a cozy living-dining area and" +
                             " modern bathroom with rain shower. Ceiling-high glass windows let in light and air." +
                             " Breakfast is served on your own terrace.",
                             Beds = 3,
                             Bedrooms = 3,
                             Bathrooms = 2,
                             CityId = 2,
                             TypeOfApartmentId = 3,
                             OwnerId = ownerId,
                             Price = 12400
                         }
                         };
                    Apartment apartment;
                    foreach (var item in apartments)
                    {
                        apartment = apartmentRepos.AddAsync(item).Result;
                    }
                }

                //OrderStatus
                if (orderStatusRepos.ListAsync().Result.Count == 0)
                {
                    var order = orderStatusRepos.AddAsync(new OrderStatus() { Status = OrderStatuses.Booked }).Result;
                    order = orderStatusRepos.AddAsync(new OrderStatus() { Status = OrderStatuses.Processing }).Result;
                    order = orderStatusRepos.AddAsync(new OrderStatus() { Status = OrderStatuses.Canceled }).Result;
                }

                //Order
                if (orderRepos.ListAsync().Result.Count == 0)
                {
                    var orders = new List<Order>()
                    {
                        new Order() { ApartmentId = 1, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(7) },
                        new Order() { ApartmentId = 1, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(7), End = DateTime.Now.AddDays(25) },
                        new Order() { ApartmentId = 1, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(25), End = DateTime.Now.AddDays(40) },
                        new Order() { ApartmentId = 1, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },

                        new Order() { ApartmentId = 2, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(6)},
                        new Order() { ApartmentId = 2, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(6), End = DateTime.Now.AddDays(26) },
                        new Order() { ApartmentId = 2, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(26), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 2, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },

                        new Order() { ApartmentId = 3, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 3, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 3, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 3, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },


                        new Order() { ApartmentId = 4, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 4, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 4, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 4, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                               
                        new Order() { ApartmentId = 5, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 5, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 5, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 5, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                                
                        new Order() { ApartmentId = 6, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 6, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 6, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 6, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                                
                        new Order() { ApartmentId = 7, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 7, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 7, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 7, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },

                        new Order() { ApartmentId = 8, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 8, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 8, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 8, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                            
                        new Order() { ApartmentId = 9, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 9, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 9, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 9, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                                
                        new Order() { ApartmentId = 10, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 10, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 10, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 10, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                                
                        new Order() { ApartmentId = 11, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 11, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 11, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 11, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                                
                        new Order() { ApartmentId = 12, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 12, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 12, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 12, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) },
                                                
                        new Order() { ApartmentId = 13, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now, End = DateTime.Now.AddDays(5) },
                        new Order() { ApartmentId = 13, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 1, Start = DateTime.Now.AddDays(5), End = DateTime.Now.AddDays(28) },
                        new Order() { ApartmentId = 13, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 2, Start = DateTime.Now.AddDays(29), End = DateTime.Now.AddDays(42) },
                        new Order() { ApartmentId = 13, UserId = manager.FindByEmailAsync(firstEmail).Result.Id, OrderStatusId = 3, Start = DateTime.Now.AddDays(50), End = DateTime.Now.AddDays(60) }
                    };
                    Order order;
                    foreach (var item in orders)
                    {
                        order = orderRepos.AddAsync(item).Result;
                    }

                }

            }
        }
    }
}
