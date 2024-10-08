﻿// <auto-generated />
using System;
using APIs.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace APIs.Migrations
{
    [DbContext(typeof(BdContext))]
    [Migration("20240829182651_CriacaoTabelaProdutoEAlteracoes")]
    partial class CriacaoTabelaProdutoEAlteracoes
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("APIs.Models.Alteracao", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("dataAlteracao")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("nomeDeQuemAlterou")
                        .HasColumnType("longtext");

                    b.Property<string>("produtoNome")
                        .HasColumnType("longtext");

                    b.Property<string>("tipoAlteracao")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.ToTable("Alteracoes");
                });

            modelBuilder.Entity("APIs.Models.Produto", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("dataEmissao")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ingredientes")
                        .HasColumnType("longtext");

                    b.Property<bool>("itemEspecial")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("nome")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int>("quantidade")
                        .HasColumnType("int");

                    b.Property<decimal>("valor")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("id");

                    b.ToTable("Produtos");
                });
#pragma warning restore 612, 618
        }
    }
}
