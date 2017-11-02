'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

function bookPutInputFromEventBody(body) {
    return {
        TableName: library,
        Item: {
            item   : body.item,
            bookid : body.bookid,
            author : body.author,
            genre  : body.genre,
            title  : body.title
        }  
    }
}

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    dynamo.putItem(bookPutInputFromEventBody(JSON.parse(event.body)), done);
    
};
