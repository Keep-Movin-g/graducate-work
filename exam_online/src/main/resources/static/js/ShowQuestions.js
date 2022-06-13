
var cid=null;
$(function (){
    var url=decodeURI(window.location.href);
    var argsIndex=url.split("?cid=");
    if(argsIndex.length<2&&argsIndex[1]!="undefined"){
        window.open("../html/showCatalog.html",'_self');

    }
    cid=parseInt(argsIndex[1]);
    showQuestions()
})

function showQuestions() {
    let questions=getQuestions(cid).data;
    $.each(questions,function (i,questionObj) {
        switch (questionObj.typeId) {
            case 1:
                showMulChoise(questionObj, i+1);
                break;
            case 2:
                showDMulChoise(questionObj, i+1);
                break;
            case 3:
                showEstimate(questionObj, i+1);
                break;
            case 4:
                showFilling(questionObj, i+1);
                break;
        }
    })


    //给input checkbox 添加点击显示
    $('.ui.checkbox').checkbox();
}
//获得题目
function getQuestions(cid) {
    let getQuestions=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/questions/cid/'+cid, // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:false,    //同步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {

            getQuestions=dataResponse;

        },
        error: function () {
            // 请求失败后的处理方法
            getQuestions={
                success:false,
                message:"查找登录服务器异常",
                code:"000000",
                data:null,
            }

        }
    })


    return getQuestions;

}

//单选题展示
function showMulChoise(obj,i){
    //复制模板样式
    var showObj=$('.mulchoise').eq(0).clone();
    //设置qid
    showObj.attr("qid",obj["qid"]);
    //显示单选题
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);
    // console.log();
    // $.extend(showObj,$('.mulchoise'));
    //给所有选项请name
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",i)

    //设置选项
    showObj.find('.option:eq(0)>label').html('A： '+obj.optionA);
    showObj.find('.option:eq(1)>label').html('B： '+obj.optionB);
    showObj.find('.option:eq(2)>label').html('C： '+obj.optionC);
    showObj.find('.option:eq(3)>label').html('D： '+obj.optionD);
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);


    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}
//多选题展示
function showDMulChoise(obj,i){
    //复制模板样式
    var showObj=$('.Dmulchoise').eq(0).clone();
    //显示多选题
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);

    //设置name属性
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",i)
    //设置选项
    showObj.find('.option:eq(0)>label').html('A： '+obj.optionA);
    showObj.find('.option:eq(1)>label').html('B： '+obj.optionB);
    showObj.find('.option:eq(2)>label').html('C： '+obj.optionC);
    showObj.find('.option:eq(3)>label').html('D： '+obj.optionD);
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);

    //设置qid
    showObj.attr("qid",obj["qid"]);
    //将选择题元素插入到页面中
    $('.question:eq(0)').append(showObj);
}
//判断题展示
function showEstimate(obj,i){
    //复制模板样式
    var showObj=$('.Estimate').eq(0).clone();
    //让题目显示
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",i)
    //设置name属性
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);

    //设置qid
    showObj.attr("qid",obj["qid"]);
    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}
//填空题展示
function showFilling(obj,i){
    //复制模板样式
    var showObj=$('.filling').eq(0).clone();
    //让题目显示
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",i)
    //设置name属性
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);
    //设置答案
    //showObj.find('.answer').html(obj.answer.shift()["equal"])
    // console.log(  obj.answer.shift()["equal"]  );

    showObj.find('.answer').html(obj.answer)

    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);

    //设置qid
    showObj.attr("qid",obj["qid"]);

    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}

