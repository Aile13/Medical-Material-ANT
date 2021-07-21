package it.eliapitozzi.medicalmaterialant.repository;

import it.eliapitozzi.medicalmaterialant.model.Patient;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Elia
 */
public interface PatientRepository extends PagingAndSortingRepository<Patient, Long> {

}
