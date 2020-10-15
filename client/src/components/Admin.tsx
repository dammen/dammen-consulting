import React, {FunctionComponent, FormEvent, useRef, useContext} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {ConfigContext} from '../contexts/config'

interface Props {

}

export const Admin: FunctionComponent = (props: Props) => {

    const email = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)

    const config = useContext(ConfigContext);
    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const signIn = async (): Promise<void> => {

            try {
                if (email.current && password.current) {
                    const body = JSON.stringify({Email: email.current.value, Password: password.current.value, RememberMe: false});
                    console.log(body);
                    fetch("/account/signin", {
                        method: "POST", body: body, headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                }

            } catch (err) {console.log(err)}
        }
        signIn();
    }
    return (
        <div>
            <Form onSubmit={onFormSubmit} >
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input innerRef={email} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input innerRef={password} type="password" suggested="current-password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>

        </div>
    )
}

