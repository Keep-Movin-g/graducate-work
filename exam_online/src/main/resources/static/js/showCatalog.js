/*吐司框全局配置*/
toastr.options = {
    // 显示关闭按钮
    closeButton: true,
    // 重写关闭按钮的 html
    closeHtml: '<i class="close icon"></i>',
    // 显示进度条
    progressBar: true,
    // 下中显示
    positionClass: 'toast-top-center',
}

$(function () {

    showCatalogS();

    SaveCatalog();

})
//显示所有的目录
function showCatalogS() {
    //显示的区域对象

    javaData=getCatalogs().data;
    let data = []
    for (let i =0;i<javaData.length;i++){
        let obj={
            id:javaData[i]["cid"],
            name:javaData[i]["cname"],
            course:javaData[i]["course"],
            major:javaData[i]["major"],
            update:javaData[i]["createTime"],
            questionCount:javaData[i]["count"],

        }
        data.push(obj)
    }
    var tbody=$('.context');
    $.each(data,function (i,ele){
        showitem(i,ele,tbody);
    })
    $('.ui.checkbox').checkbox();
    deleteItem();
}
//显示每一个目录
//ele 目录对象
function showitem(i,ele,tbody) {
    //插入行
    //复制模板td
    var templateTr=$('#template_tr').clone();
    templateTr.removeAttr('id');
    //插入元素
    templateTr.find('td').eq(0).html(i+1);
    templateTr.find('td>span').eq(0).html(ele.major);
    templateTr.find('td>span').eq(1).html(ele.course);
    templateTr.find('td>span').eq(2).html(ele.name);
    templateTr.find('td>span').eq(3).html(ele.questionCount);
    templateTr.find('td>span').eq(4).html(ele.update);
    //设置cid
    templateTr.attr("cid",ele.id)
    //设置复选框val
    templateTr.find("input[name='create_paper']").val(ele.id);
    tbody.append(templateTr);

}
//删除条目
function deleteItem(){
    $('.trash').siblings('a').click(function (e) {
        let catalogId=$(this).parent().parent().attr('cid');
        console.log(catalogId)
        $.ajax({
            type: 'DELETE', // 请求方式
            url: 'http://192.168.10.100:18080/exam-online/catalogs/'+catalogId, // 请求地址
            dataType: 'json', // 期望后台返回的类型
            crossDomain: true, // 跨域
            async:true,    //同步提交
            xhrFields: {
                withCredentials: true
            },
            success: function (dataResponse) {

                SaveCatalogResponse(dataResponse);

            },
            error: function () {
                // 请求失败后的处理方法
                SaveCatalogResponse({
                    success:false,
                    message:"删除服务器异常",
                    code:"000000",
                    data:null,
                })

            },
        }).always(function (){
            //置空显示页面
            $('#template_tr').siblings().empty();
            showCatalogS();
        })
    })
}
//添加题目
function insertQuestion(a) {
    //传给弹出页面参数
    let catalogId=$(a).parent().parent().attr('cid');
    var url="../html/paper_online_reslove.html"+"?cid="+catalogId;
    url=encodeURI(url);
    window.open(url,'_self');
}
//查看题目
function showQuestions(a) {
    let catalogId=$(a).parent().parent().attr('cid');
    var url="../html/showQuestions.html"+"?cid="+catalogId;
    url=encodeURI(url);
    window.open(url,'_self');
}
//获得所有的数据
function getCatalogs() {

    let getAllCatalog=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/catalogs', // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:false,    //同步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {

            getAllCatalog=dataResponse;

        },
        error: function () {
            // 请求失败后的处理方法
            getAllCatalog={
                success:false,
                message:"查找登录服务器异常",
                code:"000000",
                data:null,
            }

        }
    })


    return getAllCatalog;
}

