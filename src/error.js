function RouterError(message) {
    this.name = 'RouterError';
    this.message = (message || '');
}
RouterError.prototype = Error.prototype;

export default RouterError;