const Router = require('router');
const PostsCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', PostsCtrl.list);
posts.post('/', PostsCtrl.write);
posts.get('/:id', PostsCtrl.read);
posts.delete('/:id', PostsCtrl.remove);
posts.put('/:id', PostsCtrl.replace);
posts.patch('/:id', PostsCtrl.update);

module.exports = posts;
