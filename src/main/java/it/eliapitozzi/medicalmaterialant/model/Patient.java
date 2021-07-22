package it.eliapitozzi.medicalmaterialant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;

/**
 * @author Elia
 */

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode

public class Patient {

    @Id
    @GeneratedValue
    private Long id;

    private String nominative;
    private String address;
    private String place;
    private String telephoneNumber;

    @Version
    @JsonIgnore
    private Long version;

    public Patient() {
    }

    public Patient(String nominative, String address, String place, String telephoneNumber) {
        this.nominative = nominative;
        this.address = address;
        this.place = place;
        this.telephoneNumber = telephoneNumber;
    }

}
