"use client";

import Container from '@/components/common/Container'
import { Separator } from '@/components/ui/separator'
import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, LoginSchema } from '@/validation/LoginFormValidation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { useLoginMutation } from '@/integration/api/authApi';
import { toast } from 'sonner';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/integration/slices/authSlice';
import { useRouter } from 'next/navigation';

interface pageProps {

}

const Page: FC<pageProps> = ({ }) => {
    const [loginFunc, { isLoading }] = useLoginMutation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { register, formState, handleSubmit } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema)
    });

    const { errors } = formState;

    const handleFormSubmit: SubmitHandler<LoginInput> = async (formData) => {
        const creadentialsObj = {
            email: formData.email,
            password: formData.password
        }
        try {
            const response = await loginFunc(creadentialsObj).unwrap()
            if (response) {
                const { accessToken } = response
                dispatch(setCredentials(accessToken))
                toast.success("Login Successfull")
                router.push("/")
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <section className='section-gap'>
            <Container>
                <div className="form-wrapper max-w-[480px] w-full border border-border mx-auto">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="p-6">
                            <div className="form-header text-center">
                                <h3 className='text-xl font-medium mb-2'>Login</h3>
                                <p className='text-xs'>Once you login you will be able to log your transfer</p>
                            </div>
                            <Separator className='my-6' />
                            <div className="form-body">
                                <div className="form-group mb-6">
                                    <Label className='mb-3'>Email</Label>
                                    <Input autoComplete='' error={errors.email?.message} type='email' placeholder='email' {...register("email")} />
                                </div>
                                <div className="form-group mb-6">
                                    <Label className='mb-3'>Password</Label>
                                    <InputPassword error={errors.password?.message} autoComplete='new-password' type='password' placeholder='password' {...register("password")} />
                                </div>
                            </div>
                            <Separator className='my-6' />
                            <div className="form-footer">
                                <Button type='submit' className='w-full' disabled={isLoading}>
                                    Login
                                </Button>
                                <h6 className='mt-2 text-xs text-center'>Dont Have Account ? <Link href={"/auth/register"} className='text-primary'>Register Here</Link></h6>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default Page