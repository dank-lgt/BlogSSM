package com.example.demo.mapper;

import com.example.demo.entity.ArticleInfo;
import com.example.demo.entity.vo.ArticleInfoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper
public interface ArticleMapper {

    int add(ArticleInfo articleInfo);
    ArticleInfo getDetailByIdAndUid(@Param("id") Integer id, @Param("uid") Integer uid);

    int update(ArticleInfo articleInfo);

    ArticleInfoVO getDetail(@Param("id") Integer id);

    int addRCount(@Param("id") Integer id);

    List<ArticleInfo> getMyArtList(@Param("uid") Integer uid);

    int del(@Param("id") Integer id,@Param("uid") Integer uid);

    List<ArticleInfo> getListLimitPage(@Param("pageSize") Integer pageSize,
                                       @Param("offset") Integer offset);

    List<ArticleInfo> getSearchArt(@Param("pageSize") Integer pageSize,
                                   @Param("offset") Integer offset,
                                   @Param("search") String search);

    Integer getCount();

    Integer getCountOnSearch(@Param("search") String search);

    Integer saveToDraft(ArticleInfo articleInfo);
    Integer updateToDraft(ArticleInfo articleInfo);
}
