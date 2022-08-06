using LeakyShipsAPI.Model;

namespace LeakyShipsAPI.Repositories;

public class SessionRepository : IRepository<Session>
{
    public ValueTask<Session> GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public bool Create(Session entity)
    {
        throw new NotImplementedException();
    }

    public bool Update(Session entity)
    {
        throw new NotImplementedException();
    }

    public bool Delete(Session entity)
    {
        throw new NotImplementedException();
    }
}