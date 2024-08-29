using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIs.Models;

namespace APIs.Models
{
    public class Produto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   
        public int id { get; set; }
        public decimal valor { get; set; }
        public int quantidade { get; set; }
        public bool itemEspecial { get; set; }
        [StringLength(255)]
        public string nome { get; set; }
        public List<string> ingredientes { get; set; }
        public DateTime dataEmissao { get; set; }
    }
}