//弹出新增弹框
function showSaveLayer() {
    var left = ($(window).width() - $("#save_catalog_form").width())/2;
    var top  = ($(window).height() - $("#save_catalog_form").height())/2;
    $("#save_catalog_form").css({"top": top, "left": left, "display": "block"});
}
//隐藏新增弹框
function hideSaveLayer(id) {
    $("#save_catalog_form").css({"display": "none"});
}
//新增目录
function SaveCatalog() {
    $('#save_catalog_form').form({
        // 内联显示报错信息
        inline: true,
        // 提交表单需要验证的域
        fields: {
            // 登录的账号验证
            major_field: {
                identifier: 'major', // 登录表单中 name = ‘email’ 的输入框
                rules: [
                    {
                        type: 'empty', // 验证是否没有输入
                        prompt: '请输入科目名' // 不符合，提示语句
                    }
                ]
            },
            // 登录密码
            course_field: {
                identifier: 'course',// 登录表单中 name = ‘password’ 的输入框
                rules: [
                    {
                        type: 'empty', // 验证是否没有输入
                        prompt: '请输入课程名' // 不符合，提示语句
                    }
                ]
            },
            // 登录的条款是否勾选
            name_field: {
                identifier: 'cname', // 登录表单中 name = ‘term’ 的复选框
                rules: [
                    {
                        type: 'empty',// 验证是否没有输入
                        prompt: '请请输入试卷名'  // 不符合，提示语句
                    }
                ]
            }
        },
        // 表单验证成功后的回调函数（event：事件，fields：表单属性和值）
        onSuccess: function (event, fields) {

            console.log(fields)
            let catalog=JSON.stringify(fields);
            console.log(catalog);

            //禁用登录按钮
            // $loginFormSub.addClass("disabled")

            // 发起登录请求
            $.ajax({
                type: 'POST', // 请求方式
                url: 'http://192.168.10.100:18080/exam-online/catalogs', // 请求地址
                data: catalog, // 请求携带的数据
                contentType: "application/json",
                dataType: 'json', // 期望后台返回的类型
                crossDomain: true, // 跨域
                xhrFields: {
                    withCredentials: true
                },
                success: function (dataResponse) {
                    SaveCatalogResponse(dataResponse)
                },
                error: function () {
                    // 请求失败后的处理方法
                    SaveCatalogResponse({
                        success:false,
                        message:'登录服务器发生异常'
                    })

                }
            }).always(function (){
                //置空显示页面
                $('#template_tr').siblings().empty();
                showCatalogS();
            })
        }
    });
}
//新增目录响应对象
function SaveCatalogResponse(dataResponse) {

    if(dataResponse.success){
        //隐藏弹出框
        hideSaveLayer();
        hideUpdateLayer()
        hideCreatePaperLayer();
        toastr.success(dataResponse.message,null,function (){

            }
        )
    }else{

        toastr.error(dataResponse.message)
    }
}

/**
 * updateCatalog:更新某个目录
 */
function updateCatalog(a) {
    //获取id

    let catalogId=$(a).parent().parent().attr('cid');

    let getCatalog=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/catalogs/'+catalogId, // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:false,    //同步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {

            getCatalog=dataResponse;

        },
        error: function () {
            // 请求失败后的处理方法
            getCatalog={
                success:false,
                message:"查找登录服务器异常",
                code:"000000",
                data:null,
            }

        }
    })


    if(getCatalog.success || getCatalog.data){
        showUpdateLayer();
        //转载数据
        $('#update_catalog_form input[name="major"]').val(getCatalog.data["major"])
        console.log($('#update_catalog_form input[name="major"]').val());
        console.log($('#update_catalog_form input[name="major"]').attr("placeholder"));
        $('#update_catalog_form input[name="course"]').val(getCatalog.data["course"])
        $('#update_catalog_form input[name="cname"]').val(getCatalog.data["cname"])

        $('#update_catalog_form').form({
            // 内联显示报错信息
            inline: true,
            // 提交表单需要验证的域
            fields: {
                // 登录的账号验证
                major_field: {
                    identifier: 'major', // 登录表单中 name = ‘email’ 的输入框
                    rules: [
                        {
                            type: 'empty', // 验证是否没有输入
                            prompt: '请输入科目名' // 不符合，提示语句
                        }
                    ]
                },
                // 登录密码
                course_field: {
                    identifier: 'course',// 登录表单中 name = ‘password’ 的输入框
                    rules: [
                        {
                            type: 'empty', // 验证是否没有输入
                            prompt: '请输入课程名' // 不符合，提示语句
                        }
                    ]
                },
                // 登录的条款是否勾选
                name_field: {
                    identifier: 'cname', // 登录表单中 name = ‘term’ 的复选框
                    rules: [
                        {
                            type: 'empty',// 验证是否没有输入
                            prompt: '请请输入试卷名'  // 不符合，提示语句
                        }
                    ]
                }
            },
            // 表单验证成功后的回调函数（event：事件，fields：表单属性和值）
            onSuccess: function (event, fields) {
                fields["cid"]=catalogId;
                console.log(fields)
                let catalog=JSON.stringify(fields);
                console.log(catalog);



                // 发起登录请求
                $.ajax({
                    type: 'PUT', // 请求方式
                    url: 'http://192.168.10.100:18080/exam-online/catalogs', // 请求地址
                    data: catalog, // 请求携带的数据
                    contentType: "application/json",
                    dataType: 'json', // 期望后台返回的类型
                    crossDomain: true, // 跨域
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (dataResponse) {
                        SaveCatalogResponse(dataResponse)
                    },
                    error: function () {
                        // 请求失败后的处理方法
                        SaveCatalogResponse({
                            success:false,
                            message:'登录服务器发生异常'
                        })

                    }
                }).always(function (){
                    //置空显示页面
                    $('#template_tr').siblings().empty();
                    showCatalogS();
                })
            }
        });
    }

}

