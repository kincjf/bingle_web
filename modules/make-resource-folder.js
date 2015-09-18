/**
 * Created by KIMSEONHO on 2015-09-17.
 */
var mkdirp = require('mkdirp');
var resourcePath = './resources';

/**
 * account, timestamp�� �ش��ϴ� ������ /resources�� �����
 * @param account
 * @param timestamp
 * @return Returns the first directory that had to be created(absolute path), if any.
 *          if exist, return null
 */
module.exports = function(account, timestamp) {
    return mkdirp.sync(resourcePath + '/'+ account + '/' + timestamp);
}