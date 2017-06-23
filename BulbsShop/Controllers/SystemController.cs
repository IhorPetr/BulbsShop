using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BulbsShop.Controllers
{
    public class SystemController : Controller
    {
        [HttpGet]
        [Route("System/Logs/Errors")]
        public IActionResult GetErrors()
        {
            return new ContentResult
            {
                Content = System.IO.File.ReadAllText(@"..\BulbsShop\logs\nlog-all.log"),
                ContentType = "text/plain",
                StatusCode = 200
            };
        }
    }
}
