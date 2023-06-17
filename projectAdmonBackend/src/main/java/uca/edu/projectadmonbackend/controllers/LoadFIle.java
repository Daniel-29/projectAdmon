package uca.edu.projectadmonbackend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import uca.edu.projectadmonbackend.models.BodyLoadDoc;
import uca.edu.projectadmonbackend.models.ClientList;
import uca.edu.projectadmonbackend.models.ResponseDto;
import uca.edu.projectadmonbackend.services.ReadFile;

import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class LoadFIle {

    Logger LOGGER = LoggerFactory.getLogger(LoadFIle.class);
    @RequestMapping(value = "/loadfile", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE , produces = MediaType.APPLICATION_JSON_VALUE)
    @Validated
    public ResponseEntity<?> loadFile(@RequestBody @Validated BodyLoadDoc bodyLoadDoc){
        HttpStatus status = HttpStatus.OK;
        ResponseDto<ClientList> responseDto = new ResponseDto<>();
        ResponseDto<String> responseDtoXml = new ResponseDto<>();

        LOGGER.info("||||||||||||||||||||||||||||         LoadFile         ||||||||||||||||||||||||||||");
        LOGGER.info("Request: {}", bodyLoadDoc);
        ResponseEntity<ResponseDto> response = null;
        responseDto.FillStatus(status);
        responseDtoXml.FillStatus(status);
        try {
            ClientList readFile = ReadFile.readLines(bodyLoadDoc);
            responseDto.setData(readFile);
            if (bodyLoadDoc.getTypeDoc().equals("XML")){
                String xml = ReadFile.getXml(readFile);
                responseDtoXml.setData(xml);
            }
        }catch (Exception e){
            LOGGER.error("Error al cargar el archivo: {}", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDto.FillStatus(status);
            responseDtoXml.FillStatus(status);
            responseDto.setMessage(e.getMessage());
            responseDto.setData(null);
            responseDtoXml.setMessage(e.getMessage());
            responseDtoXml.setData(null);
        }
        response =  new ResponseEntity<>(responseDto, status);
        if (bodyLoadDoc.getTypeDoc().equals("XML")){
            response =  new ResponseEntity<>(responseDtoXml, status);
        }
        return response;
    }
}
