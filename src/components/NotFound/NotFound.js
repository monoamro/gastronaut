import React, { useEffect, useState } from 'react';
import LanguageToggle from '../LanguageToggle';
import axios from 'axios';
import {Grid} from '@material-ui/core';
import moment from 'moment';
import { Alert } from '@material-ui/lab';
import "./index.css"



const NotFound = () => {

    const [labels, setLabels] = useState(null)
    const [language, setLanguage] = useState('de')

    useEffect(() => {
        axios.get(`https://api.gastronaut.ai/v02/language/codeTest/${language}`)
            .then((response) => {
            const { data } = response;
            setLabels(data);
            })
            .catch((e) => console.log(e))
            moment.locale(language)
        }, [language]);
        
    const renderElements = () => {
        return (
            <Grid container >
                <Grid item xs={11}>
                    <Alert severity="error">{labels.restaurantNotFound}</Alert> 
                </Grid>
                <Grid item xs={1} className="language-toggle">
                    <LanguageToggle language={language} setlanguage={(language) => setLanguage(language)} />
                </Grid>
            </Grid>
        )
    }
    return (
        labels && renderElements(labels, language)
    )
}

export default NotFound;