package com.wzy.exam_online;

import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.bean.Score;
import com.wzy.exam_online.service.impl.ScoreService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

@SpringBootTest
public class ScoreServiceTest {

    @Autowired
    private ScoreService scoreService;

    @Test
    void getScoreBypidTest(){
        Score scoreBypid = scoreService.getScoreBypid(21);
        System.out.println(scoreBypid);

    }

    @Test
    void examResult(){
//        {qid: '73', reply: '对'}
//        {qid: '74', reply: '对'}
//        {qid: '75', reply: '错'}
//        {qid: '69', reply: 'ABC'}
//        {qid: '70', reply: 'ABCD'}
//        {qid: '66', reply: '条形码'}
//        {qid: '67', reply: '18~24'}
//        {qid: '68', reply: 'MAN'}
        ArrayList<MyAnswer> myAnswers = new ArrayList<>();
        MyAnswer b1 = new MyAnswer(72, "B", 21);
        MyAnswer b2 = new MyAnswer(71, "A", 21);
        MyAnswer b3 = new MyAnswer(73, "对", 21);
        MyAnswer b4 = new MyAnswer(69, "ABC", 21);
        MyAnswer b5 = new MyAnswer(68, "MAN", 21);
        MyAnswer b6 = new MyAnswer(70, "ABCD", 21);
        MyAnswer b7 = new MyAnswer(67, "18~24", 21);
        MyAnswer b8 = new MyAnswer(66, "条形码", 21);
        MyAnswer b9 = new MyAnswer(74, "对", 21);
        MyAnswer b10 = new MyAnswer(75, "错", 21);
        myAnswers.add(b1);
        myAnswers.add(b2);
        myAnswers.add(b3);
        myAnswers.add(b4);
        myAnswers.add(b5);
        myAnswers.add(b6);
        myAnswers.add(b7);
        myAnswers.add(b8);
        myAnswers.add(b9);
        myAnswers.add(b10);
        Boolean aBoolean = scoreService.examResult(myAnswers);
        System.out.println(aBoolean);
    }
}
