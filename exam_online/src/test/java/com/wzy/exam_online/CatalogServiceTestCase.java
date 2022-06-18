package com.wzy.exam_online;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wzy.exam_online.bean.Catalog;
import com.wzy.exam_online.dao.CatalogDao;
import com.wzy.exam_online.service.impl.CatalogService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest
public class CatalogServiceTestCase {


    @Autowired
    private CatalogService catalogService;

    @Test
    void testGetById(){
        System.out.println(catalogService.getById(3));
    }

    @Test
    void testTwo(){
        Catalog catalog = new Catalog(null, "大数据试题2", "大数据", "专转本",
                LocalDate.now(),0);
        Catalog catalog1 = new Catalog(null, "移动互联网试题3", "移动互联网", "专转本",
                LocalDate.now(),0);
        Catalog catalog2 = new Catalog(null, "人工智能试题4", "人工智能", "专转本",
                LocalDate.now(),0);
        Catalog catalog3 = new Catalog(null, "区块链试题8", "区块链", "专转本",
                LocalDate.now(),0);
        System.out.println(catalogService.save(catalog));
        System.out.println(catalogService.save(catalog1));
        System.out.println(catalogService.save(catalog2));
        System.out.println(catalogService.save(catalog3));



    }


    @Test
    void testUpdate() {
        Catalog catalog = new Catalog(2, "物联网试题2", "物联网", "专转本",
                LocalDate.now(),0);
        System.out.println(catalogService.update(catalog));
    }
    @Test
    void testDelete() {
        System.out.println(catalogService.delete(5));



    }
    @Test
    void testGetAll() {
        System.out.println(catalogService.getAll());
    }


    @Test
    void testGetPage(){
        IPage<Catalog> page = catalogService.getPage(1, 3);

        System.out.println(page.getRecords());
        System.out.println(page.getCurrent());
        System.out.println(page.getPages());
        System.out.println(page.getSize());
        System.out.println(page.getTotal());

    }
}
