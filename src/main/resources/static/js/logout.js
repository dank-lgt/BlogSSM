function logout(){
    if(confirm("是否退出？")){
        jQuery.ajax({
            url:'/user/logout',
            type:'post',
            data:{},
            success:function(res){
                if(res.code == 200 && res.data == 1){
                    location.href = "blog_list.html";
                }else{
                    alert("操作失败，请重新尝试！"+res.msg);
                }
            }
        });
    }
}