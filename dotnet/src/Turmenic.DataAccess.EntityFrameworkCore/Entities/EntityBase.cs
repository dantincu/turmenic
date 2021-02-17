namespace Turmenic.DataAccess.EntityFrameworkCore.Entities
{
    public abstract class EntityBase<TId>
    {
        public TId Id { get; set; }
    }

    public abstract class NamedEntityBase<TId> : EntityBase<TId>
    {
        public string Name { get; set; }
    }

    public abstract class EnumEntityBase<TId> : EntityBase<TId>
    {
        public string EnumName { get; set; }
        public int EnumVal { get; set; }
    }

    public abstract class NamedEnumEntityBase<TId> : EnumEntityBase<TId>
    {
        public string Name { get; set; }
    }
}
