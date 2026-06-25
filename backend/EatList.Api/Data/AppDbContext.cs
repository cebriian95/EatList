using Microsoft.EntityFrameworkCore;
using EatList.Api.Models;

namespace EatList.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Board> Boards { get; set; }
    public DbSet<Spot> Spots { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Spot>()
            .Property(s => s.Status)
            .HasConversion<string>();

        modelBuilder.Entity<Spot>()
            .HasOne(s => s.Board)
            .WithMany(b => b.Spots)
            .HasForeignKey(s => s.BoardId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Rating>()
            .HasOne(r => r.Spot)
            .WithMany(s => s.Ratings)
            .HasForeignKey(r => r.SpotId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Rating>()
            .HasIndex(r => new { r.SpotId, r.Nickname })
            .IsUnique();

        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.Board)
            .WithMany(b => b.RefreshTokens)
            .HasForeignKey(rt => rt.BoardId)
            .OnDelete(DeleteBehavior.Cascade);    
    }

}