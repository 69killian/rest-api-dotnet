using System;

namespace DotNetAPI.DTOs
{
    public class ArticleResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public int CategoryId { get; set; }
        public CategoryDto Category { get; set; } = new CategoryDto();
    }

    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
} 