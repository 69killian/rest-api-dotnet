using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DotNetAPI.Controllers
{
    // le controller pour les articles
    // le route est api/article
    // le ApiController est un attribut qui indique que la classe est un contrôleur API
    [Route("api/article/{id}")]
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
        [HttpGet("/api/articles")]
        public IActionResult GetAllArticles()
        {
            var articles = _context.Articles
                .Include(a => a.Category) // inclure la catégorie
                .ToList();
            return Ok(articles);
        }

        // on récupère les articles par id
        [HttpGet]
        public IActionResult GetArticleById(int id)
        {
            var article = _context.Articles
                .Include(a => a.Category) // inclure la catégorie
                .FirstOrDefault(a => a.Id == id);

            if (article == null)
                return NotFound();

            return Ok(article);
        }
    }
}
