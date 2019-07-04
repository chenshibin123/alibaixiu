$.ajax({
    type: 'get',//get或post
    url: '/users',//请求的地址
    data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
        var html = template('userTlp', { user: result })
        $('#tbody').html(html)
    }
})
$('#userForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',//get或post
        url: '/users',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function (result) {//成功的回调函数
            location.reload()

        }
    })
    return false
})
//当用户选择文件的时候
$('#avatar').on('change', function () {
    this.files[0]
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',//get或post
        url: '/upload',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        processData: false,
        contentType: false,
        success: function (result) {//成功的回调函数
            $('#preview').attr('src', result[0].avatar)
            $('#nameAvatar').val(result[0].avatar)
        }
    })
})