package com.wzy.exam_online;


import com.wzy.exam_online.bean.Paper;
import com.wzy.exam_online.bean.Question;
import com.wzy.exam_online.service.impl.PaperService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class PaperServiceTest {

    @Autowired
    private PaperService paperService;

    @Test
    void deleteTest(){
        paperService.delete(26);
    }
    @Test
    void getAllTest(){
        List<Paper> all = paperService.getAll();
        System.out.println(all);
    }


    @Test
    void getWrongQuestionsIdByPidTest(){

        Integer[] pids={21};
        String wrongQuestionsIdByPid = paperService.getWrongQuestionsIdByPid(Arrays.asList(pids));
        System.out.println(wrongQuestionsIdByPid);
    }


    @Test
    void getQuestionsIdByCidTest(){
        Integer[] cids={29};
        String questionsIdByCid = paperService.getQuestionsIdByCid(Arrays.asList(cids));
        System.out.println(questionsIdByCid);
    }

    //目录 顺序
    @Test
    void createPaperOneTest(){
        Paper paper = new Paper("试卷名", 30, 0, "C:29", "1~10", 10);
        Boolean paper1 = paperService.createPaper(paper);
        System.out.println(paper1);
    }

    //目录随机
    @Test
    void createPaperTwoTest(){
        Paper paper = new Paper("试卷名", 30, 1, "C:29", "1~10", 10);
        Boolean paper1 = paperService.createPaper(paper);
        System.out.println(paper1);
    }

    @Test
    void createPaperThereTest(){
        Paper paper = new Paper("试卷名", 30, 1, "P:1,2", "1~4", 4);
        Boolean paper1 = paperService.createPaper(paper);
        System.out.println(paper1);
    }

    @Test
    void createPaperFourTest(){
        Paper paper = new Paper("试卷名", 30, 0, "P:1,2", "1~4", 4);
        Boolean paper1 = paperService.createPaper(paper);
        System.out.println(paper1);
    }


    @Test
    void makeQuestionListTest(){
        Integer[] qidList={66, 67, 68, 69, 70, 71, 72, 73, 74, 75};
        List<Question> questions = paperService.makeQuestionList(Arrays.asList(qidList));
        System.out.println(questions);
    }

    @Test
    void getQuestionsIdByPidTest(){
        List<Question> questionsIdByPid = paperService.getQuestionsIdByPid(21);
        System.out.println(questionsIdByPid);
    }

    @Test
    void getLastExamTest(){
        List<Question> lastExam = paperService.getLastExam(21);
        System.out.println(lastExam);
    }



}
