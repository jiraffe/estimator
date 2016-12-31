/**
 * Created by dzmitry_dubrovin on 21-Dec-16.
 */
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    fieldType: String,
    fieldName: String,
    fieldKey: String
});

var EstimationModel = mongoose.model('EstimationModel', schema);

var FieldTypes = {
    String: 'String',
    Number: 'Number',
    Date: 'Date',
    Object: 'Object'
}

var preparedModel = [
    {
        fieldType: FieldTypes.String,
        fieldName: "key",
        fieldKey: "KEY"
    },{
        fieldType: FieldTypes.String,
        fieldName: "summary",
        fieldKey: "SUMMARY"
    },{
        fieldType: FieldTypes.Number,
        fieldName: "estimationTime",
        fieldKey: "ESTIMATION_TIME"
    },{
        fieldType: FieldTypes.Number,
        fieldName: "developmentTime",
        fieldKey: "DEVELOPMENT_TIME"
    },{
        fieldType: FieldTypes.Number,
        fieldName: "totalTime",
        fieldKey: "TOTAL_TIME"
    },{
        fieldType: FieldTypes.String,
        fieldName: "component",
        fieldKey: "COMPONENT"
    },{
        fieldType: FieldTypes.String,
        fieldName: "version",
        fieldKey: "VERSION"
    },{
        fieldType: FieldTypes.Date,
        fieldName: "approvedDate",
        fieldKey: "APPROVED_DATE"
    },{
        fieldType: FieldTypes.Date,
        fieldName: "workStartDate",
        fieldKey: "WORKSTART_DATE"
    },{
        fieldType: FieldTypes.Date,
        fieldName: "workEndDate",
        fieldKey: "WORKEND_DATE"
    },{
        fieldType: FieldTypes.String,
        fieldName: "projectKey",
        fieldKey: "PROJECT_KEY"
    },{
        fieldType: FieldTypes.String,
        fieldName: "status",
        fieldKey: "STATUS"
    }
];

module.exports.EstimationModel = EstimationModel;
module.exports.preparedModel = preparedModel;