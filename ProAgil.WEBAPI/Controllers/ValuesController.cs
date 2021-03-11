using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAgil.Repository;

namespace ProAgil.WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        public readonly ProAgilContext Context;

        public ValuesController(ProAgilContext context)
        {
            Context = context;

        }


        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try 
            {
                var result = await Context.Eventos.ToListAsync();
                return Ok(result);
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try 
            {
                var result = await Context.Eventos.FirstOrDefaultAsync(x => x.Id == id);
                return Ok(result);
            }    
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            //return Ok(Context.Eventos.ToList().FirstOrDefault(x => x.EventoId == id));
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
