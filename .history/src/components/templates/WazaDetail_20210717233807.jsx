import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { UpdateDetail } from "../../reducks/wazas/operations";

const levels = [
  {
    value: "0",
    label: "できない",
  },
  {
    value: "1",
    label: "一回できた",
  },
  {
    value: "2",
    label: "5回くらいできた",
  },
  {
    value: "3",
    label: "半分の確率でできる",
  },
  {
    value: "4",
    label: "ほぼできる",
  },
  {
    value: "5",
    label: "完璧",
  },
];

export const WazaDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split("/detail/")[1];
  const selector = useSelector((state) => state);
  let wazaList = getWazas(selector);
  let userId = getUserId(selector);
  const targetWaza = wazaList[id - 1];

  const [achieve, setAchieve] = useState("0"),
    [memo, setMemo] = useState(""),
    [checked, setChecked] = useState(false);

  //関数のメモ化
  const achieveChange = (event) => {
    console.log("select:" + event.target.value);
    let newAchieve = event.target.value;
    setAchieve(newAchieve);
  };
  const memoChange = (event) => {
    console.log("memo:" + event.target.value);
    let newMemo = event.target.value;
    setMemo(newMemo);
  };

  const backToRecord = useCallback(() => {
    history.push("/record");
    //eslint-disable-next-line
  }, []);

  const handleCheckboxClick = useMemo(() => {
    console.log("function generated in MyCheckbox");
    return (e) => {
      setChecked(e.target.checked);
    };
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          {targetWaza.waza}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          難易度：１
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              id="standard-select-currency"
              required
              fullWidth
              select
              label="達成度"
              defaultValue={targetWaza.achieve}
              onChange={achieveChange}
              helperText="達成度を入力してください"
            >
              {levels.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="memo"
              name="memo"
              label="メモ"
              fullWidth
              autoComplete="shipping address-line1"
              defaultValue={targetWaza.memo}
              onChange={memoChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="favorite"
                    value="true"
                    onChange={handleCheckboxClick}
                  />
                }
                label="お気に入りチェック"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <div>参照動画</div>
              {/* <Iframe src={targetWaza.url} width="60%" height="70%"></Iframe> */}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={backToRecord}>
              戻る
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                dispatch(UpdateDetail(achieve, memo, checked, id, userId))
              }
            >
              登録
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
