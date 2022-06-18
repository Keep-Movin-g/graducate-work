package com.wzy.exam_online.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "question")
@Alias("question")

public class Question {
    @TableId(type = IdType.AUTO)//id自增
    private Integer qid;
    private String QuestionName;
    private String OptionA;
    private String OptionB;
    private String OptionC;
    private String OptionD;
    private Integer TypeId;
    private String answer;
    private String remark;
    private String typeName;
    private Integer catalogId;
    //做我的答案
    @TableField(exist = false)
    private String myAnswer;
    //做错 正确 true 错误 false
    @TableField(exist = false)
    private Boolean TF;


    public Question(Integer qid, String questionName, String optionA, String optionB, String optionC, String optionD, Integer typeId, String answer, String remark, String typeName, Integer catalogId) {
        this.qid = qid;
        QuestionName = questionName;
        OptionA = optionA;
        OptionB = optionB;
        OptionC = optionC;
        OptionD = optionD;
        TypeId = typeId;
        this.answer = answer;
        this.remark = remark;
        this.typeName = typeName;
        this.catalogId = catalogId;
    }

    public Question(Integer qid, String questionName, String optionA, String optionB, String optionC, String optionD, Integer typeId, String answer, String remark, String typeName, Integer catalogId, String myAnswer) {
        this.qid = qid;
        QuestionName = questionName;
        OptionA = optionA;
        OptionB = optionB;
        OptionC = optionC;
        OptionD = optionD;
        TypeId = typeId;
        this.answer = answer;
        this.remark = remark;
        this.typeName = typeName;
        this.catalogId = catalogId;
        this.myAnswer = myAnswer;
    }

}
