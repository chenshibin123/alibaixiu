//
$.ajax({
    type: 'get',//get或post
    url: '/categories',//请求的地址
    data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a: 1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
        var html = template('categorytTpl', { data: result })
        $('#category').html(html)
    }
})

// 图片上传和预览
$('#parentBox').on('change', '#feature', function () {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',//get或post
        url: '/upload',//请求的地址
        contentType: false,
        processData: false,
        data: formData,
        success: function (result) {
            console.log(result);
            //成功的回调函数
            $('.thumbnail').attr('src', result[0].avatar).show()
            $('#hiddenImg').val(result[0].avatar)

        }
    })
})

// 创建文章
$('#addForm').on('submit', function () {
    $.ajax({
        type: 'post',//get或post
        url: '/posts',//请求的地址
        data: $(this).serialize(),
        dataType: 'json',
        success: function (result) {//成功的回调函数
            location.href = 'posts.html'

        }
    })
    return false
})

// 获取浏览器传来的ID呈现要修改的页面
var id = getUrlParams('id')

if (id != -1) {
    $.ajax({
        type: 'get',//get或post
        url: '/posts/' + id,//请求的地址
        data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函
            var html = template('modifyTpl', result)
            $.ajax({
                type: 'get',//get或post
                url: '/categories',//请求的地址
                data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
                dataType: 'json',
                success: function (response) {//成功的回调函数
                    result.categories = response
                    var html = template('modifyTpl', result)
                    $('#parentBox').html(html)
                }
            })
        }
    })
}

// 提交修改文章
$('#parentBox').on('submit', '#modifyForm', function () {

    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    console.log(id);

    $.ajax({
        type: 'put',//get或post
        url: '/posts/' + id,//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a: 1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函数
            location.href = 'posts.html'
        }
    })
    return false
})

// 从浏览器的地址栏中获取参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}
