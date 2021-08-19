import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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
  const targetWaza = wazaList[id - 1];
  console.log(targetWaza);

  const [achieve, setAchieve] = useState(""),
    [memo, setMemo] = useState("");
  [favorite, setFavorite] = useState("");

  //関数のメモ化
  const achieveChange = useCallback(
    (event) => {
      setAchieve(event.target.value);
    },
    [setAchieve]
  );
  const memoChange = useCallback(
    (event) => {
      setMemo(event.target.value);
    },
    [setMemo]
  );
  const favoriteChange = useCallback(
    (event) => {
      setFavorite(event.target.value);
    },
    [setFavorite]
  );

  const backToRecord = useCallback(() => {
    history.push("/record");
    //eslint-disable-next-line
  }, []);

  const register = useCallback(() => {
    dispatch(updateDetail(achieve, memo, favorite));
    history.push("/record");
    //eslint-disable-next-line
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
              value={achieve}
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
              value={memo}
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
                    value="yes"
                    onChange={favoriteChange}
                  />
                }
                label="お気に入りチェック"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <div>参照動画</div>
              <Iframe src={targetWaza.url} width="60%" height="70%"></Iframe>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={backToRecord}>
              戻る
            </Button>
            <Button variant="contained" color="primary" onClick={register}>
              登録
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
