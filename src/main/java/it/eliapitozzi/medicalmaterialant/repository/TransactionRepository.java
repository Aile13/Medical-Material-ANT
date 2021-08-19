package it.eliapitozzi.medicalmaterialant.repository;

import it.eliapitozzi.medicalmaterialant.model.Transaction;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * @author Elia
 */
public interface TransactionRepository extends PagingAndSortingRepository<Transaction, Long> {
     List<Transaction> findAllByPatientId(Long patient_id);
}
