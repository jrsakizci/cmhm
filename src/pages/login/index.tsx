import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient, useMutation } from "react-query";
import { login, isAuthenticated } from "../../utils/auth";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
    username: yup.string().required("Username can't be empty."),
    password: yup.string().required("Password can't be empty."),
});

export interface LoginFormData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
     const { handleSubmit, setValue, formState: { errors }, setError } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });
    const history = useHistory();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(login, {
        onSuccess: () => {
            history.push("/");
        },
        onError: error => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.log(error);
            setError("username", {
                message: "Wrong Username"
            });
            setError("password", {
                message: "Maybe password is wrong?"
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });
    const onSubmitClick = (formData: LoginFormData) => {
        mutate(formData);
    }
    useEffect(() => {
        const authenticated = isAuthenticated();
        if (authenticated) {
            history.push("/");
        }
    }, []);
    return (
    <div className="login">
        <div className="ui grid centered">
            <form onSubmit={handleSubmit(onSubmitClick)}>
                <div className="fields">
                    <div className="required field">
                        <div className={`ui icon input ${errors?.username?.message && "error"}`}>
                            <input type="text" name="username" placeholder="Username"  onChange={(e) => setValue("username", e.target.value)}/>
                            <i className="user icon"></i>
                        </div>
                        {errors?.username ?
                            <span className="text">{errors.username.message} </span>
                        : ""}
                    </div>
                    <div className="required field">
                        <div className={`ui icon input ${errors?.password?.message && "error"}`}>
                            <input type="password" name="password" placeholder="Password" onChange={(e) => setValue("password", e.target.value)} />
                            <i className="lock icon"></i>
                        </div>
                        {errors?.password ?
                            <span className="text">{errors.password.message} </span>
                        : ""}
                    </div>
                    <div className="field">
                        <div className="ui icon input">
                            <input type="submit" value="Login" />
                            <i className="right chevron icon"></i>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
};

export default Login;