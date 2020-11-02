select * from (
select  code,notice_date,reportdate  , 'yjyg' as type from yjyg 
union all select  code,notice_date ,reportdate, 'yj' from yj
union all select  code,noticedate ,EndDate, 'gds' from gds
union all select  code,notice_date ,REPORT_DATE, 'yjkb' from yjkb
) t where t.code = 'sh600031' order by t.notice_date desc;

select * from (
select yj_id as id , code,notice_date,reportdate,
'yj' as type,
concat('营业收入:',fmt(TOTAL_OPERATE_INCOME),
'同比增长:',FORMAT(YSTZ, 2),'%',
'净利润:',fmt(PARENT_NETPROFIT),'%',
'同比增长:',FORMAT(SJLTZ, 2),
'每股现金流量:',FORMAT(MGJYXJJE, 2),
'每股收益:',FORMAT(BASIC_EPS, 2),
'净资产收益率:',FORMAT(WEIGHTAVG_ROE, 2)
) as descr
from yj
union all
 select  yjyg_id as id, code,notice_date,reportdate,  
 'yjyg' as type,
 concat('预计净利润:',fmt(FORECASTL),'~',fmt(FORECASTT),
 ',业绩变动幅度:',fmt(INCREASEL),'~',fmt(INCREASET),
 ',上年同期净利润:',fmt(YEAREARLIER),
  ',',FORECASTTYPE,
 ',业绩预计:',FORECASTCONTENT,
 ',原因:',CHANGEREASONDSCRPT

  ) as descr
  from yjyg 
  union all


  select gds_id as id , code,noticedate ,EndDate, 'gds' as type,
   concat('股东户数:',fmt(HolderNum),if(HolderNumChange>0,'增加','减少'),
   HolderNumChange
   ) as descr
   from gds 
   union all

select yjkb_id as id, code,notice_date ,REPORT_DATE, 'yjkb' as type,
   concat('营业收入:',fmt(TOTAL_OPERATE_INCOME),
'同比增长:',FORMAT(YSTZ, 2),'%',
'净利润:',fmt(PARENT_NETPROFIT),'%',
'同比增长:',FORMAT(JLRTBZCL, 2),
'每股收益:',FORMAT(BASIC_EPS, 2),
'净资产收益率:',FORMAT(WEIGHTAVG_ROE, 2)
) as descr
 from yjkb
union all
 select yyplrq_id as id , code,report_date,report_date ,  'yyplrq' as type,
concat(report_type_name,'预约披露日期:',if(ACTUAL_PUBLISH_DATE is null,if(THIRD_CHANGE_DATE is null,if(SECOND_CHANGE_DATE is null,if(FIRST_CHANGE_DATE is null,FIRST_APPOINT_DATE,FIRST_CHANGE_DATE),SECOND_CHANGE_DATE),THIRD_CHANGE_DATE),ACTUAL_PUBLISH_DATE))
as descr
from yyplrq 
union all
select xsjj_id as id , code, ltsj_date,ltsj_date, 'xsjj' as type,
concat(xsglx,'占比:',zb,'实际解禁数量(股):',jjsl,'实际解禁市值(万元):',jjsz)
from xsjj
union all
select gphg_id as id , code, noticedate,upd, 'gphg' as type,
concat(ifnull(process_status,''),
'计划回购价格区间(元):',ifnull(repurpricelower,''),'~',ifnull(repurpricecap,''),
'计划回购数量区间(股):',ifnull(repurnumlower,''),'~',ifnull(repurnumcap,''),
'比例(%):',ifnull(zszxx,''),'~',ifnull(zszsx,''),
'回购起始时间:',ifnull(repurstartdate,''),
'计划回购金额:',ifnull(repuramountlower,''),'~',ifnull(repuramountlimit,''))
from gphg
) t where t.code = 'sh601339' order by t.notice_date desc;


select yyplrq_id as id , code,report_date ,  'yyplrq' as type,
concat(report_type_name,'预约披露日期:',if(ACTUAL_PUBLISH_DATE is null,if(THIRD_CHANGE_DATE is null,if(SECOND_CHANGE_DATE is null,if(FIRST_CHANGE_DATE is null,FIRST_APPOINT_DATE,FIRST_CHANGE_DATE),SECOND_CHANGE_DATE),THIRD_CHANGE_DATE),ACTUAL_PUBLISH_DATE))
as descr
from yyplrq limit 1;


select * from yyplrq limit 1;

select xsjj_id as id , code, ltsj_date,ltsj_date, 'xsjj' as type,
concat(xsglx,'占比:',zb,'实际解禁数量(股):',jjsl,'实际解禁市值(万元):',jjsz)
from xsjj;



select gphg_id as id , code, noticedate,upd, 'gphg' as type,
concat(ifnull(process_status,''),
'计划回购价格区间(元):',ifnull(repurpricelower,''),'~',ifnull(repurpricecap,''),
'计划回购数量区间(股):',ifnull(repurnumlower,''),'~',ifnull(repurnumcap,''),
'比例(%):',ifnull(zszxx,''),'~',ifnull(zszsx,''),
'回购起始时间:',ifnull(repurstartdate,''),
'计划回购金额:',ifnull(repuramountlower,''),'~',ifnull(repuramountlimit,'')
)
from gphg;

select concat(ifnull(process_status,''),
'计划回购价格区间(元):',ifnull(repurpricelower,''),'~',ifnull(repurpricecap,''),
'计划回购数量区间(股):',ifnull(repurnumlower,''),'~',ifnull(repurnumcap,''),
'比例(%):',ifnull(zszxx,''),'~',ifnull(zszsx,''),
'回购起始时间:',ifnull(repurstartdate,''),
'计划回购金额:',ifnull(repuramountlower,''),'~',ifnull(repuramountlimit,'')
) from gphg;


select fhsp_id as id , code, noticedate,NOTICEDATE, 'fhsp' as type
from fhsp;