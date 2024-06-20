package com.example.demo.common;

public class scheduleTools {
    /**
     * 定时发布
     * 用来检验是否超时
     *
     * @param startTime 起始时间(yyyy-MM-dd HH:mm)
     * @param endTime   定时发布时间(yyyy-mm-ddThh:mm)
     * @return
     */
    public static boolean checkOvertime(String startTime, String endTime) {
        String[] st = startTime.split(" ");
        String[] et = endTime.split("T");
        //yyyy-mm-dd
        String[] symd = st[0].split("-");
        String[] eymd = et[0].split("-");
        //hh:mm
        String[] shm = st[1].split(":");
        String[] ehm = et[1].split(":");
        //进行时间比较(一次按年月日进行比较，只要大于定时发布时间就返回 true，反之返回 false)
        if (Integer.parseInt(symd[0]) > Integer.parseInt(eymd[0])) return true;
        else if (Integer.parseInt(symd[0]) < Integer.parseInt(eymd[0])) return false;
        if (Integer.parseInt(symd[1]) > Integer.parseInt(eymd[1])) return true;
        else if (Integer.parseInt(symd[1]) < Integer.parseInt(eymd[1])) return false;
        if (Integer.parseInt(symd[2]) > Integer.parseInt(eymd[2])) return true;
        else if (Integer.parseInt(symd[2]) < Integer.parseInt(eymd[2])) return false;
        if (Integer.parseInt(shm[0]) > Integer.parseInt(ehm[0])) return true;
        else if (Integer.parseInt(shm[0]) < Integer.parseInt(ehm[0])) return false;
        if (Integer.parseInt(shm[1]) >= Integer.parseInt(ehm[1])) return true;
        else return false;
    }
}