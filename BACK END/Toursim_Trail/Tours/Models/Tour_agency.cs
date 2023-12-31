﻿using System.ComponentModel.DataAnnotations;

namespace Tours.Models
{
    public class Tour_agency
    {
        [Key]
        public int? tour_owner_id { get;set; }
        public string? email_id { get;set; }
        public string? password { get;set; }
        public string? tour_company_name { get;set; }    
        public string? tour_company_address { get;set; } 
  
        public string? status { get;set; }
        //updated code
        public long? phone_no { get;set; }    
        public string? company_logo { get; set; }   



        //mobile,logo,

        public ICollection<Add_Tour>? Add_Tours { get; set; }


    }
}
