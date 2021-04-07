using System.ComponentModel.DataAnnotations;

namespace ProAgil.WEBAPI.Dtos
{
    public class RedeSocialDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="O Campo {0} é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage="O Campo {0} é obrigatório")]
        public string URL { get; set; }
    }
}