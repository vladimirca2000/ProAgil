using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;
using ProAgil.WEBAPI.Dtos;

namespace ProAgil.WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repo;
        private readonly IMapper _mapper;

        public EventoController(IProAgilRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try 
            {
                var eventos = await _repo.GetAllEventosAsync(true);
                
                var result = _mapper.Map<EventoDto[]>(eventos);

                return Ok(result);
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // Post api/values/upload
        [HttpPost("upload")]
        public async Task<IActionResult> upload()
        {
            try 
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if(file.Length > 0)
                {
                    var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, filename.Replace("\"", " ").Trim());

                    using(var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                return Ok();
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
            return BadRequest("Erro ao tentar realizar upload");
        }
        
        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {
            try 
            {
                var evento = await _repo.GetEventoAsyncById(EventoId, true);

                var result = _mapper.Map<EventoDto>(evento);                

                return Ok(result);
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try 
            {
                var eventos = await _repo.GetAllEventosAsyncByTema(tema, true);

                var result = _mapper.Map<EventoDto[]>(eventos);

                return Ok(result);
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
            try 
            {
                var evento = _mapper.Map<Evento>(model);



                _repo.Add(evento);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/evento/{model.Id}", _mapper.Map<EventoDto>(evento));
                } 
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
            return BadRequest();
        }

        [HttpPut("{EventoId}")] 
        public async Task<IActionResult> Put(int EventoId, EventoDto model)
        {
            try
            {
                var evento = await _repo.GetEventoAsyncById(EventoId, false);
                if (evento == null) return NotFound();

                var idLotes = new List<int>();
                var idRedesSociais = new List<int>();

                model.Lotes.ForEach(item => idLotes.Add(item.Id));
                model.RedesSociais.ForEach(item => idRedesSociais.Add(item.Id));

                var lotes = evento.Lotes.Where(
                    lote => !idLotes.Contains(lote.Id)
                ).ToArray();

                var redesSociais = evento.RedesSociais.Where(
                    rede => !idRedesSociais.Contains(rede.Id)
                ).ToArray();

                if (lotes.Length > 0) _repo.DeleteRange(lotes);
                if (redesSociais.Length > 0) _repo.DeleteRange(redesSociais);

                _mapper.Map(model, evento);

                _repo.Update(evento);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/evento/{model.Id}", _mapper.Map<EventoDto>(evento));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{EventoId}")]
        public async Task<IActionResult> Delete(int EventoId)
        {
            try 
            {
                var evento = await _repo.GetEventoAsyncById(EventoId, false);
                if(evento == null) return NotFound();

                _repo.Delete(evento);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok();
                } 
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
            return BadRequest();
        }
    }
}