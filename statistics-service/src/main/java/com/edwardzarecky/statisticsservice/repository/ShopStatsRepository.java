package com.edwardzarecky.statisticsservice.repository;

import com.edwardzarecky.statisticsservice.entity.ShopStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edward Zářecký
 * */

//Repository pro práci s databází s entitou ShopStats

@Repository
public interface ShopStatsRepository extends JpaRepository<ShopStats, Long> {
}
