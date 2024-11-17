import {FieldValues} from "react-hook-form";
import {Box} from "@mui/material";
import {FormPropsType} from "../types/ComponentProps.ts";

export default function FormComponent<T extends FieldValues>(
    props: FormPropsType<T>,
) {
    const { handleSubmit, onSubmit, onError, children, align } = props;
    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit, onError)}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: align ? align : "center",
                marginY: 4,
                marginX: 8,
            }}
        >
            {children}
        </Box>
    );
}