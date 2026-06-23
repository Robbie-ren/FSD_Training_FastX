package com.fsx.repository;

import com.fsx.dto.FilterReqDto;
import com.fsx.dto.ScheduleRespDto;
import com.fsx.model.Schedule;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer>, ScheduleRepositoryCustom {


    @Transactional
    @Modifying
    @Query("""
            update Schedule s set s.availableSeats = s.availableSeats - :seatCount where s.id =:scheduleId""")
    void decrementAvailableSeats(int scheduleId, int seatCount);

    Page<Schedule> findByBusBusOperatorId(int busOperatorId, Pageable pageable);

    @Modifying
    void deleteByBusId(int busId);

    Page<Schedule> findByBusBusOperatorUserUsername(String username, Pageable pageable);

    @Query("""
                select s
                from Schedule s
                where (
                    lower(s.route.sourceCity) like lower(concat('%', :keyword, '%'))
                    or lower(s.route.destinationCity) like lower(concat('%', :keyword, '%'))
                    or lower(s.bus.busNumber) like lower(concat('%', :keyword, '%'))
                    or lower(s.bus.busName) like lower(concat('%', :keyword, '%'))
                )
                and s.active = :active
                and s.bus.busOperator.user.username = :username
            """)
    Page<Schedule> searchSchedules(
            String keyword,
            boolean active,
            String username,
            Pageable pageable
    );
}
