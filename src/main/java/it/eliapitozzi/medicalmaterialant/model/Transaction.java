package it.eliapitozzi.medicalmaterialant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Elia
 */

@Entity
@Setter
@Getter
@ToString
@EqualsAndHashCode

public class Transaction {

    @Id
    @GeneratedValue
    private Long id;

    private String deliveryWaybill;
    private String withdrawalWaybill;

    private Date deliveryDate;
    private Date withdrawalDate;

    private Material material;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Patient patient;

    @Version
    @JsonIgnore
    private Long version;

    public Transaction() {
    }

    public Transaction(String deliveryWaybill, String withdrawalWaybill, Date deliveryDate, Date withdrawalDate, Material material, Patient patient) {
        this.deliveryWaybill = deliveryWaybill;
        this.withdrawalWaybill = withdrawalWaybill;
        this.deliveryDate = deliveryDate;
        this.withdrawalDate = withdrawalDate;
        this.material = material;
        this.patient = patient;
    }

}
