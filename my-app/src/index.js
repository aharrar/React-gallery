import { useSwipeable, Swipeable } from 'react-swipeable'
import React, { useEffect, useState } from 'react';
import useForceUpdate from 'use-force-update';
import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';
import './index.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LikeButton from './comp/likeButton/LikeButton';
import { ContactSupportOutlined } from '@material-ui/icons';
//import ImageWithLike from './comp/ImageWithLike';
var imgUrls = [{
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/5KvPQc1Uklk/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/5KvPQc1Uklk/800x600',
        selected: false
    },
    {
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/5KvPQc1Uklk/800x600',
        selected: false
    },
    {
        src: 'https://source.unsplash.com/GtYFwFrFbMA/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/5KvPQc1Uklk/800x600',
        selected: false
    }, {
        src: 'https://source.unsplash.com/5KvPQc1Uklk/800x600',
        selected: false
    },


];

function ImgGallery() {

    const [imageS, SetimageS] = useState(imgUrls[0].src);
    const [temp, settemp] = useState(0);
    const [imgUrlsstate, SetimageUrlsstate] = useState(imgUrls);
    const [imgBottom, setImageBottom] = useState(imgUrls.slice(0, 6));
    const [calcIndex, setCalcIndex] = useState(0);
    const maxrounds = parseInt(imgUrls.length / 6);
    const onswipeleft = event => {

        console.log('swipe left');
        cliced_prev();
    }
    const onswiperight = (eventData) => {
        console.log('swipe right');
        cliced_next();
    }

    React.useEffect(() => {
        var columns = document.getElementsByClassName("column1");
        console.log("calcindex - " + calcIndex);
        if (calcIndex != 0) {
            for (let i = 0; i < calcIndex * 6; i++) {
                columns[i].style.display = "none";
            }
            for(let i=calcIndex*6;i<imgUrls.length;i++){
                columns[i].style.display = "inline-block";
            }
        } else {
            console.log("1");
            for (let i = 0; i < 6; i++) {
                columns[i].style.display = "inline-block";
            }
        }
    });
    ////////////func that we send to likebutton
    var Likeonclick = function(index, flag) {
            var help = imgUrls;
            help[index].selected = flag;
            SetimageUrlsstate([...help]);
        }
        ///////////////////////////////////////////

    function cliced(index) {
        settemp(index);
        console.log("temp - " + temp);
        console.log('index - ' + index);
        var dots = document.getElementsByClassName("demo");
        for (var i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[index].className += " active";
        SetimageS(imgUrls[index].src);
    }

    function cliced_prev() {
        if (temp == 0) {
            var help = parseInt(imgUrls.length / 6);
            console.log(help);
            setCalcIndex(help);
            cliced(imgUrls.length - 1);
        }
        else if(temp%6==0)
        {
            setCalcIndex(calcIndex-1);
            cliced(temp -1);
        }
        else {
            cliced(temp - 1);
        }
    }

    function cliced_next() {
        if (temp == imgUrls.length - 1) {
            setCalcIndex(0);
            cliced(0);
        } else if ((temp + 1) > 0 && (temp + 1) % 6 == 0) {
            console.log("temp - " + temp);
            setCalcIndex(calcIndex + 1);
            cliced(temp + 1);
        } else {
            cliced(temp + 1);
        }
    }

    return ( 
    <div class = "container" >
        <div class = "mySlides" > 
            < Swipeable onSwipedLeft = { onswipeleft } onSwipedRight = { onswiperight } >
                <img src = { imageS }/>  </Swipeable > 
            <div class = "likebut" >
                <LikeButton flagone = { imgUrlsstate[temp] } indexofbutton = { temp }
                myfunc = { Likeonclick }/>  
            </div>
        </div> 
        <button class = "prev" onClick = { cliced_prev } > <ArrowBackIosIcon/> </button> 
        <button class = "next" onClick = { cliced_next } > <ArrowForwardIosIcon/> </button>  
        <div class = "row1" > {imgUrlsstate.map((img, index) => ( 
            <div class = "column1" >
                <img id = { index } src = { img.src } class = "demo cursor"
                key = { index } onClick = {() => cliced(index)} alt = "dog"/>
                <div class = "likebut" >
                    <LikeButton flagone = { imgUrlsstate[index] } indexofbutton = { index }
                    myfunc = { Likeonclick }/>
                </div >
            </div>
            ))}
        </div>
    </div >

    );
}
ReactDOM.render(<ImgGallery/> ,
    document.getElementById('root')
);
