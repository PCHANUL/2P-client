import React from 'react';
import RoomList from '../../containers/RoomList'
import { useHistory } from 'react-router-dom'
import cookie from 'react-cookies'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RefreshIcon from '@material-ui/icons/Refresh';
import { Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';



let rows = []; 

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  refresh: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(11),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  emptyAlert: {
    width: '700px',
    height: '700px',
  },
  alertText: {
    margin: theme.spacing(30, 0, 10, 0)
  }
}));

function SelectRoom({ roomList, getRooms, makeRooms, isMaking, changeCurrentGame, isLogin }) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [rows, getRows] = React.useState([{}]);

  React.useEffect(() => {
    if(!cookie.load('username')){
      history.push('/')
    }

    // 대기방이 없는 경우 계속 요청을 보낸다.
    if(roomList.length === 0) {
      getRooms()
    }
    getRows(roomList)
  })

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
    changeCurrentGame(newValue);
  };
  
  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Game one" />
          <Tab label="Game Two" />
          <Tab label="Game Three" />
        </Tabs>
      </Paper>
      
      
      {
        rows.length === 0
        ? <Grid container container direction="column" justify="space-evenly" alignItems="center" className={classes.section1}>
          <Paper className={classes.emptyAlert}>
              <Grid item>
                <Typography variant="h4" className={classes.alertText}>
                  대기중인 방이 없습니다.<br />
                  방을 생성해보세요
                </Typography>
              </Grid>
              <Grid container direction="row" justify="space-evenly" alignItems="center">
                <Tooltip title="방만들기" aria-label="add" onClick={() => { makeRooms() }}>
                  <Fab color="secondary">
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="새로고침" aria-label="add" onClick={() => { getRooms() }}>
                  <Fab color="primary">
                    <RefreshIcon />
                  </Fab>
                </Tooltip>
              </Grid>
          </Paper>
        </Grid>
        : <div>
            <div className={classes.section1}>
              {
                rows.map((row) => (
                  <RoomList 
                    roomName={row.roomName} 
                    isWait={row.isWait}
                    isLocked={row.isLocked}
                    isFull={row.isFull}
                  />
                ))
              }
              </div>
              <Tooltip title="방만들기" aria-label="add" onClick={() => {
                makeRooms()
              }}>
                <Fab color="secondary" className={classes.absolute}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="새로고침" aria-label="add" onClick={() => {
                getRooms()
              }}>
                <Fab color="primary" className={classes.refresh}>
                  <RefreshIcon />
                </Fab>
              </Tooltip>
          </div>
      }
    </div>
  );
};

export default SelectRoom

