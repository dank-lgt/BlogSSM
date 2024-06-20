package com.example.demo.common;

import com.example.demo.entity.ArticleInfo;

public class Draft {
    public static  boolean isDraft(ArticleInfo articleInfo){
        return articleInfo.getState() != null && articleInfo.getState() == 0;
    }
}
