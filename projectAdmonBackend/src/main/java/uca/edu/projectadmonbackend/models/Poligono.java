package uca.edu.projectadmonbackend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Data
@Getter
@Setter
@ToString
public class Poligono {
    private List<Float> coordenadas;
}
