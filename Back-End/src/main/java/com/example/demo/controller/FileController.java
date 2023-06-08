package com.example.demo.controller;

import com.example.demo.DemoProperties;
import com.example.demo.constant.ErrorCodeConstants;
import com.example.demo.exception.ErrorCodeException;
import com.example.demo.manager.FileStoreManager;
import com.example.demo.model.BaseResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/common/files")
@Api(tags = "文件管理")
public class FileController {
    @GetMapping("/download")
    @ApiModelProperty("使用相对路径下载文件")
    public void downloadFiles(@RequestParam String relativePath, HttpServletResponse response) {
        FileStoreManager storeManager = (FileStoreManager) DemoProperties.getManager(FileStoreManager.class);
        File file = storeManager.getFile(relativePath);
        if (!file.exists()) {
            throw new ErrorCodeException(ErrorCodeConstants.YZ_4002);
        }
        try {
            InputStream fileInputStream = new FileInputStream(file);
            BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
            OutputStream output = response.getOutputStream();

            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(output);
            response.reset();
            response.setContentType("application/x-download");
            response.setContentLength((int) (file.length()));
            response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");

            int bytesRead;
            byte[] buffer = new byte[1024];

            while ((bytesRead = bufferedInputStream.read(buffer)) != -1) {
                bufferedOutputStream.write(buffer, 0, bytesRead);
            }
            bufferedOutputStream.flush();
        } catch (IOException e) {
            throw new RuntimeException("Failed to download file: " + e.getMessage(), e);
        }
    }

    @PostMapping("/upload")
    @ApiModelProperty("上传文件，返回相对路径字符串")
    public BaseResponse<String> upload(
        @RequestPart MultipartFile file
    ) throws IOException {
        FileStoreManager storeManager = (FileStoreManager) DemoProperties.getManager(FileStoreManager.class);
        return new BaseResponse(storeManager.storeFile(file), "文件上传成功!");
    }
}

