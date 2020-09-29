import React from 'react';
import Grid from '@material-ui/core/Grid';
import LanguageToggle from "../LanguageToggle";
import './index.css';

const Header = (name, logo, link, lang, setSelectedLang) => {
    return (
        <Grid container item xs={12} justify={"space-between"} alignItems={"center"} className="header">
            <Grid item>
                <a href={link} target="_blank">
                    <img src={logo} alt={name}/>
                </a>
            </Grid>
            <Grid item>
                <LanguageToggle language={lang} setlanguage={setSelectedLang}/>
            </Grid>
        </Grid>
    )
}

export default Header;