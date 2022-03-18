using CoreMovieHunterAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllers();
builder.Services.AddDbContext<MovieHunterContext>(options =>
 {
     options.UseSqlite(builder.Configuration.GetConnectionString("MovieHunter"));
 });

builder.Services.AddDbContext<MovieHunterMembersContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("MovieHunterMembers"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options => {

       
                  
               
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       ValidIssuer = "https://localhost:7091/",
                       ValidAudience = "http://localhost:3000/",
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("bcdAD5qSpTg1HujE1wQSiSecJZFr1up46G8mQ3G2komsVLmcalY7xv7g2Y43"))
                   };
               });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(options =>
          options.AllowAnyHeader()
                 .AllowAnyMethod()
                 .AllowAnyOrigin());


app.UseStaticFiles();

  

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
