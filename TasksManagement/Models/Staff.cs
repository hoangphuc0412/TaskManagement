//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TasksManagement.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    
    public partial class Staff
    {
        public Staff()
        {
            this.StaffInTasks = new HashSet<StaffInTask>();
        }

        //[JsonIgnore]
        public int Id_Staff { get; set; }
        //[JsonIgnore]
        public string FullName { get; set; }
        //[JsonIgnore]
        public string ShortName { get; set; }
        [JsonIgnore]
        public virtual ICollection<StaffInTask> StaffInTasks { get; set; }
    }
}
