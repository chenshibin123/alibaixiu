
$('#loginBtn').on('click', function () {
    var email = $('#email').val()
    var password = $('#password').val()
    if (email.trim().length == 0) {
        alert('请输入邮箱')
        return
    }
    if (password.trim().length == 0) {
        alert('请输入密码')
        return
    }
    $.ajax({
        type: 'post',//get或post
        url: '/login',//请求的地址
        data: {
            email: email,
            password: password
        },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a: 1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函数
            console.log(result);

            location.href = 'index.html'
        },
        error: function (err) {
            alert('邮箱或密码输入错误')
        }
    })
})

