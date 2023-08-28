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
using TaskManagement.Models;

namespace TaskManagement.Controllers
{
    public class StaffInTasksController : ApiController
    {
        private TaskManegementEntities db = new TaskManegementEntities();

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
        public IHttpActionResult PostStaffInTask(StaffInTask staffInTask)
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
    }
}