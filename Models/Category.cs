using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DotNetAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;

        // Relation
        public ICollection<Article> Articles { get; set; } = new List<Article>();

        public Category() { }
    }
}
