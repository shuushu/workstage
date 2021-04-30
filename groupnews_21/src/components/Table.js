import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import HeadLine from "./HeadLine";
import Paper from "@material-ui/core/Paper";
import { rows } from "../asset/data/출석현황";
import Button from "@material-ui/core/Button";
import { init, createSeries } from "./Chart";
import { ua } from "../../../components/Util";
import Notice from "./Notice";
import EnhancedTableHead from "./TableHead";
import FilterBar from "./FilterBar";
const g = window;

function trClassRemove() {
  document
    .querySelectorAll(".MuiTableBody-root tr")
    .forEach((i) => i.classList.remove("active"));
}
function trClassAdd(ev) {
  document.querySelectorAll(".MuiTableBody-root tr").forEach((i) => {
    if (i !== ev.target.parentElement) {
      i.classList.remove("active");
    } else {
      i.classList.add("active");
    }
  });
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, orderBy) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  const arr = stabilizedThis.map((el) => el[0]);
  g.rows = arr;
  return arr;
}

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
let prefix = null;

export default function EnhancedTable() {
  const classes = useStyles();
  const [rowsData, setRowsData] = React.useState(rows);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("전체무단");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [active, setActive] = React.useState(0);
  const [fillType, setFillType] = React.useState("all");

  const handleRequestSort = (event, property) => {
    let isAsc = orderBy === property && order === "desc";

    if (prefix) {
      property = prefix.split("_의원").join("");
    } else {
      setOrder(isAsc ? "asc" : "desc");
    }
    setOrderBy(property);
  };

  const handleClick = (ev, index, data) => {
    const range = ua() ? 2 : 8;
    window.chart.categoryAxis.zoomToIndexes(
      index - range <= 0 ? 0 : index - range,
      index + range
    );
    setTimeout(() => {
      window.chart.series.each(function (series) {
        series.columns.each(function (column) {
          const getName = column.dataItem.categoryX.split(" ").pop();
          if (getName === ev.target.parentElement.getAttribute("data-name")) {
            column.isActive = true;
          } else {
            column.isActive = false;
          }
        });
      });
    }, 300);
    window.chart.categoryAxis.renderer.labels.template.rotation = 0;
    window.scrollTo(0, document.querySelector(".tab-wrap").offsetTop);

    trClassAdd(ev);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setTimeout(() => {
      window.chart.categoryAxis.renderer.labels.template.rotation = 0;
    }, 0);
    document.querySelectorAll(".MuiTableBody-root tr").forEach((i) => {
      i.classList.remove("active");
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setTimeout(() => {
      window.chart.categoryAxis.renderer.labels.template.rotation = 0;
    }, 0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    document.querySelectorAll(".MuiTableBody-root tr").forEach((i) => {
      i.classList.remove("active");
    });
  };

  const getItems = (DATA) => {
    let data = stableSort(
      rowsData,
      getComparator(order, orderBy),
      orderBy
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    let type = orderBy;
    if (g.chart) {
      g.chart.dispose();
      clearTimeout(init.timer);

      if (prefix) {
        type = prefix;
        data = stableSort(rowsData, getComparator(order, orderBy), orderBy);
      }
      init();

      switch (type) {
        case "무단 결석":
          type = "본회의_의원_무단결석";
          break;
        case "청가ㆍ결석계":
          type = "청가_의원";
          break;
        case "불출석":
          type = "전체_의원_불출석";
          break;
      }

      switch (type) {
        case "전체_의원_불출석":
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: `${value["R1"]}위) ${value["이름"]}`,
              value1: value["본회의_불출석"],
              value2: value["상임위_불출석"],
            };
          });
          createSeries("value1", "본회의", 0);
          createSeries("value2", "상임위ㆍ특위", 0);
          prefix = null;
          break;
        case "본회의_의원_무단결석":
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: `${value["R0"]}위) ${value["이름"]}`,
              value1: value["본회의_무단결석"],
              value2: value["상임위_무단결석"],
            };
          });
          createSeries("value2", "상임위ㆍ특위", 0);
          createSeries("value1", "본회의", 0);
          prefix = null;

          break;
        case "청가_의원":
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: `${value["R2"]}위) ${value["이름"]}`,
              value1: value["상임위_청가"],
              value2: value["상임위_신고서"],
              value3: value["본회의_청가"],
              value4: value["본회의_신고서"],
            };
          });
          createSeries("value1", "상임위ㆍ특위 청가", 0);
          createSeries("value2", "상임위ㆍ특위 결석계", 0);
          createSeries("value3", "본회의 청가", 0);
          createSeries("value4", "본회의 결석계", 0);
          prefix = null;
          break;
        case "출석순":
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: value["이름"],
              value1: value["본회의_출석"],
              value2: value["상임위_출석"],
            };
          });
          createSeries("value1", "본회의", 0);
          createSeries("value2", "상임위ㆍ특위", 0);
          prefix = null;
          break;
        default:
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: value["이름"],
              value1: value[orderBy],
            };
          });
          createSeries("value1", orderBy);
          window.chart.categoryAxis.renderer.labels.template.rotation = 0;
          prefix = null;
          break;
      }
    }
    return data;
  };

  const clickTab = (params) => {
    const { field, prefixName, n } = params;
    prefix = prefixName;

    setOrder("desc");
    setOrderBy(field);
    setActive(n);
    setRowsData(rows);
    setPage(0);
    window.chart.categoryAxis.renderer.labels.template.rotation = 270;
  };

  const isSpecial = (name) => {
    const list = {
      이인영: "통일부장관 겸임 중",
      전해철: "행안부장관 겸임 중",
      한정애: "환경부장관 겸임 중",
      박범계: "법무부장관 겸임 중",
      권칠승: "중소벤처기업부장관 겸임 중",
      김진애: "사퇴",
    };
    if (list[name]) {
      return <div className="special">{list[name]}</div>;
    }
  };
  const rowsFilter = (p) => {
    const obj = {};
    setFillType(p);
    setTimeout(() => {
      window.chart.categoryAxis.renderer.labels.template.rotation = 0;
    }, 0);
    trClassRemove();
    if (p === "all") {
      setRowsData(rows);
      return rows;
    } else {
      const type = p === "본회의" ? "상임위" : "본회의";
      Object.entries(rows).forEach(([key, value]) => {
        obj[key] = {};
        Object.entries(value).forEach(([k2, v2]) => {
          if (k2.indexOf(type) < 0) {
            obj[key][k2] = v2;
          }
        });
      });
      setRowsData(Object.entries(obj).map(([k, v]) => v));

      window.rows = Object.entries(obj);
      return obj;
    }
  };
  const totalCell = (row) => {
    switch (active) {
      case 0:
        return <TableCell className="무단">{row["전체무단"]}</TableCell>;
        break;
      case 1:
        return <TableCell className="청가">{row["청가"]}</TableCell>;
        break;
      case 2:
        return <TableCell className="불출석">{row["전체불출석"]}</TableCell>;
        break;
      default:
        return <TableCell className="출석">{row["전체출석"]}</TableCell>;
        break;
    }
  };
  useEffect(() => {
    init();
    g.chart.data = Object.entries(g.rows).map(([key, value]) => {
      return {
        category: `${value["R0"]}위) ${value["이름"]}`,
        value1: value["본회의_무단결석"],
        value2: value["상임위_무단결석"],
      };
    });
    createSeries("value2", "상임위ㆍ특위", 0);
    createSeries("value1", "본회의", 0);
  }, []);

  return (
    <Paper className="grid-paper" id={`dataType${active}`}>
      <HeadLine />
      <div className="tab-wrap">
        <Button
          size="large"
          onClick={() =>
            clickTab({
              prefixName: "본회의_의원_무단결석",
              field: "전체무단",
              n: 0,
            })
          }
          className={`tab ${active === 0 ? "active" : null}`}
        >
          무단결석
        </Button>
        <Button
          size="large"
          onClick={() =>
            clickTab({
              prefixName: "청가_의원",
              field: "청가",
              n: 1,
            })
          }
          className={`tab n2 ${active === 1 ? "active" : null}`}
        >
          청가ㆍ결석계
        </Button>
        <Button
          size="large"
          onClick={() =>
            clickTab({
              prefixName: "전체_의원_불출석",
              field: "전체불출석",
              n: 2,
            })
          }
          className={`tab n3 ${active === 2 ? "active" : null}`}
        >
          불출석
        </Button>

        <Button
          size="large"
          onClick={() =>
            clickTab({
              prefixName: "출석순",
              field: "전체출석",
              n: 3,
            })
          }
          className={`tab n4  ${active === 3 ? "active" : null}`}
        >
          출석
        </Button>
      </div>
      <Notice active={active} />
      <div id="chart"></div>

      <FilterBar rowsFilter={rowsFilter} />

      <TableContainer id="detail">
        <Table stickyHeader id={`${fillType}-타입`}>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rowsData.length}
            active={active}
            fillType={fillType}
          />
          <TableBody>
            {getItems(rowsData).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, index, rows[index])}
                  tabIndex={-1}
                  key={`${row.name}-${index}`}
                  data-name={row["이름"]}
                >
                  {active < 3 ? (
                    <TableCell className={`C${active} R${row[`R${active}`]}`}>
                      <div className="rank-wrap">
                        {isSpecial(row["이름"])}
                        <div className="rank">{row[`R${active}`]}위</div>
                        <div className="name">{row["이름"]}</div>
                      </div>
                    </TableCell>
                  ) : null}
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    <div className="thumb-wrap">
                      <span className={`의원사진랩핑 ${row.info["정당_21"]}`}>
                        <span className={`의원사진 hm${row.info.index}`}></span>
                      </span>
                      {active === 3 ? row["이름"] : null}
                    </div>
                  </TableCell>
                  {/* <TableCell>
                      <div className="rect-wrap">
                        <span className="value">{row["per"]}%</span>
                        <span
                          className={`per ${row.info["정당_21"]}`}
                          style={{ width: `${row["per"]}%` }}
                        ></span>
                      </div>
                    </TableCell> */}
                  {fillType === "all" ? totalCell(row) : null}
                  {fillType === "본회의" || fillType === "all" ? (
                    <>
                      <TableCell>{row["본회의_총회의"]}</TableCell>
                      <TableCell className={active === 3 ? "출석" : null}>
                        {row["본회의_출석"]}
                      </TableCell>
                      <TableCell className={active === 2 ? "불출석" : null}>
                        {row["본회의_불출석"]}
                      </TableCell>
                      <TableCell className={active === 1 ? "청가" : null}>
                        {row["본회의_청가"]}
                      </TableCell>
                      <TableCell className={active === 1 ? "청가" : null}>
                        {row["본회의_신고서"]}
                      </TableCell>
                      <TableCell>{row["본회의_출장"]}</TableCell>
                      <TableCell className={active === 0 ? "무단" : null}>
                        {row["본회의_무단결석"]}
                      </TableCell>
                    </>
                  ) : null}
                  {fillType === "상임위" || fillType === "all" ? (
                    <>
                      <TableCell>{row["상임위_총회의"]}</TableCell>
                      <TableCell className={active === 3 ? "출석" : null}>
                        {row["상임위_출석"]}
                      </TableCell>
                      <TableCell className={active === 2 ? "불출석" : null}>
                        {row["상임위_불출석"]}
                      </TableCell>
                      <TableCell className={active === 1 ? "청가" : null}>
                        {row["상임위_청가"]}
                      </TableCell>
                      <TableCell className={active === 1 ? "청가" : null}>
                        {row["상임위_신고서"]}
                      </TableCell>
                      <TableCell>{row["상임위_출장"]}</TableCell>
                      <TableCell className={active === 0 ? "무단" : null}>
                        {row["상임위_무단결석"]}
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
