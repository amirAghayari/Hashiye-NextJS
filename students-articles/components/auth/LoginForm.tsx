'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { login } from '@/actions/auth';

interface LoginActionProps {
  loginAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}


// TODO : submit btn
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full"
      disabled={pending} 
    >
      {pending ? 'در حال ورود...' : 'ورود'}
    </Button>
  );
}

export default function LoginForm() {
  
  const initialState = { success: false, error: '' };


  const [state, formAction] = useActionState(login, initialState);

  return (
 
    <form action={formAction} className="space-y-4"> 
      <div className="space-y-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          required
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="رمز عبور خود را وارد کنید"
          required
          className="text-right"
        />
      </div>

      {state.error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}