import {Button, Grid2, Typography} from "@mui/material";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import TextFieldComponent from "../../components/TextFieldComponent.tsx";
import FormComponent from "../../components/FormComponent.tsx";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "../../hooks/useAuth.ts";

// const breakpoints: GridBaseProps["columns"] = {
//     xs: 6,
//     sm: 6,
//     md: 6,
//     lg: 6,
//     xl: 6,
// }

const getLoginSchema = () => {
    return z.object({
        username: z.string().min(1, "This field is required"),
        password: z.string().min(1, "This field is required"),
    })
}

export type LoginSchema = z.infer<ReturnType<typeof getLoginSchema>>;

const LoginPage = () => {

    const navigate = useNavigate();

    const {login} = useAuth();

    const {
        handleSubmit,
        control,
        formState: { errors },
        trigger,
    } = useForm<LoginSchema>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(getLoginSchema()),
    });

    const onSubmit: SubmitHandler<LoginSchema> = (data) => {
        login(data);
    };

    const onError: SubmitErrorHandler<LoginSchema> = (errors) => {
        console.error(errors);
    };


    return (
        <Grid2 container component="main" sx={{ minHeight: "85vh" }}>
            {/*<CssBaseline />*/}
            {/*<Grid2*/}
            {/*    container*/}
            {/*    width={"100%"}*/}
            {/*/>*/}
            {/*<Grid2 size={breakpoints}>*/}

            {/*</Grid2>*/}
            {/*<Grid2 size={breakpoints}>*/}
                <FormComponent
                    handleSubmit={handleSubmit}
                    onError={onError}
                    onSubmit={onSubmit}
                >
                    <Typography component="h1" variant="h3">
                        Sign in
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
                        name="password"
                        trigger={trigger}
                        type="password"
                        label={"Password*"}
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
                        Sing in
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        sx={{
                            mb: 2,
                        }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                </FormComponent>
            {/*</Grid2>*/}
        </Grid2>
    );
};

export default LoginPage;