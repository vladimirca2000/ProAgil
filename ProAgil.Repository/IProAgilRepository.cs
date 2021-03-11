using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        //Geral
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;

         Task<bool> SaveChangesAsync();

         //Eventos
         Task<Evento[]> GetAllEventosAsyncByTema(string Tema, bool includePalestrantes);
         Task<Evento[]> GetAllEventosAsync(bool includePalestrantes);
         Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes);

         //Palestrantes
        Task<Palestrante[]> GetAllPalestrantesAsyncByNome(bool includePalestrantes);
         Task<Palestrante> GetPalestranteAsync(int PalestranteId, bool includePalestrantes);

    }
}