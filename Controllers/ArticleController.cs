using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotNetAPI.Data;
using DotNetAPI.DTOs;
using DotNetAPI.Models;

namespace DotNetAPI.Controllers
{
    // le controller pour les articles
    // le route est api/article
    // le ApiController est un attribut qui indique que la classe est un contrôleur API
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        // le contexte de la base de données est privé
        private readonly ApplicationDBContext _context;

        // le constructeur de la classe ArticleController
        public ArticleController(ApplicationDBContext context)
        {
            // le contexte de la base de données est initialisé
            _context = context;
        }

        // on récupère tous les articles
        [HttpGet]
        public IActionResult GetAllArticles()
        {
            var articles = _context.Articles
                .Include(a => a.Category) // inclure la catégorie
                .Select(a => new ArticleResponseDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Content = a.Content,
                    CreatedAt = a.CreatedAt,
                    CategoryId = a.CategoryId,
                    Category = new CategoryDto
                    {
                        Id = a.Category.Id,
                        Name = a.Category.Name
                    }
                })
                .ToList();
            return Ok(articles);
        }

        // on récupère les articles par id
        [HttpGet("{id}")]
        public IActionResult GetArticleById(int id)
        {
            var article = _context.Articles
                .Include(a => a.Category) // inclure la catégorie
                .FirstOrDefault(a => a.Id == id);

            if (article == null)
                return NotFound("Article non trouvé");

            var articleResponse = new ArticleResponseDto
            {
                Id = article.Id,
                Title = article.Title,
                Content = article.Content,
                CreatedAt = article.CreatedAt,
                CategoryId = article.CategoryId,
                Category = new CategoryDto
                {
                    Id = article.Category.Id,
                    Name = article.Category.Name
                }
            };

            return Ok(articleResponse);
        }

        [HttpPost]
        public IActionResult CreateArticle([FromBody] CreateArticleDto createArticleDto)
        {
            // Validation du modèle
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Vérification de l'existence de la catégorie
            var categoryExists = _context.Categories.Any(c => c.Id == createArticleDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest("La catégorie spécifiée n'existe pas");
            }

            // on crée un nouvel article
            var newArticle = new Article
            {
                Title = createArticleDto.Title,
                Content = createArticleDto.Content,
                CategoryId = createArticleDto.CategoryId,
                CreatedAt = DateTime.UtcNow
            };

            // on ajoute l'article à la base de données
            _context.Articles.Add(newArticle);
            _context.SaveChanges();

            // on retourne l'article créé
            return CreatedAtAction(nameof(GetArticleById), new { id = newArticle.Id }, newArticle);
        }

        // on met à jour un article
        [HttpPut("{id}")]
        public IActionResult UpdateArticle(int id, [FromBody] UpdateArticleDto updateArticleDto)
        {
            // Validation du modèle
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // on vérifie si l'article existe
            var article = _context.Articles.FirstOrDefault(a => a.Id == id);
            if (article == null)
            {
                return NotFound("Article non trouvé");
            }

            // Vérification de l'existence de la catégorie
            var categoryExists = _context.Categories.Any(c => c.Id == updateArticleDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest("La catégorie spécifiée n'existe pas");
            }

            // on met à jour les données de l'article
            article.Title = updateArticleDto.Title;
            article.Content = updateArticleDto.Content;
            article.CategoryId = updateArticleDto.CategoryId;

            // on enregistre les modifications
            _context.SaveChanges();

            // on retourne l'article mis à jour
            return Ok(article);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteArticle(int id)
        {
            var article = _context.Articles.FirstOrDefault(a => a.Id == id);
            if (article == null)
            {
                return NotFound("Article non trouvé");
            }

            _context.Articles.Remove(article);
            _context.SaveChanges();

            return NoContent();
        }
    }
}