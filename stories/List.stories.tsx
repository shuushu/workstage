import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FetchApi } from '../components/FetchApi';
import { ItemCard } from '../components/Items';
import { useFetch } from '../hooks/useFetch';
import { makeStyles } from '@material-ui/core/styles';
// 국회의원 API관련 사용한 모듈
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// 주소검색 api관련 사용한 모듈
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default {
  title: 'List/fetch_api',
  component: FetchApi
} as Meta;

const Template: Story = (args) => {
  if (args.url.length > 0) {
    const [state, refetch] = useFetch(args);

    return (
      <FetchApi {...state} refetch={refetch}>
        <ItemCard data={state.data} refetch={refetch} />
      </FetchApi>
    )
  } else {
    // 테스트 버젼
    return <FetchApi {...args} />
  }
};

export const 데이터_패치 = Template.bind({});
데이터_패치.args = {
  loading: true,
  error: false,
  data: ['test', 'test2'],
  url: 'https://jsonplaceholder.typicode.com/posts/'
};

const CardTemplate: Story = (args) => {
  const classes = useStyles();

  if (args.url.length > 0) {
    const [state, refetch] = useFetch(args);

    const Profile = (props: any) => {
      const { data } = props;
      return data.map(value => {
        const { age, bthDate, cmitNm, eMail, empNo, engNm, hgNm, hjNm, homepage, monaCd, origNm, polyNm, reeleGbnNm, telNo, unitCd, unitNm, units, deptImgUrl } = value;
        return (
          <TableRow key={`list-${monaCd}`}>
            <TableCell component="th" scope="row"><Avatar alt="Remy Sharp" src={deptImgUrl} className={classes.large} />{hgNm}</TableCell>
            <TableCell>{age}</TableCell>
            <TableCell>{bthDate}</TableCell>
            <TableCell>{cmitNm}</TableCell>
            <TableCell>{eMail}</TableCell>
            <TableCell>{empNo}</TableCell>
            <TableCell>{engNm}</TableCell>

            <TableCell>{hjNm}</TableCell>
            <TableCell>{homepage}</TableCell>
            <TableCell>{monaCd}</TableCell>
            <TableCell>{origNm}</TableCell>
            <TableCell>{polyNm}</TableCell>
            <TableCell>{reeleGbnNm}</TableCell>
            <TableCell>{telNo}</TableCell>
            <TableCell>{unitCd}</TableCell>
            <TableCell>{unitNm}</TableCell>
            <TableCell>{units}</TableCell>
          </TableRow>

        )
      })
    }
    return (
      <FetchApi {...state} data={Object.entries(state.data)} refetch={refetch}>
        <div>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['나이', '생일', '소속위원회', '이메일', '코드', '영문', '이름', '한자', '홈페이지', '의원코드', '지역구', '정당', '당선횟수', '전화번호', '국회의원이력코드', '현재', '역대당선'].map(v => <TableCell align="right" key={`th-${v}`}>{v}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                <Profile data={state.data.data} />
              </TableBody>
            </Table >
          </TableContainer >
        </div>
      </FetchApi >
    )
  } else {
    // 테스트 버젼
    return <FetchApi {...args} />
  }
}
export const 국회의원이력API = CardTemplate.bind({});
국회의원이력API.args = {
  loading: true,
  error: false,
  data: ['test', 'test2'],
  url: 'https://open.assembly.go.kr/portal/assm/search/searchAssmMemberSch.do?unitCd=100021&rows=300&page=1'
};

const Juso: Story = (args) => {
  if (args.url.length > 0) {
    console.log(args.params)
    const [state, refetch] = useFetch(args);

    const ItemRender = () => {
      const { common, juso } = state.data.results;
      if (common.errorCode !== '0') {
        return <div>{common.errorMessage}</div>
      } else {
        return <ItemCard key={juso.zipNo} data={juso} refetch={refetch} />
      }
    }

    return (
      <FetchApi {...state} data={Object.entries(state.data)} refetch={refetch}>
        <ItemRender />
      </FetchApi>
    )
  } else {
    // 테스트 버젼
    return <FetchApi {...args} />
  }
};

export const 주소API = Juso.bind({});
주소API.args = {

  url: 'https://www.juso.go.kr/addrlink/addrLinkApi.do',
  params: {
    confmKey: 'U01TX0FVVEgyMDIxMDQzMDE2MjkxODExMTExNTU=',
    resultType: 'json',
    countPerPage: 100,
    currentPage: 1,
    keyword: '숲쟁이로'
  }

};