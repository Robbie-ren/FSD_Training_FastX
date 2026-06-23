package com.fsx.repository;

import com.fsx.dto.TopRouteDto;
import com.fsx.model.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query("""
            select r
            from Route r
            where r.isActive = true and(
            lower(r.sourceCity) like lower(concat('%', :keyword, '%'))
            OR lower(r.destinationCity) like lower(concat('%', :keyword, '%'))
            )
            """)
    Page<Route> getRoutes(String keyword, Pageable pageable);

    @Query("""
            select r from Route r where r.isActive=true""")
    Page<Route> findAllActive(Pageable pageable);

    @Query("""
            select distinct r.sourceCity
            from Route r
            where lower(r.sourceCity) like lower(concat('%', :query, '%'))""")
    List<String> searchSourceCities( String query);

    @Query("""
            select distinct r.destinationCity
            from Route r
            where lower(r.destinationCity) like lower(concat('%', :query, '%'))""")
    List<String> searchDestinationCities(String query);

    @Query("""
        select new com.fsx.dto.TopRouteDto(
            r.sourceCity,
            r.destinationCity,
            min(s.price),
            count(b)
        )
        from Booking b
        join b.schedule s
        join s.route r
        group by r.sourceCity, r.destinationCity
        order by count(b) desc
    """)
    List<TopRouteDto> findTopRoutes(Pageable pageable);
}
