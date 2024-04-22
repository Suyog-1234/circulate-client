"use client";

import Container from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputPassword } from '@/components/ui/input-password'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useRegisterMutation } from '@/integration/api/authApi';
import { RegisterInput, RegisterSchema } from '@/validation/RegisterFormValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface pageProps {

}

const Page: FC<pageProps> = ({ }) => {
    const [registerFunc,{isLoading,isSuccess}]= useRegisterMutation();
    const router = useRouter()
    const { register, formState, handleSubmit } = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema)
    });

    const { errors } = formState;

    const handleFormSubmit: SubmitHandler<RegisterInput> = async (formData) => {
        const creadentialsObj= {
             name:formData.name,
             email:formData.email,
             password:formData.password
        }
        try {
            const responce = await registerFunc(creadentialsObj).unwrap();
            if(responce){
                toast.success("Account Registered Successfully.")
                router.push("/auth/login")
            }
        } catch (error:any) {
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
                                <h3 className='text-xl font-medium mb-2'>Register</h3>
                                <p className='text-xs'>Once you login you will be able to log your transfer</p>
                            </div>
                            <Separator className='my-6' />
                            <div className="form-body">
                                <div className="form-group mb-6">
                                    <Label className='mb-3'>Name</Label>
                                    <Input autoComplete='' error={errors.name?.message} type='text' placeholder='name' {...register("name")} />
                                </div>
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
                                <h6 className='mt-2 text-xs text-center'>Alredy Have Account ? <Link href={"/auth/login"} className='text-primary'>Login Here</Link></h6>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default Page