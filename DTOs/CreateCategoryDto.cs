using System.ComponentModel.DataAnnotations;

namespace DotNetAPI.DTOs
{
    public class CreateCategoryDto
    {
        [Required(ErrorMessage = "Le nom de la catégorie est obligatoire")]
        [StringLength(100, ErrorMessage = "Le nom ne peut pas dépasser 100 caractères")]
        public string Name { get; set; } = string.Empty;
    }
} 