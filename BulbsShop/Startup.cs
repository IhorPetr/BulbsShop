using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using NLog.Web;
using NLog;
using System.IO;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;

namespace BulbsShop
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            env.ConfigureNLog("nlog.config");
        }

        public IConfigurationRoot  config { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddMvc();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(
                    "v1",
                 new Info
                 {
                  Title = "BulbsShop API - V1",
                  Version = "v1",
                  Description = "API descriptor for Front-end developers",
                  TermsOfService = "Knock yourself out",
                  Contact = new Contact
                  {
                    Name = "IhorPetr",
                    Email = "vep2014@ukr.net",
                    Url= "https://github.com/IhorPetr"
                  },
                  });
                var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "BulbsShop.xml");
                c.IncludeXmlComments(filePath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseFileServer(new FileServerOptions()
            {
                FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
                Path.Combine(env.ContentRootPath, "node_modules")
              ),
                RequestPath = "/node_modules",
                EnableDirectoryBrowsing = false
            });
            loggerFactory.AddNLog();
            app.AddNLogWeb();
            LogManager.Configuration.Variables["configDir"] = Path.Combine(env.ContentRootPath,"logs");
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }
    }
}
