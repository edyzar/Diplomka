package com.edwardzarecky.shopservice.repository;

import com.edwardzarecky.shopservice.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edward Zářecký
 */

//Repository pro práci s databází s entitou Shop
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

}
