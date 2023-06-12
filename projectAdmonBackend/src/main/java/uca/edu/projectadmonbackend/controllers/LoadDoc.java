package uca.edu.projectadmonbackend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import uca.edu.projectadmonbackend.models.BodyLoadFile;
import uca.edu.projectadmonbackend.models.ClientList;
import uca.edu.projectadmonbackend.models.FileResponse;
import uca.edu.projectadmonbackend.models.ResponseDto;
import uca.edu.projectadmonbackend.services.CreateFile;

@RestController
public class LoadDoc {
    Logger LOGGER = LoggerFactory.getLogger(LoadDoc.class);
    @RequestMapping(value = "/loadDoc", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE , produces = MediaType.APPLICATION_JSON_VALUE)
    @Validated
    public ResponseEntity<?> loadDoc(@RequestBody @Validated BodyLoadFile bodyLoadDoc){
        HttpStatus status = HttpStatus.OK;
        ResponseDto<FileResponse> responseDto = new ResponseDto<>();

        LOGGER.info("||||||||||||||||||||||||||||         loadDoc         ||||||||||||||||||||||||||||");
        LOGGER.info("Request: {}", bodyLoadDoc);
        ResponseEntity<ResponseDto> response = null;
        responseDto.FillStatus(status);
        try {
            if (bodyLoadDoc.getTypeDoc().equals("JSON")){
                FileResponse readFile = CreateFile.createFileFromJson(bodyLoadDoc);
                responseDto.setData(readFile);
            } else if (bodyLoadDoc.getTypeDoc().equals("XML")){
                ClientList readFile = CreateFile.getJSON(bodyLoadDoc.getXmlFile());
                bodyLoadDoc.setJsonFile(readFile);
                LOGGER.info("Request: {}", bodyLoadDoc);
                FileResponse readFileXml = CreateFile.createFileFromJson(bodyLoadDoc);
                responseDto.setData(readFileXml);
            } else {
                throw new Exception("Tipo de documento no soportado");
            }
        }catch (Exception e){
            LOGGER.error("Error al cargar el documento: {}", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDto.FillStatus(status);
            responseDto.setMessage(e.getMessage());
            responseDto.setData(null);
        }
        response =  new ResponseEntity<>(responseDto, status);
        return response;
    }

}
