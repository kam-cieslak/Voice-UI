import {
    Control,
    FieldErrors,
    FieldValues,
    Path, SubmitErrorHandler,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormTrigger
} from "react-hook-form";
import {HTMLInputTypeAttribute, ReactNode} from "react";

export interface ComponentProps<T extends FieldValues> {
    control: Control<T>;
    type: HTMLInputTypeAttribute;
    disabled?: boolean;
    errors: FieldErrors<T>;
    trigger: UseFormTrigger<T>;
    name: Path<T>;
    label: string;
    focused?: boolean;
    multiline?: boolean;
    rows?: number;
}

export interface FormPropsType<T extends FieldValues> {
    handleSubmit: UseFormHandleSubmit<T, undefined>;
    onSubmit: SubmitHandler<T>;
    onError: SubmitErrorHandler<T>;
    children: ReactNode;
    align?: "center" | "start" | "end" | undefined;
}