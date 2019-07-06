// 开页面渲染页面
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
$('#modifyUser').on('change', '#avatar', function () {
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
$('#tbody').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',//get或post
        url: '/users/' + id,//请求的地址
        data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函数
            console.log(result);
            var html = template('modifyTpl', result)
            $('#modifyUser').html(html)
        }
    })
})
$('#modifyUser').on('submit', '#modifyForm', function () {  // 获取用户修改的信息
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',//get或post
        url: '/users/' + id,//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function (result) {//成功的回调函数
            location.reload()

        }
    })
    return false
})
$('#tbody').on('click', '#delete', function () {
    if ('ruguowoaini' == prompt('请输入超级密码')) {
        var id = $(this).siblings('.edit').attr('data-id')
        $.ajax({
            type: 'delete',//get或post
            url: '/users/' + id,//请求的地址
            data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function (result) {//成功的回调函数
                location.reload()
            }
        })

    } else {
        alert('再动老子打断你的狗腿')
    }
})
$('#selectAll').on('change', function () {
    var bool = $(this).prop('checked')
    $('#tbody').find('.status').prop('checked', bool)
    if (bool == true) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
})

$('#tbody').on('change', '.status', function () {
    if ($('#tbody').find('.status').length == $('#tbody').find('.status').filter(':checked').length) {
        $('#selectAll').prop('checked', true)
    } else {
        $('#selectAll').prop('checked', false)
    }
    if ($('#tbody').find('.status').filter(':checked').length >= 2) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
})
$('#deleteMany').on('click', function () {
    if (confirm('确定要自杀？')) {
        var selectAll = $('#tbody').find('.status').filter(':checked')
        var arr = []
        selectAll.each(function (index, val) {
            arr.push($(val).attr('data-id'))
        })
        $.ajax({
            type: 'delete',//get或post
            url: '/users/' + arr.join('-'),//请求的地址
            data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function (result) {//成功的回调函数
                location.reload()
            }
        })
    }
})
