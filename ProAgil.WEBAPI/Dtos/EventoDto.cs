

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WEBAPI.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="Local deve ser preenchido")]
        [StringLength(150, MinimumLength=3, ErrorMessage="Local deve ter entre 3 e 150 caracter")]
        public string Local { get; set; }

        
        public string DataEvento { get;  set; }

        [Required(ErrorMessage="O tema deve ser preenchido")]
        public string Tema { get; set; }

        [Range(2,1500, ErrorMessage="Quantidade deve ser entre 2 e 1500 pessoas")]
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }

        [Phone]
        public string Telefone { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}