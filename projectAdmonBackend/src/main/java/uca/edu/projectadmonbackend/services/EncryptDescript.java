package uca.edu.projectadmonbackend.services;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.iv.RandomIvGenerator;
import org.springframework.stereotype.Service;

@Service
public class EncryptDescript {

    public String encryptCreditCardNumber(String creditCardNumber, String key) {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithHMACSHA512AndAES_256");
        encryptor.setIvGenerator(new RandomIvGenerator());
        encryptor.setPassword("your-secret-key");
        encryptor.setPassword(key);
        return encryptor.encrypt(creditCardNumber);
    }

    public String decryptCreditCardNumber(String encryptedCreditCardNumber, String key) {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithHMACSHA512AndAES_256");
        encryptor.setIvGenerator(new RandomIvGenerator());
        encryptor.setPassword(key);
        return encryptor.decrypt(encryptedCreditCardNumber);
    }
}