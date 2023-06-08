package fd.adse.account.security;

import com.google.common.base.Strings;
import java.security.Key;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import org.springframework.security.crypto.codec.Base64;


public class JPACryptoConverter implements AttributeConverter<String, String> {

    private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
    private static final String KEY = "c9d89e0c15b67e9c";

    @Override
    public String convertToDatabaseColumn(String sensitive) {
        if (Strings.isNullOrEmpty(sensitive)) {
            return "";
        }
        Key key = new SecretKeySpec(KEY.getBytes(), "AES");
        try {
            final Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.ENCRYPT_MODE, key);
            final String encrypted = new String(Base64.encode(c.doFinal(sensitive.getBytes())), "UTF-8");
            return encrypted;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String convertToEntityAttribute(String sensitive) {
        if (Strings.isNullOrEmpty(sensitive)) {
            return "";
        }
        Key key = new SecretKeySpec(KEY.getBytes(), "AES");
        try {
            final Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.DECRYPT_MODE, key);
            final String decrypted = new String(c.doFinal(Base64.decode(sensitive.getBytes("UTF-8"))));
            return decrypted;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        System.out.println(new JPACryptoConverter().convertToDatabaseColumn("123456"));
    }
}
