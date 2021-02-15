namespace Turmenic.DataAccess.EntityFrameworkCore.Repository
{
    public abstract class EntityBase<TId>
    {
        public TId Id { get; set; }
    }
}
