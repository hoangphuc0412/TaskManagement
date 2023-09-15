using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Runtime.Serialization;
using System.Web.Http;
using System.Web.Http.Description;
using TasksManagement.Models;

namespace TasksManagement.Controllers
{
    public class TasksController : ApiController
    {
        private TaskManagement1Entities db = new TaskManagement1Entities();

        // GET: api/Tasks

        public IQueryable<Task> GetTasks()
        {
            return db.Tasks;
        }

        // GET: api/Tasks/5
        [ResponseType(typeof(Task))]

        public IHttpActionResult GetTask(int id)
        {
            Task task = db.Tasks.Find(id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        // PUT: api/Tasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTask(int id, Task task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != task.Id_Task)
            {
                return BadRequest();
            }

            db.Entry(task).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/Tasks
        [ResponseType(typeof(Task))]
        public IHttpActionResult PostTask(Task task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tasks.Add(task);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = task.Id_Task }, task);
        }

        // DELETE: api/Tasks/5
        [ResponseType(typeof(Task))]
        public IHttpActionResult DeleteTask(int id)
        {
            Task task = db.Tasks.Find(id);
            if (task == null)
            {
                return NotFound();
            }

            db.Tasks.Remove(task);
            db.SaveChanges();

            return Ok(task);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaskExists(int id)
        {
            return db.Tasks.Count(e => e.Id_Task == id) > 0;
        }


        // GET: api/Tasks/GetTasksAsPortableDocFormat
        [HttpGet]
        [Route("api/Tasks/GetTasksAsPortableDocFormat")]
        [ResponseType(typeof(Task))]
        public IHttpActionResult GetTasksAsPortableDocFormat()
        {

            //IEnumerable<Task> crTask = db.Tasks.ToList();
            //var tasks = db.Tasks;
            //ReportDocument cr = new ReportDocument();
            //SqlConnection cnn;
            //string connetionString;

            // Create Connection to Database
            string connetionString = @"data source=DESKTOP-6KNAVMC\SQLEXPRESS01;initial catalog=TaskManegement;persist security info=True;Integrated Security=SSPI;";
            SqlConnection cnn = new SqlConnection(connetionString);

            if (cnn.State != ConnectionState.Open)
            {
                cnn.Open();
            }
            // Query Task List from Task table
            SqlCommand cmd = new SqlCommand("select * from Task", cnn);

            SqlDataAdapter adap = new SqlDataAdapter(cmd);
            DataSet ds = new DataSet();
            adap.Fill(ds, "Task");

            //cr.Load(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/Reports"), "Task.rpt"));

            CrystalReport1 rp = new CrystalReport1();
            rp.SetDataSource(ds);
            rp.Load(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/Reports"), "Task.rpt"));

            //CrystalDecisions.Shared.ExportOptions CrExportOptions;
            //DiskFileDestinationOptions CrDiskFileDestinationOptions = new DiskFileDestinationOptions();
            //PdfRtfWordFormatOptions CrFormatTypeOptions = new PdfRtfWordFormatOptions();    
            //CrDiskFileDestinationOptions.DiskFileName = "C:\\Users\\Task.pdf";
            //CrExportOptions = rp.ExportOptions;
            //{
            //    CrExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
            //    CrExportOptions.ExportFormatType = ExportFormatType.PortableDocFormat;
            //    CrExportOptions.DestinationOptions = CrDiskFileDestinationOptions;
            //    CrExportOptions.FormatOptions = CrFormatTypeOptions;
            //}
            //rp.ExportToStream(ExportFormatType.PortableDocFormat);
            //rp.Export();


            ExportFormatType format = ExportFormatType.PortableDocFormat;

            Stream s = rp.ExportToStream(format);
            MemoryStream ms = new MemoryStream();
            s.CopyTo(ms);

            var data = Convert.ToBase64String(ms.ToArray());

            return Ok(data);
        }
    }
}