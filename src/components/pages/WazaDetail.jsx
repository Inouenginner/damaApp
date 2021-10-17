import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { updateDetail } from "../../reducks/wazas/operations";
import { AchieveSelectBox } from "../atoms/box/AchieveSelectBox";
import { MemoInput } from "../atoms/input/MemoInput";
import { FavoriteCheckBox } from "../atoms/box/FavoriteCheckBox";
import { UpdateButton } from "../atoms/button/UpdateButton";
import { TransitionButton } from "../atoms/button/TransitionButton";
import ReactPlayer from "react-player";
import { getSignedIn } from "../../reducks/users/selectors";
//import NavigateNextIcon from "@material-ui/icons/NavigateNext";
//import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

export const WazaDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const wazaId = location.pathname.split("/detail/")[1];
  const selector = useSelector((state) => state);
  const userId = getUserId(selector);
  const isSignedIn = getSignedIn(selector);
  const wazaList = getWazas(selector);
  let targetWaza = wazaList[wazaId - 1];

  const [achieve, setAchieve] = useState(0),
    [memo, setMemo] = useState(""),
    [favorite, setFavorite] = useState(false);

  const memoChange = useCallback(
    (event) => {
      setMemo(event.target.value);
    },
    [setMemo]
  );
  const handleCheckboxClick = useCallback(
    (event) => {
      setFavorite(event.target.checked);
    },
    [setFavorite]
  );

  useEffect(() => {
    const newWazaList = getWazas(selector);
    const newTargetWaza = newWazaList[wazaId - 1];
    setAchieve(newTargetWaza.achieve);
    setMemo(newTargetWaza.memo);
    setFavorite(newTargetWaza.favorite);
    console.log("render!");
    //eslint-disable-next-line
  }, [wazaId]);

  const goNextPage = useCallback(
    (achieve, memo, favorite, wazaId, userId, nextPath) => {
      dispatch(updateDetail(achieve, memo, favorite, wazaId, userId, nextPath));
    },
    // eslint-disable-next-line
    [wazaId]
  );

  if (!isSignedIn) {
    return (
      <div className="center">
        <Link component={RouterLink} to="/">
          ログインしてね
        </Link>
      </div>
    );
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        {/* <Button
          onClick={() =>
            goNextPage(
              achieve,
              memo,
              favorite,
              wazaId,
              userId,
              "/detail/" + (Number(wazaId) - 1)
            )
          }
        >
          <NavigateBeforeIcon />
        </Button>
        <Button
          onClick={() =>
            goNextPage(
              achieve,
              memo,
              favorite,
              wazaId,
              userId,
              "/detail/" + (Number(wazaId) + 1)
            )
          }
        >
          <NavigateNextIcon />
        </Button> */}
        <Typography variant="h4" gutterBottom>
          {targetWaza.waza}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          難易度：{targetWaza.level}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <AchieveSelectBox defaultValue={targetWaza.achieve} select={setAchieve} />
          </Grid>
          <Grid item xs={12}>
            <MemoInput defaultValue={targetWaza.memo} onChange={memoChange} />
          </Grid>
          <Grid item xs={12}>
            <FavoriteCheckBox defaultChecked={targetWaza.favorite} onChange={handleCheckboxClick} />
          </Grid>
          <Grid item>
            <div>
              <div>挑戦状動画</div>
              <ReactPlayer url={targetWaza.url} id="MainPlay" loop controls={true} width="100%" height="100%" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <TransitionButton onClick={() => dispatch(push("/record"))} label="戻る" />
            <UpdateButton onClick={() => goNextPage(achieve, memo, favorite, wazaId, userId, "/record")} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
