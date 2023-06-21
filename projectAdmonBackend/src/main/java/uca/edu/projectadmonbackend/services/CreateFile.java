package uca.edu.projectadmonbackend.services;

import  com.fasterxml.jackson.core.JsonProcessingException;

import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uca.edu.projectadmonbackend.models.BodyLoadFile;
import uca.edu.projectadmonbackend.models.ClientData;
import uca.edu.projectadmonbackend.models.ClientList;
import uca.edu.projectadmonbackend.models.FileResponse;

import java.util.ArrayList;
import java.util.List;

public class CreateFile {
    static Logger LOGGER = LoggerFactory.getLogger(CreateFile.class);
    private static EncryptDescript encryptDescript = new EncryptDescript();

    public static FileResponse createFileFromJson(BodyLoadFile bodyLoadFile) {
        FileResponse fileResponse = new FileResponse();
        List<String> file = new ArrayList<>();
        for (ClientData clientData : bodyLoadFile.getJsonFile().getClientes()) {
            String line = clientData.getDocumento();
            line += bodyLoadFile.getPipe();
            line += clientData.getNombres();
            line += bodyLoadFile.getPipe();
            line += clientData.getApellidos();
            line += bodyLoadFile.getPipe();
            line += encryptDescript.decryptCreditCardNumber(clientData.getTarjeta(), bodyLoadFile.getPrivateKey());
            line += bodyLoadFile.getPipe();
            line += clientData.getTipo();
            line += bodyLoadFile.getPipe();
            line += clientData.getTelefono();
            line += bodyLoadFile.getPipe();
            String poligono = clientData.getPoligono().getCoordenadas().toString().replaceAll("[\\[\\]]", "");
            line += "(("+poligono+"))";
            file.add(line);
        }
        fileResponse.setMessage("Archivo creado correctamente");
        fileResponse.setFile(file);
        return fileResponse;
    }
    public static ClientList getJSON(String xmlDocument) throws JsonProcessingException, JSONException {
        LOGGER.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%         getJSON         %%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        JSONObject clientes = XML.toJSONObject(xmlDocument);
        JSONObject cliente = (JSONObject) clientes.get("clientes");
        ClientList clientList = new Gson().fromJson(cliente.toString().replaceAll("cliente","clientes"), ClientList.class);
        LOGGER.info("clientList: {}", clientList);
        return clientList;
    }
}

