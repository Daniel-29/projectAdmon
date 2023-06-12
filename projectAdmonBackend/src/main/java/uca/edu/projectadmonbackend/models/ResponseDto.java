package uca.edu.projectadmonbackend.models;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
@Setter
@Getter
@ToString
public class ResponseDto<T> implements Serializable {

        private String message;
        private String status;
        private Integer code;
        private T data;
        public void FillStatus(HttpStatus status) {
            this.status = status.toString();
            this.code = status.value();
            this.message = status.getReasonPhrase();
        }

}
