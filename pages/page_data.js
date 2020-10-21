import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import moment from 'moment'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    height: "auto"
  },
  media: {
    height: 240,
    display: "block",
    position: "relative",
    width: "100%",
  },
  text: {
    paddingTop: 10
  },
  classRight: {
    float: "right"
  },
  readBtn: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    left:" 50%",
    top: "50%",
    textTransform: "capitalize"
  },
  hideBtn: {
    display: "none",
  }
}));

const PageData = (props) => {
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [btnKey, setBtnKey] = useState();
  const { data, loading , indexOfFirstTodo, indexOfLastTodo} = props;
  const ellipsify = (str) => {
    if (str.length > 60) {
        return (str.substring(0, 60) + "...");
    }
    else {
        return str;
    }
  }
  useEffect(() => {
    if (data !== undefined) {
      console.log("this is data", data[1])
      setResult(data);
    }
  }, [data]);
  return (
    <div className={""}>
      <Grid container spacing={3} xs={12}>
        { (loading ? Array.from(new Array(6)) : result).slice(indexOfFirstTodo, indexOfLastTodo).map((result, key) => (
          <Grid item md={4} key={key} >
            <Card className={classes.root} onMouseOver={()=> setBtnKey(key)} onMouseLeave={()=> setBtnKey(null)}>
             
              <CardActionArea>
              {result ? (
                <CardMedia
                className={classes.media}
                image={result.media[0] !== undefined ? result.media[0]['media-metadata'][1].url: ""}
                title="Contemplative Reptile"
                
              >
                <Button  variant="contained" target="_blank" color="primary" className={btnKey === key ? classes.readBtn : classes.hideBtn} href={result.url}>Read</Button>
                </CardMedia>
              ) : ( <Skeleton variant="rect" width={210} height={118} />)}
                {result ? (
                   <CardContent>
                   <Typography gutterBottom variant="h6" component="h5" className={classes.text}>
                     {ellipsify(result.title)}
                   </Typography>
                   <Typography
                     variant="body2"
                     color="textSecondary"
                     component="p"
                   >
                     {moment(result.update).format('MMMM Do YYYY | h:mm a')}
                   </Typography>
                   <Typography
                     variant="body2"
                     color="textSecondary"
                     component="p"
                     className={classes.text}
                   >
                     Read Article
                   </Typography>
                   <Grid container spacing={3} xs={12}>
                     <Grid item xs={6}>
                     <Typography
                       variant="body2"
                       color="textSecondary"
                       component="p"
                       className={classes.text}
                     >
                     Free
                    </Typography>
                     </Grid>
 
                     <Grid item xs={6} >
                   <FavoriteIcon className={classes.classRight}/>
                     </Grid>
                   </Grid>
                 </CardContent>
                ): (
              <>
              <Skeleton />
              <Skeleton width="60%" />
              </>)}
               
              </CardActionArea>
              <CardActions justify="flex-end">
                
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PageData;
