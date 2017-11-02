'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

function dynamoDBResultToAPIOutput(result) {
    return result.Item;
}

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
    	isBase64Encoded: false,
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
	let bookid = event.pathParameters.bookId;
	dynamo.getItem({ TableName: 'library', Key: { item: 'book', bookid: Number(bookid) }}, function (err, res) {
	    if (err === null) {
	        done(err, dynamoDBResultToAPIOutput(res));
	    } else {
	        done(err,res);
	    }
	});
    
};


