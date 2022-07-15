import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import { BottomNavigationAction, Paper } from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';
export const FooterNavigation = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          navigate(newValue);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="一覧"
          value="/"
          icon={<FormatListBulletedIcon />} />
        <BottomNavigationAction
          label="新規作成"
          value={`/thread/new`}
          icon={<PlaylistAddIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default FooterNavigation;