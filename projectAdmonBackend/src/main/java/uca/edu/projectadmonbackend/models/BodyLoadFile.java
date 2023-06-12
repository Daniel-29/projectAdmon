package uca.edu.projectadmonbackend.models;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Data
@Setter
@Getter
@ToString
public class BodyLoadFile implements Serializable {
    @NotNull(message = "El campo pipe no puede ser nulo")
    @NotEmpty(message = "El campo pipe no puede estar vacio")
    @NotBlank(message = "El campo pipe no puede estar en blanco")
    @Size(min = 1, max = 1 , message = "El campo pipe debe tener un caracter")
    private String pipe;
    @NotNull(message = "El campo privateKey no puede ser nulo")
    @NotEmpty(message = "El campo privateKey no puede estar vacio")
    @NotBlank(message = "El campo privateKey no puede estar en blanco")
    private String privateKey;
    @NotNull(message = "El campo typeDoc no puede ser nulo")
    @NotEmpty(message = "El campo typeDoc no puede estar vacio")
    @NotBlank(message = "El campo typeDoc no puede estar en blanco")
    @Size(min = 3, max = 4 , message = "El campo typeDoc debe ser XML O JSON")
    private String typeDoc;
    private ClientList jsonFile;
    private String xmlFile;

}


