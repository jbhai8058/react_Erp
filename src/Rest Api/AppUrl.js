class AppUrl {

    static BaseURL = 'http://127.0.0.1:8000/api';

    static data      = this.BaseURL + '/data';
    static item      = this.BaseURL + '/itemsave';
    static getmaxid  = this.BaseURL + '/getmaxid';
    static fetchitem = this.BaseURL + '/fetchitem';

}

export default AppUrl