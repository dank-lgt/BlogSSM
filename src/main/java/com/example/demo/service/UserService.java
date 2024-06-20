package com.example.demo.service;

import com.example.demo.entity.UserInfo;
import com.example.demo.mapper.UserMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public int reg(UserInfo userInfo){
        return  userMapper.reg(userInfo);
    }

    public UserInfo login(String username){
        return userMapper.login(username);
    }

    public Integer checkUsernameExists(String username){
        return userMapper.checkUsernameExists(username);
    }

    public int SubName(String nickname,Integer id){
        return userMapper.SubName(nickname,id);
    }

    public int updatePhotoById(int id, String photoPathRelative) {
        return userMapper.updatePhotoById(id,photoPathRelative);
    }

    public UserInfo getPhoto(int id){
        return userMapper.getPhoto(id);
    }

    public UserInfo getNickAndEmail(int id){
        return userMapper.getNickAndEmail(id);
    }

    public int checkEmail(String username,String email){
        return userMapper.checkEmail(username,email);
    }

    public int updatePwd(String newPwd,Integer id){
        return userMapper.updatePwd(newPwd,id);
    }

    public String checkUser(String username){
        return userMapper.checkUser(username);
    }

    public int checkPwd(String password){
        return userMapper.checkPwd(password);
    }
}
