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

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "catalog")
@Alias("catalog")

public class Catalog {
    @TableId(type = IdType.AUTO)//id自增
    private Integer cid;

    private String cname;

    private String course;

    private String major;

    private LocalDate createTime;

    @TableField(exist = false)
    private Integer count;

}
