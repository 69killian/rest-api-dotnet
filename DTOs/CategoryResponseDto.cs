using System;
using System.Collections.Generic;

namespace DotNetAPI.DTOs
{
    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<ArticleSummaryDto> Articles { get; set; } = new List<ArticleSummaryDto>();
    }

    public class ArticleSummaryDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
} 