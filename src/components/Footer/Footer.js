import React from 'react';
import Grid from '@material-ui/core/Grid';
import './index.css';

const Footer = () => {
    return (
        <Grid container item xs={12} justify={"center"}>
            <a target="_blank" href="https://www.gastronaut.ai">
                <img src="../../images/poweredByGastronaut.png" alt="Powered by Gastronaut" className="gastro-logo"/>
            </a>
        </Grid>
    )
}

export default Footer;