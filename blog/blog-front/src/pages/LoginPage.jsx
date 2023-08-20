import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';

export default function LoginPage() {
	return (
		<AuthTemplate>
			<AuthForm type="login" />
		</AuthTemplate>
	);
}
