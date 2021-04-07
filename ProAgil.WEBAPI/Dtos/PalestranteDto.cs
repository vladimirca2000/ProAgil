using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WEBAPI.Dtos
{
    public class PalestranteDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="O Campo {0} é obrigatório")]
        public string Nome { get; set; }
        public string MiniCurriculo { get; set; }
        public string ImageURL { get; set; }
        public string Telefone { get; set; }

        [Required(ErrorMessage="O Campo {0} é obrigatório")]
        [EmailAddress]
        public string Email { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<EventoDto> Eventos { get; set; }
    }
}