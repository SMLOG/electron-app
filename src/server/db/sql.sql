select
   *
from
   (
      select
         code,
         notice_date,
         reportdate,
         'yjyg' as type
      from
         yjyg
      union
      all
      select
         code,
         notice_date,
         reportdate,
         'yj'
      from
         yj
      union
      all
      select
         code,
         noticedate,
         EndDate,
         'gds'
      from
         gds
      union
      all
      select
         code,
         notice_date,
         REPORT_DATE,
         'yjkb'
      from
         yjkb
   ) t
where
   t.code = 'sh600031'
order by
   t.notice_date desc;

select
   *
from
   (
      select
         yj_id as id,
         code,
         notice_date,
         reportdate,
         'yj' as type,
         concat(
            '营业收入:',
            fmt(TOTAL_OPERATE_INCOME),
            '同比增长:',
            FORMAT(YSTZ, 2),
            '%',
            '净利润:',
            fmt(PARENT_NETPROFIT),
            '%',
            '同比增长:',
            FORMAT(SJLTZ, 2),
            '每股现金流量:',
            FORMAT(MGJYXJJE, 2),
            '每股收益:',
            FORMAT(BASIC_EPS, 2),
            '净资产收益率:',
            FORMAT(WEIGHTAVG_ROE, 2)
         ) as descr
      from
         yj
      union
      all
      select
         yjyg_id as id,
         code,
         notice_date,
         reportdate,
         'yjyg' as type,
         concat(
            '预计净利润:',
            fmt(FORECASTL),
            '~',
            fmt(FORECASTT),
            ',业绩变动幅度:',
            fmt(INCREASEL),
            '~',
            fmt(INCREASET),
            ',上年同期净利润:',
            fmt(YEAREARLIER),
            ',',
            FORECASTTYPE,
            ',业绩预计:',
            FORECASTCONTENT,
            ',原因:',
            CHANGEREASONDSCRPT
         ) as descr
      from
         yjyg
      union
      all
      select
         gds_id as id,
         code,
         noticedate,
         EndDate,
         'gds' as type,
         concat(
            '股东户数:',
            fmt(HolderNum),
            if(HolderNumChange > 0, '增加', '减少'),
            HolderNumChange
         ) as descr
      from
         gds
      union
      all
      select
         yjkb_id as id,
         code,
         notice_date,
         REPORT_DATE,
         'yjkb' as type,
         concat(
            '营业收入:',
            fmt(TOTAL_OPERATE_INCOME),
            '同比增长:',
            FORMAT(YSTZ, 2),
            '%',
            '净利润:',
            fmt(PARENT_NETPROFIT),
            '%',
            '同比增长:',
            FORMAT(JLRTBZCL, 2),
            '每股收益:',
            FORMAT(BASIC_EPS, 2),
            '净资产收益率:',
            FORMAT(WEIGHTAVG_ROE, 2)
         ) as descr
      from
         yjkb
      union
      all
      select
         yyplrq_id as id,
         code,
         report_date,
         report_date,
         'yyplrq' as type,
         concat(
            report_type_name,
            '预约披露日期:',
            if(
               ACTUAL_PUBLISH_DATE is null,
               if(
                  THIRD_CHANGE_DATE is null,
                  if(
                     SECOND_CHANGE_DATE is null,
                     if(
                        FIRST_CHANGE_DATE is null,
                        FIRST_APPOINT_DATE,
                        FIRST_CHANGE_DATE
                     ),
                     SECOND_CHANGE_DATE
                  ),
                  THIRD_CHANGE_DATE
               ),
               ACTUAL_PUBLISH_DATE
            )
         ) as descr
      from
         yyplrq
      union
      all
      select
         xsjj_id as id,
         code,
         ltsj_date,
         ltsj_date,
         'xsjj' as type,
         concat(
            xsglx,
            '占比:',
            zb,
            '实际解禁数量(股):',
            jjsl,
            '实际解禁市值(万元):',
            jjsz
         )
      from
         xsjj
      union
      all
      select
         gphg_id as id,
         code,
         noticedate,
         upd,
         'gphg' as type,
         concat(
            ifnull(process_status, ''),
            '计划回购价格区间(元):',
            ifnull(repurpricelower, ''),
            '~',
            ifnull(repurpricecap, ''),
            '计划回购数量区间(股):',
            ifnull(repurnumlower, ''),
            '~',
            ifnull(repurnumcap, ''),
            '比例(%):',
            ifnull(zszxx, ''),
            '~',
            ifnull(zszsx, ''),
            '回购起始时间:',
            ifnull(repurstartdate, ''),
            '计划回购金额:',
            ifnull(repuramountlower, ''),
            '~',
            ifnull(repuramountlimit, '')
         )
      from
         gphg
      union
      all
      select
         gqjy_id as id,
         code,
         ndate,
         ndate,
         'gqjy' as type,
         concat(
            '股东:',
            ifnull(gdmc, ''),
            '质押开始日期:',
            ifnull(sdate, ''),
            '质押机构:',
            ifnull(jgmc, ''),
            '预估平仓线(元):',
            ifnull(pcx, ''),
            '质押股份数量(股):',
            ifnull(sharefrozennum, ''),
            '占总股本比例(%)',
            ifnull(frozenintotal, ''),
            ''
         ) as descr
      from
         gqjy
   ) t
where
   t.code = 'sh600031'
order by
   t.notice_date desc;

