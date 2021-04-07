using System.ComponentModel.DataAnnotations;

namespace ProAgil.WEBAPI.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="O Campo {0} é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage="O Campo {0} é obrigatório")]
        public decimal Preco { get; set; }
        public string DataInicio { get; set; }
        public string DataFim { get; set; }

        [Range(2,1500)]
        public int Quantidade { get; set; }
    }
}