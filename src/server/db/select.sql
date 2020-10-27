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