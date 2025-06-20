using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DotNetAPI.Models;

namespace DotNetAPI.Data
{
    // un DBContext est une classe qui gère la connexion à la base de données
    public class ApplicationDBContext : DbContext
    {
        // le constructeur de la classe ApplicationDBContext
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

        // les DbSet sont des propriétés qui représentent les tables de la base de données
        public DbSet<Article> Articles { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}

