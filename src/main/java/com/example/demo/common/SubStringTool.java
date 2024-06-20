package com.example.demo.common;

import org.springframework.util.StringUtils;

public class SubStringTool {
    public static String subLength(String val,int maxlength){
        if (!StringUtils.hasLength(val) || val.length() <=0) return val;
        if (val.length() <= maxlength) return val;
        return val.substring(0,maxlength);
    }
}
