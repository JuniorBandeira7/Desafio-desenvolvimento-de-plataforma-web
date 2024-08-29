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
        public int id { get; set; }

        public string produtoNome { get; set; }

        public string tipoAlteracao { get; set; }

        public string nomeDeQuemAlterou { get; set; }

        public DateTime dataAlteracao { get; set; }
    }


}
