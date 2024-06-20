package com.example.demo.controller;


import com.example.demo.common.*;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.net.http.HttpRequest;
import java.util.Base64;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CheckCodeTools codeTools;

    @RequestMapping("/reg")
    public AjaxResult reg(UserInfo userInfo){
        //1.进行非空判断
        if (userInfo == null || !StringUtils.hasLength(userInfo.getUsername()) ||
               !StringUtils.hasLength(userInfo.getPassword()))
            return  AjaxResult.fail(-1,"参数有误！");
        Integer usernameExists = userService.checkUsernameExists(userInfo.getUsername());
        if (usernameExists > 0) {
            return AjaxResult.fail(-1, "用户名已存在！");
        }
        //2.调用UserService的添加方法，并将返回的结果添加AjaxResult.data进行返回
        userInfo.setPassword(PasswordTool.encrypt(userInfo.getPassword()));
        int result = userService.reg(userInfo);
        return AjaxResult.success(result);
    }

    @RequestMapping("/getcode")
    public AjaxResult getCode(HttpServletRequest request) {
        String[] codeArr = codeTools.createImage();
        // 将验证码存储到 session
        HttpSession session = request.getSession();
        session.setAttribute(ApplicationVariable.SESSION_KEY_CHECK_CODE, codeArr[1]);
        return AjaxResult.success("/img/" + codeArr[0]);
    }

    @RequestMapping("/login")
    public  AjaxResult login(String username, String password, HttpServletRequest request){
        if (!StringUtils.hasLength(username) ||
                !StringUtils.hasLength(password))
            return  AjaxResult.fail(-1,"参数有误！");
        UserInfo userInfo = userService.login(username);
        if (userInfo == null || userInfo.getId() <= 0)
            return  AjaxResult.fail(-2,"用户名或者密码有误！");
//        if (verification == null )
//            return  AjaxResult.fail(-2,"用户名或者密码有误！");
        if (!PasswordTool.decrypt(password,userInfo.getPassword()))
            return  AjaxResult.fail(-2,"用户名或者密码有误！");
        HttpSession session = request.getSession();
//        if (verification.equals(session.getAttribute(ApplicationVariable.SESSION_KEY_CHECK_CODE))) {
//            //将当前成功登录的用户存储到session
//            session.setAttribute(ApplicationVariable.SESSION_KEY_USERINFO, userInfo);
//            return AjaxResult.success(1);
//        }
        session.setAttribute(ApplicationVariable.SESSION_KEY_USERINFO, userInfo);
        return AjaxResult.success(1);
    }


    @RequestMapping("/logout")
    public AjaxResult logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute(ApplicationVariable.SESSION_KEY_USERINFO);//关闭当前用户的session
        return AjaxResult.success(1);
    }

    @RequestMapping("/islogin")
    public AjaxResult isLogin(HttpServletRequest request){
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if(userInfo == null)  return AjaxResult.success(0);
        return AjaxResult.success(userInfo);
    }

    @RequestMapping("/subname")
    public AjaxResult SubName(HttpServletRequest request,String nickname){
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (userInfo == null || userInfo.getId() <= 0)
            return  AjaxResult.fail(-2,"参数有误！");
          int res = userService.SubName(nickname,userInfo.getId());
        return AjaxResult.success(res);
    }

    @RequestMapping("/upload")
    public AjaxResult updatePhoto(HttpServletRequest request,
                                  @RequestPart("croppedImage") MultipartFile photo) {
        HttpSession session = request.getSession();
        //非空校验
        if (photo == null) {
            return AjaxResult.fail(403, "图片错误!");
        }
        //要上传的文件名
        String originalFileName = photo.getOriginalFilename();

        //获取用户信息(1.删除旧头像需要原来的旧头像的路径 2.修改图片需要用户 id)
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (userInfo == null || !StringUtils.hasLength(userInfo.getUsername()) ||
                !StringUtils.hasLength(userInfo.getPassword())) {
            return AjaxResult.fail(403, "参数错误!");
        }
        if (!userInfo.getPhoto().equals("img/default.png")) {
            //不是修改默认头像的话就将旧头像删除即可
            File file = new File(ApplicationVariable.IMG_PATH_ABSOLUTE
                    + userInfo.getPhoto().split("/")[2]);
            file.delete();
        }
        // 获取文件后缀
        String suffix = ".png";
        // 判断文件名是否有点，并且不是以点开头
        if (originalFileName.contains (".") && !originalFileName.startsWith (".")) {
            // 获取最后一个点的位置
            int dotIndex = originalFileName.lastIndexOf (".");
            // 截取从最后一个点开始到文件名结尾的部分作为后缀
            suffix = originalFileName.substring (dotIndex);
        }
        //生成图片名称，使用 UUID 避免相同图片名冲突，加上图片后缀
        String photoName = UUID.randomUUID().toString() + suffix;
        //图片保存路径(绝对路径/相对路径)
        //这里为什么还要用相对路径，只用绝对路径不行么?
        //因为禁止浏览器访问本地磁盘绝对路径路径，因此最简单的办法就是配置一个绝对路径用来保存文件，一个相对路径提供给浏览器访问
        String photoPathAbsolute = ApplicationVariable.IMG_PATH_ABSOLUTE + photoName; //绝对路径
        String photoPathRelative = ApplicationVariable.IMG_PATH_RELATIVE + photoName; //相对路径
        //生成文件(绝对路径)
        File saveFile = new File(photoPathAbsolute);
        try {
            //将上传文件绝对路径保存到服务器文件系统
            photo.transferTo(saveFile);
            //保存图片相对路径到数据库中
            int res = userService.updatePhotoById(userInfo.getId(), photoPathRelative);
            //修改评论
            userInfo.setPhoto(photoPathRelative);
            session.setAttribute(ApplicationVariable.SESSION_KEY_USERINFO, userInfo);
//            updateInfoUtils.updateSessionAndComment(request, userInfo);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //将图片相对路径返回给前端
        return AjaxResult.success(photoPathRelative);
    }

//        byte[] photoBytes = userService.getPhoto(userInfo.getId());
//        String base64String = Base64Utils.encodeToString(photoBytes);
//        System.out.println(base64String);
    @RequestMapping("/getavatar")
    public AjaxResult getPhoto(HttpServletRequest request){
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (userInfo == null){
            return AjaxResult.fail(-1,"参数错误！");
        }
        UserInfo userInfo1 = userService.getPhoto(userInfo.getId());
        if (userInfo1 == null) {
            return AjaxResult.fail(-1, "无法获取用户头像！");
        }
        // 更新用户会话中的头像相对路径
        userInfo.setPhoto(userInfo1.getPhoto());
        UserSessionTools.updateLoginUser(request,userInfo);
        return AjaxResult.success(userInfo);
    }

//    @RequestMapping("/checkemail")
//    public AjaxResult checkEmail(@RequestBody Map<String, String> requestData, HttpServletRequest request) {
//        String username = requestData.get("username");
//        String email = requestData.get("email");
////        UserInfo userInfo = UserSessionTools.getLoginUser(request);
////        if (!StringUtils.hasLength(username) ||
////                !StringUtils.hasLength(email)){
////            return AjaxResult.fail(-1,"参数错误！");
////        }
////        if (username.equals(userInfo.getUsername()) &&
////            email.equals(userInfo.getEmail())){
////            return AjaxResult.success(1);
////        }
//        int res = userService.checkEmail(username, email);
//        System.out.println(res);
//        return AjaxResult.success(res);
//    }


    @RequestMapping("/checkuser")
    public AjaxResult checkUser(HttpServletRequest request,String username){
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (!StringUtils.hasLength(username)){return AjaxResult.fail(-1,"参数错误！");}
        if (!userInfo.getUsername().equals(username)){return AjaxResult.fail(-2,"参数错误！");}
        if (StringUtils.hasLength(userService.checkUser(username))){return AjaxResult.success(1);}
        return AjaxResult.fail(-2,"参数错误！");
    }

    @RequestMapping("/checkpwd")
    public AjaxResult checkPwd(HttpServletRequest request,String password){
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (!StringUtils.hasLength(password)){return AjaxResult.fail(-1,"操作错误！");}
        if (PasswordTool.decrypt(password,userInfo.getPassword())){return AjaxResult.success(1);}
        return AjaxResult.fail(-1,"操作错误！");
    }
    @RequestMapping("/initinfo")
    public AjaxResult initinfo(HttpServletRequest request){
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (userInfo == null){
            return AjaxResult.fail(-1,"参数错误！");
        }
        UserInfo userInfo1 = userService.getNickAndEmail(userInfo.getId());
        if (userInfo1 == null) {
            return AjaxResult.fail(-1, "无法获取用户！");
        }
        return AjaxResult.success(userInfo1);
    }

    @RequestMapping("/updatepwd")
    public AjaxResult updatePwd(String newPwd,HttpServletRequest request){
        if (!StringUtils.hasLength(newPwd)) return AjaxResult.fail(-1,"修改失败！");
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (PasswordTool.decrypt(newPwd,userInfo.getPassword()))
            return AjaxResult.fail(-1,"不能与原密码相同",userInfo.getPassword());
        int res = userService.updatePwd(PasswordTool.encrypt(newPwd),userInfo.getId());
        return AjaxResult.success(res);
    }
}
