import URL, { URLSearchParams } from 'url';

export let secretRequest = function (req, res) {
    const reqUrl = URL.parse(req.url, true);
//    let qsSearch = new URLSearchParams(reqUrl.search);
//   if((qsSearch !== 'undefined') && (qsSearch.has('label')){
//        let labelValue:string = qsSearch.get('label');
        let labelValue:string = 'label';
        let response = {};
        response[labelValue] = "YOUR SECRET IS HERE";

//    })

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

export let sampleRequest = function (req, res) {
    const reqUrl = URL.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name as string;
    }

    var response = {
        "text": "Hello " + name
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

export let errorInRequest = function (req, res, e){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(e));
}

export function unknownRequest (req, res){
    var response = {};
    response['Status'] = 'Unknown Service';
    response['Message'] = 'text';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}

export default secretRequest;