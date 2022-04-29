package com.edwardzarecky.user.repository;

import com.edwardzarecky.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edward Zářecký
 * */

//Repository pro práci s databází s entitou User
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}

