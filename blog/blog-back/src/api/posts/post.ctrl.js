import Post from '../../models/post';
import mongoose from 'mongoose';

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
	const { title, body, tags } = ctx.request.body;
	const post = new Post({
		title,
		body,
		tags,
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
	try {
		const posts = await Post.find().exec();
		ctx.body = posts;
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
