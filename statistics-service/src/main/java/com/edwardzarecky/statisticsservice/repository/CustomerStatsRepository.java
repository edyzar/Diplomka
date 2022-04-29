package com.edwardzarecky.statisticsservice.repository;

import com.edwardzarecky.statisticsservice.entity.CustomerStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edward Zářecký
 * */

//Repository pro práci s databází s entitou CustomerStats

@Repository
public interface CustomerStatsRepository extends JpaRepository<CustomerStats, Long> {
}
