package uca.edu.projectadmonbackend.models;

import javax.validation.constraints.*;
import javax.xml.bind.annotation.XmlRootElement;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@ToString
@XmlRootElement(name = "cliente")
public class ClientData implements Serializable {
    @Pattern(regexp = "^[0-9]+-[0-9]+$", message = "El campo documento debe tener el formato 00000000-0")
    @ToString.Include(name = "documento")
    private String documento;
    @Pattern(regexp = "^[a-z]+\s+[a-z]+$", message = "El campo nombres solo puede tener letras")
    @ToString.Include(name = "nombres")
    private String nombres;
    @Pattern(regexp = "^[a-z]+\s+[a-z]+$", message = "El campo lastNames solo puede tener letras")
    @ToString.Include(name = "apellidos")
    private String apellidos;
    @Pattern(regexp = "^[0-9]+$", message = "El campo tarjeta solo puede tener numeros")
    @Size(min = 16, max = 16, message = "El campo tarjeta debe tener 16 digitos")
    @ToString.Include(name = "tarjeta")
    private String tarjeta;
    @Pattern(regexp = "^[a-z]+$", message = "El campo tipo solo puede tener letras")
    @ToString.Include(name = "tipo")
    private String tipo;
    @Pattern(regexp = "^[0-9]+$", message = "El campo telefono solo puede tener numeros")
    @Size(min = 8, max = 8, message = "El campo telefono debe tener 8 digitos")
    @ToString.Include(name = "telefono")
    private String telefono;
    @NotNull(message = "El campo poligono no puede ser nulo")
    @NotEmpty(message = "El campo poligono no puede estar vacio")
    @NotBlank(message = "El campo poligono no puede estar en blanco")
    @ToString.Include(name = "poligono")
    private Poligono poligono;
}
