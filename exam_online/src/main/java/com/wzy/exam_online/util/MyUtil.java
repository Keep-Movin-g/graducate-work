package com.wzy.exam_online.util;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.IntStream;

public class MyUtil {

    public static  Integer[] StringToInt(String[] arrs) {

        Integer[] ints = new Integer[arrs.length];

        for (int i = 0; i < arrs.length; i++) {

            ints[i] = Integer.parseInt(arrs[i]);

        }

        return ints;

    }


    /**
     *随机从数组中选择num个数
     * @param list 要随机的数组
     * @param num  生成几个随机数
     * @return 随机数列表
     */
    public static Integer[] lotteryDrawing(Integer[] list,int num){

        int n=list.length;


        Integer[] results = new Integer[num];

        for (int i = 0; i < results.length; i++) {

            // 取出一个随机数
            int r = (int) (Math.random() * n);

            results[i] = list[r];

            // 排除已经取过的值
            list[r] = list[n - 1];

            n--;
        }


        return results;
    }


    /**
     * 数组去重
     * @param array  去重前数组
     * @return   去重后数组
     */
    public static Integer[] DontRepeat(Integer[] array){
        Set<Integer> set = new HashSet<>();
        for(int i=0;i<array.length;i++){
            set.add(array[i]);
        }
        Integer[] arrayResult = (Integer[]) set.toArray(new Integer[set.size()]);


        return arrayResult;
    }


    /**
     * 数组切片
     * @param array
     * @param startIndex 开始索引 包括
     * @param endIndex 不包括
     * @return
     */
    public static Integer[] sliceArray(Integer array[], Integer startIndex, Integer endIndex ){
        Integer size = endIndex-startIndex;
        Integer part[] = new Integer[size];
        IntStream stream = IntStream.range(startIndex, endIndex).map(i->array[i]);

        part = Arrays.stream(stream.toArray()).boxed().toArray(Integer[]::new);
        //复制数组的内容
        for(Integer i=0; i<part.length; i++){
            part[i] = array[startIndex+i];
        }
        return part;
    }
}
