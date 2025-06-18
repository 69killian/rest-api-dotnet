using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetAPI.Models
{
    public class Article {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public Article(int id, string title, string category, string content, DateTime createdAt)
        {
            Id = id;
            Title = title;
            Category = category;
            Content = content;
            CreatedAt = createdAt;
        }
    }
}