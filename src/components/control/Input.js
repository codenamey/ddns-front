import React from 'react';
import TextField from "@material-ui/core/TextField";

export  default function Input(props) {
    const { name, label, value, onChange } = props;

    return (
        <TextField
            id="email"
            name={name}
            label={label}
            variant="outlined"
            size="small"
            fullWidth="True"
            onChange={onChange}
            value={value}/>
    );
}

