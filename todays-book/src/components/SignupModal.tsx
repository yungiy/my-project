// components/SignupModal.tsx
import { useState } from 'react';
import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().nonempty('이름을 입력해주세요'),
  id: z.string().nonempty('아이디를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다'),
  confirmPassword: z
    .string()
    .min(6, '비밀번호 확인란도 최소 6자리 이상이어야 합니다'),
});

type SignupSchemaType = z.infer<typeof SignupSchema>;

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState<SignupSchemaType>({
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<SignupSchemaType>>({});

  const isPasswordMatch = formData.password === formData.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = SignupSchema.safeParse(formData);
    if (result.success) {
      // 유효성 검사가 성공하면 폼 데이터를 처리
      console.log('성공적으로 처리했습니다.', formData);
    } else {
      // 유효성 검사가 실패하면 오류 메시지를 설정
      const fieldErrors = result.error.format();
      setErrors({
        name: fieldErrors.name?._errors[0],
        id: fieldErrors.id?._errors[0],
        password: fieldErrors.password?._errors[0],
        confirmPassword: fieldErrors.confirmPassword?._errors[0],
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <h2 className='text-2xl mb-4 flex items-center justify-center'>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>이름</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md outline-none'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-2'>{errors.name}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>아이디</label>
            <input
              type='text'
              name='id'
              value={formData.id}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md outline-none'
            />
            {errors.id && (
              <p className='text-red-500 text-sm mt-2'>{errors.id}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>비밀번호</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md outline-none'
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-2'>{errors.password}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>비밀번호 확인</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md outline-none'
            />
            {!isPasswordMatch && formData.confirmPassword && (
              <p className='text-red-500 text-sm mt-2'>
                비밀번호가 일치하지 않습니다.
              </p>
            )}
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={!isPasswordMatch}
            className={`w-full px-3 py-2 text-white rounded-lg ${
              isPasswordMatch
                ? 'bg-yellow-500 text-yellow-800'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            회원가입
          </button>
        </form>
        <button
          onClick={onClose}
          className='mt-4 w-full px-3 py-2 bg-gray-900 text-white rounded-lg'
        >
          닫기
        </button>
      </div>
    </div>
  );
}
