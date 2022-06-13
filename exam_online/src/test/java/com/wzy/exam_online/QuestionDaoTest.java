package com.wzy.exam_online;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wzy.exam_online.bean.MyAnswer;
import com.wzy.exam_online.bean.Question;
import com.wzy.exam_online.dao.QuestionDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
public class QuestionDaoTest {

    @Autowired
    private QuestionDao questionDao;


    @Test
    void testInsert(){

        Question question = new Question(null, "“智慧地球”是由( )公司提出的，并得到奥巴马总统的支持。",
                "Intel",
                "IBM", "TI", "Google", 1, "B", "无", "选择题", 31);
        Question question2 = new Question(null, "日本提出了( )计划，将物联网列为国家重点战略。",
                "e-Japan",
                "U—Japan", "I—Japan", null, 1, "C", "无", "选择题", 31);
        Question question3 = new Question(null, "被誉为全球未来的三大高科技产业除了塑料电子学和仿生人体器官之外，还有( )。",
                "传感器网络（物联网)",
                "动漫游戏产业", "生物工程", "新型汽车", 1, "A", "无", "选择题", 31);

        questionDao.insert(question);
        questionDao.insert(question2);
        questionDao.insert(question3);


    }

    @Test
    void testUpdate(){
        Question question = new Question(2, "“智慧地球”是由( )公司提出的，并得到奥巴马总统的支持。",
                "Intel",
                "IBM", "TI", "Google", 1, "B", "无无", "选择题", 31);
        questionDao.updateById(question);
    }

    @Test
    void testDelete(){
        questionDao.deleteById(2);
    }


    @Test
    void testCount(){

        //查询指定cid的数量
        //select count(*) from question where cid={}

        LambdaQueryWrapper<Question> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Question::getCatalogId,31);
        Long aLong = questionDao.selectCount(wrapper);
        System.out.println(aLong);
    }

    @Test
    void getByCId(){
        LambdaQueryWrapper<Question> lwq = new LambdaQueryWrapper<>();
        lwq.eq(Question::getCatalogId,31);
        List<Question> questions = questionDao.selectList(lwq);
        System.out.println(questions);
    }

    @Test
    void makeQuestionList(){
        Integer[] qidList={20,22,23,24,25,26};
        List<Question> questions = questionDao.makeQuestionList(Arrays.asList(qidList));
        System.out.println(questions);
    }

    @Test
    void getQuestionsIdByCid(){
        Integer[] qidList={31,29};
        List<Integer> questionsIdByCid = questionDao.getQuestionsIdByCid(Arrays.asList(qidList));
        System.out.println(questionsIdByCid);
    }

    @Test
    void deleteByCid(){
        HashMap<String, Object> map = new HashMap<>();
        map.put("catalog_id",27);
        int i = questionDao.deleteByMap(map);
        System.out.println(i);
    }

    @Test
    void getAnswerBYQidTest(){
        Integer[] qidList={66,67,68,69,70,71,72,73,74,75};
        List<MyAnswer> answerByQid = questionDao.getAnswerByQid(Arrays.asList(qidList));
        for (MyAnswer myAnswer : answerByQid) {
            System.out.println(myAnswer);
        }
    }

    @Test
    void getLastExamTest(){
        List<Question> lastExam = questionDao.getLastExam(24);
        System.out.println(lastExam);

    }

    @Test
    void getWrongQuestionTest(){
        List<Question> wrongQuestion = questionDao.getWrongQuestion();
        System.out.println(wrongQuestion);
    }

}
