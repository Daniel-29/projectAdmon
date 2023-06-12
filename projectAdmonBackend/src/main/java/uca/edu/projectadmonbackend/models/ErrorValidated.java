package uca.edu.projectadmonbackend.models;

import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@ToString
@Builder
@AllArgsConstructor
public class ErrorValidated {
    private String message;
    private List<String> details;
}
