

var pid=null;
$(function (){
    var url=decodeURI(window.location.href);
    var argsIndex=url.split("?pid=");
    if(argsIndex.length<2&&argsIndex[1]!="undefined"){
        window.open("../html/showPapers.html");

    }
    pid=parseInt(argsIndex[1]);
    showQuestions(pid)
})

function showQuestions(pid) {
    //设置标题
    showExamResult(getExamResult(pid).data);
    let questions=getQuestions(pid).data;

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
//获取考试结果
function getExamResult(pid) {
    let getExamResult=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/score/'+pid, // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:false,    //同步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {

            getExamResult=dataResponse;

        },
        error: function () {
            // 请求失败后的处理方法
            getExamResult={
                success:false,
                message:"查找登录服务器异常",
                code:"000000",
                data:null,
            }

        }
    })


    return getExamResult;

}

//获得题目
function getQuestions(pid) {
    let getQuestions=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/papers/last/'+pid, // 请求地址
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

//考试结果展示
function showExamResult(obj){
 $('.mark_title').html(obj.paperName);
 $('.infoHead>span:eq(1)').html("错题数："+obj["wrongCount"]);
 $('.resultNum>i').html(obj.score);
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
    //设置我的答案
    showObj.find('.my_answer').html(obj.myAnswer);
    //删除之前的<i>
    showObj.find('.check').remove();
    showObj.find('.times').remove();
    if(obj.tf){
        //正确
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" check icon t_f\" ></i>")
    }else{
        //错误
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" times icon t_f\" ></i>")

    }
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark.text').html(obj.remark);


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
    //设置我的答案
    showObj.find('.my_answer').html(obj.myAnswer);
    //删除之前的<i>
    showObj.find('.check').remove();
    showObj.find('.times').remove();
    if(obj.tf){
        //正确
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" check icon t_f\" ></i>")
    }else{
        //错误
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" times icon t_f\" ></i>")

    }
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark.text').html(obj.remark);

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
    //设置我的答案
    showObj.find('.my_answer').html(obj.myAnswer);
    //删除之前的<i>
    showObj.find('.check').remove();
    showObj.find('.times').remove();
    if(obj.tf){
        //正确
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" check icon t_f\" ></i>")
    }else{
        //错误
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" times icon t_f\" ></i>")

    }
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark.text').html(obj.remark);

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
    //设置我的答案
    showObj.find('.my_answer').html(obj.myAnswer);
    //删除之前的<i>
    showObj.find('.check').remove();
    showObj.find('.times').remove();
    if(obj.tf){
        //正确
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" check icon t_f\" ></i>")
    }else{
        //错误
        showObj.find('.my_answer').parent().parent().prepend("<i class=\" times icon t_f\" ></i>")

    }
    //设置答案
    //showObj.find('.answer').html(obj.answer.shift()["equal"])
    // console.log(  obj.answer.shift()["equal"]  );

    showObj.find('.answer').html(obj.answer)

    //设置答案解析
    showObj.find('.remark.text').html(obj.remark);

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



//题目响应对象
function questionResponse(dataResponse) {

    if(dataResponse.success){
        //隐藏弹出框

        toastr.success(dataResponse.message,null,function (){

            }
        )
    }else{

        toastr.error(dataResponse.message)
    }
}
