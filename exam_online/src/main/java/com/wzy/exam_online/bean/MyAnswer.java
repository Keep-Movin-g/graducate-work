package com.wzy.exam_online.bean;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "my_answer")
@Alias("MyAnswer")
public class MyAnswer {

    private Integer qid;
    //自己的答案
    private String myAnswer;
    //对错
    private Integer TF;

    private Integer pid;
    public MyAnswer(Integer qid, String myAnswer) {
        this.qid = qid;
        this.myAnswer = myAnswer;
    }

    public MyAnswer(Integer qid, String myAnswer, Integer pid) {
        this.qid = qid;
        this.myAnswer = myAnswer;
        this.pid = pid;
    }
}
