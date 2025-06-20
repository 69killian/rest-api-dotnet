using System.ComponentModel.DataAnnotations;

namespace DotNetAPI.DTOs
{
    public class CreateArticleDto
    {
        [Required(ErrorMessage = "Le titre est obligatoire")]
        [StringLength(200, ErrorMessage = "Le titre ne peut pas dépasser 200 caractères")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le contenu est obligatoire")]
        [StringLength(5000, ErrorMessage = "Le contenu ne peut pas dépasser 5000 caractères")]
        public string Content { get; set; } = string.Empty;

        [Required(ErrorMessage = "L'ID de la catégorie est obligatoire")]
        public int CategoryId { get; set; }
    }
} 