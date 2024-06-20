function savedraft() {
    //非空判断
    var title = jQuery("#title");
    if (title.val().trim() == "") {
        alert("请先输入标题！");
        title.focus();
        return false;
    }
    var content = editor.getValue();
    if (content == "") {
        alert('请输入正文且不少于100字!');
        return false;
    }
    jQuery.ajax({
        url: '/art/draft',
        type: 'post',
        data: {
            "title": title.val(),
            "content": content,
        },
        success: function (res) {
            if (res.code == 200 && res.data == 1) {
                if (confirm("是否保存到草稿箱？")) {
                    location.href = "myblog_list.html";
                };
            } else {
                alert("账号未登录或者参数有误");
            }
        }
    });
}