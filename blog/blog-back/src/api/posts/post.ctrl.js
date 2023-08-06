import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

// objectId 검증 함수
export const checkObjectId = (ctx, next) => {
	const { id } = ctx.params;
	if (!ObjectId.isValid(id)) {
		ctx.status = 400; // Bad Request
		return;
	}
	return next();
};

/*
    블로그 포스트 작성(쓰기)
    POST /api/posts
    {
        title: '제목',
        body: '내용', 
        tags: '[태그1, 태그2]'
    }
    new 키워드로 포스트의 인스턴스 만듦 -> 생성자의 함수의 파라미터에 정보를 지닌 객체 넣음
 */

export const write = async (ctx) => {
	/* Joi를 사용해 요청 내용 검증 */
	const schema = Joi.object().keys({
		// 객체가 다음 필드를 가지고 있음을 검증
		title: Joi.string().required(), //required가 있으면 필수 항목
		body: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).required(), //문자열로 이루어진 배열
	});

	//검증하고 나서 검증 실패인 경우 에러처리
	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 404; //Bad request
		ctx.body = result.error;
		return;
	}

	const { title, body, tags } = ctx.request.body;
	const post = new Post({
		title,
		body,
		tags,
		user: ctx.state.user,
	});
	try {
		await post.save();
		ctx.body = post;
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*
    데이터 조회
    GET /api/posts
    find()로 데이터를 조회
*/
export const list = async (ctx) => {
	const page = parseInt(ctx.query.page || '1', 10);
	if (page < 1) {
		ctx.status = 400;
		return;
	}

	try {
		const posts = await Post.find()
			.sort({ _id: -1 }) // 포스트 역순으로 보여줌
			.limit(10) // page 보이는 개수 제한
			.skip((page - 1) * 10) // 페이지 기능 구현
			.exec();
		const postCount = await Post.countDocuments().exec(); // 마지막 페이지 번호
		ctx.set('Last-page'), Math.ceil(postCount / 10);
		ctx.body = posts
			.map((post) => post.toJSON) //toJSON으로 JSON 형태로 변환 후 변형함
			.map((post) => ({
				...post,
				body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
			}));
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*
    특정포스트  조회
    GET /api/posts/:id
    findById()함수를 사용해서 특정 id를 가진 데이터 조회
*/
export const read = async (ctx) => {
	const { id } = ctx.params;
	try {
		const post = await Post.findById(id).exec();
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.body = post;
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*
    데이터 삭제
    DELETE /api/posts/:id
    findByIdAndRemove(): id를 찾아 지움
    */
export const remove = async (ctx) => {
	const { id } = ctx.params;
	try {
		await Post.findByIdAndRemove(id).exec();
		ctx.status = 204; // no content (성공했지만 응답 데이터가 없음)
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*
    데이터 수정
    PATCH /api/posts/:id
    {
        title: "수정",
        body: '수정 내용',
        tags: ['수정', '태그']
    }
*/
export const update = async (ctx) => {
	const { id } = ctx.params;
	// required()가 없음
	const schema = Joi.object().keys({
		title: Joi.string(),
		body: Joi.string(),
		tags: Joi.array().items(Joi.string()),
	});

	//검증하고 나서 검증 실패인 경우 에러처리
	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 404; //Bad request
		ctx.body = result.error;
		return;
	}
	try {
		const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
			new: true, // 이값을 설정하면 업데이트 되기전의 데이터를 반환
			//false면 업데이트 되기 전의 데이터를 반환
		}).exec();
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.body = post;
	} catch (e) {
		ctx.throw(500, e);
	}
};