var autoTextarea = function (elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ?
            function (name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
        minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'both';//如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};
function iIsEmpty(test) {

    if(test.match(/^\s+$/)){
        return true;
    }
    if(test.match(/^[ ]+$/)){
        return true;
    }
    if(test.match(/^[ ]*$/)){
        return true;
    }
    if(test.match(/^\s*$/)){
        return true;
    } else {
        return false;
    }
}

function deleteQuestion(btn) {

    let questionId=$(btn).parent().parent().parent().attr('qid');
    $.ajax({
        type: 'DELETE', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/questions/'+questionId, // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:true,    //异步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {
            $(btn).parent().parent().parent().remove();
            questionResponse(dataResponse);

        },
        error: function () {
            // 请求失败后的处理方法
            questionResponse({
                success:false,
                message:"删除服务器异常",
                code:"000000",
                data:null,
            })

        },
    })



}


//题目响应对象
function questionResponse(dataResponse) {

    if(dataResponse.success){
        //隐藏弹出框
        hideUpdateQuestionLayer()
        toastr.success(dataResponse.message,null,function (){

            }
        )
    }else{

        toastr.error(dataResponse.message)
    }
}

function updateQuestion(btn) {
    //获取id

    let questionId=$(btn).parent().parent().parent().attr('qid');

    let getQuestion=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/questions/'+questionId, // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:false,    //同步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {

            getQuestion=dataResponse;

        },
        error: function () {
            // 请求失败后的处理方法
            getQuestion={
                success:false,
                message:"查找登录服务器异常",
                code:"000000",
                data:null,
            }

        }
    })


    if(getQuestion.success || getQuestion.data){
        showUpdateQuestionLayer();
        //转载数据

        $('#update_question')
            .form("set values",{
                questionName: getQuestion.data["questionName"],
                optionA:getQuestion.data["optionA"],
                optionB:getQuestion.data["optionB"],
                optionC:getQuestion.data["optionC"],
                optionD:getQuestion.data["optionD"],
                answer:getQuestion.data["answer"],
                remark:getQuestion.data["remark"]
            })
            .form({
                // 内联显示报错信息
                inline: true,
                // 提交表单需要验证的域
                fields: {

                    questionName_field: {
                        identifier: 'questionName', // 登录表单中 name = ‘email’ 的输入框
                        rules: [
                            {
                                type: 'empty', // 验证是否没有输入
                                prompt: '请输入题干' // 不符合，提示语句
                            }
                        ]
                    },

                    optionA_field: {
                        identifier: 'optionA',
                    },
                    optionB_field: {
                        identifier: 'optionB',
                    },
                    optionC_field: {
                        identifier: 'optionC',
                    },
                    optionD_field: {
                        identifier: 'optionD',
                    },
                    remark_field: {
                        identifier: 'remark',
                    },
                    answer_field: {
                        identifier: 'answer',// 登录表单中 name = ‘password’ 的输入框
                        rules: [
                            {
                                type: 'empty', // 验证是否没有输入
                                prompt: '请输入答案' // 不符合，提示语句
                            }
                        ]
                    },

                },
                // 表单验证成功后的回调函数（event：事件，fields：表单属性和值）
                onSuccess: function (event, fields) {
                    fields["qid"]=questionId;
                    console.log(fields)
                    let question=JSON.stringify(fields);
                    console.log(question);



                    // 发起登录请求
                    $.ajax({
                        type: 'PUT', // 请求方式
                        url: 'http://192.168.10.100:18080/exam-online/questions/', // 请求地址
                        data: question, // 请求携带的数据
                        contentType: "application/json",
                        dataType: 'json', // 期望后台返回的类型
                        crossDomain: true, // 跨域
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (dataResponse) {
                            questionResponse(dataResponse)
                        },
                        error: function () {
                            // 请求失败后的处理方法
                            questionResponse({
                                success:false,
                                message:'登录服务器发生异常'
                            })

                        }
                    }).always(function (){
                        //置空显示页面
                        $('.question').eq(0).children().remove();
                        showQuestions();
                    })
                }
            });
    }

}

function showUpdateQuestionLayer() {
    var left = ($(window).width() - $("#update_question").width())/2;
    var top  = ($(window).height() - $("#update_question").height())/2;
    $("#update_question").css({"top": top, "left": left, "display": "block"});

}
//隐藏新增弹框
function hideUpdateQuestionLayer() {
    $("#update_question").css({"display": "none"});
}

var autoTextarea = function (elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ?
            function (name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
        minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'both';//如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};
