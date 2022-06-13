package com.wzy.exam_online.controller;

import com.wzy.exam_online.bean.Catalog;
import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.bean.Score;
import com.wzy.exam_online.service.impl.ScoreService;
import com.wzy.exam_online.util.ResponseCode;
import com.wzy.exam_online.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    //通过pid查找score
    @GetMapping("{pid}")
    public ResponseData getById(@PathVariable Integer pid){
        return new ResponseData(true,ResponseCode.SELECT_OK,"查询成功",scoreService.getScoreBypid(pid));
    }


    //试卷提交

    @PostMapping
    public ResponseData save(@RequestBody List<MyAnswer> myAnswers){

        return new ResponseData(scoreService.examResult(myAnswers),ResponseCode.INSERT_OK,"提交成功！");

    }




}
