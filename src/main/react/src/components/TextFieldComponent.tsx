import {IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Controller, FieldValues, Path} from "react-hook-form";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ComponentProps} from "../types/ComponentProps.ts";

export default function TextFieldComponent<T extends FieldValues>(
    props: ComponentProps<T>,
) {
    const {
        control,
        name,
        trigger,
        errors,
        label,
        type,
        disabled,
        focused,
        multiline,
        rows,
    } = props;
    const [textVisible, setTextVisible] = useState(false);

    if (type === "password")
        return (
            <>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextField
                                sx={{
                                    marginTop: "1rem",
                                }}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    setTimeout(() => trigger(e.target.name as Path<T>), 500);
                                    setTextVisible(false);
                                }}
                                id={field.name}
                                label={label}
                                name={field.name}
                                autoComplete=""
                                fullWidth
                                type={textVisible ? "text" : "password"}
                                error={errors[name] ? true : false}
                                disabled={disabled}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setTextVisible(!textVisible)}
                                            >
                                                {textVisible ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        );
                    }}
                ></Controller>
                <Typography
                    color={"red"}
                    fontSize={14}
                    width={"inherit"}
                    margin={"none"}
                >
                    {errors[name]?.message as string}
                </Typography>
            </>
        );

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <TextField
                            sx={{
                                marginTop: "1rem",
                            }}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e);
                                setTimeout(() => trigger(e.target.name as Path<T>), 500);
                            }}
                            id={field.name}
                            label={label}
                            name={field.name}
                            autoComplete=""
                            fullWidth
                            multiline={multiline}
                            rows={rows}
                            focused={focused}
                            type={type}
                            error={errors[name] ? true : false}
                            disabled={disabled}
                        ></TextField>
                    );
                }}
            ></Controller>
            <Typography color={"red"} fontSize={14} width={"inherit"} margin={"none"}>
                {errors[name]?.message as string}
            </Typography>
        </>
    );
}