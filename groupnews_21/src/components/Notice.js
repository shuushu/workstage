import Alert from "@material-ui/lab/Alert";

export default function Notice(props) {
  const { active } = props;

  switch (active) {
    case 0:
      return (
        <Alert severity="error">
          무단 결석은 본회의나 소속 상임위원회 또는 특별위원회를 무단으로 빠진
          횟수입니다.
        </Alert>
      );
      break;
    case 1:
      return (
        <Alert severity="warning">
          결석 사유를 미리 제출하는 건 청가, 나중에 내는 건 결석계라고 하는데
          이를 더한 횟수입니다.
        </Alert>
      );
      break;
    case 2:
      return (
        <Alert severity="info">
          불출석은 무단 결석에 청가 및 결석계를 제출한 횟수를 더했습니다.
        </Alert>
      );
      break;

    default:
      return (
        <Alert severity="success">
          본회의나 소속 상임위원회 또는 특별위원회를 모두 출석한 횟수입니다.
        </Alert>
      );
      break;
  }
}
