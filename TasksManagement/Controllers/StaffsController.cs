using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Web.Http;
using System.Web.Http.Description;
using TasksManagement.Models;

namespace TasksManagement.Controllers
{
    public class StaffsController : ApiController
    {
        private TaskManagement1Entities db = new TaskManagement1Entities();

        // GET: api/Staffs
        public IQueryable<Staff> GetStaffs()
        {
            return db.Staffs;
        }

        // GET: api/Staffs/5

        [ResponseType(typeof(Staff))]

        public IHttpActionResult GetStaff(int id)
        {
            Staff staff = db.Staffs.Find(id);
            if (staff == null)
            {
                return NotFound();
            }

            return Ok(staff);
        }

        // PUT: api/Staffs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStaff(int id, Staff staff)
        {
            db.Staffs.Attach(staff);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != staff.Id_Staff)
            {
                return BadRequest();
            }

            db.Entry(staff).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(id))
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

        // POST: api/Staffs
        [ResponseType(typeof(Staff))]
        public IHttpActionResult PostStaff(Staff staff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newStaff = db.Staffs.Add(staff);
            db.SaveChanges();


            var newTask = db.Tasks.Create();

            newTask.TaskName = string.Concat("New task for ", newStaff.FullName);
            db.Tasks.Add(newTask);
            db.SaveChanges();

            var newSIT = db.StaffInTasks.Create();

            newSIT.Id_Staff = newStaff.Id_Staff;
            newSIT.Id_Task = newTask.Id_Task;
            db.StaffInTasks.Add(newSIT);
            
            db.SaveChanges();

            //var  db.Tasks.Add(new Task { });
            //db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = staff.Id_Staff }, staff);
        }

        // DELETE: api/Staffs/5
        [ResponseType(typeof(Staff))]
        public IHttpActionResult DeleteStaff(int id)
        {
            Staff staff = db.Staffs.Find(id);
            if (staff == null)
            {
                return NotFound();
            }

            db.Staffs.Remove(staff);
            db.SaveChanges();

            return Ok(staff);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StaffExists(int id)
        {
            return db.Staffs.Count(e => e.Id_Staff == id) > 0;
        }

        // POST: api/Staffs/DeleteStaffs
        [Route("api/Staffs/DeleteStaffs")]
        [HttpPost]
        [ResponseType(typeof(IEnumerable<Staff>))]
        public IHttpActionResult DeleteStaffs(int[] ids)
            {
                if (ids == null || ids.Length == 0)
                {
                    return BadRequest();
                }

                var staffs = db.Staffs.Where(s => ids.Contains(s.Id_Staff)).ToList();

                foreach (var staff in staffs)
                {
                    db.Staffs.Remove(staff);
                }

                db.SaveChanges();

                return Ok(staffs);
            }
    }
}