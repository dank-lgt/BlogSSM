package com.example.demo.entity.vo;

import com.example.demo.entity.ArticleInfo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ArticleInfoVO extends ArticleInfo {
    private String username;
    private String photo;
    private String dateTime;
    @Override
    public String toString() {
        return "ArticleInfoVO{" +
                "username='" + username + '\'' +
                "} " + super.toString();
    }
}
