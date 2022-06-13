package com.wzy.exam_online.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.wzy.exam_online.bean.Catalog;

import java.util.List;

public interface ICatalogService {

    /**
     * 添加一个目录
     * @param catalog id 目录名 课程目 科目目 创建时间
     * @return 是否添加一个目录成功
     * @throws Exception
     */
    Boolean save(Catalog catalog) ;

    Boolean  update(Catalog catalog);

    Boolean  delete(Integer id);

    Catalog  getById(Integer id);

    List<Catalog> getAll();


    IPage<Catalog> getPage(int currentPage,int pageSize);

}
