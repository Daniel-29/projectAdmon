package uca.edu.projectadmonbackend.Exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import uca.edu.projectadmonbackend.models.ErrorValidated;
import uca.edu.projectadmonbackend.models.ResponseDto;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {
    Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        ResponseDto<ErrorValidated> responseDto = new ResponseDto();
        LOGGER.info("############################         GlobalExceptionHandler         ############################");
        HttpStatus status = HttpStatus.BAD_REQUEST;
        List<String> details = new ArrayList<>();
        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            details.add(error.getDefaultMessage());
        }
        ErrorValidated error = new ErrorValidated("Validation Failed", details);
        responseDto.FillStatus(status);
        responseDto.setData(error);
        LOGGER.info("handleMethodArgumentNotValid: {}", responseDto);
        return new ResponseEntity(responseDto, status);
    }
}
