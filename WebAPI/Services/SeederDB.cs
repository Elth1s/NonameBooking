using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using WebAPI.Constants;

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
                      country= countryRepos.AddAsync(item).Result;
                    }
                }
            }
        }
    }
}
