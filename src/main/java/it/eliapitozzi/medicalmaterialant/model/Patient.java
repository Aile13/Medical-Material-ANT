package it.eliapitozzi.medicalmaterialant.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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

    public Patient() {
    }

    public Patient(String nominative, String address, String place, String telephoneNumber) {
        this.nominative = nominative;
        this.address = address;
        this.place = place;
        this.telephoneNumber = telephoneNumber;
    }

}
