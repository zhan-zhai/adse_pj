package fd.adse.commodity.manager;


import com.google.common.base.Strings;
import fd.adse.commodity.DemoProperties;
import org.springframework.data.util.Pair;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

public class FileStoreManager extends AbstractManager {
    private final String tmpPath = "E://resources/";
    private String fileStorePath;

    public FileStoreManager(DemoProperties demoProperties) {
        super(demoProperties);
        if (Strings.isNullOrEmpty(demoProperties.getFileStorePath())) {
            fileStorePath = tmpPath;
        } else if (!demoProperties.getFileStorePath().startsWith("/")) {
            fileStorePath = "/" + demoProperties.getFileStorePath();
        } else {
            fileStorePath = demoProperties.getFileStorePath();
        }
    }

    public String storeFile(MultipartFile multipartFile) throws IOException {
        String prefix = String.valueOf(System.currentTimeMillis());
        File parent = new File(fileStorePath, prefix);
        if (!parent.exists()) {
            parent.mkdirs();
        }
        String originalFilename = multipartFile.getOriginalFilename();
        if (Strings.isNullOrEmpty(originalFilename)) {
            originalFilename = UUID.randomUUID().toString().replace("-", "");
        }
        File file = new File(parent, originalFilename);
        multipartFile.transferTo(file);
        return prefix + "/" + originalFilename;
    }

    public File getFile(String imgRelativePath) {
        return new File(fileStorePath, imgRelativePath);
    }
}

