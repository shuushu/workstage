import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import HeadLine from "./HeadLine";
import Paper from "@material-ui/core/Paper";
import { rows } from "../asset/data/출석현황";
import Button from "@material-ui/core/Button";
import { init, createSeries } from "./Chart";
import { ua } from "../../../components/Util";
const g = window;
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

const headCells = [
  "이름",
  "전체불출석",
  "본회의_총회의",
  "본회의_출석",
  "본회의_불출석",
  "본회의_청가",
  "본회의_신고서",
  "본회의_출장",
  "본회의_무단결석",
  "상임위_총회의",
  "상임위_출석",
  "상임위_불출석",
  "상임위_청가",
  "상임위_신고서",
  "상임위_출장",
  "상임위_무단결석",
].map((i) => {
  let numeric = true;
  if (i === "이름") {
    numeric = false;
  }
  return {
    id: i,
    label: i.replace("_", " "),
    numeric,
  };
});

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => {
          return (
            <TableCell
              key={`${headCell.id}-${i}`}
              align="center"
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
              className={`nth-${i}`}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("전체불출석");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [active, setActive] = React.useState(0);

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
    const range = ua ? 3 : 8;
    window.chart.categoryAxis.zoomToIndexes(
      index - range <= 0 ? 0 : index - range,
      index + range
    );

    window.chart.series.each(function (series) {
      series.columns.each(function (column) {
        if (
          column.dataItem.categoryX ===
          ev.target.parentElement.getAttribute("data-name")
        ) {
          column.isActive = true;
        } else {
          column.isActive = false;
        }
      });
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getItems = () => {
    let data = stableSort(rows, getComparator(order, orderBy), orderBy).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    let type = orderBy;
    if (g.chart) {
      g.chart.dispose();
      clearTimeout(init.timer);

      if (prefix) {
        type = prefix;
        data = stableSort(rows, getComparator(order, orderBy), orderBy);
      }
      init();
      switch (type) {
        case "전체불출석":
        case "전체_의원_불출석":
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: value["이름"],
              value1: value["본회의_불출석"],
              value2: value["상임위_불출석"],
            };
          });
          createSeries("value1", "전체 본회의 불출석", prefix ? 200 : 1000);
          createSeries("value2", "전체 상임위 불출석", prefix ? 200 : 1000);
          prefix = null;
          break;
        case "본회의_의원_무단결석":
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: value["이름"],
              value1: value[orderBy],
            };
          });
          createSeries("value1", "전체 무단 결석", prefix ? 200 : 1000);
          prefix = null;

          break;
        case "청가_의원":
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: value["이름"],
              value1: value["상임위_청가"],
              value2: value["상임위_신고서"],
              value3: value["본회의_청가"],
              value4: value["본회의_신고서"],
            };
          });
          createSeries("value1", "상임위_청가", 0);
          createSeries("value2", "상임위_신고서", 0);
          createSeries("value3", "본회의_청가", 0);
          createSeries("value4", "본회의_신고서", 0);
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
          createSeries("value1", "본회의 출석", 0);
          createSeries("value2", "상임위 출석", 0);
          prefix = null;
          break;
        default:
          createSeries("value1", orderBy);
          g.chart.data = Object.entries(data).map(([key, value]) => {
            return {
              category: value["이름"],
              value1: value[orderBy],
            };
          });
          prefix = null;
          break;
      }
    }
    return data;
  };

  useEffect(() => {
    init();
    g.chart.data = Object.entries(g.rows).map(([key, value]) => {
      return {
        category: value["이름"],
        value1: value["본회의_불출석"],
        value2: value["상임위_불출석"],
      };
    });
    createSeries("value2", "상임위_불출석", 0);
    createSeries("value1", "본회의_불출석", 0);
  }, []);
  useEffect(() => {}, [active]);

  return (
    <Paper className="grid-paper">
      <HeadLine />
      <div className="tab-wrap">
        <Button
          size="large"
          onClick={() => {
            prefix = "전체_의원_불출석";
            setOrder("desc");
            setOrderBy("전체불출석");
          }}
          className={`tab ${active === 0 ? "active" : null}`}
        >
          전체 불출석 순위
        </Button>
        <Button
          size="large"
          onClick={() => {
            prefix = "본회의_의원_무단결석";
            setOrder("desc");
            setOrderBy("본회의_무단결석");
          }}
          className={`tab n2 ${active === 1 ? "active" : null}`}
        >
          전체 무단 결석
        </Button>
        <Button
          size="large"
          onClick={() => {
            prefix = "청가_의원";
            setOrder("desc");
            setOrderBy("청가");
          }}
          className={`tab n3 ${active === 2 ? "active" : null}`}
        >
          전체 청가 및 결석계
        </Button>
        <Button
          size="large"
          onClick={() => {
            prefix = "출석순";
            setOrder("desc");
            setOrderBy("전체출석");
          }}
          className={`tab n4  ${active === 3 ? "active" : null}`}
        >
          전체 출석 순위
        </Button>
      </div>
      <div id="chart"></div>
      <TableContainer id="detail">
        <Table stickyHeader>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {getItems().map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, index, rows[index])}
                  tabIndex={-1}
                  key={`${row.name}-${index}`}
                  data-name={row["이름"]}
                >
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
                      <span className="name">{row["이름"]}</span>
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
                  <TableCell>{row["전체불출석"]}</TableCell>
                  <TableCell>{row["본회의_총회의"]}</TableCell>
                  <TableCell>{row["본회의_출석"]}</TableCell>
                  <TableCell>{row["본회의_불출석"]}</TableCell>
                  <TableCell>{row["본회의_청가"]}</TableCell>
                  <TableCell>{row["본회의_신고서"]}</TableCell>
                  <TableCell>{row["본회의_출장"]}</TableCell>
                  <TableCell>{row["본회의_무단결석"]}</TableCell>
                  <TableCell>{row["상임위_총회의"]}</TableCell>
                  <TableCell>{row["상임위_출석"]}</TableCell>
                  <TableCell>{row["상임위_불출석"]}</TableCell>
                  <TableCell>{row["상임위_청가"]}</TableCell>
                  <TableCell>{row["상임위_신고서"]}</TableCell>
                  <TableCell>{row["상임위_출장"]}</TableCell>
                  <TableCell>{row["상임위_무단결석"]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
