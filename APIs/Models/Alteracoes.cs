using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using APIs.Models;

namespace APIs.Models
{
    public class Alteracao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ProdutoId { get; set; }

        public DateTime DataAlteracao { get; set; }

        [StringLength(255)]
        public string Usuario { get; set; }

        [StringLength(50)]
        public string TipoAlteracao { get; set; }

        public string Detalhes { get; set; }

        [ForeignKey("ProdutoId")]
        public virtual Produto Produto { get; set; }
    }


}
