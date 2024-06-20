package com.example.demo.common;

import com.example.demo.entity.UserInfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class UserSessionTools {
    /**
     * 获取当前登录用户
     * @param request
     * @return
     */
    public static UserInfo getLoginUser(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        Object objSession = null;
        if (session != null && (objSession = session.getAttribute(ApplicationVariable.SESSION_KEY_USERINFO))!=null){
                return (UserInfo) objSession;
        }
        return null;
    }

    /**
     * 更新用户会话
     * @param request
     * @param userInfo
     */
    public static void updateLoginUser(HttpServletRequest request, UserInfo userInfo) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute(ApplicationVariable.SESSION_KEY_USERINFO)!=null) {
            session.setAttribute(ApplicationVariable.SESSION_KEY_USERINFO, userInfo);
        }
    }
}
