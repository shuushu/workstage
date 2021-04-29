import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, active, fillType } = props;
  const createSortHandler = (property) => (event) => {
    // 필드네임 맵핑
    switch (property) {
      case "무단 결석":
        property = "전체무단";
        break;
      case "불출석":
        property = "전체불출석";
        break;
    }
    if (property.indexOf("청가") >= 0 && property.indexOf("결석계") >= 0) {
      property = "청가";
    }

    onRequestSort(event, property);
  };
  const lable = (() => {
    const 상임위 = [
      "상임위_총회의",
      "상임위_출석",
      "상임위_불출석",
      "상임위_청가",
      "상임위_결석신고서",
      "상임위_출장",
      "상임위_무단결석",
    ];
    const 본회의 = [
      "본회의_총회의",
      "본회의_출석",
      "본회의_불출석",
      "본회의_청가",
      "본회의_결석신고서",
      "본회의_출장",
      "본회의_무단결석",
    ];
    if (fillType === "상임위") {
      return ["이름", ...상임위];
    } else if (fillType === "본회의") {
      return ["이름", ...본회의];
    } else {
      let label;
      switch (active) {
        case 0:
          label = "무단 결석";
          break;
        case 1:
          label = "청가ㆍ결석계 ";
          break;
        case 2:
          label = "불출석";
          break;
      }
      return ["이름", label, ...본회의, ...상임위];
    }
  })();
  const headCells = lable.map((i) => {
    let numeric = true;
    let str = i;
    if (i === "이름") {
      str = i.replace("이름", "의원");
      numeric = false;
    }
    if (i.indexOf("결석신고서") >= 0) {
      str = i.replace("결석신고서", "결석계");
    }

    return {
      id: i,
      label: str.replace("_", " "),
      numeric,
    };
  });
  const MappingText = () => {
    switch (active) {
      case 0:
        return "무단결석 순위";
        break;
      case 1:
        return "청가ㆍ결석계 순위";
        break;
      default:
        return "불출석 순위";
        break;
    }
  };

  return (
    <TableHead>
      <TableRow>
        {active < 3 ? (
          <TableCell className="rank">
            <span className="MuiButtonBase-root MuiTableSortLabel-root">
              {MappingText()}
            </span>
          </TableCell>
        ) : null}
        {headCells.map((headCell, i) => {
          let label = headCell.label.replace("상임위", "상임위ㆍ특위");
          // th text변환
          switch (headCell.label) {
            case "상임위 총회의":
              label = "상임위ㆍ특위 횟수";
              break;
            case "본회의 총회의":
              label = "본회의 횟수";
              break;
            case "상임위 총회의":
              label = "상임위ㆍ특위 횟수";
              break;
          }
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
                {label}
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