select
   yyplrq_id as id,
   code,
   report_date,
   'yyplrq' as type,
   concat(
      report_type_name,
      '预约披露日期:',
      if(
         ACTUAL_PUBLISH_DATE is null,
         if(
            THIRD_CHANGE_DATE is null,
            if(
               SECOND_CHANGE_DATE is null,
               if(
                  FIRST_CHANGE_DATE is null,
                  FIRST_APPOINT_DATE,
                  FIRST_CHANGE_DATE
               ),
               SECOND_CHANGE_DATE
            ),
            THIRD_CHANGE_DATE
         ),
         ACTUAL_PUBLISH_DATE
      )
   ) as descr
from
   yyplrq
limit
   1;

select
   *
from
   yyplrq
limit
   1;

select
   xsjj_id as id,
   code,
   ltsj_date,
   ltsj_date,
   'xsjj' as type,
   concat(
      xsglx,
      '占比:',
      zb,
      '实际解禁数量(股):',
      jjsl,
      '实际解禁市值(万元):',
      jjsz
   )
from
   xsjj;

select
   gphg_id as id,
   code,
   noticedate,
   upd,
   'gphg' as type,
   concat(
      ifnull(process_status, ''),
      '计划回购价格区间(元):',
      ifnull(repurpricelower, ''),
      '~',
      ifnull(repurpricecap, ''),
      '计划回购数量区间(股):',
      ifnull(repurnumlower, ''),
      '~',
      ifnull(repurnumcap, ''),
      '比例(%):',
      ifnull(zszxx, ''),
      '~',
      ifnull(zszsx, ''),
      '回购起始时间:',
      ifnull(repurstartdate, ''),
      '计划回购金额:',
      ifnull(repuramountlower, ''),
      '~',
      ifnull(repuramountlimit, '')
   )
from
   gphg;

select
   concat(
      ifnull(process_status, ''),
      '计划回购价格区间(元):',
      ifnull(repurpricelower, ''),
      '~',
      ifnull(repurpricecap, ''),
      '计划回购数量区间(股):',
      ifnull(repurnumlower, ''),
      '~',
      ifnull(repurnumcap, ''),
      '比例(%):',
      ifnull(zszxx, ''),
      '~',
      ifnull(zszsx, ''),
      '回购起始时间:',
      ifnull(repurstartdate, ''),
      '计划回购金额:',
      ifnull(repuramountlower, ''),
      '~',
      ifnull(repuramountlimit, '')
   )
from
   gphg;

select
   fhsp_id as id,
   code,
   noticedate,
   NOTICEDATE,
   'fhsp' as type
from
   fhsp;

select
   gqjy_id as id,
   code,
   ndate,
   ndate,
   'gqjy' as type,
   concat(
      '股东:',
      ifnull(gdmc, ''),
      '质押开始日期:',
      ifnull(sdate, ''),
      '质押机构:',
      ifnull(jgmc, ''),
      '预估平仓线(元):',
      ifnull(pcx, ''),
      '质押股份数量(股):',
      ifnull(sharefrozennum, ''),
      '占总股本比例(%)',
      ifnull(frozenintotal, ''),
      ''
   ) as descr
from
   gqjy
order by
   sdate desc;

select
   fmt(sum(OPERATEREVE)) "营业收入",
   fmt(sum(OPERATEPROFIT)) "营业利润",
   fmt(sum(TOTALOPERATEEXP)) "营业总成本",
   fmt(sum(SUMPROFIT)) "利润总额",
   fmt(sum(NETPROFIT)) "净利润",
   fmt(sum(OPERATEREVE) / sum(TOTALOPERATEEXP) * 100) "净利%",
   fmt(sum(PARENTNETPROFIT)) "归属于母公司股东的净利润",
   fmt(sum(BASICEPS)) "基本每股收益"
from
   (
      select
         code,
         typename,
         OPERATEPROFIT,
         TOTALOPERATEEXP,
         SUMPROFIT,
         NETPROFIT,
         PARENTNETPROFIT,
         BASICEPS,
         OPERATEREVE
      from
         lrb
      order by
         reportdate desc
      limit
         4
   ) t;

SET
   GLOBAL log_bin_trust_function_creators = 1 $ $ DELIMITER $ $ DROP FUNCTION IF EXISTS fmt $ $ CREATE FUNCTION fmt(value DOUBLE) RETURNS varchar(20) BEGIN DECLARE str VARCHAR(20) DEFAULT '';

DELIMITER
set
   @str = concat(convert(value, decimal(8, 2)), '元');

if ABS(value) < 10000 then
SET
   @str = concat(convert(value, decimal(8, 2)), '元');

elseif ABS(value) < 100000000 then
SET
   @str = concat(convert(value / 10000, decimal(8, 2)), '万');

else
SET
   @str = concat(convert(value / 100000000, decimal(8, 2)), '亿');

end if;

return @str;

END $ $ DELIMITER;

DELIMITER;

DELIMITER $ $ DROP FUNCTION IF EXISTS fn_rpd $ $ CREATE FUNCTION fn_rpd(reportdate varchar(10), t int) RETURNS varchar(10) BEGIN DECLARE str VARCHAR(10) DEFAULT '';

DECLARE m int DEFAULT 0;

set
   @str = concat(
      cast(SUBSTR(reportdate, 1, 4) as SIGNED) + cast(t / 4 as SIGNED),
      ''
   );

set
   @m = cast(SUBSTR(reportdate, 6, 2) as SIGNED);

return @str;

END $ $ DELIMITER;

set
   @m = @m + cast(t % 4);

if @m = 3
or @m = 12 then
set
   @str = concat(@str, '-', @m, '31');

else
set
   @str = concat(@str, '-', @m, '30');

end if;

select
   fn_rpd('2020-09-30', 1),
   2;

select
   floor(1.2),
   SUBSTR('2020-09-30', 6, 2),
   concat (cast(10 / 4 as SIGNED), 'a');