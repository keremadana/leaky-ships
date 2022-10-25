using System.Dynamic;

namespace LeakyShipsAPI.Repositories;

public interface IRepository<T>
{
    ValueTask<T> GetById(Guid id);

    bool Create(T entity);
    
    bool Update(T entity);
    
    bool Delete(T entity);
}