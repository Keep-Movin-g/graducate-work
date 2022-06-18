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

    showPaperS();

    SavePaper();

})
//显示所有的目录
function showPaperS() {
    //显示的区域对象

    let data = getPapers().data;
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
    templateTr.find("td[data-paper='sequence']").html(i+1);

    templateTr.find("td[data-paper='paperName']").html(ele.paperName);
    templateTr.find("td[data-paper='allowTime']").html(ele.allowTime);
    templateTr.find("td[data-paper='questionQuantities']").html(ele.questionQuantities);
    templateTr.find("td[data-paper='paperState']").html(ele.paperState);
    templateTr.find("td[data-paper='createTime']").html(ele.createTime);
    //设置cid
    templateTr.attr("pid",ele.pid);
    //设置复选框val
    templateTr.find("input[name='create_paper']").val(ele.pid);
    let paperState =ele.paperState;
    switch (paperState){
        case 0 :
        //0未做
            //设置是否完成
            templateTr.find("td[data-paper='paperState']").html("未完成");
            //显示开始考试
            templateTr.find("td[data-paper='exam']").css("display","block");
            // 隐藏查看
            templateTr.find("td[data-paper='see']").css("display","none");
            //设置分数为暂无分数
            templateTr.find("td[data-paper='score']").html("暂无分数")
            //隐藏复选框
            templateTr.find("input[name='create_paper']").attr("disabled",true);
            break;
        case 1 :
            //1已做
            //设置是否完成
            templateTr.find("td[data-paper='paperState']").html("已完成");

            //显示查看
            templateTr.find("td[data-paper='see']").css("display","block");
            // 隐藏开始考试
            templateTr.find("td[data-paper='exam']").css("display","none");

            //设置分数
            templateTr.find("td[data-paper='score']").html(ele.score);


            break;
    }
    tbody.prepend(templateTr);

}
//删除条目
function deleteItem()   {
    $('.trash').siblings('a').click(function (e) {
        let PaperId=$(this).parent().parent().attr('pid');
        console.log(PaperId)
        $.ajax({
            type: 'DELETE', // 请求方式
            url: 'http://192.168.10.100:18080/exam-online/papers/'+PaperId, // 请求地址
            dataType: 'json', // 期望后台返回的类型
            crossDomain: true, // 跨域
            async:false,    //同步提交
            xhrFields: {
                withCredentials: true
            },
            success: function (dataResponse) {

                SavePaperResponse(dataResponse);

            },
            error: function () {
                // 请求失败后的处理方法
                SavePaperResponse({
                    success:false,
                    message:"删除服务器异常",
                    code:"000000",
                    data:null,
                })

            },
        }).always(function (){
            //置空显示页面
            $('#template_tr').siblings().empty();
            showPaperS();
        })
    })
}

//获得所有的数据
function getPapers() {

    let getAllPaper=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/papers', // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:false,    //同步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {

            getAllPaper=dataResponse;

        },
        error: function () {
            // 请求失败后的处理方法
            getAllPaper={
                success:false,
                message:"查找登录服务器异常",
                code:"000000",
                data:null,
            }

        }
    })


    return getAllPaper;
}

//新增目录响应对象
function SavePaperResponse(dataResponse) {

    if(dataResponse.success){
        //隐藏弹出框
        hideCreatePaperLayer();
        toastr.success(dataResponse.message,null,function (){

            }
        )
    }else{

        toastr.error(dataResponse.message)
    }
}


//创建新试卷
function showCreatePaper(){

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
            var checkID = [];//定义一个空数组
            $("input[name='create_paper']:checked").each(function(i){//把所有被选中的复选框的值存入数组
                checkID[i] =$(this).val();
            });
            console.log(checkID);
            //拼接source C:12,23,43
            let source="P:";
            source+=checkID.join(",");
            console.log(source);

            fields["allowTime"]=parseInt(fields["allowTime"]);
            fields["questionQuantities"]=parseInt(fields["questionQuantities"]);
            fields["orderOrRandom"]=parseInt(fields["orderOrRandom"]);
            fields["source"]=source
            let Paper=JSON.stringify(fields);

            //禁用登录按钮
            // $loginFormSub.addClass("disabled")

            // 发起登录请求
            $.ajax({
                type: 'POST', // 请求方式
                url: 'http://192.168.10.100:18080/exam-online/papers/', // 请求地址
                data: Paper, // 请求携带的数据
                contentType: "application/json",
                dataType: 'json', // 期望后台返回的类型
                crossDomain: true, // 跨域
                xhrFields: {
                    withCredentials: true
                },
                success: function (dataResponse) {
                    SavePaperResponse(dataResponse)
                },
                error: function () {
                    // 请求失败后的处理方法
                    SavePaperResponse({
                        success:false,
                        message:'登录服务器发生异常'
                    })

                }
            }).always(function (){
                //置空显示页面
                $('#template_tr').siblings().empty();
                showPaperS();
            })
        }
    });
}

//跳转到考试页面
function toExam(a) {
    let paperId=$(a).parent().parent().attr('pid');
    var url="../html/exam.html"+"?pid="+paperId;
    url=encodeURI(url);
    window.open(url,"_self");
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
function showResult(a) {
    let paperId=$(a).parent().parent().attr('pid');
    var url="../html/ResultDetail.html"+"?pid="+paperId;
    url=encodeURI(url);
    window.open(url);
}

//