package it.eliapitozzi.medicalmaterialant.repository;

import it.eliapitozzi.medicalmaterialant.model.Patient;
import it.eliapitozzi.medicalmaterialant.model.Transaction;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * @author Elia
 */
public interface TransactionRepository extends PagingAndSortingRepository<Transaction, Long> {
    List<Transaction> findAllByPatient(Patient patient);
}
