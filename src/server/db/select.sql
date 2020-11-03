select
    a.code,
    a.name,
    a.now,
    a.pe_ttm,
    fmt(a.zsz),
    fmt(b.parent_netprofit),
    format(a.zsz / (b.parent_netprofit / 3 * 4), 2) pe,
    c.pe7,
    c.PE9 as pe_ttm,
    fmt(c.zsz),
    b.report_date,
    b.notice_date
from
    hq a
    left join lr b on a.code = b.code
    left join gz c on c.code = a.code
where
    b.report_date = '2020-09-30'
    and b.code = 'sz000001'
order by
    b.parent_netprofit asc;

select
    code,
    max(
        IFNULL(
            ACTUAL_PUBLISH_DATE,
            IFNULL(
                THIRD_CHANGE_DATE,
                IFNULL(SECOND_CHANGE_DATE, FIRST_APPOINT_DATE)
            )
        )
    )
from
    yyplrq
group by
    code;

select
    *
from
    my a
    left join hx b on b.code = a.code;

create
or replace view v_latest_yj as
select
    yj.*
from
    yj,
    (
        select
            code,
            max(reportdate) reportdate
        from
            yj
        group by
            code
    ) t on yj.code = t.code
    and yj.reportdate = t.reportdate;


create or REPLACE view v_his  as 

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
union all 
select gqjy_id as id , code, ndate,ndate, 'gqjy' as type,
 concat(
    '股东:',ifnull(gdmc,''),
    '质押开始日期:',ifnull(sdate,''),
    '质押机构:',ifnull(jgmc,''),
    '预估平仓线(元):',ifnull(pcx,''),
    '质押股份数量(股):',ifnull(sharefrozennum,''),
    '占总股本比例(%)',ifnull(frozenintotal,''),
    ''
) as descr
from gqjy 

) t ;


CREATE TABLE his (SELECT * FROM v_hist);