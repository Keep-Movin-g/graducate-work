package com.wzy.exam_online;


import com.wzy.exam_online.bean.Question;
import com.wzy.exam_online.service.IQuestionService;
import com.wzy.exam_online.service.impl.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

@SpringBootTest
public class QuestionServiceTestCase {

    @Autowired
    private IQuestionService questionService;
    @Test
    void getByCIdTest(){

        System.out.println(questionService.getByCid(31));
    }


    @Test
    void catalogQuantitiesTest(){
        System.out.println(questionService.catalogQuantities(31));
    }

    @Test
    void insertSomeTest(){

        ArrayList<Question> list = new ArrayList<>();
        Question question = new Question(null, "“智慧地球”是由( )公司提出的，并得到奥巴马总统的支持。",
                "Intel",
                "IBM", "TI", "Google", 1, "B", "无", "选择题", 31);
        Question question2 = new Question(null, "日本提出了( )计划，将物联网列为国家重点战略。",
                "e-Japan",
                "U—Japan", "I—Japan", null, 1, "C", "无", "选择题", 31);
        Question question3 = new Question(null, "被誉为全球未来的三大高科技产业除了塑料电子学和仿生人体器官之外，还有( )。",
                "传感器网络（物联网)",
                "动漫游戏产业", "生物工程", "新型汽车", 1, "A", "无", "选择题", 31);
        list.add(question);
        list.add(question2);
        list.add(question3);
        Integer some = questionService.insertSome(list);
        System.out.println("成功插入"+some+"条");
    }

    @Test
    void deleteTest(){
        System.out.println(questionService.removeById(13));
    }


    @Test
    void updateTest(){
        Question question = new Question(11, "“智慧地球”是由( )公司提出的，并得到奥巴马总统的支持。",
                "Intelsadasa",
                "IBM1111111",
                "TI",
                "Google", 1, "B", "无", "选择题", 31);
        System.out.println(questionService.updateById(question));
//        System.out.println(questionService.update(question));
    }

    @Test
    void getById(){
        System.out.println(questionService.getById(12));
    }

}
