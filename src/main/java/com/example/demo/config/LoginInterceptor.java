package com.example.demo.config;

import com.example.demo.common.ApplicationVariable;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //判断用户登录
        HttpSession session = request.getSession(false);//没有就不创建新会话
        if (session != null && session.getAttribute(ApplicationVariable.SESSION_KEY_USERINFO) != null){
            return true;
        }

        response.sendRedirect("login.html");
        return false;
    }
}
