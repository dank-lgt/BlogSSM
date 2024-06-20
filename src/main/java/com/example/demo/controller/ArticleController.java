package com.example.demo.controller;

import com.example.demo.common.*;
import com.example.demo.entity.ArticleInfo;
import com.example.demo.entity.UserInfo;
import com.example.demo.entity.vo.ArticleInfoVO;
import com.example.demo.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/art")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @RequestMapping("/add")
    public AjaxResult add(ArticleInfo articleInfo , HttpServletRequest request){
        //1.非空效验
        if (articleInfo == null || !StringUtils.hasLength(articleInfo.getTitle())
            || !StringUtils.hasLength(articleInfo.getContent()))
            return  AjaxResult.fail(-1,"参数有误！");
        //2.组装数据 得到uid
        HttpSession session = request.getSession();
        UserInfo userInfo = (UserInfo) session.getAttribute(ApplicationVariable.SESSION_KEY_USERINFO);
        articleInfo.setUid(userInfo.getId());
        //3.持久化，将结果返回给前端
        int result = articleService.add(articleInfo);
        return AjaxResult.success(result);
    }

    /**
     * 获取文章的详情信息，但需要进行鉴权（判断权限的归属人是否是当前登录用户）
     *
     * @param id
     * @param request
     * @return
     */
    @RequestMapping("/getdetailbyid")
    public AjaxResult getDetailById(Integer id,HttpServletRequest request){
        if (id == null || id <= 0) return AjaxResult.fail(-1,"非法参数！");
        UserInfo userInfo =  UserSessionTools.getLoginUser(request);
        return AjaxResult.success(articleService.getDetailById(id, userInfo.getId()));
    }

    @RequestMapping("/update")
    public AjaxResult update(ArticleInfo articleInfo ,HttpServletRequest request){
        if (articleInfo == null || articleInfo.getId() <=0 ||
            !StringUtils.hasLength(articleInfo.getTitle())||
            !StringUtils.hasLength(articleInfo.getContent()))
            return AjaxResult.fail(-1,"参数有误！");
        // 2.获取登录用户的id，填充到 articleinfo 对象中（修改是要验证权限）
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        articleInfo.setUid(userInfo.getId());
        articleInfo.setUpdatetime(LocalDateTime.now());
        int res = articleService.update(articleInfo);
        return AjaxResult.success(res);
    }

    @RequestMapping("/getdetail")
    public AjaxResult getDetail(Integer id,HttpServletRequest request){
        if (id == null || id <= 0) return AjaxResult.fail(-1,"非法操作！");
        ArticleInfoVO articleInfoVO = articleService.getDetail(id);
        return AjaxResult.success(articleInfoVO);
    }

    @RequestMapping("/addrcount")
    public AjaxResult addRCount(Integer id){
        if (id == null || id <= 0) return AjaxResult.fail(-1,"参数有误！");
        int res = articleService.addRCount(id);
        return AjaxResult.success(res);
    }

    @RequestMapping("/mylist")
    public  AjaxResult getMyArtList(HttpServletRequest request){
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        List<ArticleInfo> list = articleService.getMyArtList(userInfo.getId());
        for (ArticleInfo item : list){


            String content = SubStringTool.subLength(item.getContent(),150);
            // todo:将 content 里面的 markdown 关键字去除掉
            item.setContent(MarkdownUtils.markdownToHtml(content));
        }
        return AjaxResult.success(list);
    }

    @RequestMapping("/del")
    public AjaxResult del(Integer id,HttpServletRequest request){
        if (id == null || id <=0) return AjaxResult.fail(-1,"操作失败！");
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        int res = articleService.del(id,userInfo.getId());
        return AjaxResult.success(res);
    }

