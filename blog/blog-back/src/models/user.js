import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
	username: String,
	hashedPassword: String,
});

/* 인스턴스 메서드 만들기 = 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수 */
UserSchema.methods.setPassword = async function (password) {
	const hash = await bcrypt.hash(password, 10);
	this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
	const result = await bcrypt.compare(password, this.hashedPassword);
	return result; // true/false
};

// hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환 후 delete 하는 serialize 인스턴스 메서드
UserSchema.methods.serialize = function () {
	const data = this.toJSON();
	delete data.hashedPassword;
	return data;
};

// 토큰을 발급하는 generateToken 인스턴스 메서드
UserSchema.methods.generateToken = function () {
	const token = jwt.sign(
		//첫번째 파라미터에는 토큰 안에 넣고 싶은 데이터를 넣음
		{
			_id: this.id,
			username: this.username,
		},
		//두번째 파라미터에는 JWT 암호를 넣음
		process.env.JWT_SECRET,
		{
			expiresIn: '7d', //7일동안 유효
		}
	);
	return token;
};

/* 스테틱 메서드 만들기 = 모델에서 바로 사용하는 함수  */
UserSchema.statics.findByUsername = function (username) {
	return this.findOne({ username }); // 스테틱 메서드에서 this는 모델을 가리킴 = User
};

const User = mongoose.model('User', UserSchema);
export default User;
