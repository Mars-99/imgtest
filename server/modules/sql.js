var pictest = {
    insert: 'INSERT INTO pic_test(id, title, imgurl) VALUES(?,?,?)',
    update: 'UPDATE pic_test SET title=?, imgurl=? WHERE id=?',
    delete: 'DELETE FROM pic_test WHERE id=?',
    queryById: 'SELECT * FROM pic_test WHERE id=?',
    queryAll: 'SELECT * FROM pic_test'
};
module.exports = pictest;