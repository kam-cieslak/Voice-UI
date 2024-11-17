import {z} from "zod";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Grid2, Typography} from "@mui/material";
import TextFieldComponent from "../../components/TextFieldComponent.tsx";
import FormComponent from "../../components/FormComponent.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

const getRegisterSchema = () => {
    return z.object({
        username: z.string().min(1, "This field is required"),
        email: z.string().min(1, "This field is required"),
        password: z.string().min(1, "This field is required"),
        confirmPassword: z.string().min(1, "This field is required"),
    }).superRefine( (data, ctx) => {
        if(data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    })
}

export type RegisterSchema = z.infer<ReturnType<typeof getRegisterSchema>>;

const RegisterPage = () => {

    const {register} = useAuth();

    const {
        handleSubmit,
        control,
        formState: { errors },
        trigger,
    } = useForm<RegisterSchema>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(getRegisterSchema()),
    });

    const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
        register(data);
    };

    const onError: SubmitErrorHandler<RegisterSchema> = (errors) => {
        console.error(errors);
    };

    return (
        <Grid2 container component="main" sx={{ minHeight: "85vh" }}>
            <FormComponent
                handleSubmit={handleSubmit}
                onError={onError}
                onSubmit={onSubmit}
            >
                <Typography component="h1" variant="h3">
                    Register
                </Typography>
                <TextFieldComponent
                    control={control}
                    errors={errors}
                    name="username"
                    trigger={trigger}
                    type="text"
                    label={"Username*"}
                />
                <TextFieldComponent
                    control={control}
                    errors={errors}
                    name="email"
                    trigger={trigger}
                    type="text"
                    label={"Email*"}
                />
                <TextFieldComponent
                    control={control}
                    errors={errors}
                    name="password"
                    trigger={trigger}
                    type="password"
                    label={"Password*"}
                />
                <TextFieldComponent
                    control={control}
                    errors={errors}
                    name="confirmPassword"
                    trigger={trigger}
                    type="password"
                    label={"Confirm password*"}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                    }}
                >
                    Register
                </Button>
            </FormComponent>
        </Grid2>
    );
};

export default RegisterPage;