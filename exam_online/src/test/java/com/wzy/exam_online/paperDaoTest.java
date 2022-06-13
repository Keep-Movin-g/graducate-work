package com.wzy.exam_online;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wzy.exam_online.bean.Paper;
import com.wzy.exam_online.dao.PaperDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class paperDaoTest {

    @Autowired
    private PaperDao paperDao;

    @Test
    void insertTest(){
        Paper paper = new Paper("物联网测试", 50, 0, "C:31,28", "1~10", 10, LocalDate.now());
        Paper paper2 = new Paper("物联网测试2", 50, 0, "C:31,28", "11~20", 10, LocalDate.now());
        Paper paper3 = new Paper("物联网测试3", 50, 1, "C:31,28", "1~20", 10, LocalDate.now());
        Paper paper4 = new Paper("物联网测试3", 50, 1, "C:31,28", "1~20", 10, LocalDate.now());
        paperDao.insert(paper);
        paperDao.insert(paper2);
        paperDao.insert(paper3);
        paperDao.insert(paper4);
    }

    @Test
    void getAllPaperTest(){
        paperDao.selectList(null);
    }

    @Test
    void deletePaperTest(){
        paperDao.deleteById(4);
    }

    @Test
    void getQidTest(){


        ArrayList<Integer> integers = new ArrayList<>();
        integers.add(1);
        integers.add(2);
        List<String> questions = paperDao.getQuestionsIdByPid(integers);
        System.out.println(questions);
    }

    @Test
    void getWrongQidTest(){
        ArrayList<Integer> integers = new ArrayList<>();
        integers.add(21);

        List<String> questions = paperDao.getWrongQuestionsIdByPid(integers);
        System.out.println(questions.get(0).getClass().getName());
        System.out.println(questions);
    }


    @Test
    void getOverAll(){
        List<Paper> overAll = paperDao.getOverAll();
        System.out.println(overAll);
    }
}
