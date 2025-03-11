var methods = {}

methods.addData = ({ ...data }) => {
    return a =
        `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!html lang="en">

    <head xmlns="http://www.w3.org/1999/xhtml">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900" rel="stylesheet" />
        <title>AppScan Report</title>
        <style type="text/css" media="all, print, screen">
            @page {
                margin: 3cm;
            }

            body,
            html {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;
                list-style: square;
                font-size: 9pt;
                margin: 1cm;
                padding: 0;
                color: #121212;
            }

            * {
                word-wrap: break-word;
            }

            .nowordwrap *,
            .nowordwrap {
                word-wrap: normal;
                word-break: normal;
            }

            .noPageBreak {
                page-break-inside: avoid;
            }

            /* SAST
					.noPageBreak {
					page-break-inside: auto;
					}*/
            /* DAST
					pre {
					margin: 0;
					}*/

            pre {
                font-size: 90%;
                background-color: #FFFFFF;
                color: #002C53;
                border: 1px solid #DDDDDD;
                font-family: Lucida Console, Courier;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;

                /*margin-bottom:2pt;
					margin-top:2pt;*/

                padding: 5pt;
                /*
					position:relative;
					left: -3px;
					*/

                overflow: auto;
            }

            div {
                text-overflow: ellipsis;
                word-wrap: break-word;
            }

            ul {
                list-style: square;
            }

            a {
                color: #3087B3;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }

            h1 {
                font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", "Segoe UI Light", "Segoe UI", Arial, sans-serif;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;
                font-weight: 100;
                margin-top: 64px;
                margin-bottom: 0px;
                page-break-before: auto;
                page-break-inside: avoid;
                font-size: 36pt;
            }

            .h1issue {
                page-break-before: always;
            }

            h2,
            .h2group {
                font-weight: normal;
                font-size: 16pt;
                margin-top: 28px;
                margin-bottom: 12px;
                page-break-inside: avoid;
            }

            .spacer {
                margin-top: 12px;
            }

            .seperator {
                border-bottom: 1px lightgrey solid;
                margin-top: 12px;
            }

            /*#advisoriesDiv h2,#advisoriesDiv .h2group, #fixRecommendationsDiv h2, #fixRecommendationsDiv .h2group {
					font-weight: bold;
					font-size: 16pt;
					margin-top: 0px;
					page-break-inside: avoid;
					}*/

            .h2group,
            .h3group {
                margin-bottom: 16px;
                page-break-inside: avoid;
            }

            .h2group h2,
            .h3group h3 {
                margin-top: 24px;

                page-break-inside: avoid;
            }

            h3,
            .h3group {
                font-weight: normal;
                margin-bottom: 5px;
                font-size: 14pt;
                page-break-inside: avoid;
            }

            /*
					#fixRecommendationsDiv h3, #fixRecommendationsDiv .h3group {
					font-weight: normal;
					font-size: 14pt;
					margin-top: 0px;
					page-break-inside: avoid;
					}*/

            h4 {
                /*color: #30758B;*/
                font-weight: normal;
                font-size: 12pt;
                margin-top: 5px;
                margin-bottom: 4px;
                page-break-inside: avoid;
                white-space: nowrap;
            }

            .issueDetailsSegmentHeader {
                font-weight: normal;
                font-size: 12pt;
                margin-top: 10px;
                margin-bottom: 4px;
                page-break-inside: avoid;
                white-space: nowrap;
            }

            /*
					#advisoriesDiv h4, #fixRecommendationsDiv h4 {
					font-weight: normal;
					font-size: 12pt;
					margin-top: 24px;
					margin-bottom: 4px;
					page-break-inside: avoid;
					white-space: nowrap;
					}
					*/

            h5 {
                /*color: #30758B;*/
                font-weight: normal;
                font-size: 10pt;
                margin-top: 16px;
                page-break-inside: avoid;
            }

            .nomargin {
                margin-top: 0px;
                margin-bottom: 0px;
            }

            .headerUnderline {}

            hr {
                border: 1px solid;
                color: black;
                margin-top: 2px;
                margin-bottom: 24px;
            }

            .monospace {
                font-family: 'Courier New', monospace, Courier;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;
                white-space: pre-wrap;
            }

            code {
                font-family: Lucida Console, Courier;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;
                font-size: 110%;
                /*font-style: italic;*/
                /*font-weight:bold;*/
            }

            .code {
                white-space: pre-wrap;
                padding: 16px;
                border: 1px dashed #cccccc;
                margin-bottom: 10px;
                margin-top: 8px;
                font-family: 'Courier New', monospace, Courier;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;
                background-color: #eeeeee;
                border-radius: 0px;
                -moz-border-radius: 0px;
                text-overflow: ellipsis;
                font-size: 7pt;
                word-wrap: break-word;
            }

            .code img {
                width: 100%;
                vertical-align: top;
            }

            .codeInline {
                border: 1px dashed #cccccc;
                font-family: 'Courier New', monospace, Courier;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;

                background-color: #eeeeee;
                display: inline-block;
                font-size: 7pt;
                word-wrap: break-word;
                padding: 0 4px;
                word-break: break-all;
            }

            .codeInline.original {
                background-color: #c7c7c7;
                margin: 2px 0;
                font-size: 7pt;
            }

            .codeInline.test {
                background-color: #fdc500;
                margin: 2px 0;
                font-size: 7pt;
            }

            .issueInfoValue {
                font-size: 10pt;
            }

            .original {
                background-color: #F8FBED;
            }

            .test {
                background-color: #f4f4f4;
            }

            .variant {
                margin: 0 32px;
            }

            .issueInformation .centerMark {
                display: table-cell;
                text-align: center;
                font-size: 50px;
                font-weight: bold;
                color: #333333;
                padding: 100px 8px 8px 8px;
            }

            .issueInformation {
                position: relative;
            }

            .issueInformation .row {
                page-break-inside: avoid;
            }

            .issueInformation .double {
                display: table-cell;
                width: 50%;
                page-break-inside: avoid;
            }

            .issueInformation .double.name {
                padding: 16px 0 4px 0;
                page-break-inside: avoid;
            }

            .issueInformation .xssContainer {
                position: absolute;
                width: 200px;
                left: 50%;
                top: 100px;
            }

            .issueInformation .xssBlurb {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAABCAIAAAAU3Xa1AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADA5LzE1LzA4jyDzAwAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOS0xNVQxMjozNToyMFo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0xNVQxNToyOTo1OFo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4e9sDQAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAADZJREFUKJFjvKfDpNgyi0FKkUFUikFAhIGLl4GNnWEUjAKSwK+fDN8+M3x4w/D6GcOz+/eqUwFfaw4L0nVo3wAAAABJRU5ErkJggg==) repeat-y;
                padding-left: 10px;
                padding-right: 10px;
                color: #990000;
            }

            .issueInformation .xssAlert {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8xNS8wOI8g8wMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjM3OjM3ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDktMTVUMTI6MzU6MjBaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDktMTVUMTU6Mjk6NThaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOHvbA0AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AABDESURBVHic7Z17cFzVfcc/57727q6klfV+WH6BqSEQEHbSOEMKZCjQxk7HpCkUmkmnw4Rpy7T/daZl+ldmSKftpJMy6eBM22QmFFIKTBoPj05LcULBDME8/ICAsY1tWZItS7t6rLR7H+f0j7srrWVp5ZV3ZaM9n5mdlVb33r336vc9v8d5XKG2siSh5XRn46k/mfbDnYHvt/vTU91KIYQQaum9NZorAAF2PDlk2fZIwjb3JGfG/8kMvKEldysnED+W7M+Y7j9Oj49/wWxqHnU6eobcnr4z8e6+c1ZT84ywbFnNa9BoaoHyfcOfSCdywwOtuaGBjvzwQK+czLQkUs1vNIe5P7Pz2XcW23dRgaQb2p6cHJ+4J9bdd7x52y0HYn2bxkk2guOC7YBpgWHU6po0muohJYQB+B54OchOkjtxZE36rf+7yT9zel1jKvXsmqlz9y+06wUCCS2n+6xy9gfCcNtv+61X3E1bxki1QkMKkk3gJsCJgTC0QDSfDqQEJcHLQ24ashMwNQ7jo8x8/H7byN4Xv2wLsh3Cu9kMvOHSXc8TSGg53WeUs99IteTabv/K61b3uhwtHZBqhcbmSCSxeMF7mCDESl+qRlM5SoEMIy+Sn4nEMZmB8VEYO0swdCJ+9n/23MLUuN0pvK2lucl5AhkyGwZFqnWm8ytff1W094Ss6YDWzkggs97DBcsu7K0FovkUoAq1pMCPQqyiFxkfhdEzkD6LHDppDz//9G0iO2F1h1M9xV2t4g/phvYnFYbquGPnPtHeK2nvEbR2QnN75D3iyUgcphl5D9AC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);
                width: 200px;
                height: 100px;
            }

            .issueInformation .xssBottom {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA8CAYAAAAjW/WRAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8xNS8wOI8g8wMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjM3OjM3ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDktMTVUMTI6MzU6MjBaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDktMTVUMTU6Mjk6NThaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOHvbA0AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AABDvSURBVHic7Z15kBPnlcBfd6tbLbW61a0LZobBgw9gwdgGc5tg7DGH7YTYSypbSW1VYieA16m9a7Oudap2tnazlWwq2aviBNuxk62tpLJbXjtsDAZzGIxhwF5zORiwMXhgLkmtvnV0q6X9o/vTSGJmADMzmqN/VWL4B6k/1fx433v9vtfYJ3fi5Vl/vw2guQ0g3gLAxwAYFoD0A2AYeHhMesplAKsAYGgAchog1Q3Qcwk++c4WwAHKAHYRoFgEKFrO320boFxy/mG53OjL9/AYHdDvd7nk/M7brgPFIoBdBAwD8GEAAJYJUMgNvCg/AEEA4AQAjgMA7ryhF1E8JgPoP/1yCaBUAijZTgSpdsAyAQMAH44BgJkHyOkAhgpAUgAY7rwJ6QfwkQA+HwC4cniSeExkKrui8sCuCW2vdMVxIKcDmHlHEAwArO5LQPoDAITPeZNSyQk3AQaAop2I4iO9aOIxcamPGkULwCy4wcFw5FAzTg6iyWB2XQAcAyCenT99q3y8k7XEJPhj0wAnCDcPKTpvVJ2HICmwyh+eKB7jmxox3DzDLADkswBZHUCTARTREUNOg919EaQ3XwXl7V0QjER7ie9H9R+S0biUk6Xlmbd3BcAyy3S8aSBhL9nOa7CE3RPFY7wymBiWCZDPOVsoXQHQJEcMKQUgpSCz49eQfvU/MLyQlwQ2+Awn930ZK9878J5GvPW7sqT8lY3hJP/gF0rc8gfLwPIAobDzCoYA6GDdtstN5DFv6+UxDhgsAa/eTqHIoSuuJDKonfswed92nCiXLV4I/4BJXX4W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) no-repeat;
                width: 200px;
                height: 60px;
            }

            .issueInformation .xssShadow {
                background: url(data:image/png;base64,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) no-repeat;
                width: 200px;
                height: 116px;
            }

            .issueInformation .xssValue {
                position: absolute;
                left: 90px;
                top: 47px;
                color: #000000;
                font-size: 11px;
            }

            .issueInformation .xssImage {
                left: -175px;
                top: -75px;
                position: relative;
            }

            .issueInformation .malwareIcon {
                background: url(data:image/png;base64,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) no-repeat;
                width: 32px;
                height: 32px;
            }

            .issueInformationComment {
                color: #666;
                height: 32px;
                padding: 8px 36px 0;
                background-repeat: no-repeat;
                background-image: url(data:image/png;base64,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);
            }

            .issueInfoData {
                font-family: 'Courier New', monospace, Courier;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;

                font-size: 10pt;
                word-break: break-all;
            }

            .severity {
                width: 24px;
                text-align: center;
                color: white;
                border-radius: 0px;
                -moz-border-radius: 0px;
            }

            .issueType {
                display: table;
                background-color: #aaaaaa;
                margin: 82px 0 0 0;
                width: 100%;
                height: 32px;
                page-break-inside: avoid;
                border-radius: 0px;
            }

            #fixRecommendationsDiv .issueType {
                display: table;
                background-color: #3087B3;
                margin: 0px;
                width: 100%;
                height: 32px;
                border-radius: 0px;
                -moz-border-radius: 0px;
                page-break-inside: avoid;
            }

            .issueType h2 {
                font-weight: bold;
                font-size: 16px;
                color: white;
                margin: 0;
            }

            .issueType a {
                color: white;
                text-decoration: none;
            }

            .issueType a:hover {
                color: white;
                text-decoration: underline;
            }

            .issueType div {
                font-weight: bold;
                display: table-cell;
                font-size: 16px;
                padding: 8px;
            }

            .issueType table {
                width: 99%;
            }

            .issueType td:last-child {
                height: 28px;
                text-align: right;
            }

            .issueType td {
                height: 28px;
            }

            td .severity_0,
            td .severity_1,
            td .severity_2,
            td .severity_3,
            td .severity_4 {
                height: 16px;
                float: left;
            }

            .severity_0 {
                background-color: #93A2AD;
                color: #000000;
                border: 1px solid #BFBFBF;
            }

            .severity_1 {
                background-color: #FFC919;
                color: #FFFFFF;
            }

            .severity_2 {
                background-color: #FF8A00;
                color: #FFFFFF;
            }

            .severity_3 {
                background-color: #F95454;
                color: #FFFFFF;
            }

            .severity_4 {
                background-color: #C10C0D;
                color: #FFFFFF;
            }

            .severity_5 {
                background-color: #009900;
                color: #FFFFFF;
            }

            .issueHeader {
                /*-moz-border-radius: 0px;
					border-radius: 0px;*/
                border: 1px solid #CCCCCC;
                margin-bottom: 16px;
                page-break-inside: avoid;
                /*background-color: #F7F5E4;
					background-repeat: repeat-x;
					background-image: url(data:image/gif;base64,R0lGODlhAQAdAMQAAPLu0fHtzvDszO/rye/qx+7pxO3owu3nv+zmvevluurkuOrktenjs+jisejhrufgq+bfqebep+XdpOTcouPbn+PaneLZmuHYmODXk+HXld/WkN7Vjt7UjAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwNy0wMS0wNFQyMjoxMDozMVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOS0xMC0wNlQxNDowMToyMlo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQAdAAAFFSAnYqRlUZQkQZDjMHCSHEdRDEMQhAA7);*/
            }

            .issueHeader table {
                border-collapse: collapse;
            }

            .issueHeader td {
                font-size: 9pt;
            }

            .issueHeaderPale {
                background-color: #F8F6E6;
                background-repeat: repeat-x;
                background-image: url(data:image/gif;base64,R0lGODlhAQAdALMAAPj25vf05Pb04fbz3vTy3PPx2fPw1vLu0/Lu0fHtz/DszO/rye7pxQAAAAAAAAAAACH5BAAHAP8ALAAAAAABAB0AAAQPkMmpqkIYmb2JJ0IoAEAEADs=);
            }

            .issueHeader .headerIssueType {
                height: 28px;
                border-bottom: 1px solid #CCCCCC;
                padding-left: 8px;
                line-height: 29px;
                color: #121212;
                font-size: 12pt;
                font-weight: bold;
            }

            .issueHeader .headerIssueType a {
                color: #3087B3;
                font-size: 12pt;
                font-weight: bold;
                text-decoration: none;
            }

            .issueHeader .headerIssueType a:hover {
                text-decoration: underline;
            }

            .issueHeader .row,
            .variant .row,
            .row {
                display: table-row;
            }

            .row .name {
                display: table-cell;
                padding: 4px 8px 4px 0px;
                vertical-align: top;
            }

            .row .value {
                display: table-cell;
                padding: 4px 0 4px 0;
                width: 100%;
                vertical-align: top;
            }

            .issueHeader .row .name {
                display: table-cell;
                padding: 4px 8px 4px 8px;
                border-bottom: 1px solid #CCCCCC;
            }

            .issueHeader .row .value {
                display: table-cell;
                padding: 4px 0 4px 0;
                border-bottom: 1px solid #CCCCCC;
                width: 100%;
                word-break: break-all;
            }

            .issueHeader .row:last-child .name,
            .issueHeader .row:last-child .value {
                border-bottom: none;
            }

            .issueHeader .value ul {
                list-style: none;
            }

            .listStyleNone {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .issueHeader .datatable tr:last-child td {
                border-bottom: none;
            }

            .variant .row td {
                font-size: 9pt;
            }

            .variant .row .name,
            .variant .row .value {
                display: table-cell;
                vertical-align: top;
            }

            .name {
                color: #333333;
                font-weight: bold;
                padding-right: 16px;
                white-space: nowrap;
            }

            .box {
                border-radius: 0px;
                -moz-border-radius: 0px;
                display: inline-block;
                padding: 2px 4px 0 4px;
                font-weight: bold;
            }

            .toc li {
                list-style: square;
                color: #3087B3;
            }

            .toc a {
                color: #3087B3;
                text-decoration: none;
                vertical-align: middle;
            }

            .toc a:hover {
                color: #3087B3;
                text-decoration: underline;
            }

            td,
            .td {
                word-wrap: break-word;
                word-break: break-all;
            }

            td.breakNormal {
                word-break: break-all;
            }

            img {
                page-break-inside: avoid;
            }

            .datatable {
                width: 100%;
                border-collapse: collapse;
            }

            .dataTable th,
            .dataTable td {
                text-align: left;
                padding: 4px 12px;
                border-bottom: 1px solid #CCC;
                border-top: 1px solid #CCC;
            }

            .datatable th,
            .datatable .th {
                padding: 2px 4px;
                /*background-color: #3087B3;
					color: white;*/
                text-align: left;
                font-weight: bold;
                font-size: 10pt;
                height: 30px;
                page-break-inside: auto;
            }

            .datatable td,
            .datatable .td {
                border-bottom: 1px solid #cccccc;
                border-top: 1px solid #cccccc;
                padding: 2px 4px;
                text-overflow: ellipsis;
                font-size: 9pt;
                word-wrap: break-word;
                vertical-align: top;
            }

            .datatable .double td,
            .datatable div.double {
                border-bottom: 2px solid #3087B3;
            }

            .dataTable td:last-child {
                width: 100%;
            }

            .datatable a {
                color: #3087B3;
                text-decoration: none;
            }

            .datatable a:hover {
                text-decoration: underline;
            }

            .datatable .severity {
                width: 24px;
                text-align: center;
                color: white;
                border-radius: 0px;
                -moz-border-radius: 0px;
            }

            .headerdatatable th {
                background: none;
                color: #333;
                padding: 4px 8px;
            }

            .headerdatatable td {
                padding: 4px 8px;
            }

            .toclink {
                text-align: right;
                float: right;
                font-weight: normal;
                font-size: 8pt;
                color: #3087B3;
                padding-top: 4px;
            }

            .severityLegend {
                text-align: right;
                float: right;
                font-size: 10pt;
                padding-top: 4px;
            }

            .issueType .toclink {
                color: #FFFFFF;
                float: none;
            }

            .count {
                padding: 1px 4px;
                margin: 0 4px;
                font-weight: bold;
            }

            .issueType .count {
                margin: 0;
            }

            .highlight {
                background-color: yellow;
            }

            .mark {
                color: red;
            }

            .chartContainer {
                page-break-inside: avoid;
            }

            .chart {
                position: relative;
                height: 400px;
                font-size: 18px;
                color: #333;
                overflow: hidden;
            }

            .chart .legendContainer {
                left: 50%;
                top: 8%;
                position: absolute;
                overflow: visible;
            }

            .chart .legend {
                margin-left: -50%;
            }

            .chart .legend .icon {
                display: table-cell;
                width: 22px;
                box-shadow: 1px -1px 2px 1px #999;
            }

            .chart .legend .label {
                display: table-cell;
                padding: 0 32px 0 8px;
            }

            .chart .stick {
                position: absolute;
                height: 64%;
                width: 25%;
                bottom: 0%;
                z-index: 10;
                overflow: hidden;
            }

            .chart .stick .label {
                text-align: center;
                padding-top: 8px;
                color: #FFF;
                text-shadow: #999999 0px -1px 0px;
            }

            .chart .stick .labelInfo {
                font-size: 11px;
                padding-top: 0px;
            }

            .chart .stick.severity_3 {
                box-shadow: 1px -1px 2px 1px #999, inset 0px 50px 50px 0px #FF0000;
                left: 0%;
                height: 40%;
            }

            .chart .stick.severity_2 {
                box-shadow: 1px -1px 2px 1px #999, inset 0px 50px 50px 0px #FFCC00;
                left: 25%;
                height: 30%;
            }

            .chart .stick.severity_1 {
                box-shadow: 1px -1px 2px 1px #999, inset 0px 50px 50px 0px #FFEE00;
                left: 50%;
                height: 50%;
            }

            .chart .stick.severity_0 {
                box-shadow: 1px -1px 2px 1px #999, inset 0px 50px 50px 0px #5BA2D6;
                left: 75%;
                height: 20%;
            }

            .chart .stick.stick_2 {
                box-shadow: 1px -1px 2px 1px #999, inset 0px 50px 50px 0px #DA8F44;
                left: 0%;
                height: 20%;
            }

            .chart .stick.stick_1 {
                box-shadow: 1px -1px 2px 1px #999, inset 0px 50px 50px 0px #43B443;
                left: 38%;
                height: 80%;
            }

            .chart .stick.stick_0 {
                box-shadow: 1px -1px 2px 1px #999, inset 0px 50px 50px 0px #B1893B;
                left: 75%;
                height: 40%;
            }

            .chart .line {
                border-bottom: 1px solid #aaa;
                position: absolute;
                bottom: 24%;
                width: 90%;
                left: 5%;
                right: 5%;
                overflow: visible;
            }

            .chart .line .label {
                position: relative;
                left: -5%;
                top: 12px;
            }

            .chart .series1 {
                position: absolute;
                width: 38%;
                left: 9%;
                bottom: 16%;
                height: 64%;
            }

            .chart .series2 {
                position: absolute;
                width: 38%;
                left: 53%;
                bottom: 16%;
                height: 64%;
            }

            .chart .series3 {
                position: absolute;
                width: 82%;
                left: 9%;
                bottom: 16%;
                height: 64%;
            }

            .chart .seriesLabel1 {
                position: absolute;
                height: 5%;
                width: 50%;
                left: 2%;
                bottom: 0%;
                text-align: center;
            }

            .chart .seriesLabel2 {
                position: absolute;
                height: 5%;
                width: 50%;
                left: 48%;
                bottom: 0%;
                text-align: center;
            }

            .chart .seriesLabel3 {
                position: absolute;
                height: 5%;
                width: 96%;
                left: 2%;
                bottom: 0%;
                text-align: center;
            }

            .chart .countersContainer1 {
                bottom: 8%;
                width: 100%;
                position: absolute;
                overflow: visible;
            }

            .chart .countersContainer1 .counters {
                width: 92%;
                padding: 0 0 0 4%;
            }

            .chart .countersContainer1 .counters .counter {
                width: 33%;
                display: table-cell;
                text-align: center;
            }

            .chart .countersContainer2 {
                bottom: 8%;
                width: 50%;
                position: absolute;
                overflow: visible;
            }

            .chart .countersContainer2 .counters {
                width: 76%;
            }

            .chart .countersContainer2 .counters .counter {
                width: 25%;
                display: table-cell;
                text-align: center;
            }

            .stick_0 {
                background-color: #754F00;
            }

            .stick_1 {
                background-color: #009900;
            }

            .stick_2 {
                background-color: #E67300;
            }

            .doubleScreen {
                position: relative;
            }

            .doubleScreen .right {
                width: 47%;
                float: right;
                position: relative;
                height: 24px;
            }

            .doubleScreen .left {
                width: 47%;
                float: left;
                position: relative;
                height: 24px;
            }

            .doubleScreen .single {
                position: relative;
                height: 24px;
            }

            .doubleScreen .rightCode {
                width: 46%;
                float: right;
                overflow: auto;
                border-top: 1px solid #999999;
                border-bottom: 1px solid #ffffff;
                border-right: 1px solid #ffffff;
                border-left: 1px solid #999999;
                background-color: #eeeeee;
                margin-bottom: 10px;
                height: 250px;
                padding: 1.1%;
            }

            .doubleScreen .leftCode {
                width: 46%;
                float: left;
                overflow: auto;
                border-top: 1px solid #999999;
                border-bottom: 1px solid #ffffff;
                border-right: 1px solid #ffffff;
                border-left: 1px solid #999999;
                background-color: #eeeeee;
                margin-bottom: 10px;
                height: 250px;
                padding: 1.1%;
            }

            .doubleScreen .rightHeader {
                width: 46%;
                float: right;
                overflow: auto;
                overflow-y: hidden;
                border-top: 1px solid #999999;
                border-bottom: 1px solid #ffffff;
                border-right: 1px solid #ffffff;
                border-left: 1px solid #999999;
                background-color: #ffffff;
                margin-bottom: 10px;
                padding: 1.1%;
            }

            .doubleScreen .leftHeader {
                width: 46%;
                float: left;
                overflow: auto;
                overflow-y: hidden;
                border-top: 1px solid #999999;
                border-bottom: 1px solid #ffffff;
                border-right: 1px solid #ffffff;
                border-left: 1px solid #999999;
                background-color: #ffffff;
                margin-bottom: 16px;
                padding: 1.1%;
            }

            .doubleScreen .rightHeader3 {
                width: 45%;
                float: right;
                overflow: auto;
                overflow-y: hidden;
                border-top: 1px solid #999999;
                border-bottom: 1px solid #ffffff;
                border-right: 1px solid #ffffff;
                border-left: 1px solid #999999;
                background-color: #ffffff;
                margin-bottom: 10px;
                padding: 1.1%;
            }

            .doubleScreen .leftHeader3 {
                width: 45%;
                float: left;
                overflow: auto;
                overflow-y: hidden;
                border-top: 1px solid #999999;
                border-bottom: 1px solid #ffffff;
                border-right: 1px solid #ffffff;
                border-left: 1px solid #999999;
                background-color: #ffffff;
                margin-bottom: 10px;
                padding: 1.1%;
            }

            .doubleScreen .singleHeader {
                overflow: auto;
                overflow-y: hidden;
                border-top: 1px solid #999999;
                border-bottom: 1px solid #ffffff;
                border-right: 1px solid #ffffff;
                border-left: 1px solid #999999;
                background-color: #ffffff;
                padding: 1.1%;
                padding-bottom: 2.5%;
            }

            .doubleScreen .rightImage {
                width: 48%;
                height: 36%;
                overflow: hidden;
                float: right;
                position: relative;
                border-top: 1px solid #666666;
                border-bottom: 1px solid #cccccc;
                border-left: 1px solid #666666;
                border-right: 1px solid #cccccc;
                margin-bottom: 10px;
            }

            .doubleScreen .leftImage {
                width: 48%;
                height: 36%;
                overflow: hidden;
                float: left;
                border-top: 1px solid #666666;
                border-bottom: 1px solid #cccccc;
                border-left: 1px solid #666666;
                border-right: 1px solid #cccccc;
                position: relative;
                margin-bottom: 10px;
            }

            .doubleScreen .rightImage3 {
                width: 47%;
                height: 36%;
                overflow: hidden;
                float: right;
                position: relative;
                border-top: 1px solid #666666;
                border-bottom: 1px solid #cccccc;
                border-left: 1px solid #666666;
                border-right: 1px solid #cccccc;
                margin-bottom: 10px;
            }

            .doubleScreen .leftImage3 {
                width: 47%;
                height: 36%;
                overflow: hidden;
                float: left;
                border-top: 1px solid #666666;
                border-bottom: 1px solid #cccccc;
                border-left: 1px solid #666666;
                border-right: 1px solid #cccccc;
                position: relative;
                margin-bottom: 10px;
            }

            .doubleScreen .centerImage3 {
                position: absolute;
                left: 0px;
                right: 0px;
                line-height: 210px;
                text-align: center;
                font-size: 50px;
                font-weight: bold;
                color: #333333;
            }

            .doubleScreen .singleImage {
                border-top: 1px solid #666666;
                border-bottom: 1px solid #cccccc;
                border-left: 1px solid #666666;
                border-right: 1px solid #cccccc;
                margin-top: 10px;
                clear: both;
                overflow: visible;
                background-color: #FFFFFF;
                min-height: 350px;
            }

            .doubleScreen .singleImage .xssContainer {
                position: absolute;
                width: 200px;
                left: 50%;
                top: 100px;
            }

            .doubleScreen .singleImage .xssBlurb {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA8CAYAAAAjW/WRAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8xNS8wOI8g8wMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjM3OjM3ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDktMTVUMTI6MzU6MjBaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDktMTVUMTU6Mjk6NThaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOHvbA0AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AABDvSURBVHic7Z15kBPnlcBfd6tbLbW61a0LZobBgw9gwdgGc5tg7DGH7YTYSypbSW1VYieA16m9a7Oudap2tnazlWwq2aviBNuxk62tpLJbXjtsDAZzGIxhwF5zORiwMXhgLkmtvnV0q6X9o/vTSGJmADMzmqN/VWL4B6k/1fx433v9vtfYJ3fi5Vl/vw2guQ0g3gLAxwAYFoD0A2AYeHhMesplAKsAYGgAchog1Q3Qcwk++c4WwAHKAHYRoFgEKFrO320boFxy/mG53OjL9/AYHdDvd7nk/M7brgPFIoBdBAwD8GEAAJYJUMgNvCg/AEEA4AQAjgMA7ryhF1E8JgPoP/1yCaBUAijZTgSpdsAyAQMAH44BgJkHyOkAhgpAUgAY7rwJ6QfwkQA+HwC4cniSeExkKrui8sCuCW2vdMVxIKcDmHlHEAwArO5LQPoDAITPeZNSyQk3AQaAop2I4iO9aOIxcamPGkULwCy4wcFw5FAzTg6iyWB2XQAcAyCenT99q3y8k7XEJPhj0wAnCDcPKTpvVJ2HICmwyh+eKB7jmxox3DzDLADkswBZHUCTARTREUNOg919EaQ3XwXl7V0QjER7ie9H9R+S0biUk6Xlmbd3BcAyy3S8aSBhL9nOa7CE3RPFY7wymBiWCZDPOVsoXQHQJEcMKQUgpSCz49eQfvU/MLyQlwQ2+Awn930ZK9878J5GvPW7sqT8lY3hJP/gF0rc8gfLwPIAobDzCoYA6GDdtstN5DFv6+UxDhgsAa/eTqHIoSuuJDKonfswed92nCiXLV4I/4BJXX4W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) repeat-y;
                padding-left: 10px;
                padding-right: 10px;
                color: #990000;
            }

            .doubleScreen .singleImage .xssValue {
                position: absolute;
                left: 80px;
                top: 47px;
                color: #000000;
                font-size: 11px;
            }

            .doubleScreen .singleImage .xssImage {
                left: -175px;
                top: -75px;
                position: relative;
            }

            .doubleScreen .singleImage .xssImage {
                left: -175px;
                top: -75px;
                position: relative;
            }

            .doubleScreen .image {
                width: 100%;
            }

            .doubleScreen .title {
                float: left;
                color: #666666;
                font-size: 18px;
                font-weight: bold;
                position: absolute;
                left: 0px;
                top: 0px;
                z-index: 2;
            }

            .doubleScreen .titleHighlight {
                font-size: 18px;
                font-weight: bold;
                color: White;
                position: absolute;
                left: 1px;
                top: 1px;
                z-index: 1;
            }

            .logos {
                display: table;
                width: 100%;
                margin-bottom: 1.5em;
            }

            .logos .cell {
                display: table-cell;
                vertical-align: middle;
            }

            .logos .right {
                text-align: right;
            }

            .logos img {
                width: 96px;
            }

            .snippet {
                padding: 0.5em;
                background-color: white;
            }

            .snippet .lineNumber {
                color: #888888;
                width: 2.2em;
                padding-right: 0.7em;
                text-align: right;
                vertical-align: top;
                border-right: 3px solid #aaaaaa;
            }

            .snippet .lineNumberHighlight {
                background-color: #aaaaaa;
                color: White;
                width: 2.2em;
                padding-right: 0.7em;
                text-align: right;
                vertical-align: top;
                border-right: 3px solid #aaaaaa;
            }

            .snippet .taintCount {
                vertical-align: middle;
                padding-left: 0.5em;
            }

            .snippet .taintCount .bullet {
                background-color: #0099CC;
                padding: 0 0.4em;
                color: #ffffff;
                font-size: 0.7em;
                font-weight: bold;
                text-align: center;
            }

            .snippet .code {
                overflow: hidden;
                border-top: 1px solid #DDDDDD;
                color: #333333;
            }

            .snippet .fileName {
                font-weight: bold;
                padding-left: 1em;
                padding-right: 1em;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .snippet table {
                border-collapse: collapse;
            }

            .snippet .nonhighlight {
                white-space: pre-wrap;
                padding-left: 1em;
            }

            .snippet .highlight {
                background-color: #FFFF00;
                font-weight: bold;
            }

            .snippet .comment {
                color: Green;
            }

            .snippet .keyword {
                color: DarkBlue;
                font-weight: bold;
            }

            .watermark {
                color: #f0f0f0;
                font-size: 120pt;

                position: absolute;
                width: 80%;
                height: 80%;

                z-index: -1;
                left: 100px;

            }

            .s_issueType {
                background-color: #474747;
            }

            .s_issueType h2 {
                font-size: 18pt;
                padding: 5px 15px;
            }

            .tag {
                background-color: #00047A;
                font-size: xx-small;
                margin: 1px;
            }

            table.content {
                border-collapse: collapse;
            }

            th.content {
                background-color: #005288;
                color: #DBE5F1;
                border: 1px solid #005288;
                padding: 4px;
                font-weight: 300;
            }

            td.content {
                color: #000000;
                border: 1px solid #005288;
                padding: 4px;
            }

            .sample {
                border-color: #A0A0A0;
                border-style: solid;
                border-width: 1px;
                border-left-width: 4px;
                border-right-width: 4px;
                margin-top: 10px;
                margin-bottom: 10px;
                page-break-inside: avoid;
            }

            /* header row */

            .sample-header {
                background-color: #E0E0E0;
                padding: 5px;
                font-size: 90%;
            }

            .sample-header-table {
                width: 100%;
            }

            /* sample type label in upper left of sample box */

            td.sample-type {
                font-weight: bold;
            }

            /* sample file format label in upper right of sample box */

            td.sample-format {
                text-align: right;
                font-style: italic;
            }

            .sample-body {
                /*background-color:lightgray;
					padding: 0 9px 9px 9px;      */

                background-color: #EEEEEE;
            }

            .sample-body &gt;

            p {
                margin-left: 9px;
            }

            .s_highlight {
                color: darkred;
                font-weight: bold;
                word-break: break-all;
                white-space: pre-wrap;
            }

            .trace {
                font-size: 8pt;
                font-family: Arial, Helvetica, sans-serif;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;
                font-weight: lighter;
                border: 1px solid #afafaf;
                background-color: #f9f9f9;
                margin: 2px;
                padding: 2px;
                page-break-inside: avoid;
                white-space: pre-wrap;
            }

            .traceborder {
                border-left: medium solid #f9f9f9;
            }

            .traceborderfix {
                border-left: medium solid cornflowerblue;
            }

            .traceborderalt {
                border-left: medium solid lightblue;
            }

            .traceheader {
                background-color: #444444;
                border: 1px solid #fefefe;
                color: white;
                font-size: 9pt;
                font-family: Arial, Helvetica, sans-serif;
                font-family: 'Noto Sans', sans-serif;
                font-family: 'Noto Sans JP', sans-serif;
                font-weight: bold;
                padding: 1px;
            }

            .iotsource_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAQAOMAAMDAwN9pXsgZKvz8/fb5/PP2+9BWSO2sp8giLdZdUezy+erv98k+OuVwaOTr9clHPiH5BAEAAAAALAAAAAAQABAAAARaEARBqw0gA+G6/4K2faQTalzpnVlKPo8put7TxMesLPzCNA2GcLhRGBWIgHK53BSeT0QigUAIqggn9CkwCAo5FGFMJlDMs4F6zWZt2PCBWxBviyaWPEbE72siADs=);
                background-repeat: no-repeat;
                height: 16px;
                width: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .methodTraceSink_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAQAKUAAP///99oX8giLv39/vv8/vv8/fz8/vz8/fn6/fn6/P3+/u2sp/b4+/f4/Pb5+/b5/Pf4+/b4/MgZKvP2+vT2+/P2+/T2+vT3+tBWSPD0+vH0+fH0+sgiLcgjLtdeUtZdUe3y+O3x+ezx+N9pX99pXskwNOnw9+nv9+rv98k+OuVwaOft9ubt9uft9clHPuTr9ePr9eLp9eLq9OLp9OHp9Mk+Ov///wAAAKurq+2spwAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaPQEBAQCwaA4AkQEBrOp8C5fJJpUWVglhMtpXJZuCFVPAqv2Aws8s1Xq1YrFXrzXKp2EmB6YRCpf6AKiopeSAhISIBI4qMIyQlSxkaGRsCHEUdHh9XAhMUFaAWFxUWEhgSWAwNDg0PEBAOERKoWAi2Cba3CmJYBAUGBgQHBwXEV3kDycrLx0JGzwJIUtPUSkEAOw==);
                background-repeat: no-repeat;
                height: 16px;
                width: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .methodLostSink_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAQAKUAAP///99oX8giLv39/vz8/fv8/fn6/Pn7/Shilvb4/Pf5/MgZKqK70/T2+vP3++2sp/D0+sgjLtZdUV2JsWqSt+zy+d9pX99pXskwNOrv98k+OuVwaHmdvlCAqubt9uft9slHPl+KsWyUuJWyzOTr9UR2pNvk7uLp9OHp9Mk+Ov///wAAAKurq+2spwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAZ1QEBAIAgAjsjkUYBCCZRQANMZVQpOp2cVKSCRnqBkCUE2ST2fBwAUBoQQohFZmtHYNRsNgME5dhBSFRYBARYWFxhIEwgTUhBEAhESWgCLFEsNDmoLC0lzSwkKT51JDAxcBgeUnoBLBAWrVQIDA7FRQ0VbulVBADs=);
                background-repeat: no-repeat;
                height: 16px;
                width: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .methodNotValidator_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAQAKUAAP///3Cgwzpglv39/vv8/vv8/fz8/vz8/fn6/fn6/Pn7/fb4+/f4/Pb5+6urq/f4+/b4/Pf5/PP2+vT2+/P2+7u7u/T3+vT2+vP3+9jY2PDz+fD0+vD0+crKyuzy+e3x+Onv9+rv9+ft9ubt9uTr9ePr9eLp9eLq9OLp9OHp9Pv8/XCgw/b5+////wAAAKurq3BwcJubm5CQkNjY2MrKyru7uwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAZ7QAAgICgajwGhUJBqOp8CJYD5rEaVApPptD2dUODrkkR2OEpksngqEo0cGYd7JFoLzOZMHBQK2TuAHXodDh4fdnhwFQ4aGxx2EhMUDosWFBcYdgsMDWYPDw0QEXYIpQmlpgp2BAUGBgQHBwWydgO2t7hrREe8SVK/wEJBADs=);
                background-repeat: no-repeat;
                height: 16px;
                width: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .methodVirtualLostSink_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAQAKUAAP///99oX8giLv39/oSIj4KIj/z8/fv8/fr+//n6/Pn7/YWKkff9/9VWY4aKkvb4/Pf5/MgZKtjZ3PT8/+aiqoiNlvT2+vP3+/D7/4uSm/D0+sgjLtZdUeOTnI+Woezy+d9pX99pXskwNOGTnJScpurv98k+OuVwaO7L0OKhqt2DjZihrObt9uft9slHPu/7/92SnOW/xtBGVZylsOTr9d/i5+v5/+nq8dZzf9FVY+TM1J+nteLp9KGqt9Xz/+Hp9CH5BAEAAAAALAAAAAAQABAAAAajwIBAEAAYj0ij4PcTJJ+AZdPYq1qvAh7PCej5vuBvT0CjOV012w0XieR0tp2A1aIAXK4XLAKLyWQvMwIlJoUmJyYoKRMTKhETKwIfICABlCEiDAwjESMMJAIaQwIbHAIICB0RHageAhYXdm0YqA0NqAgZAg8QThESE6gUFLgVAgkKXAsMtbeoDgIGB1wFuNYIBQIDA1wEBQUE3t/hQkRQ5+hIQQA7);
                background-repeat: no-repeat;
                height: 16px;
                width: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .methodPropagator_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAQAKUAAP///3Cgwzpglv39/vv8/vv8/fz8/oCgzvz8/fn6/fn6/Pn7/fb4+/f4/Pb5+/b5/Kurq/b4/Pf5/PP2+vT2+/P2+7u7u/T2+vP3+9jY2PD0+crKyurv9+ft9ubt9uTr9ePr9eLp9eLq9OLp9OHp9Onw9/P3+/b5/PT3+vn7/fv8/XCgw/b5+////wAAAKurq3BwcJCQkJubm9jY2Lu7u8rKyoCgzgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAZ6QAAgICgajwGhUEBqOp8CJYDZPDybUaUgFBIdROCROLv8mA8gCMT8IU87HY+nA8lA5m6Bel+3c/IbgYIZGRsQeXxqGRYQGnkTFBWSEIwXGHkMDQ4HD2oOERJ5CaMHo6MKC3kEBQYHBAgIBbF5A7W2t25ER7tJUr6/QkEAOw==);
                background-repeat: no-repeat;
                height: 16px;
                width: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .method_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAQANUAAPz8/v39/vz8/ff4/Pn6/ff4+/T2++3x+fH0+vDz+fb4/PT2+vv8/vn6/O3x+OLp9eLp9Orv9/P2+/H0+TpgluTr9eft9vD0+vf5/Pb4++Hp9Onv9+ft9ezx+PP2+uPr9eLq9Obt9u3y+PD0+ezy+enw9/P3+/b5/PT3+vn7/fv8/XCgw/b5+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAQABAAAAZ/wFZrRSkajyuhkKJpOp8UZYv5rEaVlMcDtAWBIODrskKufD7linhqsYRCFo4bvqaUNpHIBo+P1EUHBx2ADiIkDnUXExcIFyMXCY51HgYSlgsoEgsmdRkDLAMnBQUsChh1BKkNqaopdQwqAAAMAgIqtnUBuru8a0RHwElSw8RCQQA7);
                background-repeat: no-repeat;
                height: 16px;
                width: 16px;
                display: inline-block;
                vertical-align: top;
            }

            .trace_tree_bottom_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAgAIAAAP///wAAACH5BAEAAAAALAAAAAAQACAAAAIjhB9xy+0PV4pS0YvhxDt731HhR2rWNgLoaZXuC8fyTNc2VgAAOw==);
                background-repeat: no-repeat;
                background-size: 100% 100%;
                height: 32px;
                width: 16px;
            }

            .trace_tree_middle_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAgAIAAAP///wAAACH5BAEAAAAALAAAAAAQACAAAAIphB9xy+0PV4pS0YvhxDt731HhR2rWNgLoaZVl+sDuLDf1TN4VziMtUwAAOw==);
                background-repeat: no-repeat;
                background-size: 100% 100%;
                height: 32px;
                width: 16px;
            }

            .trace_tree_spacer_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAgAIAAAP///wAAACH5BAEAAAAALAAAAAAQACAAAAIUhI+py+0Po5y02ouz3rz7D4biSBUAOw==);
                background-repeat: no-repeat;
                background-size: 100% 100%;
                height: 32px;
                width: 16px;
            }

            .trace_tree_extender_gif {
                background-image: url(data:image/gif;base64,R0lGODlhEAAgAIAAAP///wAAACH5BAEAAAAALAAAAAAQACAAAAImhB9xy+0PV4pS0YvhxDt731HhR2rWNZZqlaXr6jrxS86MTbcnUwAAOw==);
                background-repeat: no-repeat;
                background-size: 100% 100%;
                height: 32px;
                width: 16px;
            }
        </style>
    </head>

    <body xmlns="http://www.w3.org/1999/xhtml">
         

        <input type="hidden" name="sectionstart" />
         

        <div></div>
        <div xmlns="">
                
            <svg width="323" height="56" viewBox="0 0 323 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 46C3.58172 46 0 42.4183 0 38C0 34.5799 2.14617 31.6611 5.16522 30.5168C5.05624 29.6933 5 28.8532 5 28C5 17.5066 13.5066 9 24 9C33.7114 9 41.7211 16.2859 42.861 25.6898C45.9488 27.6377 48 31.0793 48 35C48 41.0751 43.0751 46 37 46H26V41.8582C32.7846 40.8878 38 35.0529 38 28C38 20.268 31.732 14 24 14C16.268 14 10 20.268 10 28C10 35.0529 15.2154 40.8878 22 41.8582V46H8Z"
                    fill="url(#paint0_linear_1742_884)"></path>
                <path
                    d="M27.0519 35.3926C23.8818 36.709 24.9861 39 24.9861 39C18.7546 34.1341 23.4042 29.0015 24.2095 28.1126C24.3156 27.9955 24.355 27.9521 24.2939 27.9926C19.845 30.9444 20.1639 33.6518 20.2822 34.6558C20.329 35.0533 20.3444 35.1838 20.0201 34.9568C12.2621 29.5273 17.8811 21.4721 19.2245 21.5207C19.2412 21.5213 19.2182 21.6233 19.1807 21.7906C19.0567 22.3423 18.7734 23.6031 19.2245 24.273C20.4136 26.0388 22.7777 24.9808 23.4432 22.7947C24.4163 19.5971 22.1302 17.8299 21.3582 17.2332C21.1566 17.0773 21.0583 17.0013 21.1484 17.0006C32.0538 16.9091 31.1176 27.8262 27.6183 29.2486C25.9811 29.9141 31.558 29.7138 31.4818 24.8688C31.4701 24.1352 34.2495 32.4036 27.0519 35.3926Z"
                    fill="url(#paint1_linear_1742_884)"></path>
                <path
                    d="M66.14 16.35H69.56L78.8 37.5H74.9L72.77 32.43H62.84L60.68 37.5H56.9L66.14 16.35ZM71.42 29.16L67.79 20.76L64.19 29.16H71.42ZM80.9812 21.66H84.6112V24.3C85.1912 23.48 85.9112 22.78 86.7712 22.2C87.6312 21.62 88.7112 21.33 90.0112 21.33C90.9312 21.33 91.8312 21.51 92.7112 21.87C93.6112 22.23 94.4012 22.76 95.0812 23.46C95.7612 24.16 96.3112 25.02 96.7312 26.04C97.1512 27.06 97.3612 28.23 97.3612 29.55V29.61C97.3612 30.93 97.1512 32.1 96.7312 33.12C96.3312 34.14 95.7812 35 95.0812 35.7C94.4012 36.4 93.6212 36.93 92.7412 37.29C91.8612 37.65 90.9512 37.83 90.0112 37.83C88.6912 37.83 87.6012 37.55 86.7412 36.99C85.8812 36.43 85.1712 35.78 84.6112 35.04V42.3H80.9812V21.66ZM89.1412 34.68C89.7612 34.68 90.3412 34.56 90.8812 34.32C91.4412 34.08 91.9212 33.75 92.3212 33.33C92.7412 32.89 93.0712 32.36 93.3112 31.74C93.5512 31.1 93.6712 30.39 93.6712 29.61V29.55C93.6712 28.79 93.5512 28.1 93.3112 27.48C93.0712 26.84 92.7412 26.3 92.3212 25.86C91.9212 25.42 91.4412 25.08 90.8812 24.84C90.3412 24.6 89.7612 24.48 89.1412 24.48C88.5212 24.48 87.9312 24.6 87.3712 24.84C86.8112 25.08 86.3212 25.43 85.9012 25.89C85.4812 26.33 85.1412 26.86 84.8812 27.48C84.6412 28.1 84.5212 28.79 84.5212 29.55V29.61C84.5212 30.37 84.6412 31.06 84.8812 31.68C85.1412 32.3 85.4812 32.84 85.9012 33.3C86.3212 33.74 86.8112 34.08 87.3712 34.32C87.9312 34.56 88.5212 34.68 89.1412 34.68ZM100.108 21.66H103.738V24.3C104.318 23.48 105.038 22.78 105.898 22.2C106.758 21.62 107.838 21.33 109.138 21.33C110.058 21.33 110.958 21.51 111.838 21.87C112.738 22.23 113.528 22.76 114.208 23.46C114.888 24.16 115.438 25.02 115.858 26.04C116.278 27.06 116.488 28.23 116.488 29.55V29.61C116.488 30.93 116.278 32.1 115.858 33.12C115.458 34.14 114.908 35 114.208 35.7C113.528 36.4 112.748 36.93 111.868 37.29C110.988 37.65 110.078 37.83 109.138 37.83C107.818 37.83 106.728 37.55 105.868 36.99C105.008 36.43 104.298 35.78 103.738 35.04V42.3H100.108V21.66ZM108.268 34.68C108.888 34.68 109.468 34.56 110.008 34.32C110.568 34.08 111.048 33.75 111.448 33.33C111.868 32.89 112.198 32.36 112.438 31.74C112.678 31.1 112.798 30.39 112.798 29.61V29.55C112.798 28.79 112.678 28.1 112.438 27.48C112.198 26.84 111.868 26.3 111.448 25.86C111.048 25.42 110.568 25.08 110.008 24.84C109.468 24.6 108.888 24.48 108.268 24.48C107.648 24.48 107.058 24.6 106.498 24.84C105.938 25.08 105.448 25.43 105.028 25.89C104.608 26.33 104.268 26.86 104.008 27.48C103.768 28.1 103.648 28.79 103.648 29.55V29.61C103.648 30.37 103.768 31.06 104.008 31.68C104.268 32.3 104.608 32.84 105.028 33.3C105.448 33.74 105.938 34.08 106.498 34.32C107.058 34.56 107.648 34.68 108.268 34.68ZM127.005 37.8C125.385 37.8 123.835 37.53 122.355 36.99C120.875 36.43 119.505 35.58 118.245 34.44L120.465 31.8C121.485 32.68 122.515 33.36 123.555 33.84C124.615 34.3 125.795 34.53 127.095 34.53C128.235 34.53 129.135 34.29 129.795 33.81C130.475 33.31 130.815 32.67 130.815 31.89V31.83C130.815 31.45 130.745 31.12 130.605 30.84C130.485 30.54 130.245 30.26 129.885 30C129.545 29.74 129.065 29.5 128.445 29.28C127.845 29.06 127.055 28.84 126.075 28.62C124.955 28.36 123.955 28.07 123.075 27.75C122.215 27.41 121.485 27.01 120.885 26.55C120.305 26.07 119.855 25.49 119.535 24.81C119.235 24.13 119.085 23.31 119.085 22.35V22.29C119.085 21.39 119.265 20.57 119.625 19.83C119.985 19.07 120.475 18.43 121.095 17.91C121.735 17.37 122.495 16.95 123.375 16.65C124.255 16.35 125.215 16.2 126.255 16.2C127.795 16.2 129.175 16.43 130.395 16.89C131.635 17.33 132.795 17.98 133.875 18.84L131.895 21.63C130.935 20.93 129.985 20.4 129.045 20.04C128.105 19.66 127.155 19.47 126.195 19.47C125.115 19.47 124.275 19.71 123.675 20.19C123.075 20.67 122.775 21.26 122.775 21.96V22.02C122.775 22.42 122.845 22.78 122.985 23.1C123.125 23.4 123.385 23.68 123.765 23.94C124.145 24.18 124.655 24.41 125.295 24.63C125.935 24.85 126.765 25.08 127.785 25.32C128.885 25.6 129.855 25.91 130.695 26.25C131.535 26.59 132.235 27.01 132.795 27.51C133.375 27.99 133.805 28.56 134.085 29.22C134.365 29.86 134.505 30.61 134.505 31.47V31.53C134.505 32.51 134.315 33.39 133.935 34.17C133.575 34.95 133.065 35.61 132.405 36.15C131.745 36.69 130.955 37.1 130.035 37.38C129.115 37.66 128.105 37.8 127.005 37.8ZM144.745 37.86C143.565 37.86 142.475 37.65 141.475 37.23C140.475 36.79 139.605 36.2 138.865 35.46C138.145 34.72 137.575 33.85 137.155 32.85C136.755 31.85 136.555 30.79 136.555 29.67V29.61C136.555 28.49 136.755 27.43 137.155 26.43C137.575 25.41 138.155 24.53 138.895 23.79C139.635 23.03 140.505 22.43 141.505 21.99C142.505 21.55 143.605 21.33 144.805 21.33C145.545 21.33 146.215 21.4 146.815 21.54C147.435 21.66 147.995 21.84 148.495 22.08C149.015 22.32 149.485 22.61 149.905 22.95C150.345 23.29 150.755 23.66 151.135 24.06L148.855 26.49C148.295 25.91 147.695 25.44 147.055 25.08C146.435 24.7 145.675 24.51 144.775 24.51C144.115 24.51 143.505 24.65 142.945 24.93C142.385 25.19 141.895 25.55 141.475 26.01C141.075 26.45 140.755 26.98 140.515 27.6C140.295 28.22 140.185 28.87 140.185 29.55V29.61C140.185 30.31 140.295 30.97 140.515 31.59C140.755 32.21 141.085 32.75 141.505 33.21C141.925 33.67 142.425 34.03 143.005 34.29C143.585 34.55 144.225 34.68 144.925 34.68C145.785 34.68 146.535 34.5 147.175 34.14C147.835 33.78 148.455 33.31 149.035 32.73L151.225 34.89C150.445 35.77 149.555 36.49 148.555 37.05C147.555 37.59 146.285 37.86 144.745 37.86ZM158.123 37.83C157.383 37.83 156.673 37.72 155.993 37.5C155.313 37.3 154.713 37 154.193 36.6C153.693 36.18 153.283 35.67 152.963 35.07C152.663 34.45 152.513 33.74 152.513 32.94V32.88C152.513 32.02 152.673 31.27 152.993 30.63C153.313 29.99 153.753 29.46 154.313 29.04C154.893 28.62 155.583 28.31 156.383 28.11C157.203 27.89 158.093 27.78 159.053 27.78C159.953 27.78 160.733 27.84 161.393 27.96C162.053 28.08 162.693 28.24 163.313 28.44V28.05C163.313 26.91 162.973 26.05 162.293 25.47C161.633 24.89 160.663 24.6 159.383 24.6C158.483 24.6 157.683 24.69 156.983 24.87C156.283 25.05 155.573 25.29 154.853 25.59L153.893 22.74C154.773 22.34 155.673 22.03 156.593 21.81C157.513 21.57 158.603 21.45 159.863 21.45C162.223 21.45 163.973 22.04 165.113 23.22C165.693 23.8 166.123 24.5 166.403 25.32C166.683 26.14 166.823 27.07 166.823 28.11V37.5H163.283V35.52C162.743 36.16 162.053 36.71 161.213 37.17C160.373 37.61 159.343 37.83 158.123 37.83ZM159.143 35.19C159.743 35.19 160.303 35.11 160.823 34.95C161.343 34.79 161.783 34.56 162.143 34.26C162.523 33.96 162.823 33.6 163.043 33.18C163.263 32.76 163.373 32.3 163.373 31.8V30.72C162.913 30.54 162.373 30.39 161.753 30.27C161.153 30.15 160.493 30.09 159.773 30.09C158.593 30.09 157.673 30.32 157.013 30.78C156.373 31.24 156.053 31.89 156.053 32.73V32.79C156.053 33.55 156.343 34.14 156.923 34.56C157.523 34.98 158.263 35.19 159.143 35.19ZM170.171 21.66H173.801V24.09C174.061 23.73 174.341 23.38 174.641 23.04C174.961 22.7 175.321 22.41 175.721 22.17C176.141 21.91 176.591 21.71 177.071 21.57C177.571 21.41 178.131 21.33 178.751 21.33C180.551 21.33 181.941 21.88 182.921 22.98C183.901 24.08 184.391 25.55 184.391 27.39V37.5H180.761V28.5C180.761 27.26 180.461 26.31 179.861 25.65C179.281 24.97 178.451 24.63 177.371 24.63C176.311 24.63 175.451 24.98 174.791 25.68C174.131 26.36 173.801 27.32 173.801 28.56V37.5H170.171V21.66ZM203.005 37.86C201.805 37.86 200.685 37.65 199.645 37.23C198.625 36.79 197.735 36.2 196.975 35.46C196.235 34.72 195.655 33.85 195.235 32.85C194.815 31.85 194.605 30.79 194.605 29.67V29.61C194.605 28.47 194.815 27.4 195.235 26.4C195.675 25.4 196.265 24.53 197.005 23.79C197.765 23.03 198.655 22.43 199.675 21.99C200.715 21.55 201.845 21.33 203.065 21.33C204.285 21.33 205.405 21.55 206.425 21.99C207.465 22.41 208.355 23 209.095 23.76C209.855 24.5 210.445 25.37 210.865 26.37C211.285 27.35 211.495 28.41 211.495 29.55V29.61C211.495 30.73 211.275 31.79 210.835 32.79C210.415 33.79 209.825 34.67 209.065 35.43C208.325 36.17 207.435 36.76 206.395 37.2C205.355 37.64 204.225 37.86 203.005 37.86ZM203.065 34.68C203.805 34.68 204.465 34.55 205.045 34.29C205.645 34.01 206.155 33.65 206.575 33.21C206.995 32.75 207.315 32.22 207.535 31.62C207.755 31 207.865 30.35 207.865 29.67V29.61C207.865 28.91 207.745 28.25 207.505 27.63C207.265 27.01 206.925 26.47 206.485 26.01C206.065 25.55 205.555 25.19 204.955 24.93C204.375 24.65 203.725 24.51 203.005 24.51C202.285 24.51 201.625 24.65 201.025 24.93C200.445 25.19 199.945 25.55 199.525 26.01C199.105 26.45 198.785 26.98 198.565 27.6C198.345 28.22 198.235 28.87 198.235 29.55V29.61C198.235 30.31 198.355 30.97 198.595 31.59C198.835 32.19 199.165 32.72 199.585 33.18C200.025 33.64 200.535 34.01 201.115 34.29C201.715 34.55 202.365 34.68 203.065 34.68ZM214.192 21.66H217.822V24.09C218.082 23.73 218.362 23.38 218.662 23.04C218.982 22.7 219.342 22.41 219.742 22.17C220.162 21.91 220.612 21.71 221.092 21.57C221.592 21.41 222.152 21.33 222.772 21.33C224.572 21.33 225.962 21.88 226.942 22.98C227.922 24.08 228.412 25.55 228.412 27.39V37.5H224.782V28.5C224.782 27.26 224.482 26.31 223.882 25.65C223.302 24.97 222.472 24.63 221.392 24.63C220.332 24.63 219.472 24.98 218.812 25.68C218.152 26.36 217.822 27.32 217.822 28.56V37.5H214.192V21.66ZM249.96 37.86C248.42 37.86 247 37.58 245.7 37.02C244.4 36.46 243.27 35.7 242.31 34.74C241.37 33.76 240.63 32.61 240.09 31.29C239.55 29.97 239.28 28.56 239.28 27.06V27C239.28 25.5 239.54 24.1 240.06 22.8C240.6 21.48 241.35 20.33 242.31 19.35C243.27 18.35 244.41 17.57 245.73 17.01C247.05 16.43 248.51 16.14 250.11 16.14C251.07 16.14 251.94 16.22 252.72 16.38C253.52 16.54 254.25 16.77 254.91 17.07C255.57 17.35 256.18 17.69 256.74 18.09C257.3 18.49 257.83 18.93 258.33 19.41L255.96 22.14C255.12 21.36 254.23 20.73 253.29 20.25C252.35 19.77 251.28 19.53 250.08 19.53C249.08 19.53 248.15 19.73 247.29 20.13C246.45 20.51 245.72 21.04 245.1 21.72C244.5 22.38 244.02 23.16 243.66 24.06C243.32 24.96 243.15 25.92 243.15 26.94V27C243.15 28.02 243.32 28.99 243.66 29.91C244 30.81 244.48 31.6 245.1 32.28C245.72 32.94 246.45 33.47 247.29 33.87C248.15 34.25 249.08 34.44 250.08 34.44C251.36 34.44 252.46 34.2 253.38 33.72C254.3 33.24 255.21 32.58 256.11 31.74L258.48 34.14C257.94 34.72 257.37 35.24 256.77 35.7C256.19 36.14 255.56 36.53 254.88 36.87C254.2 37.19 253.45 37.43 252.63 37.59C251.83 37.77 250.94 37.86 249.96 37.86ZM261.148 15.6H264.778V37.5H261.148V15.6ZM276.052 37.86C274.852 37.86 273.732 37.65 272.692 37.23C271.672 36.79 270.782 36.2 270.022 35.46C269.282 34.72 268.702 33.85 268.282 32.85C267.862 31.85 267.652 30.79 267.652 29.67V29.61C267.652 28.47 267.862 27.4 268.282 26.4C268.722 25.4 269.312 24.53 270.052 23.79C270.812 23.03 271.702 22.43 272.722 21.99C273.762 21.55 274.892 21.33 276.112 21.33C277.332 21.33 278.452 21.55 279.472 21.99C280.512 22.41 281.402 23 282.142 23.76C282.902 24.5 283.492 25.37 283.912 26.37C284.332 27.35 284.542 28.41 284.542 29.55V29.61C284.542 30.73 284.322 31.79 283.882 32.79C283.462 33.79 282.872 34.67 282.112 35.43C281.372 36.17 280.482 36.76 279.442 37.2C278.402 37.64 277.272 37.86 276.052 37.86ZM276.112 34.68C276.852 34.68 277.512 34.55 278.092 34.29C278.692 34.01 279.202 33.65 279.622 33.21C280.042 32.75 280.362 32.22 280.582 31.62C280.802 31 280.912 30.35 280.912 29.67V29.61C280.912 28.91 280.792 28.25 280.552 27.63C280.312 27.01 279.972 26.47 279.532 26.01C279.112 25.55 278.602 25.19 278.002 24.93C277.422 24.65 276.772 24.51 276.052 24.51C275.332 24.51 274.672 24.65 274.072 24.93C273.492 25.19 272.992 25.55 272.572 26.01C272.152 26.45 271.832 26.98 271.612 27.6C271.392 28.22 271.282 28.87 271.282 29.55V29.61C271.282 30.31 271.402 30.97 271.642 31.59C271.882 32.19 272.212 32.72 272.632 33.18C273.072 33.64 273.582 34.01 274.162 34.29C274.762 34.55 275.412 34.68 276.112 34.68ZM292.699 37.83C290.899 37.83 289.509 37.28 288.529 36.18C287.549 35.08 287.059 33.6 287.059 31.74V21.66H290.689V30.66C290.689 31.9 290.979 32.85 291.559 33.51C292.159 34.17 292.999 34.5 294.079 34.5C295.139 34.5 295.999 34.16 296.659 33.48C297.319 32.8 297.649 31.84 297.649 30.6V21.66H301.309V37.5H297.649V35.04C297.129 35.8 296.479 36.46 295.699 37.02C294.919 37.56 293.919 37.83 292.699 37.83ZM311.382 37.83C310.443 37.83 309.533 37.65 308.653 37.29C307.773 36.93 306.993 36.4 306.312 35.7C305.633 35 305.083 34.14 304.663 33.12C304.243 32.1 304.033 30.93 304.033 29.61V29.55C304.033 28.23 304.233 27.06 304.633 26.04C305.053 25.02 305.603 24.16 306.283 23.46C306.963 22.76 307.743 22.23 308.623 21.87C309.523 21.51 310.443 21.33 311.382 21.33C312.043 21.33 312.633 21.41 313.153 21.57C313.693 21.71 314.183 21.91 314.623 22.17C315.063 22.43 315.463 22.73 315.823 23.07C316.183 23.39 316.503 23.74 316.783 24.12V15.6H320.413V37.5H316.783V34.86C316.203 35.68 315.473 36.38 314.593 36.96C313.733 37.54 312.663 37.83 311.382 37.83ZM312.253 34.68C312.853 34.68 313.433 34.56 313.993 34.32C314.553 34.08 315.043 33.74 315.463 33.3C315.883 32.84 316.213 32.3 316.453 31.68C316.713 31.06 316.843 30.37 316.843 29.61V29.55C316.843 28.79 316.713 28.1 316.453 27.48C316.213 26.84 315.883 26.3 315.463 25.86C315.043 25.42 314.553 25.08 313.993 24.84C313.433 24.6 312.853 24.48 312.253 24.48C311.633 24.48 311.043 24.6 310.482 24.84C309.943 25.06 309.463 25.39 309.043 25.83C308.623 26.27 308.293 26.81 308.053 27.45C307.813 28.07 307.693 28.77 307.693 29.55V29.61C307.693 30.37 307.813 31.07 308.053 31.71C308.293 32.33 308.623 32.86 309.043 33.3C309.463 33.74 309.943 34.08 310.482 34.32C311.043 34.56 311.633 34.68 312.253 34.68Z"
                    fill="#0066B0"></path>
                <defs>
                    <linearGradient id="paint0_linear_1742_884" x1="48" y1="9" x2="12.2189" y2="55.4187"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0066B0"></stop>
                        <stop offset="1" stop-color="#2ABDEA"></stop>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1742_884" x1="48" y1="9" x2="12.2189" y2="55.4187"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0066B0"></stop>
                        <stop offset="1" stop-color="#2ABDEA"></stop>
                    </linearGradient>
                </defs>
            </svg>
                
        </div>
        <h1 style="margin: 20px;" xmlns="">Security Report</h1>
        <h2 style="margin: 20px;" xmlns="">Application Name: ${data.applicationName}</h2>
        <h2 style="margin: 20px;" xmlns="">Business Impact: ${data.businessImpact}</h2><br xmlns="" />
        <h4 style="margin: 20px;" xmlns="">Report Name: ${data.reportName}</h4>
        <h4 style="margin: 20px;" xmlns="">Report created at: ${data.reportDate}</h4>
        <h4 style="margin: 20px;" xmlns=""></h4><br xmlns="" />
        <br xmlns="" /><br xmlns="" /><br xmlns="" />
        
        <input type="hidden" name="sectionstart" />


        <h1 id="executiveSummary"><a name="executiveSummary"></a>Summary</h1>
        <hr style="noshade" />
        <div id="executiveSummary" class="h2group" xmlns="">
            <h3>Total security issues:<span class="count">1</span></h3>
        </div><br xmlns="" />
        <div id="issueTypes" class="h2group" xmlns="">
            <h3><a name="issueTypes"></a>Issue Types:<span class="count">1</span></h3>
            <table class="datatable nowordwrap">
                <tr>
                    <th></th>
                    <th></th>
                    <th colspan="2">Number of Issues</th>
                </tr>
                <tr>
                    <td style="width:66%"><a href="#${data.issueTypeAttr}">${data.howToFixTitle}</a></td>
                    <td>1</td>
                    <td style="width:33%"><span style="width:100%; height:16px;" class="${data.severityClass}" title="1"></span>
                    </td>
                </tr>
            </table>
            <table class="severityLegend">
                <tr>
                    <td>
                        <div style="width:16px; height:16px" class="${data.severityClass}"></div>
                    </td>
                    <td>Critical</td>
                    <td>
                        <div style="width:16px; height:16px" class="severity_3"></div>
                    </td>
                    <td>High</td>
                    <td>
                        <div style="width:16px; height:16px" class="severity_2"></div>
                    </td>
                    <td>Medium</td>
                    <td>
                        <div style="width:16px; height:16px" class="severity_1"></div>
                    </td>
                    <td>Low</td>
                    <td>
                        <div style="width:16px; height:16px" class="severity_0"></div>
                    </td>
                    <td>Informational</td>
                </tr>
            </table>
        </div><br xmlns="" /><br xmlns="" />
         

        <input type="hidden" name="sectionstart" />
        
        ${data.fixGroupHeaderData} 

        <div class="h3group" xmlns=""><h2>Issue
				&nbsp;
				1
				&nbsp;
				of
				&nbsp;
				1</h2></div>

        ${data.issue}

        <input type="hidden" name="sectionstart" />


        <h1 id="Articles"><a name="Articles"></a>How to Fix</h1>
        <hr style="noshade" /><a name="article-OpenSource" xmlns=""></a>
        
        
        ${data.howToFix}

         

        <input type="hidden" name="sectionstart" />
         


        <hr style="noshade" />
    </body>`
}


module.exports = methods;