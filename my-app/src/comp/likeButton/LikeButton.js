import React from 'react';
import { useState } from 'react';
import './LikeButton.css';
import { makeStyles } from '@material-ui/core/styles';
import {setImgUrlsTrue} from '../../index.js'
import {getImages} from '../../index.js'

import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > svg': {
        margin: theme.spacing(2),
      },
    },
  }));

export default function LikeButton({flagone,indexofbutton,myfunc}) {
    const classes = useStyles();

   // let flag=flagone;
    function onClickLikeButton() {
      //  flag=!flag;
      myfunc(indexofbutton,!flagone.selected);
    }
    if(flagone.selected==false){
    return (
        <div className={classes.root}>
            <IconButton aria-label="FavoriteIcon" onClick={onClickLikeButton}>
                 <FavoriteBorderIcon />
            </IconButton>
        </div>  
      );
    }
    else if(flagone.selected==true) {return(
        <div className={classes.root}>
            <IconButton  aria-label="FavoriteIcon" onClick={onClickLikeButton}>
                <FavoriteIcon style={{ color: red[500] }}/>
            </IconButton>
        </div>  
    );} else {return <></>}

}