//弹出新增弹框
function showUpdateLayer() {
    var left = ($(window).width() - $("#update_catalog_form").width())/2;
    var top  = ($(window).height() - $("#update_catalog_form").height())/2;
    $("#update_catalog_form").css({"top": top, "left": left, "display": "block"});
}
//隐藏新增弹框
function hideUpdateLayer(id) {
    $("#update_catalog_form").css({"display": "none"});
}

function showCreatePaper(){
    var checkID = [];//定义一个空数组
    $("input[name='create_paper']:checked").each(function(i){//把所有被选中的复选框的值存入数组
        checkID[i] =$(this).val();
    });
    //拼接source C:12,23,43
    let source="C:";
    source+=checkID.join(",");
    console.log(source);
    showCreatePaperLayer();

    $('#create_paper_form').form({
        // 内联显示报错信息
        inline: true,
        // 提交表单需要验证的域
        fields: {

            paperName: {
                identifier: 'paperName', // 登录表单中 name = ‘email’ 的输入框
                rules: [
                    {
                        type: 'empty', // 验证是否没有输入
                        prompt: '请输入试卷民' // 不符合，提示语句
                    }
                ]
            },
            allowTime: {
                identifier: 'allowTime', // 登录表单中 name = ‘email’ 的输入框
                rules: [
                    {
                        type: 'empty', // 验证是否没有输入
                        prompt: '请输入考试时间' // 不符合，提示语句
                    }
                ]
            },
            questionQuantities: {
                identifier: 'questionQuantities', // 登录表单中 name = ‘email’ 的输入框
                rules: [
                    {
                        type: 'empty', // 验证是否没有输入
                        prompt: '请输入题目数量' // 不符合，提示语句
                    }
                ]
            },
            orderOrRandom: {
                identifier: 'orderOrRandom', // 登录表单中 name = ‘email’ 的输入框
                rules: [
                    {
                        type: 'empty', // 验证是否没有输入
                        prompt: '请输入是否随机 0|1' // 不符合，提示语句
                    }
                ]
            },
            limits: {
                identifier: 'limits', // 登录表单中 name = ‘email’ 的输入框
                rules: [
                    {
                        type: 'empty', // 验证是否没有输入
                        prompt: '请输入题目范围' // 不符合，提示语句
                    }
                ]
            },


        },
        // 表单验证成功后的回调函数（event：事件，fields：表单属性和值）
        onSuccess: function (event, fields) {

            fields["allowTime"]=parseInt(fields["allowTime"]);
            fields["questionQuantities"]=parseInt(fields["questionQuantities"]);
            fields["orderOrRandom"]=parseInt(fields["orderOrRandom"]);
            fields["source"]=source
            let catalog=JSON.stringify(fields);

            //禁用登录按钮
            // $loginFormSub.addClass("disabled")

            // 发起登录请求
            $.ajax({
                type: 'POST', // 请求方式
                url: 'http://192.168.10.100:18080/exam-online/papers/', // 请求地址
                data: catalog, // 请求携带的数据
                contentType: "application/json",
                dataType: 'json', // 期望后台返回的类型
                crossDomain: true, // 跨域
                xhrFields: {
                    withCredentials: true
                },
                success: function (dataResponse) {
                    SaveCatalogResponse(dataResponse)
                },
                error: function () {
                    // 请求失败后的处理方法
                    SaveCatalogResponse({
                        success:false,
                        message:'登录服务器发生异常'
                    })

                }
            }).always(function (){
                //置空显示页面
                $('#template_tr').siblings().empty();
                showCatalogS();
            })
        }
    });
}

function showCreatePaperLayer() {
    var left = ($(window).width() - $("#create_paper_form").width())/2;
    var top  = ($(window).height() - $("#create_paper_form").height())/2;
    $("#create_paper_form").css({"top": top, "left": left, "display": "block"});
}
//隐藏新增弹框
function hideCreatePaperLayer(id) {
    $("#create_paper_form").css({"display": "none"});
}

//