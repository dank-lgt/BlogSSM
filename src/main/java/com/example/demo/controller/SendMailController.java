package com.example.demo.controller;

import com.example.demo.common.AjaxResult;
import com.example.demo.common.ApplicationVariable;
import com.example.demo.common.GenerateCode;
import com.example.demo.common.UserSessionTools;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 测试邮件发送
 * @author qzz
 */
@RestController
@RequestMapping("/mail")
public class SendMailController {

    @Autowired
    private MailService mailService;


    /**
     * 发送文本邮件
     * @param to      邮件收信人
     * @param subject 邮件主题
     * @param text    邮件内容
     */
    @RequestMapping("/sendTextMail")
    public void sendTextMail(String to,String subject,String text) throws MessagingException {
        mailService.sendTextMailMessage(to,subject,text);
    }


    /**
     * 发送HTML邮件
     * @param to
     * @param subject
     * @param content
     */
    @RequestMapping("/sendHtmlMailMessage")
    public void sendHtmlMailMessage(String to,String subject,String content){
        mailService.sendHtmlMailMessage(to,subject,content);
    }

    /**
     * 发送带附件的邮件
     * @param to
     * @param subject
     * @param content
     */
    @RequestMapping("/sendAttachmentMailMessage")
    public void sendAttachmentMailMessage(String to,String subject,String content,String filePath){
        filePath="D:\\1.png";
        mailService.sendAttachmentMailMessage(to,subject,content,filePath);
    }

    @RequestMapping("/sendmail")
    public AjaxResult sendVerificationCode(String email, HttpServletRequest request) throws MessagingException {
        HttpSession session = request.getSession();
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (!StringUtils.hasLength(email) &&!userInfo.getEmail().equals(email))
            return AjaxResult.fail(-1,"邮箱错误！");
        String subject = "邮箱验证";
        String verificationCode = GenerateCode.generateVerificationCode(6);
        String text = "邮箱验证码为："+verificationCode;
        session.setAttribute(ApplicationVariable.SESSION_KEY_VerificationCode,verificationCode);
        mailService.sendTextMailMessage(email,subject,text);
        return AjaxResult.success(1);
    }

    @RequestMapping("/checkemailcode")
    public AjaxResult CheckEmailCode(String verificationCode,HttpServletRequest request){
        if (!StringUtils.hasLength(verificationCode)) return AjaxResult.fail(-1,"输入错误！");
        HttpSession session = request.getSession();
        if (verificationCode.equals(session.getAttribute(ApplicationVariable.SESSION_KEY_VerificationCode)))
            return AjaxResult.success(1);
        return AjaxResult.fail(-1,"输入错误！");
    }
}

