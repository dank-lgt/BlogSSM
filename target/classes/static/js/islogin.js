function isLogin(){
    jQuery.ajax({
        url:'/user/islogin',
        type:'post',
        data:{},
        success:function(res){
            if(res.code == 200 && res.data != 0){
                jQuery(".dropdown-content").show();
                jQuery(".unlogin-avatar").hide();
                jQuery("#master").html(res.data.username)
                jQuery("#userElement").show();
                jQuery("#loginElement").hide();
            }else{
                jQuery(".dropdown-content").hide();
                jQuery(".login-avatar").hide();
            }
        }
    });
}