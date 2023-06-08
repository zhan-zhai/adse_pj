package fd.adse.delivery.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Company extends BaseEntity{
    private String name;
    private String intro;

    public Company(String name, String intro) {
        this.name = name;
        this.intro = intro;
    }

    public Company() {

    }
}
