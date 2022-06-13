package com.wzy.exam_online.controller;


import com.wzy.exam_online.bean.Paper;
import com.wzy.exam_online.service.impl.PaperService;
import com.wzy.exam_online.util.ResponseCode;
import com.wzy.exam_online.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/papers")
public class PaperController {

    @Autowired
    private PaperService paperService;

    @GetMapping
    public ResponseData getAll(){

        return new ResponseData(true,ResponseCode.SELECT_OK,"查询成功",paperService.getAll());

    }


    @PostMapping
    public ResponseData save(@RequestBody Paper paper){
        System.out.println(paper);
        return new ResponseData(paperService.createPaper(paper), ResponseCode.INSERT_OK,"新增成功");
    }

    @DeleteMapping("{id}")
    public ResponseData delete(@PathVariable Integer id){
        return new ResponseData(paperService.delete(id),ResponseCode.DELETE_OK,"删除成功");
    }

    //得到问题
    @GetMapping("{pid}")
    public ResponseData getQuestionsByPid(@PathVariable Integer pid){

        return new ResponseData(true, ResponseCode.SELECT_OK,"查询成功",paperService.getQuestionsIdByPid(pid));

    }

    //显示做题详情 //查询考试后的信息
    @GetMapping("/last/{pid}")
    public ResponseData getLastExam(@PathVariable Integer pid){

        return new ResponseData(true, ResponseCode.SELECT_OK,"查询成功",paperService.getLastExam(pid));

    }

}
