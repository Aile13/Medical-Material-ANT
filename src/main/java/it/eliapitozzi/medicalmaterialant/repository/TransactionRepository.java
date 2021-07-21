package it.eliapitozzi.medicalmaterialant.repository;

import it.eliapitozzi.medicalmaterialant.model.Transaction;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Elia
 */
public interface TransactionRepository extends PagingAndSortingRepository<Transaction, Long> {

}
