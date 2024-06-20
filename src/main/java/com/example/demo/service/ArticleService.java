package com.example.demo.service;

import com.example.demo.entity.ArticleInfo;
import com.example.demo.entity.vo.ArticleInfoVO;
import com.example.demo.mapper.ArticleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    public int add(ArticleInfo articleInfo){
        return articleMapper.add(articleInfo);
    }

    public ArticleInfo getDetailById(Integer id, Integer uid){
        return articleMapper.getDetailByIdAndUid(id,uid);
    }

    public int update(ArticleInfo articleInfo){
        return articleMapper.update(articleInfo);
    }

    public ArticleInfoVO getDetail(Integer id){
        return articleMapper.getDetail(id);
    }

    public int addRCount(Integer id){
        return articleMapper.addRCount(id);
    }
    public List<ArticleInfo> getMyArtList(Integer uid){
        return articleMapper.getMyArtList(uid);
    }

    public int del(Integer id,Integer uid){
        return articleMapper.del(id,uid);
    }


    public List<ArticleInfo> getListLimitPage(Integer pageSize,Integer offset){
        return articleMapper.getListLimitPage(pageSize, offset);
    }

    public List<ArticleInfo> getSearchArt(Integer pageSize,Integer offset , String search){
        return articleMapper.getSearchArt(pageSize, offset, search);
    }

    public Integer getCount(){
        return articleMapper.getCount();
    }


    public Integer getCountOnSearch(String search){
        return articleMapper.getCountOnSearch(search);
    }
    public Integer saveDraft(ArticleInfo articleInfo){
        return articleMapper.saveToDraft(articleInfo);
    }

    public Integer updateToDraft(ArticleInfo articleInfo){
        return articleMapper.updateToDraft(articleInfo);
    }
}
