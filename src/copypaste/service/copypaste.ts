// 使用示例
import service from './service';

export async function addContent(str:any) {    
    // if(str == null || str.length === 0 || str.replaceAll("&nbsp;", "").replaceAll("<br/>", "").replaceAll(" ", '').replaceAll("<p>", "").replaceAll("</p>", "").length === 0) {
    //     return null;
    // }
    let res = await service.post('/addContent', str);
    return res;
}

export async function testPost() {
    return service.post('/api/v0/test')
        .then(response => {
            // handle response
        })
        .catch(error => {
            // handle error
        });
}

export async function getcontent() {
    return await service.get('/paste');
}

export async function getAll() {
    return await service.get('/findAll');
}