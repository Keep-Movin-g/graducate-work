package com.wzy.exam_online;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wzy.exam_online.bean.Catalog;
import com.wzy.exam_online.dao.CatalogDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest
public class CatalogDaoTest {

    @Autowired
    private CatalogDao catalogDao;



    /**
     * Insert 新增
     */
    @Test
    void testTwo(){
        Catalog catalog = new Catalog(null, "大数据试题1", "大数据", "专转本",
                LocalDate.now(),0);
        Catalog catalog1 = new Catalog(null, "移动互联网试题1", "移动互联网", "专转本",
        LocalDate.now(),0);
        Catalog catalog2 = new Catalog(null, "人工智能试题1", "人工智能", "专转本",
        LocalDate.now(),0);
        Catalog catalog3 = new Catalog(null, "区块链试题1", "区块链", "专转本",
        LocalDate.now(),0);
        catalogDao.insert(catalog);
        catalogDao.insert(catalog1);
        catalogDao.insert(catalog2);
        catalogDao.insert(catalog3);


    }

    @Test
    void testGetById() {
        System.out.println(catalogDao.selectById(1));
    }
    @Test
    void testUpdate() {
        Catalog catalog = new Catalog(2, "物联网试题2", "物联网", "专转本",
                LocalDate.now(),0);
        catalogDao.updateById(catalog);
    }
    @Test
    void testDelete() {
        for (int i=8;i<17;i++){
            catalogDao.deleteById(i);
        }



    }
    @Test
    void testGetAll() {
        System.out.println(catalogDao.selectList(null));
    }

    @Test
    void testGetPage(){
        IPage page =new Page(1,3);
        catalogDao.selectPage(page,null);

        System.out.println(page.getRecords());
    }


    @Test
    void testGetBy(){

        String name ="人工智能";
//        QueryWrapper<Catalog> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<Catalog> Iwrapper = new LambdaQueryWrapper<>();
        Iwrapper.like(Catalog::getCname,name);
        List<Catalog> catalogs = catalogDao.selectList(Iwrapper);
    }

}
