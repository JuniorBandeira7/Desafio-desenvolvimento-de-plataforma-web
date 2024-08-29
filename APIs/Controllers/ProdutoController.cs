using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIs.Context;
using Microsoft.AspNetCore.Mvc;
using APIs.Models;

namespace APIs.Controller
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProdutosController : ControllerBase
    {
        private readonly BdContext _context;

        public ProdutosController(BdContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CriarProduto(Produto produto)
        {
            _context.Add(produto);
            _context.SaveChanges();
            
            return CreatedAtAction(nameof(ObterPorId), new {id = produto.id}, produto);
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var produto = _context.Produtos.Find(id);

            if (produto == null) return NotFound();

            return Ok(produto); 
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Produto produto, string nomeDeQuemAlterou)
        {
            var produtoBanco = _context.Produtos.Find(id);

            if (produtoBanco == null) return NotFound();

            produtoBanco.valor = produto.valor;
            produtoBanco.quantidade = produto.quantidade;
            produtoBanco.itemEspecial = produto.itemEspecial;
            produtoBanco.nome = produto.nome;
            produtoBanco.ingredientes = produto.ingredientes;

            _context.Produtos.Update(produtoBanco);

            // Armazena as alterações ao alterar um item 
            var alteracao = new Alteracao
            {
                produtoNome = produtoBanco.nome,
                tipoAlteracao = "Atualização",
                nomeDeQuemAlterou = nomeDeQuemAlterou,
                dataAlteracao = DateTime.Now,
            };

            _context.Add(alteracao);
            _context.SaveChanges();


            return Ok(produtoBanco);
        }
        
        [HttpDelete("delete/{id}")]
        public IActionResult Deletar(int id, string nomeDeQuemAlterou)
        {
            var produto = _context.Produtos.Find(id);

            if (produto == null) return NotFound();

            _context.Produtos.Remove(produto);

            // Armazena as alterações ao alterar um item 
            var alteracao = new Alteracao
            {
                produtoNome = produto.nome,
                tipoAlteracao = "Deletou",
                nomeDeQuemAlterou = nomeDeQuemAlterou,
                dataAlteracao = DateTime.Now,
            };

            _context.Add(alteracao);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("todos-produtos")]
        public IActionResult TodosProdutos()
        {
            var produtos = _context.Produtos.ToList();

            if (produtos == null) return NotFound();


            return Ok(produtos);
        }
    }
}