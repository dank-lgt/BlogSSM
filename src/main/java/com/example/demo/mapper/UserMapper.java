package com.example.demo.mapper;


import com.example.demo.entity.ArticleInfo;
import com.example.demo.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int reg(UserInfo userInfo);

   Integer checkUsernameExists(@Param("username") String username);
    UserInfo login(@Param("username") String username);

    int SubName(@Param("nickname") String nickname,@Param("id") Integer id);

    int updatePhotoById(@Param("id") Integer id ,@Param("photo") String photo);

    UserInfo getPhoto(@Param("id")Integer id);

    Integer checkEmail(@Param("username") String username,@Param("email") String email);

    int updatePwd(@Param("newPwd") String newPwd,@Param("id") Integer id);

    UserInfo getNickAndEmail(@Param("id") Integer id);

    String checkUser(@Param("username") String username);

    Integer checkPwd(@Param("password") String password);
}
