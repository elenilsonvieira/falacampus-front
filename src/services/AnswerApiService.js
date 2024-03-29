import ApiService from './ApiService';

export default class AnsweApiService extends ApiService{
    constructor(){
        super('/answer');
    }
    create(object){
        return this.post('',object);
    }
    returned(id, object){
        return this.put(`/${id}`, object);
    }
   
    find(params){
        return this.get(`/${params}`);
    }
    findAll(){
        return this.get('/all');
    }
}