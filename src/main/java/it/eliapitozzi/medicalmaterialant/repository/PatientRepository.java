package it.eliapitozzi.medicalmaterialant.repository;

import it.eliapitozzi.medicalmaterialant.model.Patient;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Elia
 */
public interface PatientRepository extends PagingAndSortingRepository<Patient, Long> {
}
