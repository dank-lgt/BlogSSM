package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyConfig implements WebMvcConfigurer {
    @Autowired
    private  LoginInterceptor loginInterceptor;

    @Value("${img-path}")
    private String imagePath;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/login.html")
                .excludePathPatterns("/reg.html")
                .excludePathPatterns("/search.html")
                .excludePathPatterns("/blog_list.html")
                .excludePathPatterns("/blog_content.html")
                .excludePathPatterns("/test.html")
                .excludePathPatterns("/css/**")
                .excludePathPatterns("/editor.md/**")
                .excludePathPatterns("/img/**")
                .excludePathPatterns("/image/**")
                .excludePathPatterns("/js/**")
                .excludePathPatterns("/user/reg")
                .excludePathPatterns("/user/login")
                .excludePathPatterns("/user/islogin")
                .excludePathPatterns("/art/getdetail")
                .excludePathPatterns("/art/addrcount")
                .excludePathPatterns("/art/getlistlimitPage")
                .excludePathPatterns("/art/getcount")
                .excludePathPatterns("/user/getcode")
                .excludePathPatterns("/mail/**")
                .excludePathPatterns("/art/getsearchart");
    }



    /**
     * 自定义资源映射
     * 由于在浏览器界面上传图片，而 Spring boot 程序是感知不到的，因此需要自定义资源映射
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/**").addResourceLocations("file:" + imagePath);
    }
}
