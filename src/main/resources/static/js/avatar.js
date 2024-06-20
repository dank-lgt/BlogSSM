function Myavatar() {
    jQuery.ajax({
        url: '/user/getavatar',
        type: 'post',
        data: {},
        success: function (res) {
            // var imgurl = URL.createObjectURL(res.data.photo);
            if (res.code == 200 && res != null) {
                jQuery("#de-avatar").attr('src', res.data.photo);
                jQuery("#nav-avatar").attr('src', res.data.photo);
                jQuery("#change-av").attr('src', res.data.photo);
                jQuery("#master").html(res.data.nickname);
                // jQuery("#master2").html(res.data.nickname);
                jQuery('#pre-avatar').css('background-image', 'url(' + res.data.photo + ')');
            }
        }
    })
}
