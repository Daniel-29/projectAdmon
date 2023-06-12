package uca.edu.projectadmonbackend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Data
@Getter
@Setter
@ToString
public class FileResponse implements Serializable {
    private String message;
    private List<String> file;
}
