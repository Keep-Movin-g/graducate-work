package com.wzy.exam_online.controller;



import com.wzy.exam_online.bean.Question;
import com.wzy.exam_online.service.IQuestionService;
import com.wzy.exam_online.util.ResponseCode;
import com.wzy.exam_online.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private IQuestionService questionService;

    //通过cid查找question
    @GetMapping("/cid/{cid}")
    public ResponseData getByCid(@PathVariable Integer cid){

        return new ResponseData(true, ResponseCode.SELECT_OK,"查询成功",questionService.getByCid(cid));
    }

    @PostMapping
    public ResponseData insertSome(@RequestBody List<Question>  questions){
        ArrayList<Question> arrayList = new ArrayList<>();
        for (Question question : questions) {
            System.out.println(question.getCatalogId());
            if(question.getCatalogId()!=null){
                switch (question.getTypeId()){
                    case 1:question.setTypeName("单选题");break;
                    case 2:question.setTypeName("多选题");break;
                    case 3:question.setTypeName("判断题");break;
                    case 4:question.setTypeName("填空题");break;
                }
                arrayList.add(question);
            }

        }
        Integer some = questionService.insertSome(arrayList);
        return new ResponseData(some>0?true:false,ResponseCode.INSERT_OK,"新增"+some+"条成功");

    }






    @PutMapping
    public ResponseData update(@RequestBody Question question){
        return new ResponseData(questionService.updateById(question),ResponseCode.UPDATE_OK,"更新成功");
    }


    @DeleteMapping("{id}")
    public ResponseData delete(@PathVariable Integer id){
        return new ResponseData(questionService.removeById(id),ResponseCode.DELETE_OK,"删除成功");
    }

    @GetMapping("{id}")
    public ResponseData getById(@PathVariable Integer id){
        return new ResponseData(true,ResponseCode.SELECT_OK,"查询成功",questionService.getById(id));
    }

    @GetMapping("/wrong")
    public ResponseData getWrongsQuestion(){
        return new ResponseData(true,ResponseCode.SELECT_OK,"查询所有错题成功",questionService.getWrongQuestion());
    }



}
