import React, { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import { UpdateDetail } from "../../reducks/wazas/operations";
import { AchieveSelectBox } from "../atoms/AchieveSelectBox";
import { MemoInput } from "../atoms/MemoInput";
import { FavoriteCheckBox } from "../atoms/FavoriteCheckBox";
import { UpdateButton } from "../atoms/UpdateButton";
import { BackButton } from "../atoms/BackButton";

export const WazaDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const wazaId = location.pathname.split("/detail/")[1];
  const selector = useSelector((state) => state);
  let wazaList = getWazas(selector);
  let userId = getUserId(selector);
  const targetWaza = wazaList[wazaId - 1];
  console.log(targetWaza);

  const isFavorite = targetWaza.favorite === true;

  const [achieve, setAchieve] = useState(targetWaza.achieve),
    [memo, setMemo] = useState(targetWaza.memo),
    [favorite, setFavorite] = useState(targetWaza.favorite);

  //関数のメモ化
  const achieveChange = useCallback(
    (event) => {
      let newAchieve = event.target.value;
      setAchieve(newAchieve);
    },
    [setAchieve]
  );
  const memoChange = useCallback(
    (event) => {
      let newMemo = event.target.value;
      setMemo(newMemo);
    },
    [setMemo]
  );

  const backToRecord = useCallback(() => {
    dispatch(push("/record"));
    //eslint-disable-next-line
  }, []);

  const handleCheckboxClick = useMemo(() => {
    return (e) => {
      setFavorite(e.target.checked);
    };
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          {targetWaza.waza}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          難易度：{targetWaza.level}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <AchieveSelectBox
              defaultValue={targetWaza.achieve}
              onChange={achieveChange}
            />
          </Grid>
          <Grid item xs={12}>
            <MemoInput defaultValue={targetWaza.memo} onChange={memoChange} />
          </Grid>
          <Grid item xs={12}>
            <FavoriteCheckBox
              defaultChecked={isFavorite}
              onChange={handleCheckboxClick}
            />
          </Grid>
          <Grid item xs={12}>
            <div>
              <div>参照動画</div>
              {/* <Iframe src={targetWaza.url} width="60%" height="70%"></Iframe> */}
            </div>
          </Grid>
          <Grid item xs={12}>
            <BackButton onClick={backToRecord} label="戻る" />
            <UpdateButton
              onClick={() =>
                dispatch(UpdateDetail(achieve, memo, favorite, wazaId, userId))
              }
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