//    @RequestMapping("/del")
//    public int del(Integer id,HttpServletRequest request){
//        if (id == null || id <=0) return 0;
//        UserInfo userInfo = UserSessionTools.getLoginUser(request);
//        int res = articleService.del(id,userInfo.getId());
//        return res;
//    }

    @RequestMapping("/getlistlimitPage")
    public AjaxResult getListLimitPage(Integer pageSize,Integer pageIndex){
        if (pageIndex < 1 || pageIndex == null)  {
            pageIndex =1;
        }
        if (pageSize  <= 0 || pageSize == null){
            pageSize = 5;
        }

        int offset= (pageIndex - 1) * pageSize;
        List<ArticleInfo> list = articleService.getListLimitPage(pageSize,offset);
        list.stream().parallel().forEach(item ->{
            item.setContent(MarkdownUtils.markdownToHtml(SubStringTool.subLength(item.getContent(),150)));
        });
        return AjaxResult.success(list);
    }


    @RequestMapping("/getsearchart")
    public AjaxResult getsearchart(Integer pageSize,Integer pageIndex,String search){
        if (pageIndex < 1 || pageIndex == null)  {
            pageIndex =1;
        }
        if (pageSize  <= 0 || pageSize == null){
            pageSize = 5;
        }

        int offset= (pageIndex - 1) * pageSize;
        List<ArticleInfo> list = articleService.getSearchArt(pageSize,offset,search);
        list.stream().parallel().forEach(item ->{
            item.setContent(MarkdownUtils.markdownToHtml(SubStringTool.subLength(item.getContent(),150)));
        });
        return AjaxResult.success(list);
    }

    @RequestMapping("/getcount")
    public AjaxResult getCount(){
        return AjaxResult.success(articleService.getCount());
    }

    @RequestMapping("/getcountart")
    public AjaxResult getCountOnSearch(String search){
        return AjaxResult.success(articleService.getCountOnSearch(search));}

    @RequestMapping("/draft")
    public AjaxResult saveDraft(ArticleInfo articleInfo,HttpServletRequest request){
        if (articleInfo == null ){
            return AjaxResult.fail(-1,"参数有误！");
        }
        UserInfo userInfo = UserSessionTools.getLoginUser(request);
        if (userInfo == null) return AjaxResult.fail(-1,"参数有误！");
        articleInfo.setUid(userInfo.getId());
        articleInfo.setUpdatetime(LocalDateTime.now());
        if (articleInfo.getId() != null){
//            ArticleInfo articleInfo =   articleService.getDetailById(artId, userInfo.getId());

            //草稿文章更新
            return AjaxResult.success(articleService.updateToDraft(articleInfo));
        }
        return  AjaxResult.success(articleService.saveDraft(articleInfo));
    }



    private ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
    @RequestMapping("/schedule")
    public AjaxResult timeAdd(HttpServletRequest request, ArticleInfoVO articleInfoVO) {
        //非空校验
        if (articleInfoVO == null || !StringUtils.hasLength(articleInfoVO.getTitle()) ||
                !StringUtils.hasLength(articleInfoVO.getContent())) {
            return AjaxResult.fail(-1, "参数错误!");
        }
        UserInfo userinfo = UserSessionTools.getLoginUser(request);
        if (userinfo == null || !StringUtils.hasLength(userinfo.getUsername()) ||
                !StringUtils.hasLength(userinfo.getPassword())) {
            return AjaxResult.fail(-2, "参数错误");
        }

        //设置定时发布，启动一个线程，每5秒询问一次是否到达过期时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        Date currentTime = new Date();

        try {
            Date scheduledTime = sdf.parse(articleInfoVO.getDateTime());

            if (scheduledTime.after(currentTime)) {
                long delay = scheduledTime.getTime() - currentTime.getTime();

                executorService.schedule(() -> {
                    ArticleInfo articleInfo = new ArticleInfo();
                    articleInfo.setContent(articleInfoVO.getContent());
                    articleInfo.setTitle(articleInfoVO.getTitle());
                    articleInfo.setUid(userinfo.getId());
                    articleInfo.setUpdatetime(LocalDateTime.parse(articleInfoVO.getDateTime()));

                    articleService.add(articleInfo);
                    articleService.del(articleInfoVO.getId(), userinfo.getId());
                }, delay, TimeUnit.MILLISECONDS);

                return AjaxResult.success(1);
            } else {
                return AjaxResult.fail(-3, "定时发布时间已过期!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.fail(-4, "定时发布失败!");
        }
    }
}
