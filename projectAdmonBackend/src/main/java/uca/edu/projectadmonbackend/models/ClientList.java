package uca.edu.projectadmonbackend.models;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;


@Data
@Setter
@Getter
@ToString
public class ClientList implements Serializable {
    @ToString.Include(name = "cliente")
    @NotBlank(message = "El campo clientes no puede estar en blanco")
    @NotNull(message = "El campo clientes no puede ser nulo")
    @NotEmpty(message = "El campo clientes no puede estar vacio")
    private List<ClientData> clientes;
}
