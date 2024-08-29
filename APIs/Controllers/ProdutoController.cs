using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controller
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProdutosController : ControllerBase
    {
        [HttpGet("teste/{nome}")]
        public IActionResult teste(string nome)
        {
            var n = $"{nome}";
            return Ok(new { n });
        }

        [HttpGet]
        public IActionResult Get()
        {
            var Produtos = new[]
            {
                new { Id = 1, Nome = "Produto1", Data = DateTime.Now, Valor = 123.45, Quantidade = 2, ItemEspecial = true, Ingredientes = new[] { "Ingrediente1", "Ingrediente2" } },
                new { Id = 2, Nome = "Produto2", Data = DateTime.Now.AddDays(1), Valor = 67.89, Quantidade = 1, ItemEspecial = false, Ingredientes = new[] { "Ingrediente3" } }
            };
            return Ok(Produtos);
        }
    }
}