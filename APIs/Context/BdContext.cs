using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;
using APIs.Models;


namespace APIs.Context
{
    public class BdContext : DbContext
    {

        public BdContext(DbContextOptions<BdContext> options) : base(options){}

        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Alteracao> Alteracoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração adicional para a tabela Alteracoes
            modelBuilder.Entity<Alteracao>()
                .HasOne(a => a.Produto)// Cada alteração possui um Produto
                .WithMany()// Um Produto possui n Alteracoes
                .HasForeignKey(a => a.ProdutoId);

            // Configuração de conversão para o campo Ingredientes
            var converter = new ValueConverter<List<string>, string>(
                v => JsonSerializer.Serialize(v, new JsonSerializerOptions { WriteIndented = false }),
                v => JsonSerializer.Deserialize<List<string>>(v, new JsonSerializerOptions { WriteIndented = false }));

            modelBuilder.Entity<Produto>()
                .Property(p => p.Ingredientes)
                .HasConversion(converter);
        }
    }
}

