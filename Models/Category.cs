using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DotNetAPI.Models
{
    // une catégorie est un objet qui représente une entrée dans la base de données
    public class Category
    {
        // les propriétés de la catégorie
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;

        // Relation
        public ICollection<Article> Articles { get; set; } = new List<Article>();

        // le constructeur de la catégorie
        public Category() { }
    }
}
