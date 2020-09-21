var white = {
    backgroundColor: '#fff',
    // backgroundColor: '#fff',
    // 默认色板
    //        color: [
    //'#408829', '#68a54a', '#a9cba2', '#86b379',
    //'#397b29', '#8abb6f', '#759c6a', '#bfd3b7'
    //        ],

    // 图表标题
    title: {
        itemGap: 8,
        textStyle: {
            fontWeight: 'normal',
            color: '#000'
        }
    },

    legend: {
        textStyle:
            {
                color: '#000'
            }
    },


    // 提示框
    tooltip: {
        confine: true,
        backgroundColor: 'rgba(0,0,0,0.5)',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {          // 直线指示器样式设置
                color: '#c00',
                type: 'dashed'
            },
            crossStyle: {
                color: '#c00'
            },
            shadowStyle: {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },
    grid: {
        borderColor: '#e3b',
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#000'
            }
        },
        axisTick: {//坐标轴分割线
            show: false
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#000',
                type: 'dashed'
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#000'
            }
        },
        axisTick: {//坐标轴分割线
            show: false
        },
        //splitArea: {
        //    show: true,
        //    areaStyle: {
        //        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
        //    }
        //},
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#000',
                type: 'dashed'
            }
        }
    },

    //时间类型坐标轴默认参数
    timeAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#000'
            }
        },
        axisLabel: {
            formatter: function (value, index) {
                var date = new Date(value);
                var texts = [
                    date.getFullYear(),
                    date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
                    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
                ];
                return texts.join('-');
            }
        }
    },
    textStyle: {
        fontFamily: '宋体, Arial, Verdana, sans-serif'
    }
};

var black = {
    backgroundColor: '#000',
    // 默认色板
    //        color: [
    //'#408829', '#68a54a', '#a9cba2', '#86b379',
    //'#397b29', '#8abb6f', '#759c6a', '#bfd3b7'
    //        ],

    // 图表标题
    title: {
        itemGap: 8,
        textStyle: {
            fontWeight: 'normal',
            color: '#fff'
        }
    },

    legend: {
        textStyle:
            {
                color: '#fff'
            }
    },


    // 提示框
    tooltip: {
        confine: true,
        backgroundColor: 'rgba(0,0,0,0.5)',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {          // 直线指示器样式设置
                color: '#808080',
                type: 'dashed'
            },
            crossStyle: {
                color: '#808080'
            },
            shadowStyle: {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },
    grid: {
        borderColor: '#808080',
        borderWidth: 1
    },


    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#808080'
            }
        },
        axisTick: {//坐标轴分割线
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#808080',
                type: 'dashed'
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#808080'
            }
        },
        axisTick: {//坐标轴分割线
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        //splitArea: {
        //    show: true,
        //    areaStyle: {
        //        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
        //    }
        //},
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#585858',
                type: 'dashed'
            }
        }
    },

    //时间类型坐标轴默认参数
    timeAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#808080'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            },
            formatter: function (value, index) {
                var date = new Date(value);
                var texts = [
                    date.getFullYear(),
                    date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
                    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
                ];
                return texts.join('-');
            }
        }
    },
    textStyle: {
        fontFamily: '宋体, Arial, Verdana, sans-serif'
    }
};