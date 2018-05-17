using System.Collections.Generic;

namespace Repository
{
  public interface IRepository<T>
  {
    int Create(T t);
    void Update(T t);
    void Delete(int id);
    T Details(int id);
    IEnumerable<T> List();
  }
}
