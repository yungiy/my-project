import Joi from 'joi';
import User from '../../models/user';

/*
    POST /api/auth/register
    {
        username: '이름'
        password: '1234ab'
    }
*/
export const register = async (ctx) => {
	const schema = Joi.object().keys({
		username: Joi.string().alphanum().min(3).max(20).required(),
		password: Joi.string().required(),
	});

	const result = schema.validate(ctx.request.body);

	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { username, password } = ctx.request.body;
	try {
		// username이 이미 존재 하는가?
		const exists = await User.findByUsername(username);
		if (exists) {
			ctx.status = 409; // Conflict
			return;
		}
		const user = new User({ username });
		await user.setPassword(password); // 비밀번호 설정
		await user.save(); // DB 저장

		// 응답할 데이터에서 hashedPassword 필드 제거
		ctx.body = user.serialize();

		const token = user.generateToken();
		ctx.cookies.set('access_token', token, {
			maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
			httpOnly: true,
		});
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*
    POST /api/auth/login
    {
        username: '이름'
        password: '1234ab' 
    }
*/
export const login = async (ctx) => {
	const { username, password } = ctx.request.body;
	// username, password가 없으면 에러 처리
	if (!username || !password) {
		ctx.status = 401;
		return;
	}
	try {
		const user = await User.findByUsername(username);
		// 계정이 존재 안하면 에러 처리
		if (!user) {
			ctx.status = 401;
			return;
		}
		const valid = await user.checkPassword(password);
		if (!valid) {
			ctx.status = 401;
			return;
		}
		ctx.body = user.serialize();
		const token = user.generateToken();
		ctx.cookies.set('access_token', token, {
			maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
			httpOnly: true,
		});
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*
	GET /api/auth/check
*/
export const check = async (ctx) => {
	const { user } = ctx.state;
	if (!user) {
		//로그인 중이 아님
		ctx.status = 401; //Unauthorized
		return;
	}
	ctx.body = user;
};

/*
	POST /api/auth/logout
*/
export const logout = async (ctx) => {
	ctx.cookies.set('access_token');
	ctx.status = 204; // No content
};
