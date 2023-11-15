import React, { useState } from "react";
import { PrimeReactContext } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'

export default function Calendary() {
    const [date, setDate] = useState(null);
    let today = new Date();
    return (
            <Calendar value={date} onChange={(e) => setDate(e.value)} showButtonBar maxDate={today}/>
    )
}