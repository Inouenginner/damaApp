import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { UpdateDetail } from "../../reducks/wazas/operations";
import { AchieveSelectBox } from "../atoms/AchieveSelectBox";
import { MemoInput } from "../atoms/MemoInput";

export const WazaDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/detail/")[1];
  const selector = useSelector((state) => state);
  let wazaList = getWazas(selector);
  let userId = getUserId(selector);
  const targetWaza = wazaList[id - 1];
  const isFavorite = targetWaza.favorite === true;

  const [achieve, setAchieve] = useState(targetWaza.achieve),
    [memo, setMemo] = useState(targetWaza.memo),
    [favorite, setFavorite] = useState(targetWaza.favorite);

  //関数のメモ化
  const achieveChange = useCallback(
    (event) => {
      console.log("select:" + event.target.value);
      let newAchieve = event.target.value;
      setAchieve(newAchieve);
    },
    [setAchieve]
  );
  const memoChange = useCallback(
    (event) => {
      console.log("memo:" + event.target.value);
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
      console.log("check" + e.target.checked);
      setFavorite(e.target.checked);
    };
  }, []);

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name="favorite"
            value="true"
            defaultChecked={isFavorite}
            onChange={handleCheckboxClick}
          />
        }
        label="お気に入りチェック"
      />
    </div>
  );
};
