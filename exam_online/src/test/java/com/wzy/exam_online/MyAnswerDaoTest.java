package com.wzy.exam_online;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.dao.MyAnswerDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class MyAnswerDaoTest {

    @Autowired
    private MyAnswerDao myAnswerDao;

    @Test
    void insertListTest(){
        ArrayList<MyAnswer> myAnswers = new ArrayList<>();
        MyAnswer b1 = new MyAnswer(72, "B", 1);
        MyAnswer b2 = new MyAnswer(71, "A", 1);
        MyAnswer b3 = new MyAnswer(73, "对", 1);
        MyAnswer b4 = new MyAnswer(69, "ABC", 1);
        MyAnswer b5 = new MyAnswer(68, "MAN", 1);
        myAnswers.add(b1);
        myAnswers.add(b2);
        myAnswers.add(b3);
        myAnswers.add(b4);
        myAnswers.add(b5);
        Integer row = myAnswerDao.insertMyAnswerList(myAnswers);
        System.out.println(row);
    }



}
