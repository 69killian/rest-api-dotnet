using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DotNetAPI.Models
{
    public class Article {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Relation
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public Article() { }

        public Article(int id, string title, string content, DateTime createdAt)
        {
            Id = id;
            Title = title;
            Content = content;
            CreatedAt = createdAt;
        }
    }
}