import React from "react";

export default function HeadLine() {
  return (
    <div className="headline">
      <h1>꼬박꼬박 결석신고한 이유는? 출석부의 비밀</h1>
      <p className="parag">
        국회의원 출석부에는 비밀이 있습니다. 회의를 얼마나 빠졌는지 알려면{" "}
        <strong>무단 결석</strong> 횟수만 세서는 안 된다는 겁니다.
      </p>
      <p className="parag">
        결석하더라도 사유를 적어 국회의장에게{" "}
        <strong className="comma">청가서</strong> 나{" "}
        <strong className="comma">결석계</strong>를 내면 출석으로 인정받기
        때문인데요.
      </p>
      <p className="parag">
        진단서 같은 첨부서류를 낼 필요도 없고 검증도 없어 무조건 허가됩니다.{" "}
        <br />
        그러니까{" "}
        <strong className="comma">불출석 = 무단 결석 + 청가 및 결석계</strong>인
        겁니다.
      </p>
      <p className="parag">
        21대 국회가 문 연 작년 6월부터 올해 3월 말까지 출결 현황을 살펴봤습니다.
      </p>
    </div>
  );
}
