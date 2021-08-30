import React, { useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getWazas } from "../../reducks/wazas/selectors";
import "../../App.css";
import { BackButton } from "../atoms/BackButton";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { getSignedIn } from "../../reducks/users/selectors";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loader: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
}));

export const ResultCharts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const wazaDetails = getWazas(selector);
  const isSignedIn = getSignedIn(selector);

  //各レベルの技の総数
  const level1Amt = wazaDetails.filter(
    (wazaDetail) => wazaDetail["level"] === 1
  ).length;
  const level2Amt = wazaDetails.filter(
    (wazaDetail) => wazaDetail["level"] === 2
  ).length;
  const level3Amt = wazaDetails.filter(
    (wazaDetail) => wazaDetail["level"] === 3
  ).length;
  const level4Amt = wazaDetails.filter(
    (wazaDetail) => wazaDetail["level"] === 4
  ).length;
  const level5Amt = wazaDetails.filter(
    (wazaDetail) => wazaDetail["level"] === 5
  ).length;

  //各レベルの成功した技の数
  const level1Success = wazaDetails
    .filter((wazaDetail) => wazaDetail["level"] === 1)
    .filter((wazaDetail) => wazaDetail["achieve"] >= 2).length;
  const level2Success = wazaDetails
    .filter((wazaDetail) => wazaDetail["level"] === 2)
    .filter((wazaDetail) => wazaDetail["achieve"] >= 2).length;
  const level3Success = wazaDetails
    .filter((wazaDetail) => wazaDetail["level"] === 3)
    .filter((wazaDetail) => wazaDetail["achieve"] >= 2).length;
  const level4Success = wazaDetails
    .filter((wazaDetail) => wazaDetail["level"] === 4)
    .filter((wazaDetail) => wazaDetail["achieve"] >= 2).length;
  const level5Success = wazaDetails
    .filter((wazaDetail) => wazaDetail["level"] === 5)
    .filter((wazaDetail) => wazaDetail["achieve"] >= 2).length;
  const level1Record = Math.ceil((level1Success / level1Amt) * 100);
  const level2Record = Math.ceil((level2Success / level2Amt) * 100);
  const level3Record = Math.ceil((level3Success / level3Amt) * 100);
  const level4Record = Math.ceil((level4Success / level4Amt) * 100);
  const level5Record = Math.ceil((level5Success / level5Amt) * 100);
  /** グラフデータ */
  const graphData = {
    labels: [
      // 軸ラベル
      // 各ラベルを配列にすることで軸ラベルが改行されて表示される
      ["難易度１"],
      ["難易度２"],
      ["難易度３"],
      ["難易度４"],
      ["難易度５"],
    ],
    datasets: [
      // 表示するデータセット
      {
        data: [
          level1Record,
          level2Record,
          level3Record,
          level4Record,
          level5Record,
        ],
        backgroundColor: "rgba(30, 144, 255, 1)",
        label: "技達成率（各難易度）",
      },
    ],
  };

  /** グラフオプション */
  const graphOption = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            // y軸ラベルオプション
            display: true,
            labelString: "達成率(%)",
          },
          ticks: {
            beginAtZero: true,
            max: 100,
            stepSize: 10,
          },
        },
      ],
    },
  };

  const backToRecord = useCallback(() => {
    dispatch(push("/record"));
    //eslint-disable-next-line
  }, []);

  if (!isSignedIn) {
    return (
      <div className={classes.loader}>
        <Link component={RouterLink} to="/">
          ログインしてね
        </Link>
      </div>
    );
  }
  return (
    <div className="App">
      {/* グラフコンポーネントの呼び出し */}
      <Bar data={graphData} options={graphOption} />
      <BackButton onClick={backToRecord} label="レコードへ戻る" />
    </div>
  );
};
