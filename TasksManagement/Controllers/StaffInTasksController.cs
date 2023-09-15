using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TasksManagement.Models;

namespace TasksManagement.Controllers
{
    public class StaffInTasksController : ApiController
    {
        private TaskManagement1Entities db = new TaskManagement1Entities();

        // GET: api/StaffInTasks
        public IQueryable<StaffInTask> GetStaffInTasks()
        {
            return db.StaffInTasks;
        }

        // GET: api/StaffInTasks/5
        [ResponseType(typeof(StaffInTask))]
        public IHttpActionResult GetStaffInTask(int id)
        {
            StaffInTask staffInTask = db.StaffInTasks.Find(id);
            if (staffInTask == null)
            {
                return NotFound();
            }

            return Ok(staffInTask);
        }

        // PUT: api/StaffInTasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStaffInTask(int id, StaffInTask staffInTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != staffInTask.Id_List)
            {
                return BadRequest();
            }

            db.Entry(staffInTask).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffInTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/StaffInTasks
        [ResponseType(typeof(StaffInTask))]
        public IHttpActionResult PostStaffInTask([FromBody] StaffInTask staffInTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.StaffInTasks.Add(staffInTask);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = staffInTask.Id_List }, staffInTask);
        }

        // DELETE: api/StaffInTasks/5
        [ResponseType(typeof(StaffInTask))]
        public IHttpActionResult DeleteStaffInTask(int id)
        {
            StaffInTask staffInTask = db.StaffInTasks.Find(id);
            if (staffInTask == null)
            {
                return NotFound();
            }

            db.StaffInTasks.Remove(staffInTask);
            db.SaveChanges();

            return Ok(staffInTask);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StaffInTaskExists(int id)
        {
            return db.StaffInTasks.Count(e => e.Id_List == id) > 0;
        }

        [Route("api/StaffInTasks/GetAssignedList")]
        [ResponseType(typeof(assignedList))]
        public IHttpActionResult GetAssignedList()
        {
            var staffInTask = db.StaffInTasks;
            var staffs = db.Staffs;
            var tasks = db.Tasks;

            var results = from t in db.Tasks
                          join sit in db.StaffInTasks on t.Id_Task equals sit.Id_Task into staffInTasks
                          from inTask in staffInTasks.DefaultIfEmpty()
                          join s in db.Staffs on inTask.Id_Staff equals s.Id_Staff into sta
                          from staff in sta.DefaultIfEmpty()
                          select new
                          {
                              Id_Task = t.Id_Task,
                              Id_Parent = t.Id_Parent,
                              Label = t.Label,
                              Type = t.Type,
                              TaskName = t.TaskName,
                              StartDate = t.StartDate,
                              EndDate = t.EndDate,
                              Progress = t.Progress,
                              IsUnscheduled = t.IsUnscheduled,
                              Duration = t.Duration,
                              Id_assigned = inTask.Id_List == null ? 0 : inTask.Id_List ,
                              Id_Staff = staff.Id_Staff == null ? 0 : inTask.Id_Staff ,
                              FullName = staff.FullName,

                          };



            if (staffInTask == null)
            {
                return NotFound();
            }
            var response = results.ToList();

            return Ok(response);
        }
    }
}