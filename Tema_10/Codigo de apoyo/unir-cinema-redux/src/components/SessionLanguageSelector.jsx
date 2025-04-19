import React, {useContext} from 'react';
import './SessionLanguageSelector.css';
import {useDispatch, useSelector} from "react-redux";
import {setSessionLanguage} from "../features/sessions/sessionLanguageSlice.js";

const SessionLanguageSelector = () => {

    const dispatch = useDispatch();
    const sessionLanguage = useSelector(s => s.sessionLanguage)

    const handleChange = (e) => {
        dispatch(setSessionLanguage(e.target.value));
    };

    return (
        <div className="session-language-selector">
            <label htmlFor="sessionLanguage" className="session-language-selector__label">
                Filtrar sesiones por idioma:
            </label>
            <select
                id="sessionLanguage"
                className="session-language-selector__select"
                value={sessionLanguage}
                onChange={handleChange}
            >
                <option value="todos">Todos</option>
                <option value="castellano">Castellano</option>
                <option value="vose">VOSE</option>
            </select>
        </div>
    );
};

export default SessionLanguageSelector;
