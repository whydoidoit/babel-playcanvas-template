function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getFileUrl = pc.Asset.prototype.getFileUrl;
pc.Asset.prototype.getFileUrl = function () {
    var file = this.getPreferredFile();
    var local;
    if (this.type === 'script') {
        if (!!(local = getParameterByName('local'))) {
            var url = file.url.slice(file.url.lastIndexOf('/'));
            return local + url;
        }
    }
    return getFileUrl.call(this);
};
