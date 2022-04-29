package com.edwardzarecky.statisticsservice.service;

import com.edwardzarecky.statisticsservice.dto.BookDto;
import com.edwardzarecky.statisticsservice.dto.CustomerStatsDto;
import com.edwardzarecky.statisticsservice.dto.CustomMessage;
import com.edwardzarecky.statisticsservice.entity.CustomerStats;
import com.edwardzarecky.statisticsservice.repository.CustomerStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Edward Zářecký
 */

//Služba představující logiku aplikace, public metody se volají z CustomerStatsController
//dotazy do databáze jsou prováděny skrze používání CustomerStatsRepository
@Service
@RequiredArgsConstructor
public class CustomerStatsService {

    private final CustomerStatsRepository customerStatsRepository;

    private final RestTemplate restTemplate;

    public static final String BOOK_SERVICE_API = "http://book-service/v1/book/";

    //Metoda sloužící pro načtení detailu knih z book-service dle bookId v entitě CustomerStats
    //vrací List<CustomerStatsDto> s detailem
    public List<CustomerStatsDto> findAllCustomerStatsDto() {
        List<CustomerStats> customerStatsList = findAll();
        List<CustomerStatsDto> allCustomerStatsDto = new ArrayList<>();

        customerStatsList.forEach(it -> {
            CustomerStatsDto dto = new CustomerStatsDto();
            CustomerStats customerStats = findById(it.getBookId());

            BookDto bookDto = restTemplate.getForObject(BOOK_SERVICE_API + customerStats.getBookId(), BookDto.class);

            dto.setCustomerStats(customerStats);
            dto.setBookDto(bookDto);

            allCustomerStatsDto.add(dto);
        });

        return allCustomerStatsDto;
    }

    //Při přidání knihy zákazníkovi se v databázi přičte číslo jedna do numberOfOwners
    public void saveCustomerStats(List<CustomerStats> customerStatsList) {
        customerStatsList.forEach(it -> {
            CustomerStats temp = findById(it.getBookId());
            if (temp != null) {
                it.setNumberOfOwners(temp.getNumberOfOwners() + 1);
                customerStatsRepository.save(it);
            } else {
                CustomerStats customerStats = new CustomerStats();
                customerStats.setBookId(it.getBookId());
                customerStats.setNumberOfOwners(1);
                customerStatsRepository.save(customerStats);
            }
        });
    }

    //Při odebrání knihy zákazníkovi se v databázi odečte číslo jedna z numberOfOwners
    //Pokud žádný jiný zákazník nemá vybranou tuto knihu, tak se odstraní ze statistik
    public void deleteCustomerStats(List<CustomerStats> customerStats) {
        customerStats.forEach(it -> {
            CustomerStats temp = findById(it.getBookId());
            if (temp != null) {
                it.setNumberOfOwners(temp.getNumberOfOwners() - 1);
                if (it.getNumberOfOwners() == 0) {
                    deleteCustomerStatsById(it.getBookId());
                } else {
                    customerStatsRepository.save(it);
                }
            }
        });
    }

    public List<CustomerStats> mapToCustomerStats(CustomMessage customMessage) {
        List<CustomerStats> customerStatsList = new ArrayList<>();

        if (!customMessage.getBookIds().isEmpty()) {
            customMessage.getBookIds().forEach(it -> {
                CustomerStats customerStats = new CustomerStats();
                customerStats.setBookId(it);
                customerStatsList.add(customerStats);
            });
        }
        return customerStatsList;
    }

    private CustomerStats findById(Long bookId) {
        return customerStatsRepository.findById(bookId).orElse(null);
    }

    private List<CustomerStats> findAll() {
        return customerStatsRepository.findAll();
    }

    private void deleteCustomerStatsById(Long bookId) {
        customerStatsRepository.deleteById(bookId);
    }

}
