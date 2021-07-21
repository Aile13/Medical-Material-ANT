package it.eliapitozzi.medicalmaterialant.model;

import it.eliapitozzi.medicalmaterialant.repository.PatientRepository;
import it.eliapitozzi.medicalmaterialant.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.Date;

/**
 * @author Elia
 */
@Configuration
public class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabasePaziente(PatientRepository patientRepository, TransactionRepository transactionRepository) {

        return args -> {
            Patient p = patientRepository.save(new Patient("Pippo", "Via Leonardo", "Passirano", "+396565665 030655646845"));
            Patient p2 = patientRepository.save(new Patient("Pluto", "Via Gramsci", "Brescia", "+334562849"));
            Patient p3 = patientRepository.save(new Patient("Paperino", "Via Guido", "Brescia", "+334562859"));

            log.info("Preloading " + p);
            log.info("Preloading " + p2);
            log.info("Preloading " + p3);
            log.info("Preloading " + transactionRepository.save(new Transaction("", "",
                    Date.from(Instant.now()), null, Material.ALZAWATER, p
            )));
            log.info("Preloading " + transactionRepository.save(new Transaction("", "",
                    Date.from(Instant.now()), null, Material.ALZAPERSONE_DA_PAVIMENTO, p2
            )));
            log.info("Preloading " + transactionRepository.save(new Transaction("", "",
                    Date.from(Instant.now()), null, Material.ALZACOPERTA, p2
            )));
        };
    }
}
