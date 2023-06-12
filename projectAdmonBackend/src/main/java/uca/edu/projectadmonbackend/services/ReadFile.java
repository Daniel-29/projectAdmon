package uca.edu.projectadmonbackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uca.edu.projectadmonbackend.models.BodyLoadDoc;
import uca.edu.projectadmonbackend.models.ClientData;
import uca.edu.projectadmonbackend.models.ClientList;
import uca.edu.projectadmonbackend.models.Poligono;
import java.util.ArrayList;
import com.google.gson.Gson;
import java.util.List;

public class ReadFile {
    private static EncryptDescript encryptDescript = new EncryptDescript();
    static Logger LOGGER = LoggerFactory.getLogger(ReadFile.class);
    public static ClientList readLines(BodyLoadDoc bodyLoadDoc){
        LOGGER.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%         ReadFile         %%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        ClientList clients = new ClientList();
        List<ClientData> clientDataList =  new ArrayList<>();
        for (String line : bodyLoadDoc.getFile()) {
            String[] data = line.split(bodyLoadDoc.getPipe());
            ClientData clientData = new ClientData();
            clientData.setDocumento(data[0]);
            clientData.setNombres(data[1]);
            clientData.setApellidos(data[2]);
            clientData.setTarjeta(encryptDescript.encryptCreditCardNumber(data[3], bodyLoadDoc.getPrivateKey()));
            clientData.setTipo(data[4]);
            clientData.setTelefono(data[5]);
            String[] poligono = data[6].replaceAll("[()]*","").split(",");
            List<Float> coordenadas = new ArrayList<>();
            for (String coordenada : poligono) {
                coordenadas.add(Float.parseFloat(coordenada));
            }
            Poligono poligonos = new Poligono();
            poligonos.setCoordenadas(coordenadas);
            LOGGER.info("poligono: {}", poligonos);
            clientData.setPoligono(poligonos);
            clientDataList.add(clientData);
        }
        clients.setClientes(clientDataList);
        return clients;
    }

    public static  String getXml(ClientList clientList) throws JsonProcessingException, JSONException {
        LOGGER.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%         getXml         %%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        LOGGER.info("clientList: {}", clientList.toString());
        String Gson  = new Gson().toJson(clientList);
        Gson = Gson.replace("clientes", "cliente");
        LOGGER.info("Gson: {}", Gson);
        JSONObject jsonObject = new JSONObject(Gson.toString());
        LOGGER.info("jsonObject: {}", jsonObject);
        String xml = "<clientes>" + XML.toString(jsonObject) + "</clientes>";
        return xml;
    }
}
