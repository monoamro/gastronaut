import React from 'react';
import Grid from '@material-ui/core/Grid';
import LanguageToggle from "../LanguageToggle";
import './index.css';

const Header = ({name, logo, link, language, setSelectedLang}) => {
    return (
        <Grid container item xs={12} justify={"space-between"} alignItems={"center"} className="header">
            <Grid item >
                <a href={link} target="blank">
                    <img src={logo} alt={name} className="restaurant-logo"/>
                </a>
            </Grid>
            <Grid item >
                <LanguageToggle language={language} setlanguage={setSelectedLang} />
            </Grid>
        </Grid>
    )
}

export default Header;