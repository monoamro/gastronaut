import React from "react";
import {Button, withStyles} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme, props) => ({
    root: {
        border: 'solid 1px',
        borderColor: props => `${props.primaryColor} !important`,
        color: props => `${props.primaryColor} !important`,
        backgroundColor: props => props.cotrastText
    },
  }));

const GastroButton = (props) => {
    const classes = useStyles(props);
    const {label} = props;
    return <Button className={classes.root} {...props}>{label}</Button>
}
  export default GastroButton;